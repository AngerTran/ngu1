package com.group1.project.swp_project.service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.group1.project.swp_project.entity.Question;
import com.group1.project.swp_project.entity.Users;
import com.group1.project.swp_project.repository.QuestionRepository;
import com.group1.project.swp_project.repository.UserRepository;

@Service
public class QuestionService {
    private final QuestionRepository questionRepository;
    private final UserRepository userRepository;

    public QuestionService(QuestionRepository questionRepository, UserRepository userRepository) {
        this.questionRepository = questionRepository;
        this.userRepository = userRepository;
    }

    public Question createQuestion(int userId, int consultantId, String content) {

        Users user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Users consultant = userRepository.findById(consultantId)
                .orElseThrow(() -> new RuntimeException("Consultant not found"));

        Question q = new Question();
        q.setUser(user);
        q.setConsultant(consultant);
        q.setContent(content);
        return questionRepository.save(q);
    }

    public Question answerQuestion(int questionId, String answer) {
        Question q = questionRepository.findById(questionId)
                .orElseThrow(() -> new RuntimeException("Question not found"));
        q.setAnswer(answer);
        q.setAnsweredAt(Instant.now());
        return questionRepository.save(q);
    }

    public List<Question> getQuestionsByConsultant(int consultantId) {
        return questionRepository.findByConsultantId(consultantId);
    }

    public List<Question> getQuestionsByUser(int userId) {
        return questionRepository.findByUserId(userId);
    }
}
