package io.ingresosgastos.entity;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.validation.constraints.*;

import java.math.BigDecimal;

@Entity
@Table(name = "movimiento")
public class Movimiento extends PanacheEntity {

    @NotNull
    @Column(nullable = false, length = 10)
    public String tipo; // "ingreso" o "gasto"

    @NotBlank
    @Column(nullable = false, length = 255)
    public String descripcion;

    @NotNull
    @DecimalMin("0")
    @Column(nullable = false, precision = 12, scale = 2)
    public BigDecimal monto;

    @NotNull
    @Min(1)
    @Max(12)
    @Column(nullable = false)
    public Integer mes;

    @NotNull
    @Min(2000)
    @Max(2100)
    @Column(nullable = false)
    public Integer anio;

    public Movimiento() {}

    public Movimiento(String tipo, String descripcion, BigDecimal monto, Integer mes, Integer anio) {
        this.tipo = tipo;
        this.descripcion = descripcion;
        this.monto = monto;
        this.mes = mes;
        this.anio = anio;
    }

    public Long getId() {
        return id;
    }

}
