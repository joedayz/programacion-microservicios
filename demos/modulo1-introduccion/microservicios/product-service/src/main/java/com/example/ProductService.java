package com.example;

import java.util.ArrayList;
import java.util.List;

public class ProductService {
    private static ProductService instance;
    private List<Product> products = new ArrayList<>();
    private Long nextId = 1L;
    
    private ProductService() {
        // Constructor privado para singleton
    }
    
    public static synchronized ProductService getInstance() {
        if (instance == null) {
            instance = new ProductService();
        }
        return instance;
    }
    
    public List<Product> findAll() {
        return new ArrayList<>(products);
    }
    
    public Product findById(Long id) {
        return products.stream()
                .filter(p -> p.getId().equals(id))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
    }
    
    public Product create(Product product) {
        product.setId(nextId++);
        products.add(product);
        return product;
    }
}
