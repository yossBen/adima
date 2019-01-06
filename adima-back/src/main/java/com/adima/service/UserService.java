package com.adima.service;

import java.util.List;

import com.adima.entity.User;

public interface UserService {
    boolean isExist(String email);

    User findByEmail(String email);

    void saveOrUpdate(User user);

    List<User> findAll();

    User laod(Long userId);

    void create(String firstname, String lastname, String password, String email);

    boolean validateAccount(String jwtToken);
}