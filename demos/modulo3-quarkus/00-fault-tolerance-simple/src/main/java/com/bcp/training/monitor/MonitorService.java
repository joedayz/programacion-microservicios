package com.bcp.training.monitor;

import jakarta.enterprise.context.ApplicationScoped;
import org.eclipse.microprofile.faulttolerance.CircuitBreaker;
import org.eclipse.microprofile.faulttolerance.Fallback;
import org.eclipse.microprofile.faulttolerance.Retry;
import org.eclipse.microprofile.faulttolerance.Timeout;
import org.jboss.logging.Logger;

import java.time.Instant;
import java.util.concurrent.atomic.AtomicInteger;

@ApplicationScoped
public class MonitorService {

    private static final Logger LOG = Logger.getLogger(MonitorService.class);
    private final AtomicInteger failures = new AtomicInteger();
    private final AtomicInteger calls = new AtomicInteger();

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

    @Timeout(300)
    @Fallback(fallbackMethod = "fallbackSlowOperation")
    public String slowOperation() {
        try {
            Thread.sleep(5000); // 5 segundos
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
        return "OK (No timeout)";
    }

    public String fallbackSlowOperation(){
        return "TIMEOUT --> respuesta degradada";
    }


    @CircuitBreaker(requestVolumeThreshold = 4, //evalúa después de 4 llamadas
            failureRatio = 0.5,  // 50% fallas abre el circuito
            delay = 5000) //5 segundos abierto
    @Fallback(fallbackMethod = "fallbackUnstable")
    public String unstable() {
        int current = calls.incrementAndGet();

        if (current % 2 == 0) {
            LOG.warnf("Call #%d --> FAIL", current);
            throw new IllegalStateException("Falla simulada #" + current);
        }

        LOG.infof("Call #%d --> OK", current);
        return "OK (llamada #" + current + ")";
    }

    String fallbackUnstable() {
        LOG.warn("Fallback ejecutado (circuit abierto o fallo)");
        return "CIRCUIT OPEN -> respuesta degradada";
    }
}
