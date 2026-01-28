package com.bcp.training.monitor;

import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

@Path("/monitor") //http://localhost:8080/monitor
public class MonitorResource {

    @Inject
    MonitorService monitorService;

    @GET
    @Path("/status")
    @Produces(MediaType.TEXT_PLAIN)
    public String status() {
        return monitorService.status();
    }

    @GET
    @Path("/timeout")
    @Produces(MediaType.TEXT_PLAIN)
    public String timeout(){
        return monitorService.slowOperation();
    }

    @GET
    @Path("/unstable")
    @Produces(MediaType.TEXT_PLAIN)
    public String unstable(){
        return monitorService.unstable();
    }

}
