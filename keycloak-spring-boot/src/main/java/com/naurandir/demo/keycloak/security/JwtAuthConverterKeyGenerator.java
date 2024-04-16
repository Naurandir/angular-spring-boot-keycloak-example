package com.naurandir.demo.keycloak.security;

import java.lang.reflect.Method;

import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.cache.interceptor.KeyGenerator;
import org.springframework.security.oauth2.jwt.Jwt;

public class JwtAuthConverterKeyGenerator implements KeyGenerator {

    @Override
    public Object generate(Object target, Method method, Object... params) {
        var token = (Jwt) params[0];
        return DigestUtils.sha256Hex(token.getTokenValue());
    }
}
