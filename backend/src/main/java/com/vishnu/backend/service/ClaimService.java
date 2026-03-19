package com.vishnu.backend.service;

import com.vishnu.backend.entity.Claim;
import com.vishnu.backend.entity.FoodListing;
import com.vishnu.backend.entity.User;
import com.vishnu.backend.repository.ClaimRepository;
import com.vishnu.backend.repository.FoodListingRepository;
import com.vishnu.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.lang.NonNull;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ClaimService {
    @Autowired
    private ClaimRepository claimRepository;

    @Autowired
    private FoodListingRepository foodListingRepository;

    @Autowired
    private UserRepository userRepository;

    public Claim createClaim(@NonNull Long listingId, @NonNull Long claimantId) {
        Optional<FoodListing> listing = foodListingRepository.findById(listingId);
        Optional<User> claimant = userRepository.findById(claimantId);

        if (listing.isEmpty() || claimant.isEmpty()) {
            return null;
        }

        Claim claim = new Claim();
        claim.setListing(listing.get());
        claim.setClaimant(claimant.get());
        claim.setStatus(Claim.ClaimStatus.PENDING);
        claim.setClaimedAt(LocalDateTime.now());
        claim.setCreatedAt(LocalDateTime.now());
        claim.setUpdatedAt(LocalDateTime.now());

        return claimRepository.save(claim);
    }

    public Claim approveClaim(@NonNull Long claimId) {
        Optional<Claim> claim = claimRepository.findById(claimId);

        if (claim.isPresent()) {
            Claim c = claim.get();
            c.setStatus(Claim.ClaimStatus.APPROVED);
            c.setUpdatedAt(LocalDateTime.now());

            FoodListing listing = c.getListing();
            listing.setStatus(FoodListing.ListingStatus.CLAIMED);
            listing.setUpdatedAt(LocalDateTime.now());
            foodListingRepository.save(listing);

            return claimRepository.save(c);
        }

        return null;
    }

    public Claim completeClaim(@NonNull Long claimId) {
        Optional<Claim> claim = claimRepository.findById(claimId);

        if (claim.isPresent()) {
            Claim c = claim.get();
            c.setStatus(Claim.ClaimStatus.COMPLETED);
            c.setCompletedAt(LocalDateTime.now());
            c.setUpdatedAt(LocalDateTime.now());

            return claimRepository.save(c);
        }

        return null;
    }

    public List<Claim> getClaimsByClaimant(@NonNull Long claimantId) {
        return claimRepository.findByClaimantId(claimantId);
    }

    public List<Claim> getClaimsByListing(Long listingId) {
        return claimRepository.findByListingId(listingId);
    }
}
