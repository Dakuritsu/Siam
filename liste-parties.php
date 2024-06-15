<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Liste des parties</title>
    <style>
    body {
        margin: 0;
        padding: 0;
        background-image: url('./images/bg.png');
        background-size: 100% 100%;
        background-position: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        min-height: 100vh;
    }

    .parties-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        margin-top: 20px;
    }

    .partie {
        margin: 10px;
        padding: 15px;
        background-color: rgba(255, 255, 255, 0.8);
        border: 2px solid #007bff;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
    }

    h1 {
        color: #333;
        text-align: center;
    }

    h2, p {
        color: #333;
    }

    a {
        text-decoration: none;
        color: #007bff;
        font-weight: bold;
    }

    a:hover {
        color: #0056b3;
    }

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
    <h1>Liste des parties</h1>
    <div class="parties-container">
        <?php
        try {
            $pdo = new PDO('sqlite:base.sqlite3');
        } catch (PDOException $e) {
            die('Erreur de connexion à la base de données : ' . $e->getMessage());
        }

        
        $stmt = $pdo->query('SELECT * FROM partie');
        $parties = $stmt->fetchAll(PDO::FETCH_ASSOC);
        ?>


        <?php
        if (isset($_POST['delete_partie'])){
            $idToDelete = $_POST['delete_partie'];

            $stmt = $pdo->prepare("DELETE FROM partie WHERE id = :id");
            $stmt->bindParam(':id', $idToDelete);
            $stmt->execute();
        }
        ?>


        <?php foreach ($parties as $partie): ?>
            <?php
            
            $id = $partie['id'];
            $estFini = $partie['est_fini'] ? 'Oui' : 'Non';
            $joueur = $partie['tour'] == 0 ? 'Éléphants' : 'Rhinocéros';
            ?>
            <div class="partie">
                <h2>Partie #<?= $id ?></h2>
                <p>Est fini: <?= $estFini ?></p>
                <p>Prochain joueur: <?= $joueur ?></p>
                <a href="rejoindre_partie.php?id=<?= $id ?>">Rejoindre la partie</a>
                
                <form method="post" style="margin-top: 10px;">
                    <input type="hidden" name="delete_partie" value="<?= $id ?>">
                    <button type="submit" onclick="return confirm('Êtes-vous sûr de vouloir supprimer cette partie ?')">Supprimer la partie</button>
                </form>
            </div>
        <?php endforeach; ?>
    </div>
    <a href="menu.php">
                <button class="menu-btn">Menu</button>
  </a>
</body>
</html>
