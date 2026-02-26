package com.vishnu.backend.controller;

import com.vishnu.backend.entity.Claim;
import com.vishnu.backend.service.ClaimService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/claims")
public class ClaimController {
    @Autowired
    private ClaimService claimService;

    @PostMapping
    public ResponseEntity<Claim> createClaim(@RequestParam Long listingId, @RequestParam Long claimantId) {
        Claim claim = claimService.createClaim(listingId, claimantId);
        if (claim == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(claim);
    }

    @PutMapping("/{id}/approve")
    public ResponseEntity<Claim> approveClaim(@PathVariable Long id) {
        Claim claim = claimService.approveClaim(id);
        if (claim == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.ok(claim);
    }

    @PutMapping("/{id}/complete")
    public ResponseEntity<Claim> completeClaim(@PathVariable Long id) {
        Claim claim = claimService.completeClaim(id);
        if (claim == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.ok(claim);
    }

    @GetMapping("/claimant/{claimantId}")
    public ResponseEntity<List<Claim>> getClaimsByClaimant(@PathVariable Long claimantId) {
        List<Claim> claims = claimService.getClaimsByClaimant(claimantId);
        return ResponseEntity.ok(claims);
    }

    @GetMapping("/listing/{listingId}")
    public ResponseEntity<List<Claim>> getClaimsByListing(@PathVariable Long listingId) {
        List<Claim> claims = claimService.getClaimsByListing(listingId);
        return ResponseEntity.ok(claims);
    }
}
