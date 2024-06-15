<?php
    // On démarre la session
    session_start();

    // On détruit les variables de notre session
    session_unset();

    // On redirige le visiteur vers la page d'accueil
    header ('location: connexion.php');
?>
