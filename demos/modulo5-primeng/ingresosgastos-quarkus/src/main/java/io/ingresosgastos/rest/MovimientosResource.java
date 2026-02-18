package io.ingresosgastos.rest;

import io.ingresosgastos.dto.MovimientoDTO;
import io.ingresosgastos.entity.Movimiento;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Path( "/movimientos")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class MovimientosResource {

    @GET
    public List<MovimientoDTO> listar() {
        return Movimiento.listAll().stream()
                .map(m -> toDTO((Movimiento) m))
                .collect(Collectors.toList());
    }

    /*
            { movimientos : [...]}
     */
    @GET
    @Path("/db")
    public Map<String, List<MovimientoDTO>> listarPorMes() {
        return Map.of("movimientos", listar());
    }

    @GET
    @Path("/{id}")
    public Response obtener(@PathParam("id") Long id){
        Movimiento m = Movimiento.findById(id);
        if(m == null){
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        return Response.ok(toDTO(m)).build();
    }
    @POST
    @Transactional
    public Response crear(@Valid MovimientoDTO dto){
        Movimiento m = new Movimiento(dto.tipo, dto.descripcion, dto.monto, dto.mes, dto.anio);
        m.persist();
        return Response.ok(toDTO(m)).build();
    }


    private static MovimientoDTO toDTO(Movimiento m) {
        return new MovimientoDTO(m.id, m.tipo, m.descripcion, m.monto, m.mes, m.anio);
    }
}
