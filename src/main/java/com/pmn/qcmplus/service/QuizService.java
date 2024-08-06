package com.pmn.qcmplus.service;

import com.pmn.qcmplus.model.Quiz;

import java.util.List;

public interface QuizService {
    List<Quiz> getAllQuizzes();
    Quiz getQuizById(Integer quizId);
}
