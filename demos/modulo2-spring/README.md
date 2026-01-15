# DEMOS MÓDULO 2: SPRING FRAMEWORK

## Duración: 5 horas de práctica

---

## DEMO 1: Crear Proyecto Spring Boot desde Cero (1 hora)

### Objetivo
Crear un proyecto Spring Boot básico y entender su estructura.

### Pasos

1. **Crear proyecto usando Spring Initializr**
   - Ir a https://start.spring.io
   - Seleccionar:
     - Project: Maven
     - Language: Java
     - Spring Boot: 3.2.x
     - Dependencies: Spring Web, Spring Boot DevTools
   - Generar y descargar proyecto

2. **Importar en IDE**
   - Abrir proyecto en IntelliJ IDEA o VS Code
   - Verificar estructura de carpetas

3. **Crear clase principal**
```java
@SpringBootApplication
public class DemoApplication {
    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }
}
```

4. **Crear controlador básico**
```java
@RestController
public class HelloController {
    
    @GetMapping("/hello")
    public String hello() {
        return "Hello Spring Boot!";
    }
}
```

5. **Ejecutar aplicación**
```bash
mvn spring-boot:run
# o
./mvnw spring-boot:run
```

6. **Probar endpoint**
```bash
curl http://localhost:8080/hello
```

### Resultado Esperado
Aplicación Spring Boot funcionando con un endpoint REST básico.

---

## DEMO 2: Implementar REST API Completa (CRUD) (2 horas)

### Objetivo
Crear una API REST completa para gestión de productos.

### Pasos

1. **Crear entidad Product**
```java
public class Product {
    private Long id;
    private String name;
    private String description;
    private Double price;
    private Integer stock;
    
    // Constructors, getters, setters
}
```

2. **Crear servicio**
```java
@Service
public class ProductService {
    private List<Product> products = new ArrayList<>();
    private Long nextId = 1L;
    
    public List<Product> findAll() {
        return new ArrayList<>(products);
    }
    
    public Product findById(Long id) {
        return products.stream()
            .filter(p -> p.getId().equals(id))
            .findFirst()
            .orElseThrow(() -> new ProductNotFoundException(id));
    }
    
    public Product save(Product product) {
        product.setId(nextId++);
        products.add(product);
        return product;
    }
    
    public Product update(Long id, Product product) {
        Product existing = findById(id);
        existing.setName(product.getName());
        existing.setDescription(product.getDescription());
        existing.setPrice(product.getPrice());
        existing.setStock(product.getStock());
        return existing;
    }
    
    public void delete(Long id) {
        products.removeIf(p -> p.getId().equals(id));
    }
}
```

3. **Crear controlador REST**
```java
@RestController
@RequestMapping("/api/products")
public class ProductController {
    
    private final ProductService productService;
    
    public ProductController(ProductService productService) {
        this.productService = productService;
    }
    
    @GetMapping
    public List<Product> getAll() {
        return productService.findAll();
    }
    
    @GetMapping("/{id}")
    public Product getById(@PathVariable Long id) {
        return productService.findById(id);
    }
    
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Product create(@RequestBody Product product) {
        return productService.save(product);
    }
    
    @PutMapping("/{id}")
    public Product update(@PathVariable Long id, @RequestBody Product product) {
        return productService.update(id, product);
    }
    
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        productService.delete(id);
    }
}
```

4. **Crear excepción personalizada**
```java
public class ProductNotFoundException extends RuntimeException {
    public ProductNotFoundException(Long id) {
        super("Product not found with id: " + id);
    }
}
```

5. **Manejo de excepciones**
```java
@RestControllerAdvice
public class GlobalExceptionHandler {
    
    @ExceptionHandler(ProductNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ErrorResponse handleProductNotFound(ProductNotFoundException ex) {
        return new ErrorResponse(ex.getMessage());
    }
}
```

6. **Probar API**
```bash
# Crear producto
curl -X POST http://localhost:8080/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Laptop","description":"Gaming laptop","price":1299.99,"stock":10}'

# Listar productos
curl http://localhost:8080/api/products

# Obtener por ID
curl http://localhost:8080/api/products/1

# Actualizar
curl -X PUT http://localhost:8080/api/products/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Laptop Pro","description":"Gaming laptop","price":1499.99,"stock":5}'

# Eliminar
curl -X DELETE http://localhost:8080/api/products/1
```

### Resultado Esperado
API REST completa con operaciones CRUD funcionando.

---

## DEMO 3: Integración con Swagger/OpenAPI (1 hora)

### Objetivo
Documentar la API con Swagger.

### Pasos

1. **Agregar dependencia**
```xml
<dependency>
    <groupId>org.springdoc</groupId>
    <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
    <version>2.2.0</version>
</dependency>
```

2. **Configurar OpenAPI**
```java
@Configuration
public class OpenApiConfig {
    
    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
            .info(new Info()
                .title("Product API")
                .version("1.0")
                .description("API REST para gestión de productos")
                .contact(new Contact()
                    .name("Equipo de Desarrollo")
                    .email("dev@example.com")))
            .servers(List.of(
                new Server().url("http://localhost:8080").description("Servidor local")
            ));
    }
}
```

