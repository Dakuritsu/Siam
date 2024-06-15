<?php
    session_start();
    if (isset($_SESSION['pseudo'])){
        $pseudo = $_SESSION['pseudo'];

        if(!empty($_POST)){
            $ancien_mdp = $_POST['ancien_mdp'];
            $new_mdp = $_POST['new_mdp'];
            $confirm_mdp = $_POST['confirm_mdp'];

            try{
                $db = new PDO("sqlite:base.sqlite3");
                $db->query("CREATE TABLE IF NOT EXISTS utilisateurs(pseudo VARCHAR(20),mot_de_passe VARCHAR(20));");

                $sql = "SELECT mot_de_passe FROM utilisateurs WHERE pseudo = :pseudo";
                $sth = $db->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
                $sth->execute(array(':pseudo' => $pseudo));
                $result = $sth->fetch(PDO::FETCH_NUM);

                if(password_verify($ancien_mdp,$result[0])){
                    if($ancien_mdp === $new_mdp){
                        echo"<script language=javascript>alert('Votre mot de passe doit être différent de votre ancien mot de passe !');</script>";
                    }
                    else if($new_mdp != $confirm_mdp){
                        echo"<script language=javascript>alert('Les deux mots de passe ne sont pas identiques !');</script>";
                    }
                    else{
                        $sql = "UPDATE utilisateurs SET mot_de_passe=?";
                        $sth = $db->prepare($sql);

                        $new_mdp = password_hash($new_mdp,PASSWORD_DEFAULT);
                        $sth->execute([$new_mdp]);

                        header('location: menu.php');
                    }
                }
                else{
                    echo"<script language=javascript>alert('Mot de passe incorrect !');</script>";
                }

            }catch (PDOException $e){
                echo 'Erreur : '.$e->getMessage();
            }
        }
    }
?>

<!DOCTYPE html>
<html>
<head>
	<title>SIAM</title>
	<link rel="stylesheet" type="text/css" href="style.css">
    <link rel="icon" type="image/gif" href="./images/logo_sia.gif" />
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
		<h4>Mot de passe</h4>
		<div>
			<form action="changer_mdp.php" method="post">
				<input type="password"  placeholder="Votre ancien mot de passe" name="ancien_mdp" required>
                <input type="password"  placeholder="Votre nouveau mot de passe" name="new_mdp" required>
                <input type="password"  placeholder="Confirmation du nouveau mot de passe" name="confirm_mdp" required>
				<input type="submit" name="submit" value="Confimer">
			</form>
		</div>
	</div>
    <a href="menu.php">
                <button class="menu-btn">Menu</button>
  </a>
</body>
</html>
