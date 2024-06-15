<?php
    if(isset($_POST['pseudo']) && isset($_POST['mdp'])){
        $pseudo = htmlspecialchars($_POST['pseudo']);
        $mdp = $_POST['mdp'];

        try{
            $db = new PDO("sqlite:base.sqlite3");
            $db->query("CREATE TABLE IF NOT EXISTS utilisateurs(pseudo VARCHAR(20),mot_de_passe VARCHAR(20));");
        
            $sql = "SELECT mot_de_passe FROM utilisateurs WHERE pseudo = :pseudo";

            $sth = $db->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
            $sth->execute(array(':pseudo' => $pseudo));
            $res = $sth->fetch(PDO::FETCH_ASSOC);

            if ($res && password_verify($mdp, $res['mot_de_passe']))
            {
              session_start();
              $_SESSION['pseudo'] = $pseudo;
      
              header ('location: menu.php');
            }
            else{
              echo"<script language=javascript>alert('Pseudo ou mot de passe invalide !');</script>";
            }

        }catch(PDOException $e){
            echo 'Erreur : '.$e->getMessage();
        }
    }
?>

<!DOCTYPE html>
<html>
<head>
    <title>SIAM</title>
    <link rel="stylesheet" type="text/css" href="style.css">
    <link rel="icon" type="image/gif" href="./images/logo_sia.gif"/>
</head>
<body>
<div class="container">
    <form action="connexion.php" method="post">
        <input type="text" placeholder="pseudo" name="pseudo" required>
        <input type="password" placeholder="mot de passe" name="mdp" required>
        <input type="submit" name="submit" value="Connexion">
    </form>
</div>
</body>
</html>