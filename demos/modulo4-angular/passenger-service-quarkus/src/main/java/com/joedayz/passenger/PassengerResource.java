package com.joedayz.passenger;

import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;

@Path("/passengers")
public class PassengerResource {

    @GET
    @Transactional
    @Produces(MediaType.APPLICATION_JSON)
    public List<Passenger> list() {
        return Passenger.list("select distinct p from Passenger p left join fetch p.children");
    }

    @PUT
    @Path("/{id}")
    @Transactional
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response update(@PathParam("id") Long id, Passenger payload) {
        Passenger existing = Passenger.findById(id);
        if (existing == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }

        existing.fullname = payload.fullname;
        existing.checkedIn = payload.checkedIn;
        existing.checkInDate = payload.checkInDate;

        existing.children.clear();
        if (payload.children != null) {
            for (Child childPayload : payload.children) {
                Child child = new Child();
                child.name = childPayload.name;
                child.age = childPayload.age;
                existing.children.add(child);
            }
        }

        return Response.ok(existing).build();
    }

    @DELETE
    @Path("/{id}")
    @Transactional
    public Response delete(@PathParam("id") Long id){
        boolean deleted = Passenger.deleteById(id);
        if(!deleted){
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        return Response.noContent().build();
    }

}
