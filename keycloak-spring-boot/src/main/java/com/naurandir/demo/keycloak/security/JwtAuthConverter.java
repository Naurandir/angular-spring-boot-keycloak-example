package com.naurandir.demo.keycloak.security;

import java.util.Collection;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.springframework.core.convert.converter.Converter;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtClaimNames;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;
import org.springframework.stereotype.Component;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class JwtAuthConverter implements Converter<Jwt, AbstractAuthenticationToken> {

    private static final String RESOURCE_ACCESS = "resource_access";
    private static final String ROLES = "roles";
    private static final String ROLE_PREFIX = "ROLE_";

    private final JwtGrantedAuthoritiesConverter jwtGrantedAuthoritiesConverter = new JwtGrantedAuthoritiesConverter();
    private final JwtAuthConverterProperties properties;

    public JwtAuthConverter(JwtAuthConverterProperties properties) {
        this.properties = properties;
    }

    @Override
    public AbstractAuthenticationToken convert(Jwt jwt) {
        if (log.isDebugEnabled()) {
            log.debug("convert: generate authentication token for jwt: {}", jwt.getTokenValue());
        }
        Collection<GrantedAuthority> authorities = Stream
                .concat(jwtGrantedAuthoritiesConverter.convert(jwt).stream(),
                        extractRoles(jwt).stream())
                .collect(Collectors.toSet());

        return new JwtAuthenticationToken(jwt, authorities, getPrincipalClaimName(jwt));
    }

    private String getPrincipalClaimName(Jwt jwt) {
        String claimName;
        if (properties.getPrincipalAttribute() != null) {
            claimName = properties.getPrincipalAttribute();
        } else {
            claimName = JwtClaimNames.SUB;
        }

        return jwt.getClaim(claimName);
    }

    /**
     * Get the Roles out from the resource access of the application.<br>
     * Example:<br>
     * "resource_access": { "demo-app": { "roles": [ "demo-admin" ] } }
     */
    @SuppressWarnings("unchecked")
    private Collection<? extends GrantedAuthority> extractRoles(Jwt jwt) {
        Map<String, Object> resourceAccess;
        Map<String, Object> appResource;
        Collection<String> appRoles;

        if (jwt.getClaim(RESOURCE_ACCESS) == null) {
            return Set.of();
        }
        resourceAccess = jwt.getClaim(RESOURCE_ACCESS);

        if (resourceAccess.get(properties.getResourceId()) == null) {
            return Set.of();
        }
        appResource = (Map<String, Object>) resourceAccess.get(properties.getResourceId());

        if (appResource.get(ROLES) == null) {
            return Set.of();
        }
        appRoles = (Collection<String>) appResource.get(ROLES);

        log.debug("extractRoles: found roles {}", appRoles);

        return appRoles.stream().map(role -> new SimpleGrantedAuthority(ROLE_PREFIX + role))
                .collect(Collectors.toSet());
    }

}
