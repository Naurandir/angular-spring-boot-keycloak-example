package com.naurandir.demo.keycloak.user;

import org.springframework.web.bind.annotation.GetMapping;

import com.naurandir.demo.keycloak.common.api.AdminRestController;
import com.naurandir.demo.keycloak.common.api.UserRestController;

@UserRestController
public class UserController {

    @AdminRestController
    @GetMapping("/admin")
    public EndpointResponse adminEndpoint() {
        return new EndpointResponse("Hello Admin");
    }

    @GetMapping("/user")
    public EndpointResponse userEndpoint() {
        return new EndpointResponse("Hello User");
    }
}
