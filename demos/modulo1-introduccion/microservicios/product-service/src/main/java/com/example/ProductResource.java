package com.example;

import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.List;

@Path("/products")      // http://localhost:8080/products
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ProductResource {
    
    private final ProductService productService = ProductService.getInstance();
    
    @GET  //GET http://localhost:8080/products
    public List<Product> getAll() {
        return productService.findAll();
    }
    
    @GET
    @Path("/{id}")  //http://localhost:8080/products/7
    public Response getById(@PathParam("id") Long id) {
        try {
            Product product = productService.findById(id);
            return Response.ok(product).build();
        } catch (RuntimeException e) {
            return Response.status(Response.Status.NOT_FOUND)
                    .entity("{\"error\":\"" + e.getMessage() + "\"}")
                    .build();
        }
    }
    
    @POST // POST http://localhost:8080/products
    public Response create(Product product) {
        Product created = productService.create(product);
        return Response.status(Response.Status.CREATED).entity(created).build();
    }
}
