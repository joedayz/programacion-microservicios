package com.example;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class ProductService {
    private List<Product> products = new ArrayList<>();
    private Long nextId = 1L;
    
    public List<Product> getAll() {
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
    
    public Product update(Long id, Product product) {
        Product existing = findById(id);
        existing.setName(product.getName());
        existing.setPrice(product.getPrice());
        existing.setStock(product.getStock());
        return existing;
    }
    
    public void delete(Long id) {
        products.removeIf(p -> p.getId().equals(id));
    }
}
