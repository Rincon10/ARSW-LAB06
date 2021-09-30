
package edu.eci.arsw.blueprints.model;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Objects;


public class Blueprint {

    private String author=null;
    
    private List<Point> points=null;
    
    private String name=null;
            
    public Blueprint(String author,String name,Point[] pnts){
        this.author=author;
        this.name=name;
        this.points=Arrays.asList(pnts);
    }
         
    public Blueprint(String author, String name){
        this.name=name;
        this.points=new ArrayList<>();
    }

    public Blueprint() {
    }    
    
    public String  getName() {
        return this.name;
    }

    public String getAuthor() {
        return this.author;
    }
    
    public List<Point> getPoints() {
        return this.points;
    }
    
    public void setPoints(List<Point>points) {
        this.points = points;
    }
    
    public void setName(String name){
        this.name=name;
    }
    
    public void setAuthor(String author){
        this.author=author;
    }
    
    public void addPoint(Point p){
        this.points.add(p);
    }

    @Override
    public String toString() {
        return "Blueprint{" + "author=" + this.author + ", name=" + this.name + '}';
    }

    @Override
    public int hashCode() {
        int hash = 7;
        return hash;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final Blueprint other = (Blueprint) obj;
        if (!Objects.equals(this.author, other.author)) {
            return false;
        }
        if (!Objects.equals(this.name, other.name)) {
            return false;
        }
        if (this.points.size()!=other.points.size()){
            return false;
        }
        for (int i=0;i<this.points.size();i++){
            if (this.points.get(i)!=other.points.get(i)){
                return false;
            }
        }
        
        return true;
    }
    
    
    
}