3. **Anotar controlador**
```java
@RestController
@RequestMapping("/api/products")
@Tag(name = "Products", description = "API de gestión de productos")
public class ProductController {
    
    @GetMapping
    @Operation(summary = "Listar todos los productos")
    @ApiResponse(responseCode = "200", description = "Lista de productos obtenida exitosamente")
    public List<Product> getAll() { }
    
    @GetMapping("/{id}")
    @Operation(summary = "Obtener producto por ID")
    @ApiResponse(responseCode = "200", description = "Producto encontrado")
    @ApiResponse(responseCode = "404", description = "Producto no encontrado")
    public Product getById(@PathVariable Long id) { }
    
    @PostMapping
    @Operation(summary = "Crear nuevo producto")
    @ApiResponse(responseCode = "201", description = "Producto creado exitosamente")
    public Product create(@RequestBody Product product) { }
}
```

4. **Acceder a Swagger UI**
   - Abrir navegador en: http://localhost:8080/swagger-ui.html
   - Probar endpoints desde la interfaz

### Resultado Esperado
API documentada con Swagger UI interactiva.

---

## DEMO 4: Spring DevTools y Hot Reload (0.5 horas)

### Objetivo
Configurar hot reload para desarrollo rápido.

### Pasos

1. **Verificar dependencia** (ya incluida en Spring Initializr)
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-devtools</artifactId>
    <scope>runtime</scope>
    <optional>true</optional>
</dependency>
```

2. **Configurar aplicación**
```properties
# application.properties
spring.devtools.restart.enabled=true
spring.devtools.livereload.enabled=true
```

3. **Probar hot reload**
   - Ejecutar aplicación
   - Modificar método en controlador
   - Guardar archivo
   - Ver cambios sin reiniciar

4. **Instalar LiveReload extension** (opcional)
   - Chrome: LiveReload extension
   - Cambios en templates recargan navegador automáticamente

### Resultado Esperado
Desarrollo más rápido con recarga automática.

---

## DEMO 5: Validación de Datos (0.5 horas)

### Objetivo
Implementar validación de datos de entrada.

### Pasos

1. **Agregar dependencia**
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-validation</artifactId>
</dependency>
```

2. **Anotar entidad**
```java
public class Product {
    @NotNull
    @NotBlank(message = "El nombre es obligatorio")
    private String name;
    
    @Size(max = 500, message = "La descripción no puede exceder 500 caracteres")
    private String description;
    
    @NotNull(message = "El precio es obligatorio")
    @Min(value = 0, message = "El precio debe ser mayor o igual a 0")
    private Double price;
    
    @Min(value = 0, message = "El stock debe ser mayor o igual a 0")
    private Integer stock;
}
```

3. **Validar en controlador**
```java
@PostMapping
@ResponseStatus(HttpStatus.CREATED)
public Product create(@Valid @RequestBody Product product) {
    return productService.save(product);
}
```

4. **Manejar errores de validación**
```java
@RestControllerAdvice
public class GlobalExceptionHandler {
    
    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Map<String, String> handleValidationErrors(
        MethodArgumentNotValidException ex
    ) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(error ->
            errors.put(error.getField(), error.getDefaultMessage())
        );
        return errors;
    }
}
```

5. **Probar validación**
```bash
# Request inválido (sin nombre)
curl -X POST http://localhost:8080/api/products \
  -H "Content-Type: application/json" \
  -d '{"description":"Test","price":-10}'
```

### Resultado Esperado
Validación automática de datos con mensajes de error claros.

---

## EJERCICIO PRÁCTICO: API de Gestión de Productos Completa (1 hora)

### Objetivo
Crear una API REST completa con todas las características aprendidas.

### Requisitos

1. ✅ CRUD completo de productos
2. ✅ Validación de datos
3. ✅ Manejo de excepciones
4. ✅ Documentación con Swagger
5. ✅ Códigos HTTP apropiados
6. ✅ Estructura de proyecto limpia

### Funcionalidades Adicionales

- Búsqueda por nombre
- Filtrado por precio (min/max)
- Paginación
- Ordenamiento

### Entregables

- Código fuente completo
- Documentación Swagger funcionando
- Tests básicos (opcional)
- README con instrucciones

---

## CHECKLIST DE EVALUACIÓN

- [ ] Puedo crear un proyecto Spring Boot desde cero
- [ ] Entiendo la inyección de dependencias
- [ ] Sé crear endpoints REST con anotaciones
- [ ] Puedo implementar CRUD completo
- [ ] Sé documentar APIs con Swagger
- [ ] Puedo validar datos de entrada
- [ ] Manejo excepciones apropiadamente
- [ ] Uso Spring DevTools para desarrollo rápido

---

## PRÓXIMOS PASOS

En el siguiente módulo aprenderemos Quarkus, un framework moderno optimizado para cloud-native y contenedores.
