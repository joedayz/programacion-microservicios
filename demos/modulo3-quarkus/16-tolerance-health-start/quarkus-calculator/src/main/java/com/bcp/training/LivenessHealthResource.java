package com.bcp.training;

import com.bcp.training.service.StateService;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

@ApplicationScoped
public class LivenessHealthResource {

    private final String HEALTH_CHECK_NAME = "Liveness";

    @Inject
    StateService applicationState;
}
