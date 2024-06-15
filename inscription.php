<?php
    session_start();
    if (isset($_SESSION['pseudo'])){
        if($_SESSION['pseudo'] === 'admin'){
            $pseudo = $_SESSION['pseudo'];
            
            if(!empty($_POST)){
                try{
                    $db = new PDO("sqlite:base.sqlite3");
                    $db->query("CREATE TABLE IF NOT EXISTS utilisateurs(pseudo VARCHAR(20),mot_de_passe VARCHAR(20));");
                
                    $sql = "SELECT pseudo FROM utilisateurs WHERE pseudo = :pseudo";
        
                    $sth = $db->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
                    $sth->execute(array(':pseudo' => $pseudo));
                    $res = $sth->fetch(PDO::FETCH_ASSOC);

                    $new_pseudo = htmlspecialchars($_POST['new_pseudo']);
                    $mdp_inscription = $_POST['mdp_inscription'];
                    $mdp_inscription_check = $_POST['mdp_inscription_check'];

                    if($mdp_inscription != $mdp_inscription_check)
                    {
                        echo"<script language=javascript>alert('Les mots de passe doivent correspondre !');</script>";
                    }
                    else{
                        $sql = "SELECT pseudo FROM utilisateurs WHERE pseudo = :new_pseudo";
                        $sth = $db->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));    
                        $sth->execute(array(':new_pseudo' => $new_pseudo));
                        $res = $sth->fetch(PDO::FETCH_ASSOC);

                        if($res)    // Si le pseudo existe déjà
                        {
                          echo"<script language=javascript>alert('Pseudo déjà existant !');</script>";
                        }
                        else    // Sinon on l'ajoute
                        {
                          $mdp = password_hash($mdp_inscription , PASSWORD_DEFAULT);
                          $query = "INSERT INTO utilisateurs (pseudo, mot_de_passe) VALUES ('$new_pseudo','$mdp')";
                          $result = $db->exec($query);
                          header('location: menu.php');
                        }
                    }
                }catch(PDOException $e){
                    echo 'Erreur : '.$e->getMessage();
                }
            }
        }
        else{
            header('location:menu.php');
        }
    }

?>

<!DOCTYPE html>
<html>
<head>
	<title>SIAM</title>
	<link rel="stylesheet" type="text/css" href="style.css">
    <link rel="icon" type="image/gif" href="./images/logo_sia.gif"/>
    <style>     
    .menu-btn {
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 30px 60px;
        background-color: #007bff;
        color: #fff;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        }

    .menu-btn:hover {
        background-color: #0056b3;
    }
    </style>
</head>
<body>
<div class="container">
    <div>
		<h3>Inscription</h3>
	</div>
    <div>
        <form action="inscription.php" method="post">
            <input type="text" placeholder="pseudo" name="new_pseudo" required>
            <input type="password" placeholder="Choisissez votre mot de passe" name="mdp_inscription" required>
            <input type="password" placeholder="Confirmez votre mot de passe" name="mdp_inscription_check" required>
            <input type="submit" name="submit" value="Inscription">
        </form>
    </div>
</div>
<a href="menu.php">
                <button class="menu-btn">Menu</button>
  </a>
</body>
</html>