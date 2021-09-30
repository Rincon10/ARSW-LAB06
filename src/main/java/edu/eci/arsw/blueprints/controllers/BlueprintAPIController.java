/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.blueprints.controllers;

import edu.eci.arsw.blueprints.model.Blueprint;
import edu.eci.arsw.blueprints.persistence.BlueprintNotFoundException;
import edu.eci.arsw.blueprints.persistence.BlueprintPersistenceException;
import edu.eci.arsw.blueprints.services.BlueprintsServices;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author hcadavid
 */
@RestController
@RequestMapping(value = "/blueprints")
public class BlueprintAPIController {
    @Autowired
    BlueprintsServices bps= null;
    
    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<?> GetAllBlueprintFilter(){
        try {
            return new ResponseEntity<>(bps.getAllBlueprints(),HttpStatus.ACCEPTED);
        } catch (BlueprintNotFoundException e) {
            Logger.getLogger(BlueprintAPIController.class.getName()).log(Level.SEVERE, null, e);
            return new ResponseEntity<>(e.getMessage(),HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(path ="/{author}",method = RequestMethod.GET)
    public ResponseEntity<?> GetBlueprintsByAuthor(@PathVariable ("author") String authorName){
        try {
            return new ResponseEntity<>(bps.getBlueprintsByAuthor(authorName),HttpStatus.ACCEPTED);
        } catch (BlueprintNotFoundException ex) {
            Logger.getLogger(BlueprintAPIController.class.getName()).log(Level.SEVERE, null, ex);
            return new ResponseEntity<>(ex.getMessage(),HttpStatus.NOT_FOUND);
        }        
    }
    
    @RequestMapping(path ="/{author}/{name}",method = RequestMethod.GET)
    public ResponseEntity<?> GetBlueprintByAuthorAndName(@PathVariable ("author") String authorName, @PathVariable ("name") String blueprintName){
        try {
            return new ResponseEntity<>(bps.getBlueprint(authorName, blueprintName),HttpStatus.ACCEPTED);
        } catch (BlueprintNotFoundException ex) {
            Logger.getLogger(BlueprintAPIController.class.getName()).log(Level.SEVERE, null, ex);
            return new ResponseEntity<>(ex.getMessage(),HttpStatus.NOT_FOUND);
        }        
    }
    
    @RequestMapping(method = RequestMethod.POST)	
    public ResponseEntity<?> AddNewBlueprint(@RequestBody Blueprint newBp){
        
        try {
            bps.addNewBlueprint(newBp);
            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (BlueprintPersistenceException ex) {
            Logger.getLogger(BlueprintAPIController.class.getName()).log(Level.SEVERE, null, ex);
            return new ResponseEntity<>(ex.getMessage(),HttpStatus.FORBIDDEN);            
        }        

    }
    
    @RequestMapping(path = "/{author}/{name}",method = RequestMethod.PUT)	
    public ResponseEntity<?> PutBlueprint(@PathVariable ("author") String author, @PathVariable ("name") String name, @RequestBody Blueprint newBp ){
        
        try {
            bps.modifyOrAddBlueprint(newBp, author, name);
            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (BlueprintPersistenceException ex) {
            Logger.getLogger(BlueprintAPIController.class.getName()).log(Level.SEVERE, null, ex);
            return new ResponseEntity<>(ex.getMessage(),HttpStatus.FORBIDDEN);
        }
    }
}

