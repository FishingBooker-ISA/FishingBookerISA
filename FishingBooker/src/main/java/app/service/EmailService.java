package app.service;

import app.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

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
        //mail.setTo(user.getEmail());
        mail.setTo("grahovac.ana99@gmail.com");
        mail.setFrom(env.getProperty("spring.mail.username"));
        mail.setSubject(subject);
        mail.setText(text);
        javaMailSender.send(mail);
    }
    /*@Async
    public void sendMail1() throws MailException, InterruptedException {
        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setTo("grahovac.ana99@gmail.com");
        //mail.setFrom(env.getProperty("spring.mail.username"));
        mail.setFrom("grahovac.ana99@gmail.com");
        mail.setSubject("Mejl1");
        mail.setText("Zdravo, klikni tu -> http://localhost:4200");
        javaMailSender.send(mail);
    }

    @Async
    public void sendMailWithResouces(User user, String subject, String body) throws MailException, MessagingException {
        MimeMessage message = javaMailSender.createMimeMessage();

        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        helper.setTo("grahovac.ana99@gmail.com");
        helper.setSubject(subject);
        helper.setFrom(env.getProperty("spring.mail.username"));
        helper.setText("<html><body><a href='https://www.youtube.com/watch?v=A_1H1Y96KUo&list=RDA_1H1Y96KUo&start_radio=1'></body></html>", true);
        javaMailSender.send(message);
    }
    @Async
    public void sendMailWithResouces1() throws MailException, MessagingException {
        MimeMessage message = javaMailSender.createMimeMessage();

        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        helper.setTo("grahovac.ana99@gmail.com");
        helper.setSubject("Mejl");
        helper.setFrom(env.getProperty("spring.mail.username"));
        helper.setText("<html><body><a href='https://www.youtube.com/watch?v=A_1H1Y96KUo&list=RDA_1H1Y96KUo&start_radio=1'></body></html>", true);
        javaMailSender.send(message);
    }*/

}
