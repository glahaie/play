// Generated by CoffeeScript 1.6.1
var afficherSucces, ajouterMessageErreur, changerModal, envoyerFormulaire, supprimer, verifierErreur, verifierErreurID, verifierScript;

verifierErreur = function(verifID) {
  var donnees, erreur;
  erreur = false;
  donnees = $('#_id, #titre, #auteur, #texte');
  donnees.each(function() {
    var temp;
    if (($(this)).val() === "") {
      ajouterMessageErreur($(this), "Ce champ ne peut être vide.");
      return erreur = true;
    } else if (verifierScript(($(this)).val())) {
      ajouterMessageErreur($(this), "Détection d'une balise script.");
      return erreur = true;
    } else if ((($(this)).attr('id') === "_id") && verifID && verifierErreurID($(this))) {
      ajouterMessageErreur($(this), "Identifiant invalide.");
      return erreur = true;
    } else {
      ($(this)).removeClass('error');
      ($(this)).next().remove();
      return temp = ($(this)).attr('id');
    }
  });
  return erreur;
};

verifierScript = function(texte) {
  return /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/.test(texte);
};

verifierErreurID = function(id) {
  return /(?=.*(\s|[!@\/\\$%?&*():;.,'"{}]|[\u0080-\uFFFF]))/.test(id.val().toLowerCase().trim());
};

ajouterMessageErreur = function(div, messageErr) {
  var message;
  div.next().remove();
  div.addClass('error');
  message = $('<div>', {
    "class": "error-msg",
    text: messageErr
  });
  return div.parent().append(message);
};

envoyerFormulaire = function(type, url, modif) {
  var donnees, resultat;
  resultat = {};
  donnees = $('#_id, #titre, #auteur, #texte');
  donnees.each(function() {
    var cle;
    cle = ($(this)).attr('id');
    return resultat[cle] = ($(this)).val();
  });
  if (modif) {
    resultat["date"] = ($('#date')).val();
  } else {
    resultat["date"] = new Date;
  }
  return $.ajax({
    type: type,
    url: url,
    data: resultat,
    dataType: 'json',
    success: function(data) {
      return afficherSucces(data, modif, resultat['titre']);
    },
    error: function(request, status, error) {
      var alert;
      alert = $('<div>', {
        "class": 'alert alert-danger alert-dismissable',
        text: error
      });
      alert.append($('<button>', {
        "class": 'close',
        'data-dismiss': 'alert',
        text: 'x'
      }));
      return ($("#alert-placeholder")).empty().append(alert);
    }
  });
};

afficherSucces = function(data, modif, titre) {
  var alert;
  alert = $('<div>', {
    "class": 'alert alert-dismissable',
    text: data.message
  });
  if (data.erreur) {
    alert.addClass("alert-danger");
  } else {
    alert.addClass("alert-success");
  }
  alert.append($('<button>', {
    "class": 'close',
    'data-dismiss': 'alert',
    text: 'x'
  }));
  ($("#alert-placeholder")).empty().append(alert);
  if (modif) {
    ($('#jumbo')).html(titre);
    return document.title = "Modification de \"" + titre + "\"";
  }
};

supprimer = function() {
  var message;
  message = {};
  message.id = ($('#_id')).val();
  return $.ajax({
    type: "DELETE",
    url: "/admin/effacer",
    data: message,
    dataType: 'json',
    success: function(data) {
      return changerModal(data);
    },
    error: function(request, status, error) {
      return ($('.modal-body p')).html("Erreur lors de la suppression");
    }
  });
};

changerModal = function(data) {
  ($('.modal-body p')).html(data.message);
  ($('#annuler')).remove();
  ($('.close')).remove();
  ($('#supprimer')).unbind('click');
  ($('#supprimer')).html("Retourner à la page d'accueil");
  return ($('#supprimer')).click(function() {
    return window.location = '/';
  });
};
