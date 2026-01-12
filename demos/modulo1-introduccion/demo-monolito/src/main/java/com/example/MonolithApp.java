package com.example;

public class MonolithApp {
    public static void main(String[] args) {
        ProductService service = new ProductService();
        
        // Crear algunos productos de ejemplo
        Product laptop = new Product(null, "Laptop", 1299.99, 10);
        Product mouse = new Product(null, "Mouse", 29.99, 50);
        Product keyboard = new Product(null, "Keyboard", 79.99, 30);
        
        service.create(laptop);
        service.create(mouse);
        service.create(keyboard);
        
        // Listar todos los productos
        System.out.println("=== Todos los productos ===");
        service.getAll().forEach(System.out::println);
        
        // Buscar un producto
        System.out.println("\n=== Producto con ID 1 ===");
        Product found = service.findById(1L);
        System.out.println(found);
        
        // Actualizar producto
        System.out.println("\n=== Actualizar producto ===");
        Product updated = new Product(null, "Laptop Pro", 1499.99, 5);
        Product result = service.update(1L, updated);
        System.out.println("Producto actualizado: " + result);
        
        // Listar productos después de actualizar
        System.out.println("\n=== Productos después de actualizar ===");
        service.getAll().forEach(System.out::println);
    }
}
