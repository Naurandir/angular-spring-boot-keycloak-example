package com.naurandir.demo.keycloak.user;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AnonymController {

    @GetMapping("/anonym")
    public String adminEndpoint() {
        return "{ \"message\": \"Hello Anonym\" }";
    }
}
