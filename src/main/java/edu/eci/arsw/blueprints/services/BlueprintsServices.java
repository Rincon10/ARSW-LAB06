/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.blueprints.services;

import edu.eci.arsw.blueprints.model.Blueprint;
import edu.eci.arsw.blueprints.persistence.BlueprintNotFoundException;
import edu.eci.arsw.blueprints.persistence.BlueprintPersistenceException;
import edu.eci.arsw.blueprints.persistence.BlueprintsPersistence;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Set;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author hcadavid
 */
@Service
public class BlueprintsServices {
   
    @Autowired
    BlueprintsPersistence bpp = null;

    
    /**
     * Metodo encargado de adicionar un nuevo BluePrint
     * @param bp
     * @throws BlueprintPersistenceException 
     */
    public void addNewBlueprint(Blueprint bp) throws BlueprintPersistenceException{
        bpp.saveBlueprint(bp);
    }
    
        /**
     * Metodo encargado de modificar o adicionar un nuevo BluePrint
     * @param bp
     * @param author
     * @param name
     * @throws BlueprintPersistenceException 
     */
    public void modifyOrAddBlueprint(Blueprint bp, String author, String name) throws BlueprintPersistenceException{
        bpp.modifyOrAddBlueprintS(bp, author, name);
    }
    /**
     * Metodo encargado de traer todos los BluePrints
     * @return Blueprint
     * @throws BlueprintNotFoundException 
     */
    public Set<Blueprint> getAllBlueprints() throws BlueprintNotFoundException{
        return bpp.getAllBluePrint();
    }
    
    /**
     * 
     * @param author blueprint's author
     * @param name blueprint's name
     * @return the blueprint of the given name created by the given author
     * @throws BlueprintNotFoundException if there is no such blueprint
     */
    public Blueprint getBlueprint(String author,String name) throws BlueprintNotFoundException{
        return bpp.getBlueprint(author , name);
    }
    
    /**
     * 
     * @param author blueprint's author
     * @return all the blueprints of the given author
     * @throws BlueprintNotFoundException if the given author doesn't exist
     */
    public Set<Blueprint> getBlueprintsByAuthor(String author) throws BlueprintNotFoundException {
        return bpp.getBlueprintByAuthor(author);
    }

}
