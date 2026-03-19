package com.vishnu.backend.service;

import com.vishnu.backend.dto.FoodListingDTO;
import com.vishnu.backend.entity.FoodListing;
import com.vishnu.backend.entity.User;
import com.vishnu.backend.repository.FoodListingRepository;
import com.vishnu.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.lang.NonNull;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class FoodListingService {
    @Autowired
    private FoodListingRepository foodListingRepository;

    @Autowired
    private UserRepository userRepository;

    public FoodListingDTO createListing(FoodListing listing, @NonNull Long donorId) {
        Optional<User> donor = userRepository.findById(donorId);
        if (donor.isEmpty()) {
            return null;
        }

        listing.setDonor(donor.get());
        listing.setStatus(FoodListing.ListingStatus.AVAILABLE);
        listing.setCreatedAt(LocalDateTime.now());
        listing.setUpdatedAt(LocalDateTime.now());

        FoodListing savedListing = foodListingRepository.save(listing);
        return FoodListingDTO.fromEntity(savedListing);
    }

    public List<FoodListingDTO> getAvailableListings() {
        return foodListingRepository.findAvailableListings()
                .stream()
                .map(FoodListingDTO::fromEntity)
                .collect(Collectors.toList());
    }

    public List<FoodListingDTO> getDonorListings(@NonNull Long donorId) {
        return foodListingRepository.findByDonorId(donorId)
                .stream()
                .map(FoodListingDTO::fromEntity)
                .collect(Collectors.toList());
    }

    public FoodListingDTO getListingById(@NonNull Long id) {
        Optional<FoodListing> listing = foodListingRepository.findById(id);
        return listing.map(FoodListingDTO::fromEntity).orElse(null);
    }

    public FoodListingDTO updateListing(@NonNull Long id, FoodListing updatedDetails) {
        Optional<FoodListing> existing = foodListingRepository.findById(id);

        if (existing.isPresent()) {
            FoodListing listing = existing.get();
            if (updatedDetails.getFoodType() != null) listing.setFoodType(updatedDetails.getFoodType());
            if (updatedDetails.getQuantity() != null) listing.setQuantity(updatedDetails.getQuantity());
            if (updatedDetails.getDescription() != null) listing.setDescription(updatedDetails.getDescription());
            if (updatedDetails.getExpiryTime() != null) listing.setExpiryTime(updatedDetails.getExpiryTime());
            listing.setUpdatedAt(LocalDateTime.now());

            FoodListing saved = foodListingRepository.save(listing);
            return FoodListingDTO.fromEntity(saved);
        }

        return null;
    }

    public void updateListingStatus(@NonNull Long id, FoodListing.ListingStatus status) {
        Optional<FoodListing> listing = foodListingRepository.findById(id);
        if (listing.isPresent()) {
            FoodListing fl = listing.get();
            fl.setStatus(status);
            fl.setUpdatedAt(LocalDateTime.now());
            foodListingRepository.save(fl);
        }
    }

    public void deleteListing(@NonNull Long id) {
        foodListingRepository.deleteById(id);
    }
}
