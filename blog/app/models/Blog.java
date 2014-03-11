package models;
import java.text.DateFormat;
import java.util.Date;

import org.bson.types.ObjectId;

import play.modules.morphia.Model;

import com.google.code.morphia.annotations.Entity;
import com.google.code.morphia.annotations.Id;


@Entity
public class Blog extends Model {
	
	public String identifiant;
	
	public String titre;
	public String auteur;
	public String texte;
	public Date date;
	
	
	public String formatDate() {
		DateFormat df = DateFormat.getDateInstance();
		return df.format(date);
	}
	
	public String toString() {
		return identifiant + " " + formatDate();
	}
}