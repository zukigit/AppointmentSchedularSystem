package com.ai.backEnd.security.auth;

import java.util.Optional;

public interface ApplicationUserDao {

	Optional<ApplicationUser> setApplicationUserByUserName(String userName);
}
