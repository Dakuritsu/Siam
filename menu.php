<?php
session_start();
if (isset($_SESSION['pseudo']))
{
  echo '
  <!DOCTYPE html>
  <html>
  <head>
  	<title>SIAM</title>
  	<link rel="stylesheet" type="text/css" href="menu.css">
    <link rel="icon" type="image/gif" href="./images/logo_sia.gif" />
  </head>
  <body>
    <div class="container">
    <br>
      <div>
        <h1><span>MENU</span></h1>
      </div>
      <br>
      <div>
        <button id="creer_partie" type="button" onclick=\'window.location.href="creation_plateau.php"\'> 🎮 Créer une partie</button>
      </div>
      <br>
      <div>
        <button id="parties_rejoindre" type="button" onclick=\'window.location.href="liste-parties.php"\'>🔍 Rejoindre une partie</button>
      </div>
      <br>
      <div>
        <button id="changer_mdp" type="button" onclick=\'window.location.href="changer_mdp.php"\'>🔒 Modifier mot de passe</button>
      </div>
      <br>';


  // Vérifier si l'utilisateur est un admin
  if ($_SESSION['pseudo'] == 'admin'){
    echo '
      <div>
      <button id="ajouter_membre" type="button" onclick=\'window.location.href="inscription.php"\'>➕ Ajouter un membre</button>
      </div>
      <br>

      <div>
        <button id="liste_joueurs" type="button" onclick=\'window.location.href="listes.php"\'>👤 Liste des joueurs</button>
      </div>
      <br>';
  }

  echo '
      <div>
        <button id="regles" type="button" onclick=\'window.open("siam.pdf")\'>📜 Règles du jeu</button>
      </div>
      <div>
        <button id="deconnexion" type="button" onclick=\'window.location.href="deconnexion.php"\'>🔓 Se déconnecter</button>
      </div>
      <br>
    </div>
  </body>
  </html>
';
}
?>
