package com.example;

import jakarta.ws.rs.ApplicationPath;
import org.glassfish.jersey.jackson.JacksonFeature;
import org.glassfish.jersey.server.ResourceConfig;

@ApplicationPath("/")
public class JerseyConfig extends ResourceConfig {
    public JerseyConfig() {
        // Registrar recursos directamente
        register(OrderResource.class);
        // Registrar Jackson para serialización JSON
        register(JacksonFeature.class);
        // Registrar provider para manejar LocalDateTime
        register(JacksonObjectMapperProvider.class);
    }
}
