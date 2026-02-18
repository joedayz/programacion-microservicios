package org.acme;

import org.eclipse.microprofile.graphql.Description;
import org.eclipse.microprofile.graphql.GraphQLApi;
import org.eclipse.microprofile.graphql.Name;
import org.eclipse.microprofile.graphql.Query;

import java.util.List;

@GraphQLApi
public class UserResource {

    @Query("user")
    @Description("Obtiene un usuario por su ID, incluyendo detalles como órdenes y configuraciones.")
    public User getUser(@Name("id") int id) {
        return fetchUserWithDetails(id);
    }

    private User fetchUserWithDetails(int id) {
        //Simulate data de varios servicios
        User user = new User(id, "Alice", "alice@example.com");
        user.setOrders(List.of(new Order("o1", 49.99), new Order("o2", 29.95)));
        user.setSettings(new Settings("dark"));
        return user;
    }
}
