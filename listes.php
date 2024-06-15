<?php
session_start();
if (isset($_SESSION['pseudo'])) {
  if ($_SESSION['pseudo'] === 'admin') {
    try {
      $db = new PDO("sqlite:base.sqlite3");
    } catch(Exception $e) {
      die('Erreur : '.$e->getMessage());
    }
  }
}

if (isset($_POST['delete_user'])) {
  $pseudoToDelete = $_POST['delete_user'];

  $stmt = $db->prepare("DELETE FROM utilisateurs WHERE pseudo = :pseudo");
  $stmt->bindParam(':pseudo', $pseudoToDelete);
  $stmt->execute();
}

?>

<!DOCTYPE html>
<html>
<head>
  <title>SIAM</title>
  <link rel="stylesheet" type="text/css" href="style.css">
  <link rel="icon" type="image/gif" href="./images/logo_sia.gif" />
</head>
<body style="background-color: #f2f2f2; font-family: Arial, sans-serif;">
<div>
  <div class="col text-center">
    <table class="tftable" border="1" style="text-align:center; background-color: #ffffff; border-collapse: collapse; margin: 0 auto; width: 50%;">
    <tr><th width=25% style="background-color: #333333; color: #ffffff; padding: 10px;">Pseudo</th><th width=25% style="background-color: #333333; color: #ffffff; padding: 10px;">Action</th></tr>
    
    <?php
      $req = $db->prepare("SELECT * FROM utilisateurs");
      $req->execute();
      $result = $req->fetchAll();
      foreach ($result as $col => $value) { ?>
        <tr>
          <td style="padding: 10px;"><?php echo $value['pseudo'] ?></td>
          <td style="padding: 10px;">
            <?php 
              if ($value['pseudo'] != 'admin') {
                echo '<form method="post"><input type="hidden" name="delete_user" value="' . $value['pseudo'] . '"><button type="submit">Supprimer</button></form>';
              }
            ?>
          </td>
        </tr>
      <?php } ?>
    </table>
  </div>
  <br> 
  <div style="text-align: center; margin-top: 20px;">
    <button type="button" onclick="window.location.href='menu.php'" style="background-color: #007bff; color: #ffffff; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer;">Menu</button>
  </div>
</div>

</body>
</html>
