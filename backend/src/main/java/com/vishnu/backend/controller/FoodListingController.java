package com.vishnu.backend.controller;

import com.vishnu.backend.dto.FoodListingDTO;
import com.vishnu.backend.entity.FoodListing;
import com.vishnu.backend.service.FoodListingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/listings")
public class FoodListingController {
    @Autowired
    private FoodListingService foodListingService;

    @PostMapping
    public ResponseEntity<FoodListingDTO> createListing(@RequestBody FoodListing listing, @RequestParam Long donorId) {
        FoodListingDTO created = foodListingService.createListing(listing, donorId);
        if (created == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @GetMapping("/available")
    public ResponseEntity<List<FoodListingDTO>> getAvailableListings() {
        List<FoodListingDTO> listings = foodListingService.getAvailableListings();
        return ResponseEntity.ok(listings);
    }

    @GetMapping("/donor/{donorId}")
    public ResponseEntity<List<FoodListingDTO>> getDonorListings(@PathVariable Long donorId) {
        List<FoodListingDTO> listings = foodListingService.getDonorListings(donorId);
        return ResponseEntity.ok(listings);
    }

    @GetMapping("/{id}")
    public ResponseEntity<FoodListingDTO> getListingById(@PathVariable Long id) {
        FoodListingDTO listing = foodListingService.getListingById(id);
        if (listing == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.ok(listing);
    }

    @PutMapping("/{id}")
    public ResponseEntity<FoodListingDTO> updateListing(@PathVariable Long id, @RequestBody FoodListing updatedDetails) {
        FoodListingDTO updated = foodListingService.updateListing(id, updatedDetails);
        if (updated == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.ok(updated);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Void> updateListingStatus(@PathVariable Long id, @RequestParam String status) {
        try {
            foodListingService.updateListingStatus(id, FoodListing.ListingStatus.valueOf(status));
            return ResponseEntity.ok().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteListing(@PathVariable Long id) {
        foodListingService.deleteListing(id);
        return ResponseEntity.ok().build();
    }
}
