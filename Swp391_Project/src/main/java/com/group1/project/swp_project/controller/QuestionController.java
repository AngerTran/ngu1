package com.group1.project.swp_project.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.group1.project.swp_project.entity.Question;
import com.group1.project.swp_project.service.QuestionService;

@RestController
@RequestMapping("/api/questions")
public class QuestionController {
    private final QuestionService questionService;

    public QuestionController(QuestionService questionService) {
        this.questionService = questionService;
    }

    @PostMapping("/ask")
    public ResponseEntity<Question> askQuestion(@RequestParam int userId,
            @RequestParam int consultantId,
            @RequestParam String content) {
        var c = this.questionService.createQuestion(userId, consultantId, content);
        return ResponseEntity.status(HttpStatus.CREATED).body(c);
    }

    @PostMapping("/answer")
    public ResponseEntity<Question> answerQuestion(@RequestParam int questionId,
            @RequestParam String answer) {

        var c = this.questionService.answerQuestion(questionId, answer);
        return ResponseEntity.status(HttpStatus.CREATED).body(c);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Question>> getUserQuestions(@PathVariable int userId) {
        var c = this.questionService.getQuestionsByUser(userId);
        return ResponseEntity.ok().body(c);
    }

    @GetMapping("/consultant/{consultantId}")
    public ResponseEntity<List<Question>> getConsultantQuestions(@PathVariable int consultantId) {
        var c = this.questionService.getQuestionsByConsultant(consultantId);
        return ResponseEntity.ok().body(c);
    }
}
