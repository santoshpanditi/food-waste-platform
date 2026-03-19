package com.vishnu.backend.service;

import com.vishnu.backend.dto.AuthRequest;
import com.vishnu.backend.dto.AuthResponse;
import com.vishnu.backend.dto.UserDTO;
import com.vishnu.backend.entity.User;
import com.vishnu.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.lang.NonNull;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public AuthResponse register(User user, String role) {
        if (userRepository.existsByEmail(user.getEmail())) {
            return new AuthResponse(null, "Email already exists", null);
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole(User.UserRole.valueOf(role.toUpperCase()));
        user.setCreatedAt(LocalDateTime.now());
        user.setUpdatedAt(LocalDateTime.now());
        user.setImpactScore(0.0);
        user.setTotalDonations(0);
        user.setTotalClaims(0);

        User savedUser = userRepository.save(user);
        String token = jwtTokenProvider.generateToken(savedUser.getId(), savedUser.getEmail());

        return new AuthResponse(token, "User registered successfully", UserDTO.fromEntity(savedUser));
    }

    public AuthResponse login(AuthRequest request) {
        Optional<User> user = userRepository.findByEmail(request.getEmail());

        if (user.isEmpty() || !passwordEncoder.matches(request.getPassword(), user.get().getPassword())) {
            return new AuthResponse(null, "Invalid email or password", null);
        }

        User foundUser = user.get();
        String token = jwtTokenProvider.generateToken(foundUser.getId(), foundUser.getEmail());

        return new AuthResponse(token, "Login successful", UserDTO.fromEntity(foundUser));
    }

    public UserDTO getUserById(@NonNull Long id) {
        Optional<User> user = userRepository.findById(id);
        return user.map(UserDTO::fromEntity).orElse(null);
    }

    public UserDTO updateUser(@NonNull Long id, User userDetails) {
        Optional<User> existingUser = userRepository.findById(id);

        if (existingUser.isPresent()) {
            User user = existingUser.get();
            if (userDetails.getName() != null) user.setName(userDetails.getName());
            if (userDetails.getPhone() != null) user.setPhone(userDetails.getPhone());
            if (userDetails.getAddress() != null) user.setAddress(userDetails.getAddress());
            user.setUpdatedAt(LocalDateTime.now());

            User updatedUser = userRepository.save(user);
            return UserDTO.fromEntity(updatedUser);
        }

        return null;
    }

    public void updateImpactScore(@NonNull Long userId, @NonNull Double points) {
        Optional<User> user = userRepository.findById(userId);
        if (user.isPresent()) {
            User u = user.get();
            u.setImpactScore(u.getImpactScore() + points);
            userRepository.save(u);
        }
    }
}
