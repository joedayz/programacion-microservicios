package com.example;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class OrderService {
    private static OrderService instance;
    private List<Order> orders = new ArrayList<>();
    private Long nextId = 1L;
    private ProductServiceClient productClient;
    
    private OrderService(ProductServiceClient productClient) {
        this.productClient = productClient;
    }
    
    public static synchronized OrderService getInstance(ProductServiceClient productClient) {
        if (instance == null) {
            instance = new OrderService(productClient);
        }
        return instance;
    }
    
    public List<Order> findAll() {
        return new ArrayList<>(orders);
    }
    
    public Order findById(Long id) {
        return orders.stream()
                .filter(o -> o.getId().equals(id))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + id));
    }
    
    public Order create(Order order) {
        // Validar productos y obtener información
        for (OrderItem item : order.getItems()) {
            Product product = productClient.getProduct(item.getProductId());
            item.setProductName(product.getName());
            item.setPrice(product.getPrice());
        }
        
        // Calcular total
        Double total = order.getItems().stream()
                .mapToDouble(OrderItem::getSubtotal)
                .sum();
        
        order.setId(nextId++);
        order.setTotal(total);
        order.setOrderDate(LocalDateTime.now());
        order.setStatus("PENDING");
        
        orders.add(order);
        return order;
    }
}
