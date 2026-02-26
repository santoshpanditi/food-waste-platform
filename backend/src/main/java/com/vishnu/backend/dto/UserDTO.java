package com.vishnu.backend.dto;

import com.vishnu.backend.entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {
    private Long id;
    private String email;
    private String name;
    private String phone;
    private String address;
    private String role;
    private Double impactScore;
    private Integer totalDonations;
    private Integer totalClaims;
    private Boolean isActive;
    private LocalDateTime createdAt;

    public static UserDTO fromEntity(User user) {
        return new UserDTO(
                user.getId(),
                user.getEmail(),
                user.getName(),
                user.getPhone(),
                user.getAddress(),
                user.getRole().toString(),
                user.getImpactScore(),
                user.getTotalDonations(),
                user.getTotalClaims(),
                user.getIsActive(),
                user.getCreatedAt()
        );
    }
}
