package com.pmn.qcmplus.exception;

public class QuizNotFoundException extends RuntimeException {
    public QuizNotFoundException(Integer id) {
        super("Quiz with id " + id + " not found.");
    }
}
