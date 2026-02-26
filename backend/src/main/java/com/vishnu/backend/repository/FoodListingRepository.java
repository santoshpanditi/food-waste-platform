package com.vishnu.backend.repository;

import com.vishnu.backend.entity.FoodListing;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface FoodListingRepository extends JpaRepository<FoodListing, Long> {
    List<FoodListing> findByStatus(FoodListing.ListingStatus status);
    List<FoodListing> findByDonorId(Long donorId);
    List<FoodListing> findByCategory(FoodListing.FoodCategory category);
    
    @Query("SELECT f FROM FoodListing f WHERE f.status = 'AVAILABLE' ORDER BY f.createdAt DESC")
    List<FoodListing> findAvailableListings();
}
