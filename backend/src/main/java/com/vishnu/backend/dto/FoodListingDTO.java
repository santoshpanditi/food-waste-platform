package com.vishnu.backend.dto;

import com.vishnu.backend.entity.FoodListing;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FoodListingDTO {
    private Long id;
    private Long donorId;
    private String donorName;
    private String foodType;
    private Integer quantity;
    private String unit;
    private String description;
    private Double latitude;
    private Double longitude;
    private String location;
    private String status;
    private String category;
    private LocalDateTime expiryTime;
    private LocalDateTime createdAt;

    public static FoodListingDTO fromEntity(FoodListing listing) {
        return new FoodListingDTO(
                listing.getId(),
                listing.getDonor().getId(),
                listing.getDonor().getName(),
                listing.getFoodType(),
                listing.getQuantity(),
                listing.getUnit(),
                listing.getDescription(),
                listing.getLatitude(),
                listing.getLongitude(),
                listing.getLocation(),
                listing.getStatus().toString(),
                listing.getCategory().toString(),
                listing.getExpiryTime(),
                listing.getCreatedAt()
        );
    }
}
