package com.example;

import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.servlet.ServletContextHandler;
import org.eclipse.jetty.servlet.ServletHolder;
import org.glassfish.jersey.servlet.ServletContainer;

public class OrderServiceApplication {
    public static void main(String[] args) throws Exception {
        Server server = new Server(8081);
        
        ServletContextHandler context = new ServletContextHandler(ServletContextHandler.SESSIONS);
        context.setContextPath("/");
        server.setHandler(context);
        
        ServletHolder jerseyServlet = context.addServlet(ServletContainer.class, "/*");
        jerseyServlet.setInitOrder(0);
        jerseyServlet.setInitParameter("jakarta.ws.rs.Application", "com.example.JerseyConfig");
        
        try {
            server.start();
            System.out.println("Order Service running on http://localhost:8081");
            System.out.println("Try: curl http://localhost:8081/orders");
            System.out.println("Product Service URL: " + 
                (System.getenv("PRODUCT_SERVICE_URL") != null ? 
                    System.getenv("PRODUCT_SERVICE_URL") : "http://localhost:8080"));
            server.join();
        } finally {
            server.destroy();
        }
    }
}
