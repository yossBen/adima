package com.adima.ws;

import com.adima.entity.User;
import com.adima.service.JwtService;
import com.adima.service.UserService;
import com.adima.utils.CustomStatus;
import com.adima.ws.exception.RestException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.logging.Logger;

@RestController
@RequestMapping("/api/authenticate")
public class AuthenticateRest {
    private final static Logger LOGGER = Logger.getLogger(AuthenticateRest.class.getName());
    @Autowired
    private UserService userService;
    @Autowired
    private JwtService jwtService;

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public ResponseEntity<User> login(@RequestParam String email, @RequestParam String password) throws RestException {
        User user = userService.findByEmail(email);
        if (user != null) {
            user.setToken(jwtService.generateJWT(user.getEmail(), user.getId(), 0));
            return new ResponseEntity<User>(user, HttpStatus.OK);
        }

        throw new RestException("Email ou mot de passe sont incorrectes ", HttpStatus.BAD_REQUEST, CustomStatus.ERROR_LOGIN);
    }

    @RequestMapping(value = "/validate", method = RequestMethod.POST)
    public String validateAccount(@RequestParam String token) throws RestException {
        boolean validate = userService.validateAccount(token);
        if (validate) {
            return "{\"validate\":true}";
        }
        else {
            return "{\"validate\":false}";
        }
    }
}