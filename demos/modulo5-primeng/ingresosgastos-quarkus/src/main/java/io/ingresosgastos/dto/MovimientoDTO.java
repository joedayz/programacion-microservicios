package io.ingresosgastos.dto;

import jakarta.validation.constraints.*;

import java.math.BigDecimal;

public class MovimientoDTO {

    public Long id;

    @NotNull
    @Pattern(regexp = "ingreso|gasto", message = "El tipo debe ser 'ingreso' o 'gasto'")
    public String tipo;

    @NotBlank
    public String descripcion;

    @NotNull
    @DecimalMin("0")
    public BigDecimal monto;

    @NotNull
    @Min(1)
    @Max(12)
    public Integer mes;

    @NotNull
    @Min(2000)
    @Max(2100)
    public Integer anio;

    public MovimientoDTO() {}

    public MovimientoDTO(Long id, String tipo, String descripcion, BigDecimal monto, Integer mes, Integer anio) {
        this.id = id;
        this.tipo = tipo;
        this.descripcion = descripcion;
        this.monto = monto;
        this.mes = mes;
        this.anio = anio;
    }
}
