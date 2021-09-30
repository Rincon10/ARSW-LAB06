/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.blueprints.persistence.impl;

import edu.eci.arsw.blueprints.model.Blueprint;
import edu.eci.arsw.blueprints.model.Point;
import edu.eci.arsw.blueprints.persistence.BlueprintNotFoundException;
import edu.eci.arsw.blueprints.persistence.BlueprintPersistenceException;
import edu.eci.arsw.blueprints.persistence.BlueprintsPersistence;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import org.springframework.stereotype.Service;

/**
 *
 * @author hcadavid
 */

@Service
public class InMemoryBlueprintPersistence implements BlueprintsPersistence{

    private final ConcurrentHashMap<Tuple<String,String>,Blueprint> blueprints=new ConcurrentHashMap<>();

    public InMemoryBlueprintPersistence() {
        
        //load stub data
        Point[] pts = new Point[]{new Point(140, 140),new Point(115, 115)};
        Blueprint bp = new Blueprint("_authorname_", "_bpname_ ",pts);
        blueprints.put(new Tuple<>(bp.getAuthor(),bp.getName()), bp);
        
        Point[] ptsJp=new Point[]{new Point(88, 45),new Point(39, 64),new Point(1254,546),new Point(7,8),new Point(4,2),new Point(11,22)};
        Blueprint bpJp=new Blueprint("author1", "Blueprint_a",ptsJp);
        blueprints.put(new Tuple<>(bpJp.getAuthor(),bpJp.getName()), bpJp);
        
        Point[] ptsSt=new Point[]{new Point(0, 1),new Point(1, 0)};
        Blueprint bpSt=new Blueprint("author2", "Blueprint_b",ptsSt);
        blueprints.put(new Tuple<>(bpSt.getAuthor(),bpSt.getName()), bpSt);
        
        Point[] ptsSt2=new Point[]{new Point(50, 1),new Point(1, 05)};
        Blueprint bpSt2=new Blueprint("author1", "School_blueprint",ptsSt2);
        blueprints.put(new Tuple<>(bpSt2.getAuthor(),bpSt2.getName()), bpSt2);
        
    }    
    
    @Override
    public void saveBlueprint(Blueprint bp) throws BlueprintPersistenceException {
        Blueprint blueprint= blueprints.putIfAbsent(new Tuple<>(bp.getAuthor(),bp.getName()), bp);
        if (blueprint!=null){
            throw new BlueprintPersistenceException("The given blueprint already exists: "+bp);
        }   
    }

    @Override
    public Blueprint getBlueprint(String author, String bprintname) throws BlueprintNotFoundException {
        Blueprint bp = blueprints.get(new Tuple<>(author, bprintname));
        if(bp!=null){
           return bp; 
        }
        else{
            throw new BlueprintNotFoundException("The next blueprint does not exist: "+bprintname+" with author: "+author);
        }
    }

    @Override
    public Set<Blueprint> getBlueprintByAuthor(String author) throws BlueprintNotFoundException {
        Set<Blueprint> bluePrintReturn = new HashSet<Blueprint>();
        for (Map.Entry<Tuple<String,String>,Blueprint> entry : blueprints.entrySet()) {
            if(entry.getKey().getElem1().equals(author)){
                bluePrintReturn.add(entry.getValue());
            }
        }
        if(bluePrintReturn.isEmpty()){
            throw new BlueprintNotFoundException("Not found blueprints of the author: "+author);
        }
        else{
            return bluePrintReturn;
        }
        
    }

    @Override
    public Set<Blueprint> getAllBluePrint() throws BlueprintNotFoundException {
        Set<Blueprint> bluePrintReturn = new HashSet<Blueprint>();
        for (Map.Entry<Tuple<String,String>,Blueprint> entry : blueprints.entrySet()) {
            bluePrintReturn.add(entry.getValue());
        }
        
        if(bluePrintReturn.isEmpty()){
            throw new BlueprintNotFoundException("Not found any blueprint");
        }
        else{
            return bluePrintReturn;
        }
    }

    @Override
    public void modifyOrAddBlueprintS(Blueprint newBp, String author, String name) throws BlueprintPersistenceException {
        Blueprint blueprint= blueprints.putIfAbsent(new Tuple<>(newBp.getAuthor(),newBp.getName()), newBp);
        if (blueprint!=null){
            blueprints.replace(new Tuple<>(newBp.getAuthor(),newBp.getName()), blueprint, newBp);
        }           
    }
 
}
