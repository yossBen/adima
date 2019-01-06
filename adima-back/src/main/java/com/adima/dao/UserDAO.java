package com.adima.dao;

import com.adima.entity.User;

public interface UserDAO extends PersistentDAO<Long, User> {
	User findByEmail(String email);
}