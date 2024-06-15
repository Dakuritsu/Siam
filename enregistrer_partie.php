<?php
try {
    $pdo = new PDO('sqlite:base.sqlite3');
} catch (PDOException $e) {
    die('Erreur de connexion à la base de données : ' . $e->getMessage());
}

// Créer la table 'partie' si elle n'existe pas
$pdo->exec('CREATE TABLE IF NOT EXISTS partie (
    plateau TEXT,
    caserne_rhino TEXT,
    caserne_elephant TEXT,
    id INTEGER,
    tour TEXT,
    est_fini INTEGER
)');

// Compter le nombre de parties existantes dans la table
$stmt_count = $pdo->query('SELECT COUNT(*) FROM partie');
$count = $stmt_count->fetchColumn();

// Générer un nouvel ID en ajoutant 1 au nombre de parties existantes
$id = $count + 1;

$plateau = $_POST['plateau'];
$caserne_rhino = $_POST['caserne_rhino'];
$caserne_elephant = $_POST['caserne_elephant'];
$tour = $_POST['tour'];
$est_fini = $_POST['est_fini'];

// Préparer la requête SQL d'insertion
$stmt = $pdo->prepare('INSERT INTO partie (plateau, caserne_rhino, caserne_elephant, id, tour, est_fini) VALUES (:plateau, :caserne_rhino, :caserne_elephant, :id, :tour, :est_fini)');

$stmt->execute([
    ':plateau' => $plateau,
    ':caserne_rhino' => $caserne_rhino,
    ':caserne_elephant' => $caserne_elephant,
    ':id' => $id,
    ':tour' => $tour,
    ':est_fini' => $est_fini
]);

?>
