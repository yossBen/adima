package com.adima.ws.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.adima.ws.exception.RestException.RestError;

@ControllerAdvice
public class RestControllerAdvice {

//    @ExceptionHandler(Exception.class)
//    public ResponseEntity<Exception> exceptionHandler(Exception ex) {
//        return new ResponseEntity<Exception>(ex, HttpStatus.BAD_REQUEST);
//    }

    @ExceptionHandler(RestException.class)
    public ResponseEntity<RestError> exceptionHandler(RestException ex) {
        return new ResponseEntity<RestError>(ex.geRestError(), ex.getStatus());
    }
}