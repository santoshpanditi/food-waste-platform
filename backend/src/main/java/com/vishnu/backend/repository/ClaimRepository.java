package com.vishnu.backend.repository;

import com.vishnu.backend.entity.Claim;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ClaimRepository extends JpaRepository<Claim, Long> {
    List<Claim> findByClaimantId(Long claimantId);
    List<Claim> findByListingId(Long listingId);
    List<Claim> findByStatus(Claim.ClaimStatus status);
}
