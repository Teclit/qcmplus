package com.pmn.qcmplus.service.impl;

import com.pmn.qcmplus.exception.QuizNotFoundException;
import com.pmn.qcmplus.model.Quiz;
import com.pmn.qcmplus.repository.QuizRepository;
import com.pmn.qcmplus.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class QuizServiceImpl implements QuizService {

    private final QuizRepository quizRepository;

    @Autowired
    public QuizServiceImpl(QuizRepository quizRepository) {
        this.quizRepository = quizRepository;
    }

    @Override
    public List<Quiz> getAllQuizzes() {
        return quizRepository.findAll();
    }

    @Override
    public Quiz getQuizById(Integer quizId) {
        Optional<Quiz> quiz = quizRepository.findById(quizId);
        return quiz.orElseThrow(() -> new QuizNotFoundException(quizId));
    }
}
