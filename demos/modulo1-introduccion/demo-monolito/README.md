# Demo Monolito - Módulo 1

Aplicación Java monolítica simple que gestiona productos.

## Ejecución

```bash
# Compilar
mvn clean compile

# Ejecutar
mvn exec:java -Dexec.mainClass="com.example.MonolithApp"

# O compilar JAR y ejecutar
mvn clean package
java -jar target/demo-monolito-1.0.0.jar
```

## Estructura

- `Product.java` - Entidad Product
- `ProductService.java` - Servicio de gestión de productos
- `MonolithApp.java` - Aplicación principal

## Notas para el Profesor

Esta demo muestra una aplicación monolítica simple. En clase, los estudiantes crearán esto desde cero siguiendo los pasos del README.md principal.
