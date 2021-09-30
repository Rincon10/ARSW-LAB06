package edu.eci.arsw.blueprints.test.services;

import java.util.logging.Level;
import java.util.logging.Logger;

import edu.eci.arsw.blueprintsapi.BlueprintsAPIApplication;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringBootConfiguration;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest( classes = {BlueprintsAPIApplication.class})
public class ApplicationServicesTests {
    
    @Test
    public void contextLoads() { 
    }

}
