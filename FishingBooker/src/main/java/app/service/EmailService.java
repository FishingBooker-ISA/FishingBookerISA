package app.service;

import app.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    private JavaMailSender javaMailSender;
    private Environment env;

    @Autowired
    public EmailService(JavaMailSender mailSenderail, Environment environment) {
        this.javaMailSender = mailSenderail;
        this.env = environment;
    }

    @Async
    public void sendMail(User user, String subject, String text) throws MailException, InterruptedException {
        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setTo(user.getEmail());
        mail.setFrom(env.getProperty("spring.mail.username"));
        mail.setSubject(subject);
        mail.setText(text);
        javaMailSender.send(mail);
    }

}
