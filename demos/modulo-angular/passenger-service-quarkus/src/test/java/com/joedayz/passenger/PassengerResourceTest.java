package com.joedayz.passenger;

import io.quarkus.test.TestTransaction;
import io.quarkus.test.junit.QuarkusTest;
import org.junit.jupiter.api.Test;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static io.restassured.RestAssured.given;
import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.Matchers.containsInAnyOrder;

@QuarkusTest
class PassengerResourceTest {
    @Test
    void testHelloEndpoint() {
        given()
                .when().get("/passengers")
                .then()
                .statusCode(200)
                .body("size()", is(5))
                .body("fullname", containsInAnyOrder(
                        "Jens Alejos",
                        "Rose Namajunas",
                        "James",
                        "Louise",
                        "Tina"
                ))
                .body("find { it.fullname == 'Rose Namajunas' }.children.name",
                        containsInAnyOrder("Ted", "Chloe"))
                .body("find { it.fullname == 'Louise' }.children[0].name", is("Jessica"));
    }


    @Test
    @TestTransaction
    void updatePassengerReplacesFieldsAndChildren() {

        String payload = """
                {
                  "checkedIn": true,
                  "children": [
                    {
                      "age": 3,
                      "name": "Kid One"
                    }
                  ],
                  "fullname": "Rose Updated",
                  "checkInDate": 1712000000
                }
                """;
        given()
                .contentType("application/json")
                .body(payload)
                .when().put("/passengers/2")
                .then()
                .statusCode(200)
                .body("fullname", is("Rose Updated"))
                .body("checkedIn", is(true))
                .body("checkInDate", is(1712000000))
                .body("children.size()", is(1))
                .body("children[0].name", is("Kid One"));
    }


}