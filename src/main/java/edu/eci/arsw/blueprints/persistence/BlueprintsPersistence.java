/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.blueprints.persistence;

import edu.eci.arsw.blueprints.model.Blueprint;
import java.util.Set;

/**
 *
 * @author hcadavid
 */
public interface BlueprintsPersistence {
    
    /**
     * 
     * @param bp the new blueprint
     * @throws BlueprintPersistenceException if a blueprint with the same name already exists,
     *    or any other low-level persistence error occurs.
     */
    public void saveBlueprint(Blueprint bp) throws BlueprintPersistenceException;
    
    /**
     * 
     * @param bp the new blueprint
     * @param author el autor del mapa
     * @param name el nombre del mapa
     * @throws 
     */
    public void modifyOrAddBlueprintS(Blueprint bp, String author, String name) throws BlueprintPersistenceException;
    
    /**
     * 
     * @param author blueprint's author
     * @param bprintname blueprint's author
     * @return the blueprint of the given name and author
     * @throws BlueprintNotFoundException if there is no such blueprint
     */
    public Blueprint getBlueprint(String author,String bprintname) throws BlueprintNotFoundException;
    
     /**
     * Metodo encargado de traer los BluePrint por autor
     * @param author blueprint's author
     * @return the blueprint of the given name and author
     * @throws BlueprintNotFoundException if there is no such blueprint
     */
    public Set<Blueprint> getBlueprintByAuthor(String author) throws BlueprintNotFoundException;
    
         /**
     * Metodo encargado de traer tooos los BluePrint
     * @return todos los BluePrint
     * @throws BlueprintNotFoundException if there is no such blueprint
     */
    public Set<Blueprint> getAllBluePrint() throws BlueprintNotFoundException;
    
}
