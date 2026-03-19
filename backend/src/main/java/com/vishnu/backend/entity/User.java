package com.vishnu.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String name;

    @Column(unique = true)
    private String phone;

    @Column(columnDefinition = "TEXT")
    private String address;

    @Enumerated(EnumType.STRING)
    private UserRole role;

    @Column(nullable = false, columnDefinition = "DOUBLE DEFAULT 0")
    private Double impactScore = 0.0;

    @Column(nullable = false, columnDefinition = "INT DEFAULT 0")
    private Integer totalDonations = 0;

    @Column(nullable = false, columnDefinition = "INT DEFAULT 0")
    private Integer totalClaims = 0;

    @Column(columnDefinition = "BOOLEAN DEFAULT true")
    private Boolean isActive = true;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(nullable = false)
    private LocalDateTime updatedAt = LocalDateTime.now();

    public enum UserRole {
        DONOR, RECIPIENT, ADMIN, LOGISTICS
    }
}
