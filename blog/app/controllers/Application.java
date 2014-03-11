package controllers;

import play.*;
import play.mvc.*;

import java.util.*;

import org.bson.types.ObjectId;

import models.*;

public class Application extends Controller {

	//Page d'accueil: on affiche une liste des articles pour le moment
    public static void index() {
    	List<Blog> blogs = Blog.find().order("-date").asList();
    	
    	System.out.println(blogs);
        render(blogs);
    }
    
    //affiche un article si le id est bon, sinon un erreur
    public static void blog(String idBlog) {
    	
    	
    	Blog article = Blog.q().filter("identifiant", idBlog).first();
    	if(article == null) {
    		erreur("Article inexistant");
    	}
        render(article);
    }
    
    //Message d'erreur
    public static void erreur(String message) {
    	render(message);
    }
    
    
    //Formulaire pour ajouter article
    public static void publier() {
    	render();
    }
    
    
    //Post qui reçoit les données
    public static void ajouter() {
    	
    	//On vérifie si l'id existe
    	if(Blog.q().filter("identifiant", params.get("_id")).first() != null) {
    		renderJSON("{\"erreur\":true, \"message\":\"Erreur, identifiant déjà existant\"}");
    	}
    	
    	Blog blog = new Blog();
    	
    	blog.identifiant = params.get("_id");
    	blog.titre = params.get("titre");
    	blog.auteur = params.get("auteur");
    	blog.texte = params.get("texte");
    	
    	//La Date
    	blog.date = new Date();
    	
    	blog.save();
    	renderJSON("{\"message\": \"Article enregistré\"}");
    	
    }
    
    //Affiche la page pour la modif d'un article, selon son id
    public static void modifBlog(String idBlog) {
    	
    	
    	Blog article = Blog.q().filter("identifiant", idBlog).first();
    	if(article == null) {
    		erreur("Article inexistant");
    	}
        render(article);
    }
    
    public static void modifier() {
    	Blog blog = Blog.q().filter("identifiant", params.get("_id")).first();
    	
    	blog.titre = params.get("titre");
    	blog.auteur = params.get("auteur");
    	blog.texte = params.get("texte");
    	
    	blog.save();
    	
    	renderJSON("{\"message\": \"Modifications enregistrées\"}");
    }
    
    public static void effacer() {
    	System.out.println(params.all());
    	Blog blog = Blog.q().filter("identifiant", params.get("id")).first();
    	blog.delete();
    	
    	renderJSON("{\"message\": \"Article supprimé\"}");
    }

}