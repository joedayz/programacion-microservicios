package com.bcp.training;

import io.smallrye.common.annotation.RunOnVirtualThread;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.core.MediaType;

import org.eclipse.microprofile.rest.client.inject.RestClient;

@Path( "/products" )
@Produces( MediaType.APPLICATION_JSON )
public class ProductsResource {

    @Inject
    @RestClient
    PricesService pricesService;

    @GET
    @RunOnVirtualThread
    @Path( "/{productId}/priceHistory" )
    public ProductPriceHistory getProductPriceHistory( @PathParam( "productId" ) final Long productId ) {
        return pricesService.getProductPriceHistory( productId );
    }

    @GET
    @RunOnVirtualThread
    @Path( "/blocking" )
    public String blocking() {
        try {
            Thread.sleep( 30000 );
        } catch( InterruptedException e ) {
            e.printStackTrace();
        }

        return "I am a blocking operation";
    }

}