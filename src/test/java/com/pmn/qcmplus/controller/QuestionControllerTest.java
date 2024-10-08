package com.pmn.qcmplus.controller;

import com.pmn.qcmplus.model.Question;
import com.pmn.qcmplus.model.Quiz;
import com.pmn.qcmplus.service.QuestionService;
import com.pmn.qcmplus.service.QuizService;
import java.util.Collections;
import java.util.List;
import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

class QuestionControllerTest {

    @Mock
    private QuestionService questionService;

    @Mock
    private QuizService quizService;

    @InjectMocks
    private QuestionController questionController;

    private Question question;
    private Quiz quiz;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        quiz = new Quiz(1, "Sample Quiz", "This is a sample quiz");
        question = new Question(1, quiz, "Sample question?");
    }

    @Test
    void testGetQuestionsByQuizId() {
        when(questionService.getQuestionsByQuizId(eq(1))).thenReturn(Collections.singletonList(question));

        ResponseEntity<List<Question>> response = questionController.getQuestionsByQuizId(1);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(1, response.getBody().size());
        verify(questionService, times(1)).getQuestionsByQuizId(eq(1));
    }

    @Test
    void testGetQuestionById() {
        when(questionService.getQuestionById(eq(1))).thenReturn(question);

        ResponseEntity<Question> response = questionController.getQuestionById(1, 1);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Sample question?", response.getBody().getQuestionText());
        verify(questionService, times(1)).getQuestionById(eq(1));
    }

    @Test
    void testCreateQuestion() {
        when(quizService.getQuizById(eq(1))).thenReturn(quiz);
        when(questionService.saveQuestion(any(Question.class))).thenReturn(question);

        ResponseEntity<Question> response = questionController.createQuestion(question, 1);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Sample question?", response.getBody().getQuestionText());
        verify(questionService, times(1)).saveQuestion(any(Question.class));
    }

    @Test
    void testUpdateQuestion() {
        Quiz mockQuiz = new Quiz();
        mockQuiz.setQuizId(1);
        Question mockQuestion = new Question();
        mockQuestion.setQuiz(mockQuiz);
        mockQuestion.setQuestionId(1);

        when(quizService.getQuizById(eq(1))).thenReturn(mockQuiz);
        when(questionService.updateQuestion(any(Question.class))).thenReturn(mockQuestion);

        ResponseEntity<Question> response = questionController.updateQuestion(mockQuestion, 1, 1);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(mockQuestion, response.getBody());
        verify(quizService, times(1)).getQuizById(eq(1));
        verify(questionService, times(1)).updateQuestion(any(Question.class));
    }

    @Test
    void testDeleteQuestion() {
        doNothing().when(questionService).deleteQuestion(eq(1));

        ResponseEntity<Void> response = questionController.deleteQuestion(1, 1);

        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
        verify(questionService, times(1)).deleteQuestion(eq(1));
    }

    @Test
    void testGetAllQuestions() {
        when(questionService.getAllQuestions()).thenReturn(Collections.singletonList(question));

        ResponseEntity<List<Question>> response = questionController.getAllQuestions();

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(1, response.getBody().size());
        verify(questionService, times(1)).getAllQuestions();
    }

    @GetMapping("/search")
    public ResponseEntity<Question> getQuestionsByText(@RequestParam String questionText) {
        Question question = questionService.getQuestionsByText(questionText);
        return ResponseEntity.ok(question);
    }



}
