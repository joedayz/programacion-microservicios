package com.bcp.training.monitor;

import java.time.Instant;
import java.util.concurrent.atomic.AtomicInteger;

import jakarta.enterprise.context.ApplicationScoped;
import org.eclipse.microprofile.faulttolerance.Fallback;
import org.eclipse.microprofile.faulttolerance.Retry;
import org.eclipse.microprofile.faulttolerance.Timeout;

@ApplicationScoped
public class MonitorService {

    private final AtomicInteger failures = new AtomicInteger();

    @Retry(maxRetries = 2, delay = 200)
    @Timeout(300)
    @Fallback(fallbackMethod = "fallbackStatus")
    public String status() {
        if (failures.getAndIncrement() < 5) {
            throw new IllegalStateException("Simulated failure");
        }
        return "OK " + Instant.now();
    }

    String fallbackStatus() {
        return "DEGRADED " + Instant.now();
    }
}
