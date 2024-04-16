package com.naurandir.demo.keycloak.common.api;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RestController;

import com.naurandir.demo.keycloak.security.JwtUserRole;

@RestController
@PreAuthorize("hasAnyRole('" + JwtUserRole.ADMIN + "', '" + JwtUserRole.USER + "')")

@Target({ ElementType.METHOD, ElementType.TYPE })
@Retention(RetentionPolicy.RUNTIME)
public @interface UserRestController {
    
}
