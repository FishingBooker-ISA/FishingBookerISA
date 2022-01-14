package app.controller;

import app.service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping(value = "/api/client", produces = MediaType.APPLICATION_JSON_VALUE)
public class ClientController {

    @Autowired
    private ClientService clientService;

    @PutMapping("/verify/{code}")
    public boolean verify(@PathVariable String code) {
        System.out.println(code);
        return this.clientService.VerifyClient(code);
    }
}
