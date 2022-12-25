package com.ai.backEnd.security.jwt;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.Map;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtHelper {

	private final Key key;

	public JwtHelper(@Value("${jwt.secret}") String secrte) {
		this.key = Keys.hmacShaKeyFor(secrte.getBytes(StandardCharsets.UTF_8));
	}
	
	public String createToken(String sub, Map<String, Object> claims) {
		return Jwts.builder()
					.setSubject(sub)
					.addClaims(claims)
					.setExpiration(Date.from(Instant.now().plus(12, ChronoUnit.HOURS)))
					.signWith(key)
					.compact();
	}
	
	public Map<String, Object> parseClaims(String token) {
		return Jwts.parserBuilder()
			       .setSigningKey(key)
			       .build()
			       .parseClaimsJws(token)
			       .getBody();
	}
}
