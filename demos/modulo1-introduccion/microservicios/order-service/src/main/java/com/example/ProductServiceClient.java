package com.example;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import jakarta.ws.rs.client.Client;
import jakarta.ws.rs.client.ClientBuilder;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.glassfish.jersey.jackson.JacksonFeature;

public class ProductServiceClient {
    private final Client client;
    private final String productServiceUrl;
    
    public ProductServiceClient(String productServiceUrl) {
        // Configurar ObjectMapper con soporte para Java 8 time types
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        objectMapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
        
        this.client = ClientBuilder.newBuilder()
                .register(JacksonFeature.class)
                .register(new JacksonObjectMapperProvider())
                .build();
        this.productServiceUrl = productServiceUrl;
    }
    
    public Product getProduct(Long productId) {
        try {
            Response response = client.target(productServiceUrl)
                    .path("/products/" + productId)
                    .request(MediaType.APPLICATION_JSON)
                    .get();
            
            if (response.getStatus() == Response.Status.OK.getStatusCode()) {
                return response.readEntity(Product.class);
            } else {
                throw new RuntimeException("Product not found with id: " + productId);
            }
        } catch (Exception e) {
            throw new RuntimeException("Error communicating with Product Service: " + e.getMessage());
        }
    }
    
    public void close() {
        if (client != null) {
            client.close();
        }
    }
}
