package org.acme;

import org.eclipse.microprofile.graphql.GraphQLApi;
import org.eclipse.microprofile.graphql.Mutation;
import org.eclipse.microprofile.graphql.Name;

@GraphQLApi
public class UserMutation {

    @Mutation("updateUserEmail")
    public User updateUserEmail(@Name("id") int id, @Name("email") String email) {
        return updateUserEmailInService(id, email);
    }

    private User updateUserEmailInService(int id, String email) {
        //simular un mutation result
        return new User(id, email);
    }
}
