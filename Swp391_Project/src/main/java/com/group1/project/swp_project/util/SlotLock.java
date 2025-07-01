package com.group1.project.swp_project.util;

import java.time.LocalDateTime;

public class SlotLock {

    private final int customerId;
    private final LocalDateTime lockTime;
    private final LocalDateTime expiryTime;

    public SlotLock(int customerId, LocalDateTime lockTime) {
        this.customerId = customerId;
        this.lockTime = lockTime;
        this.expiryTime = lockTime.plusMinutes(30);
    }

    public boolean isExpired() {
        return LocalDateTime.now().isAfter(expiryTime);
    }

    public boolean isOwnedBy(int customerId) {
        return this.customerId == customerId;
    }

    public int getCustomerId() {
        return customerId;
    }

    public LocalDateTime getLockTime() {
        return lockTime;
    }

    public LocalDateTime getExpiryTime() {
        return expiryTime;
    }
}
