package com.example;

import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.servlet.ServletContextHandler;
import org.eclipse.jetty.servlet.ServletHolder;
import org.glassfish.jersey.servlet.ServletContainer;

public class ProductServiceApplication {
    public static void main(String[] args) throws Exception {
        Server server = new Server(8080);
        
        ServletContextHandler context = new ServletContextHandler(ServletContextHandler.SESSIONS);
        context.setContextPath("/");
        server.setHandler(context);
        
        ServletHolder jerseyServlet = context.addServlet(ServletContainer.class, "/*");
        jerseyServlet.setInitOrder(0);
        jerseyServlet.setInitParameter("jakarta.ws.rs.Application", "com.example.JerseyConfig");
        
        try {
            server.start();
            System.out.println("Product Service running on http://localhost:8080");
            System.out.println("Try: curl http://localhost:8080/products");
            server.join();
        } finally {
            server.destroy();
        }
    }
}
