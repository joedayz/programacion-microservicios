package com.example;

import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.List;

@Path("/orders")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class OrderResource {
    
    private final OrderService orderService;
    private final ProductServiceClient productClient;
    
    public OrderResource() {
        // Obtener URL del servicio de productos desde variable de entorno o usar default
        String productServiceUrl = System.getenv("PRODUCT_SERVICE_URL");
        if (productServiceUrl == null || productServiceUrl.isEmpty()) {
            productServiceUrl = "http://localhost:8080";
        }
        
        this.productClient = new ProductServiceClient(productServiceUrl);
        this.orderService = OrderService.getInstance(productClient);
    }
    
    @GET
    public List<Order> getAll() {
        return orderService.findAll();
    }
    
    @GET
    @Path("/{id}")
    public Response getById(@PathParam("id") Long id) {
        try {
            Order order = orderService.findById(id);
            return Response.ok(order).build();
        } catch (RuntimeException e) {
            return Response.status(Response.Status.NOT_FOUND)
                    .entity("{\"error\":\"" + e.getMessage() + "\"}")
                    .build();
        }
    }
    
    @POST
    public Response create(Order order) {
        try {
            Order created = orderService.create(order);
            return Response.status(Response.Status.CREATED).entity(created).build();
        } catch (RuntimeException e) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity("{\"error\":\"" + e.getMessage() + "\"}")
                    .build();
        }
    }
}
