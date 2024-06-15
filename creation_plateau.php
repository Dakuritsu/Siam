<!DOCTYPE html>
<html>
<head>
  <title>SIAM</title>

  <link rel="stylesheet" type="text/css" href="plateau.css">
  <link rel="icon" type="image/gif" href="./images/logo_sia.gif" />
  <style>
    body {
        margin: 0;
        padding: 0;
        background-image: url('./images/bg.png');
        background-size: 100% 100%;
        background-position: center;
        display: flex;
        justify-content: center;
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

    #table_plateau div:hover , #elephant0:hover ,#elephant1:hover ,#elephant2:hover ,#elephant3:hover ,#elephant4:hover,#rhino0:hover,#rhin1:hover,#rhino2:hover,#rhino3:hover,#rhino4:hover {
      transform: scale(1.1);
      transition: transform 0.3s ease;
    }
    </style>
</head>
<body>
  <div class="parent">
    <div id="elephants">
        <table id="table_elephant">
          <tr> <td><div id="elephant0" onclick="press('elephant0')"></div></td> </tr>
          <tr> <td><div id="elephant1" onclick="press('elephant1')"></div></td> </tr>
          <tr> <td><div id="elephant2" onclick="press('elephant2')"></div></td> </tr>
          <tr> <td><div id="elephant3" onclick="press('elephant3')"></div></td> </tr>
          <tr> <td><div id="elephant4" onclick="press('elephant4')"></div></td> </tr>
        </table>
    </div>

    <div id="plateau">
      <center>
        <table id="table_plateau">
          <tr>
            <td> <div id="plateau00" onclick="press('plateau00')"></div> </td>
            <td> <div id="plateau01" onclick="press('plateau01')"></div> </td>
            <td> <div id="plateau02" onclick="press('plateau02')"></div> </td>
            <td> <div id="plateau03" onclick="press('plateau03')"></div> </td>
            <td> <div id="plateau04" onclick="press('plateau04')"></div> </td>
          </tr>
          <tr>
            <td> <div id="plateau10" onclick="press('plateau10')"></div> </td>
            <td> <div id="plateau11" onclick="press('plateau11')"></div> </td>
            <td> <div id="plateau12" onclick="press('plateau12')"></div> </td>
            <td> <div id="plateau13" onclick="press('plateau13')"></div> </td>
            <td> <div id="plateau14" onclick="press('plateau14')"></div> </td>
          </tr>
          <tr>
            <td> <div id="plateau20" onclick="press('plateau20')"></div> </td>
            <td> <div id="plateau21" onclick="press('plateau21')"></div> </td>
            <td> <div id="plateau22" onclick="press('plateau22')"></div> </td>
            <td> <div id="plateau23" onclick="press('plateau23')"></div> </td>
            <td> <div id="plateau24" onclick="press('plateau24')"></div> </td>
          </tr>
          <tr>
            <td> <div id="plateau30" onclick="press('plateau30')"></div> </td>
            <td> <div id="plateau31" onclick="press('plateau31')"></div> </td>
            <td> <div id="plateau32" onclick="press('plateau32')"></div> </td>
            <td> <div id="plateau33" onclick="press('plateau33')"></div> </td>
            <td> <div id="plateau34" onclick="press('plateau34')"></div> </td>
          </tr>
          <tr>
            <td> <div id="plateau40" onclick="press('plateau40')"></div> </td>
            <td> <div id="plateau41" onclick="press('plateau41')"></div> </td>
            <td> <div id="plateau42" onclick="press('plateau42')"></div> </td>
            <td> <div id="plateau43" onclick="press('plateau43')"></div> </td>
            <td> <div id="plateau44" onclick="press('plateau44')"></div> </td>
          </tr>
        </table>
      <center>
    </div>

    <div id="rhinos">
        <table id="table_rhino">
          <tr> <td><div id="rhino0" onclick="press('rhino0')"></div></td> </tr>
          <tr> <td><div id="rhino1" onclick="press('rhino1')"></div></td> </tr>
          <tr> <td><div id="rhino2" onclick="press('rhino2')"></div></td> </tr>
          <tr> <td><div id="rhino3" onclick="press('rhino3')"></div></td> </tr>
          <tr> <td><div id="rhino4" onclick="press('rhino4')"></div></td> </tr>
        </table>
    </div>

  </div>
  <div class="bouton">
    <button onclick="init()">Init</button>
    <button onclick="rotation()">Rotation</button>
    <button onclick="enregistrer_partie()">enregistrer la partie</button>
  </div>

  <div id="tourJoueur"></div>
  <a href="menu.php">
                <button class="menu-btn">Menu</button>
  </a>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
  <script src="js/main.js"></script>


</body>
</html>
