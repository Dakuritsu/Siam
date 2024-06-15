var grille = new Array(5);
var tabEle = new Array(5);
var tabRhino = new Array(5);
var savePath = []; //Enregiste la ligne ou la colonne où on se déplacer.  0 = caseVide 1 = memeSens, 2 = sensOpposé, 3 = autreSens , 4 = rocher
var passeTour = 0;
var nbAnimauxMemeSens;
var nbAnimauxSensOpo;
var nbAnimauxAutreSens;
var nbRocher;
var nbCaseVide;
var tab = [];
var cpt = 0;
var est_fini = 0;

//la grille entière
for (var i = 0; i < 5; i++){
	grille[i] = new Array(5);
}

//on place les rochers
function initGrille(){
	for (var i = 0; i <= 4; i++)
	{
		for (var j = 0; j <= 4; j++)
		{
			if(i == 2){
				if(j >= 1 && j <= 3)
				{
					grille[i][j] = 30;		//0 = vide, 10,11,12,13 = elephant et 20,21,22,23 = rhino, 30 = rocher
				}
				else
				{
					grille[i][j] = 0;
				}
			}
			else
			{
	 			grille[i][j] = 0;
			}
		}
	}
}

//initialisation des éléphants
function initTabEle(){
	for (var i = 0; i < 5; i++){
		tabEle[i] = 11;
	}
}

function initElephant(){
	for (var i = 0; i < 5; i++){
		document.getElementById('elephant'+i).style.backgroundImage="url('./images/11.gif')";
	}

}

//initialisation des rhinos
function initTabRhino(){
	for (var i = 0; i < 5; i++){
		tabRhino[i] = 23;
	}
}

function initRhino(){
	for (var i = 0; i < 5; i++){
		document.getElementById('rhino'+i).style.backgroundImage="url('./images/23.gif')";
	}
}

//initialisation du plateau
function initPlateau(){
	for (var i = 0; i < 5; i++){
		for (var j = 0; j < 5; j++){
			if(i == 2 && j >= 1 && j <= 3){
				document.getElementById('plateau'+i+j).style.backgroundImage="url('./images/30.gif')";
			}
			else document.getElementById('plateau'+i+j).style.backgroundImage="";
		}
	}
}

//affichage du plateau
function affichePlateau(){
	var divTourJoueur = document.getElementById('tourJoueur');
	if (passeTour === 0) {
        divTourJoueur.textContent = "C'est le tour des Éléphants";
    } else {
        divTourJoueur.textContent = "C'est le tour des Rhinocéros";
    }
	var lePlateau = "||";
	for (var i = 0; i < 5; i++){
		for (var j = 0; j < 5; j++){
			lePlateau = lePlateau+"-"+grille[i][j];
		}
		lePlateau = lePlateau+"-||";
	}
	return lePlateau;
}

function afficheCaserneE(){
    let tableAnimal = "";
    for (var i = 0; i < tabEle.length; i++){
        tableAnimal = tableAnimal + (i === 0 ? "" : "#") + tabEle[i];
    }
    tableAnimal = "##" + tableAnimal + "##";
    return tableAnimal;
}

function afficheCaserneR(){
    let tableAnimal = "";
    for (var i = 0; i < tabRhino.length; i++){
        tableAnimal = tableAnimal + (i === 0 ? "" : "#") + tabRhino[i];
    }
    tableAnimal = "##" + tableAnimal + "##";
    return tableAnimal;
}


function retourCaserne(nomAnimal){
	for (var i = 0; i < 5; i++){
		if(document.getElementById(nomAnimal+i).style.backgroundImage == "") return i;
	}
	return -1;
}

function rotation()
{
	if (tab.length != 0)
	{
		var nomAnimal = tab[0].substring(0,tab[0].length-1);
		var idAnimal = parseInt(tab[0].substring(tab[0].length-1),10);
		var iPlat = parseInt(tab[0].substring(tab[0].length-1,tab[0].length-2),10);
		var jPlat = parseInt(tab[0].substring(tab[0].length-1),10);
		var interrupteur = 0;
		if(nomAnimal == 'elephant' || nomAnimal == 'rhino') interrupteur = 1;

		var bgImg = document.getElementById(tab[0]).style.backgroundImage;

		//si c'est un elephant
		if (bgImg == "url(\"./images/10.gif\")")
		{
			document.getElementById(tab[0]).style.backgroundImage = "url(\"./images/11.gif\")";
			if(interrupteur)
			{
				tabEle[idAnimal] = 11;
			}
			else{
				grille[iPlat][jPlat] = 11;
			}
		}

		else if(bgImg == "url(\"./images/11.gif\")")
		{
			document.getElementById(tab[0]).style.backgroundImage = "url(\"./images/12.gif\")";
			if(interrupteur)
			{
				tabEle[idAnimal] = 12;
			}
			else{
				grille[iPlat][jPlat] = 12;
			}
		}
		else if(bgImg == "url(\"./images/12.gif\")")
		{
			document.getElementById(tab[0]).style.backgroundImage = "url(\"./images/13.gif\")";
			if(interrupteur)
			{
				tabEle[idAnimal] = 13;
			}
			else{
				grille[iPlat][jPlat] = 13;
			}
		}
		else if(bgImg == "url(\"./images/13.gif\")")
		{
			document.getElementById(tab[0]).style.backgroundImage = "url(\"./images/10.gif\")";
			if(interrupteur)
			{
				tabEle[idAnimal] = 10;
			}
			else{
				grille[iPlat][jPlat] = 10;
			}
		}

		//si c'est un rhino
		else if(bgImg == "url(\"./images/21.gif\")")
		{
			document.getElementById(tab[0]).style.backgroundImage = "url(\"./images/22.gif\")";
			if(interrupteur)
			{
				tabRhino[idAnimal] = 22;
			}
			else{
				grille[iPlat][jPlat] = 22;
			}
		}
		else if(bgImg == "url(\"./images/22.gif\")")
		{
			document.getElementById(tab[0]).style.backgroundImage = "url(\"./images/23.gif\")";
			if(interrupteur)
			{
				tabRhino[idAnimal] = 23;
			}
			else{
				grille[iPlat][jPlat] = 23;
			}
		}
		else if (bgImg == "url(\"./images/23.gif\")")
		{
			document.getElementById(tab[0]).style.backgroundImage = "url(\"./images/20.gif\")";
			if(interrupteur)
			{
				tabRhino[idAnimal] = 20;
			}
			else{
				grille[iPlat][jPlat] = 20;
			}
		}
		else
		{
			document.getElementById(tab[0]).style.backgroundImage = "url(\"./images/21.gif\")";
			if(interrupteur)
			{
				tabRhino[idAnimal] = 21;
			}
			else{
				grille[iPlat][jPlat] = 21;
			}
		}
		tab = [];
		cpt = 0;
		console.log("dans rotation");
		console.log(affichePlateau());
		console.log(afficheCaserneE());
		console.log(afficheCaserneR());
		console.log("fin de rotation");
	}
}

function getOrientation(img){
	if (img == "url(\"./images/10.gif\")" || img == "url(\"./images/20.gif\")")
	{
		return 0; // nord
	}
	else if (img == "url(\"./images/11.gif\")" || img == "url(\"./images/21.gif\")")
	{
		return 1; // est
	}
	else if (img == "url(\"./images/12.gif\")" || img == "url(\"./images/22.gif\")")
	{
		return 2; // sud
	}
	else
	{
		return 3; // ouest
	}
}

function estCaseExt(iPlat,jPlat){
	return 	(	((iPlat == 0) && (jPlat == 0 || jPlat == 1 || jPlat == 2 || jPlat == 3 || jPlat == 4)) ||
				((iPlat == 4) && (jPlat == 0 || jPlat == 1 || jPlat == 2 || jPlat == 3 || jPlat == 4)) ||
				((jPlat == 0) && (iPlat == 0 || iPlat == 1 || iPlat == 2 || iPlat == 3 || iPlat == 4)) ||
				((jPlat == 4) && (iPlat == 0 || iPlat == 1 || iPlat == 2 || iPlat == 3 || iPlat == 4)) 
			);
}

function press(id){
	console.log('tour de :'+ passeTour);
	if (cpt == 0){
		if(!passeTour && getObjet(document.getElementById(id).style.backgroundImage) == 'elephant')
		{
			if(document.getElementById(id).style.backgroundImage != "" || document.getElementById(id).style.backgroundImage != "url(\"./images/30.gif\")" )
			{
				tab = [];
				tab.push(id);
				cpt++;
			}
		}
		if(passeTour && getObjet(document.getElementById(id).style.backgroundImage) == 'rhino')
		{
			if(document.getElementById(id).style.backgroundImage != "" || document.getElementById(id).style.backgroundImage != "url(\"./images/30.gif\")" )
			{
				tab = [];
				tab.push(id);
				cpt++;
			}
		}
	}
	else{
		if(tab.length != 0 && id != tab[0])
		{
			tab.push(id);
			if(document.getElementById(tab[0]).style.backgroundImage != "")
			{
				deplacer();
			}
			else{
				tab = [];
				cpt = 0;
			}
		}
	}
	console.log("dans press");
	console.log(affichePlateau());
	console.log(afficheCaserneE());
	console.log(afficheCaserneR());
	console.log("fin de press");
}



function quelAnimal(val){
	if(val == 10 || val == 11 || val == 12 || val == 13)
	{
		return 1;
	}
	if(val == 20 || val == 21 || val == 22 || val == 23)
	{
		return 2;
	}
	return -2;
}

function deplacer(){
	var nomAnimal = tab[0].substring(0,tab[0].length-1);
	var idAnimal = parseInt(tab[0].substring(tab[0].length-1),10);
	var plat = tab[1].substring(0,tab[1].length-2);
	var iPlat2 = parseInt(tab[1].substring(tab[1].length-1,tab[1].length-2),10);
	var jPlat2 = parseInt(tab[1].substring(tab[1].length-1),10);

	var nomCaserne = tab[1].substring(0,tab[1].length-1);
	var idCaserne = parseInt(tab[1].substring(tab[1].length-1),10);
	var plat2 = tab[0].substring(0,tab[0].length-2);
	var iPlat22 = parseInt(tab[0].substring(tab[0].length-1,tab[0].length-2),10);;
	var jPlat22 = parseInt(tab[0].substring(tab[0].length-1),10);

	console.log(document.getElementById(tab[0]).style.backgroundImage);
	console.log(document.getElementById(tab[1]).style.backgroundImage);
	console.log("voici son nom : "+nomCaserne);
	if (nomAnimal == 'elephant' || nomAnimal == 'rhino')
	{
		if(plat == 'plateau'){
			if(estCaseExt(iPlat2,jPlat2))
			{
				if (grille[iPlat2][jPlat2] == 0){
					grille[iPlat2][jPlat2] = parseInt(document.getElementById(tab[0]).style.backgroundImage.substring(14,16),10);
					if(nomAnimal == 'elephant')
					{
						tabEle[idAnimal] = 0;
					}
					else{
						tabRhino[idAnimal] = 0;
					}
					document.getElementById(tab[1]).style.backgroundImage = document.getElementById(tab[0]).style.backgroundImage;
					document.getElementById(tab[0]).style.backgroundImage = "";
					if (passeTour == 0) passeTour = 1;
					else passeTour = 0;
				}
				else{
					var deplacement = false;
					var bgImg = document.getElementById(tab[0]).style.backgroundImage;
					console.log('iPlat2 === '+iPlat2);
					console.log('jPlat2 === '+jPlat2);
					if((getOrientation(bgImg) == 0) && iPlat2 == 4){
						console.log(nomAnimal+" pousse vers le nord");
						deplacement = entrerPousser(bgImg,iPlat2,jPlat2,'nord');
					}
					else if ((getOrientation(bgImg) == 1) && jPlat2 == 0){
						console.log(nomAnimal+" pousse vers la est");
						deplacement = entrerPousser(bgImg,iPlat2,jPlat2,'est');
					}
					else if ((getOrientation(bgImg) == 2) && iPlat2 == 0){
						console.log(nomAnimal+" pousse vers le sud");
						deplacement = entrerPousser(bgImg,iPlat2,jPlat2,'sud');
					}
					else{
						if(jPlat2 == 4)
						{
							console.log(nomAnimal+" pousse vers la ouest");
							deplacement = entrerPousser(bgImg,iPlat2,jPlat2,'ouest');
						}
					}

					if(deplacement)
					{
						if(nomAnimal == 'elephant')
						{
							tabEle[idAnimal] = 0;
						}
						else{
							tabRhino[idAnimal] = 0;
						}
						document.getElementById(tab[1]).style.backgroundImage = document.getElementById(tab[0]).style.backgroundImage;
						document.getElementById(tab[0]).style.backgroundImage = "";
						if (passeTour == 0) passeTour = 1;
						else passeTour = 0;
					}
				}
			}
		}
	}
	else if (plat2 == "plateau" && quelAnimal(grille[iPlat22][jPlat22]) == 1 && nomCaserne == "elephant"){
		if(tabEle[idCaserne] == 0)
		{
			if(estCaseExt(iPlat22,jPlat22))
			{
				tabEle[idCaserne] = parseInt(document.getElementById(tab[0]).style.backgroundImage.substring(14,16),10);
				grille[iPlat22][jPlat22] = 0;
				document.getElementById(tab[1]).style.backgroundImage = document.getElementById(tab[0]).style.backgroundImage;
				document.getElementById(tab[0]).style.backgroundImage = "";
				if (passeTour == 0) passeTour = 1;
				else passeTour = 0;
			}
		}
	}
	else if (plat2 == "plateau" && quelAnimal(grille[iPlat22][jPlat22]) == 2 && nomCaserne == "rhino"){
		if(tabRhino[idCaserne] == 0)
		{
			if(estCaseExt(iPlat22,jPlat22))
			{
				tabRhino[idCaserne] = parseInt(document.getElementById(tab[0]).style.backgroundImage.substring(14,16),10);
				grille[iPlat22][jPlat22] = 0;
				document.getElementById(tab[1]).style.backgroundImage = document.getElementById(tab[0]).style.backgroundImage;
				document.getElementById(tab[0]).style.backgroundImage = "";
				if (passeTour == 0) passeTour = 1;
				else passeTour = 0;
			}
		}
	}
	else{
		var iPlat1 = parseInt(tab[0].substring(tab[0].length-1,tab[0].length-2),10);
		var jPlat1 = parseInt(tab[0].substring(tab[0].length-1),10);


		if(deplaceOrtho(iPlat1,jPlat1,iPlat2,jPlat2)) //vérification si on se déplace verticalement ou horizontalement
		{
			if (grille[iPlat2][jPlat2] == 0){
				grille[iPlat2][jPlat2] = parseInt(document.getElementById(tab[0]).style.backgroundImage.substring(14,16),10);
				grille[iPlat1][jPlat1] = 0;
				document.getElementById(tab[1]).style.backgroundImage = document.getElementById(tab[0]).style.backgroundImage;
				document.getElementById(tab[0]).style.backgroundImage = "";
				if (passeTour == 0) passeTour = 1;
				else passeTour = 0;

			}
			else{
				var deplacement = false;

				if (((iPlat1 + 1) == iPlat2) && (getOrientation(document.getElementById(tab[0]).style.backgroundImage) == 2))
				{
					deplacement = pousser(iPlat1,jPlat1,iPlat2,jPlat2,'sud');
				}
				if (((iPlat1-1) == iPlat2) && (getOrientation(document.getElementById(tab[0]).style.backgroundImage) == 0)){
					deplacement = pousser(iPlat1,jPlat1,iPlat2,jPlat2,'nord');
				}
				if (((jPlat1 + 1) == jPlat2) && (getOrientation(document.getElementById(tab[0]).style.backgroundImage) == 1)){
					deplacement = pousser(iPlat1,jPlat1,iPlat2,jPlat2,'est');
				}
				if (((jPlat1 - 1) == jPlat2) && (getOrientation(document.getElementById(tab[0]).style.backgroundImage) == 3)){
					deplacement = pousser(iPlat1,jPlat1,iPlat2,jPlat2,'ouest');
				}
			}
			if (deplacement){
				if (passeTour == 0) passeTour = 1;
				else passeTour = 0;
			}
		}
	}

	tab = [];
	cpt = 0;
}

function entrerPousser(backgImg,i,j,sens)
{
	setSavePath(i,j,sens);
	console.log('nbAnimauxSensOpo : '+nbAnimauxSensOpo);
	console.log('nbAnimauxMemeSens : '+nbAnimauxMemeSens);
	console.log('nbAnimauxAutreSens : '+nbAnimauxAutreSens);
	console.log('nbCaseVide : '+nbCaseVide);
	console.log('nbRocher : '+nbRocher);
	var gagnantProche1 = 1;
	var gagnantProche2 = 2;
	var gagnantProche3 = 3;
	var estSortiCaserne = false;


	if(sens == 'sud' || sens == 'est')
	{
		gagnantProche1 = 3;
		gagnantProche3 = 1;
	}

	if(nbRocher == 0)
	{
		if (nbCaseVide == 4){
			if(savePath[0] != 2)
			{
				majColonAvecCaseVide2(backgImg,i,j,sens);
				estSortiCaserne = true;
			}
		}
		else if (nbCaseVide == 3)
		{
			if(savePath[1] == 0 && savePath[0] != 2)
			{
				majColonAvecCaseVide2(backgImg,i,j,sens);
				estSortiCaserne = true;
			}
			else{
				if(nbAnimauxSensOpo < nbAnimauxMemeSens)
				{
					majColonAvecCaseVide2(backgImg,i,j,sens);
					estSortiCaserne = true;
				}
			}
		}
		else if (nbCaseVide == 2){
			if(savePath[1] == 0 && savePath[0] != 2)
			{
				majColonAvecCaseVide2(backgImg,i,j,sens);
				estSortiCaserne = true;
			}
			else if(savePath[2] == 0 && savePath[0] != 2 && savePath[1] != 2)
			{
				majColonAvecCaseVide2(backgImg,i,j,sens);
				estSortiCaserne = true;
			}
			else{
				if(nbAnimauxSensOpo < nbAnimauxMemeSens)
				{
					majColonAvecCaseVide2(backgImg,i,j,sens);
					estSortiCaserne = true;
				}
			}
		}
		else if (nbCaseVide == 1){
			if(savePath[1] == 0 && savePath[0] != 2)
			{
				majColonAvecCaseVide2(backgImg,i,j,sens);
				estSortiCaserne = true;
			}
			else if(savePath[2] == 0 && ((savePath[0] != 2 && savePath[1] != 2) || savePath[0] == 1))
			{
				majColonAvecCaseVide2(backgImg,i,j,sens);
				estSortiCaserne = true;
			}
			else if(savePath[3] == 0){
				if((savePath[0] != 2 && savePath[1] != 2 && savePath[0] != 2) ||
					 (savePath[0] == 1 && savePath[2] != 2) ||
				   (savePath[0] != 2 && savePath[1] == 1)	)
					{
	 					majColonAvecCaseVide2(backgImg,i,j,sens);
	 					estSortiCaserne = true;
					 }
			}
			else{
				if(nbAnimauxSensOpo < nbAnimauxMemeSens)
				{
					majColonAvecCaseVide2(backgImg,i,j,sens);
					estSortiCaserne = true;
				}
			}
		}
		else{
			if(nbAnimauxSensOpo < nbAnimauxMemeSens)
			{
				majColonne2(backgImg,i,j,sens);
				estSortiCaserne = true;
			}
		}
	}
	else if (nbRocher == 1)
	{
		if (nbCaseVide == 4){
			majColonAvecCaseVide2(backgImg,i,j,sens);
			estSortiCaserne = true;
		}
		else if (nbCaseVide == 3){
			if(savePath[0] != 2 && savePath[1] == 0)
			{
				majColonAvecCaseVide2(backgImg,i,j,sens);
				estSortiCaserne = true;
			}
			else{
				if(nbAnimauxSensOpo < nbAnimauxMemeSens)
				{
					majColonAvecCaseVide2(backgImg,i,j,sens);
					estSortiCaserne = true;
				}
			}
		}
		else if (nbCaseVide == 2){
			if(savePath[0] != 2 && savePath[1] == 0)
			{
				majColonAvecCaseVide2(backgImg,i,j,sens);
				estSortiCaserne = true;
			}
			else if(savePath[2] == 0)
			{
				if ((savePath[0] != 2 && savePath[1] != 2) || savePath[0] == 1){
					majColonAvecCaseVide2(backgImg,i,j,sens);
					estSortiCaserne = true;
				}
			}
			else
			{
				if((savePath[0] == 1) || (savePath[0] != 2 && savePath[1] != 2))
				{
					majColonAvecCaseVide2(backgImg,i,j,sens);
					estSortiCaserne = true;
				}
			}
		}
		else if (nbCaseVide == 1){
			if(savePath[0] != 2 && savePath[1] == 0)
			{
				majColonAvecCaseVide2(backgImg,i,j,sens);
				estSortiCaserne = true;
			}
			else if (savePath[2] == 0){
				if ((savePath[0] != 2 && savePath[1] != 2) || savePath[0] == 1){
					majColonAvecCaseVide2(backgImg,i,j,sens);
					estSortiCaserne = true;
				}
			}
			else if (savePath[3] == 0){
				if((savePath[0] != 2 && savePath[1] != 2 && savePath[2] != 2) || (savePath[0] == 1 && savePath[1] != 2) ||
					 (savePath[0] == 1 && savePath[2] != 2) || (savePath[0] != 2 && savePath[1] == 1))
					{
 						 majColonAvecCaseVide2(backgImg,i,j,sens);
 						 estSortiCaserne = true;
					 }
			}
		}
		else{
			if(nbAnimauxSensOpo < nbAnimauxMemeSens)
			{
				console.log(backgImg);
				majColonne2(backgImg,i,j,sens);
				if(savePath[4] == 4)
				{
					aGagne(i,j,sens,gagnantProche1);
				}
				estSortiCaserne = true;
			}
		}
	}
	else if (nbRocher == 2){
		if (nbCaseVide == 3){
			if(savePath[1] == 0)
			{
				majColonAvecCaseVide2(backgImg,i,j,sens);
				estSortiCaserne = true;
			}
		}
		else if (nbCaseVide == 2){
			if(savePath[0] != 2 && savePath[1] == 0)
			{
				majColonAvecCaseVide2(backgImg,i,j,sens);
				estSortiCaserne = true;
			}
			else if (savePath[2] == 0){
				if ((savePath[0] == 4 && savePath[1] == 1 && savePath[1] == 3) ||
						(savePath[0] == 1 && savePath[0] == 3 && savePath[1] == 4) ){
					majColonAvecCaseVide2(backgImg,i,j,sens);
					estSortiCaserne = true;
				}
			}
			else{
				if ((savePath[0] == 4 && savePath[1] == 1 && savePath[2] == 4) ||
						(savePath[0] == 1 && savePath[1] == 4 && savePath[2] == 4)){
					majColonAvecCaseVide2(backgImg,i,j,sens);
					estSortiCaserne = true;
				}
			}
		}
		else if (nbCaseVide == 1){
			if(savePath[0] != 2 && savePath[1] == 0)
			{
				majColonAvecCaseVide2(backgImg,i,j,sens);
				estSortiCaserne = true;
			}
			else if (savePath[2] == 0){
				if ((savePath[0] == 4 && savePath[1] == 1 && savePath[1] == 3) ||
						((savePath[0] == 1 || savePath[0] == 3) && savePath[1] == 4) ){
					majColonAvecCaseVide2(backgImg,i,j,sens);
					estSortiCaserne = true;
				}
			}
			else if (savePath[3] == 0){
				if ((savePath[0] == 4 && savePath[1] == 1 && savePath[2] == 4) ||
					 (savePath[0] == 1 && savePath[1] == 4 && savePath[2] == 4) ||
				 	 (savePath[0] == 3 ) ){
					majColonAvecCaseVide2(backgImg,i,j,sens);
					estSortiCaserne = true;
				}
				else if ( ((savePath[0] == 1 || savePath[0] == 3) && (savePath[1] == 4) && (savePath[2] == 1 || savePath[2] == 3)) ||
				 			    ((savePath[0] == 4) && (savePath[1] == 1 || savePath[1] == 3) && (savePath[2] == 1 || savePath[2] == 3)) ||
								  ((savePath[0] == 1 || savePath[0] == 3) && (savePath[1] == 1 || savePath[1] == 3)) && (savePath[2] == 4) ){
					majColonAvecCaseVide2(backgImg,i,j,sens);
					estSortiCaserne = true;
				}
			}
			else{
				if(nbAnimauxSensOpo == 0 && nbAnimauxMemeSens > 1)
				{
					majColonAvecCaseVide2(backgImg,i,j,sens);
					estSortiCaserne = true;
				}
			}
		}
		else{
			if((nbAnimauxSensOpo == 1 && nbAnimauxMemeSens == 3) || (nbAnimauxSensOpo == 0 && nbAnimauxMemeSens > 1))
			{
				majColonne2(backgImg,i,j,sens);
				if(savePath[4] == 4)
				{
					if(savePath[3] == 4)
					{
						aGagne(i,j,sens,gagnantProche2);
					}
					else{
						aGagne(i,j,sens,gagnantProche1);
					}
				}
			}
		}
	}
	else{
		if (nbCaseVide == 2){
			if(savePath[0] != 2 && savePath[1] == 0)
			{
				majColonAvecCaseVide2(backgImg,i,j,sens);
				estSortiCaserne = true;
			}
		}
		else if (nbCaseVide == 1){
			if(savePath[0] != 2 && savePath[1] == 0)
			{
				majColonAvecCaseVide2(backgImg,i,j,sens);
				estSortiCaserne = true;
			}
			else if (savePath[2] == 0){
				if (savePath[0] == 1 || (savePath[0] == 4 && savePath[1] != 2 && savePath[1] != 4)){
					majColonAvecCaseVide2(backgImg,i,j,sens);
					estSortiCaserne = true;
				}
			}
			else if (savePath[3] == 0){
				if((savePath[0] == 4 && savePath[1] == 1) || (savePath[0] == 1))
				{
					majColonAvecCaseVide2(backgImg,i,j,sens);
					estSortiCaserne = true;
				}
			}
		}
		else{
			if(nbAnimauxSensOpo == 0 && nbAnimauxMemeSens == 3)
			{
				if (savePath[4] == 4 && savePath[3] == 4 && savePath[2] == 4){
					console.log("gagnantProche 3 = "+gagnantProche3);
					aGagne(i,j,sens,gagnantProche3);
					majColonne2(backgImg,i,j,sens);
					estSortiCaserne = true;
				}
			}
		}
	}
	return estSortiCaserne;
}

function deplaceOrtho(i,j,x,y)
{
	return (((i == x) && (j == y-1 || j == y+1)) || ((j == y) && (i == x-1 || i == x+1)));
}

function getObjet(bgImg)
{
	if(bgImg[14] == 1){
		return 'elephant';
	}
	else if(bgImg[14] == 2){
		 return 'rhino';
	}
	else if(bgImg[14] == 3){
		return 'rocher';
	}
	else{
		return 'vide';
	}
}



function pousser(i,j,x,y,sens)
{
	setSavePath(x,y,sens);
	console.log('taille de savePath : '+savePath.length);
	console.log('nbAnimauxSensOpo : '+nbAnimauxSensOpo);
	console.log('nbAnimauxMemeSens : '+nbAnimauxMemeSens);
	console.log('nbAnimauxAutreSens : '+nbAnimauxAutreSens);
	console.log('nbCaseVide : '+nbCaseVide);
	console.log('nbRocher : '+nbRocher);
	var gagnantProche1 = 1;
	var gagnantProche2 = 2;
	var gagnantProche3 = 3;
	var deplacement = false;

	if(sens == 'sud' || sens == 'ouest')
	{
		gagnantProche1 = 3;
		gagnantProche3 = 1;
	}

	if(savePath.length == 1)
	{
		if(nbRocher == 0)
		{
			console.log('zéro rocher');
			if(nbCaseVide == 1)
			{
				majColonAvecCaseVide(i,j,sens);
				deplacement = true;
			}
			else{
				if (nbAnimauxSensOpo == 0){
					majColonne(i,j,sens);
					deplacement = true;
				}
			}
		}
		else{
			majColonne(i,j,sens);
			aGagne(i,j,sens,gagnantProche1);
		}
	}

	else if(savePath.length == 2)
	{
		if(nbRocher == 0)
		{
			if(nbCaseVide == 2)
			{
				majColonAvecCaseVide(i,j,sens);
				deplacement = true;
			}
			else if(nbCaseVide == 1)
			{
				if(nbAnimauxSensOpo == 0)
				{
					majColonAvecCaseVide(i,j,sens);
					deplacement = true;
				}
			}
			else{
				if(nbAnimauxSensOpo < nbAnimauxMemeSens)
				{
					majColonne(i,j,sens);
					deplacement = true;
				}
			}
		}
		if (nbRocher == 1){
			if(nbCaseVide == 1)
			{
				majColonAvecCaseVide(i,j,sens);
				deplacement = true;
			}
			else{
				console.log(savePath[0] +"    "+savePath[1]);
				if(savePath[0] == 4)
				{
					if (savePath[1] == 1 || savePath[1] == 3)
					{
						majColonne(i,j,sens);
						deplacement = true;
					}
				}
				if(savePath[1] == 4)
				{
					majColonne(i,j,sens);
					aGagne(i,j,sens,gagnantProche1);
				}
			}
		}
	}
	if (savePath.length == 3){
		console.log(savePath[0] +"    "+savePath[1]+"   "+savePath[2]);
		if(nbRocher == 0)
		{
			if(nbCaseVide == 2)
			{
				if(nbAnimauxSensOpo < nbAnimauxMemeSens)
				{
					majColonAvecCaseVide(i,j,sens);
					deplacement = true;
				}
			}
			else if(nbCaseVide == 1)
			{
				if(savePath[1] == 0)
				{
					if(savePath[0] == 1 || savePath[0] == 3)
					{
						majColonAvecCaseVide(i,j,sens);
						deplacement = true;
					}
				}
				if(savePath[2] == 0)
				{
					if(nbAnimauxSensOpo < nbAnimauxMemeSens)
					{
						majColonne(i,j,sens);
						deplacement = true;
					}
				}
			}
			else{
				if(nbAnimauxSensOpo < nbAnimauxMemeSens)
				{
					majColonne(i,j,sens);
					deplacement = true;
				}
			}
		}
		if (nbRocher == 1)
		{
			if(nbCaseVide == 2)
			{
				majColonAvecCaseVide(i,j,sens);
				deplacement = true;
			}
			else if (nbCaseVide == 1){
				if(savePath[1] == 0)
				{
					if(savePath[0] != 2)
					{
						majColonAvecCaseVide(i,j,sens);
						deplacement = true;
					}
				}
				if (savePath[2] == 0){
					if(nbAnimauxSensOpo < nbAnimauxMemeSens)
					{
						majColonAvecCaseVide(i,j,sens);
						deplacement = true;
					}
				}
			}
			else{
				if(nbAnimauxSensOpo < nbAnimauxMemeSens)
				{
					majColonne(i,j,sens);
					if(savePath[2] == 4)
					{
						aGagne(i,j,sens,gagnantProche1);
					}
				}
			}
		}
		if (nbRocher == 2){
			if (nbCaseVide == 1 && savePath[1] == 0){
				majColonAvecCaseVide(i,j,sens);
				deplacement = true;
			}
			else{
				if (savePath[0] == 1 || savePath[1] == 1){
					majColonne(i,j,sens);
					if(savePath[2] == 4)
					{
						if (savePath[1] == 4){
							aGagne(i,j,sens,gagnantProche2);
						}
						else{
							aGagne(i,j,sens,gagnantProche1);
						}
					}
				}
			}
		}
	}
	if (savePath.length == 4){
		if(nbRocher == 0)
		{
			if(nbCaseVide == 3)
			{
				if(nbAnimauxSensOpo < nbAnimauxMemeSens){
					majColonAvecCaseVide(i,j,sens);
					deplacement = true;
				}
			}
			else if (nbCaseVide == 2){
				if(savePath[1] == 0)
				{
					if(savePath[0] == 1 || savePath[0] == 3)
					{
						majColonAvecCaseVide(i,j,sens);
						deplacement = true;
					}
				}
				else{
					if(nbAnimauxSensOpo < nbAnimauxMemeSens)
					{
						majColonAvecCaseVide(i,j,sens);
						deplacement = true;
					}
				}
			}
			else if (nbCaseVide == 1){
				if(savePath[1] == 0)
				{
					if(savePath[0] == 1 || savePath[0] == 3)
					{
						majColonAvecCaseVide(i,j,sens);
						deplacement = true;
					}
				}
				else if (savePath[2] == 0){
					if ((savePath[0] != 2 && savePath[1] != 2) || savePath[0] == 1){
						majColonAvecCaseVide(i,j,sens);
						deplacement = true;
					}
				}
				else{
					if (nbAnimauxSensOpo < nbAnimauxMemeSens)
					{
						majColonAvecCaseVide(i,j,sens);
						deplacement = true;
					}
				}
			}
			else{
				if (nbAnimauxSensOpo < nbAnimauxMemeSens)
				{
					majColonne(i,j,sens);
					deplacement = true;
				}
			}
		}
		if (nbRocher == 1){
			if(nbCaseVide == 3)
			{
				majColonAvecCaseVide(i,j,sens);
				deplacement = true;
			}
			else if (nbCaseVide == 2){
				if (savePath[1] == 0){
					if (savePath[0] == 4 || savePath[0] == 1 || savePath[0] == 3){
						majColonAvecCaseVide(i,j,sens);
						deplacement = true;
					}
				}
				if(savePath[2] == 0 && savePath[3] == 0)
				{
					if (nbAnimauxSensOpo < nbAnimauxMemeSens){
						majColonAvecCaseVide(i,j,sens);
						deplacement = true;
					}
				}
			}
			else if (nbCaseVide == 1){
				if (savePath[1] == 0){
					if (savePath[0] == 4 || savePath[0] == 1 || savePath[0] == 3){
						majColonAvecCaseVide(i,j,sens);
						deplacement = true;
					}
				}
				else if (savePath[2] == 0){
					if (savePath[0] != 2 && savePath[1] != 2){
						majColonAvecCaseVide(i,j,sens);
						deplacement = true;
					}
				}
				else{
					if(nbAnimauxSensOpo < nbAnimauxMemeSens)
					{
						majColonAvecCaseVide(i,j,sens);
						deplacement = true;
					}
				}
			}
			else{
				if(nbAnimauxSensOpo < nbAnimauxMemeSens)
				{
					majColonne(i,j,sens);
					if(savePath[3] == 4)
					{
						aGagne(i,j,sens,gagnantProche1);
					}
				}
			}
		}
		if (nbRocher == 2){
			if(nbCaseVide == 2)
			{
				if (savePath[1] == 0){
					majColonAvecCaseVide(i,j,sens);
					deplacement = true;
				}
			}
			else if (nbCaseVide == 1){
				if (savePath[1] == 0){
					if (savePath[0] == 4 || savePath[0] == 1 || savePath[0] == 3){
						majColonAvecCaseVide(i,j,sens);
						deplacement = true;
					}
				}
				else if (savePath[2] == 0){
					if (savePath[0] != 2 && savePath[1] != 2){
						majColonAvecCaseVide(i,j,sens);
						deplacement = true;
					}
				}
				else{
					if (savePath[0] == 1 || savePath[1] == 1){
						majColonAvecCaseVide(i,j,sens);
						deplacement = true;
					}
				}
			}
			else{
				if (savePath[0] != 4 && nbAnimauxSensOpo == 0 && nbAnimauxMemeSens > 1){
					majColonne(i,j,sens);
					if(savePath[3] == 4)
					{
						if (savePath[2] == 4){
							aGagne(i,j,sens,gagnantProche2);
						}
						else{
							aGagne(i,j,sens,gagnantProche1);
						}
					}
				}
			}
		}
	}
	return deplacement;
}

function setSavePath(i,j,sens)
{
	nbAnimauxMemeSens = 1;
	nbAnimauxSensOpo = 0;
	nbAnimauxAutreSens = 0;
	nbRocher = 0;
	nbCaseVide = 0;
	savePath = [];
	if(sens == 'nord')
	{
		setSavePathAux(i,j,0);
	}
	else if(sens == 'sud')
	{
		setSavePathAux(i,j,2);
	}
	else if(sens == 'est')
	{
		setSavePathAux(i,j,1);
	}
	else
	{
		setSavePathAux(i,j,3);
	}
}

function setSavePathAux(i,j,direction)
{
	//savePath[]  ->	0 = caseVide, 1 = memeSens, 2 = sensOpposé, 3 = autreSens , 4 = rocher
	var directionOpo;
	var ind = 0;
	var limit;
	if(direction == 0)
	{
		limit = i;
		directionOpo = 2;
		while (ind <= limit){
			console.log('i = '+i);
			if(quelAnimal(grille[i][j]) == 1 || quelAnimal(grille[i][j]) == 2)
			{
				if(getOrientation(document.getElementById('plateau'+i+j).style.backgroundImage) == direction){
					savePath[ind] = 1;
					nbAnimauxMemeSens++;
				}
				else if (getOrientation(document.getElementById('plateau'+i+j).style.backgroundImage) == directionOpo)
				{
					savePath[ind] = 2;
					nbAnimauxSensOpo++;
				}
				else{
					savePath[ind] = 3;
					nbAnimauxAutreSens++;
				}
			}
			else if (grille[i][j] == 30){
				savePath[ind] = 4;
				nbRocher++;
			}
			else{
				savePath[ind] = 0;
				nbCaseVide++;
			}
			ind++;
			i--;
		}
	}
	else if (direction == 1)
	{
		directionOpo = 3;
		limit = 4 - j;
		while (ind <= limit){
			if(quelAnimal(grille[i][j]) == 1 || quelAnimal(grille[i][j]) == 2)
			{
				if(getOrientation(document.getElementById('plateau'+i+j).style.backgroundImage) == direction){
					savePath[ind] = 1;
					nbAnimauxMemeSens++;
				}
				else if (getOrientation(document.getElementById('plateau'+i+j).style.backgroundImage) == directionOpo)
				{
					savePath[ind] = 2;
					nbAnimauxSensOpo++;
				}
				else{
					savePath[ind] = 3;
					nbAnimauxAutreSens++;
				}
			}
			else if (grille[i][j] == 30){
				savePath[ind] = 4;
				nbRocher++;
			}
			else{
				savePath[ind] = 0;
				nbCaseVide++;
			}
			ind++;
			j++;
		}
	}
	else if (direction == 2){
		directionOpo = 0;
		limit = 4 - i;
		while (ind <= limit){
			console.log('i = '+i);
			if(quelAnimal(grille[i][j]) == 1 || quelAnimal(grille[i][j]) == 2)
			{
				if(getOrientation(document.getElementById('plateau'+i+j).style.backgroundImage) == direction){
					savePath[ind] = 1;
					nbAnimauxMemeSens++;
				}
				else if (getOrientation(document.getElementById('plateau'+i+j).style.backgroundImage) == directionOpo)
				{
					savePath[ind] = 2;
					nbAnimauxSensOpo++;
				}
				else{
					savePath[ind] = 3;
					nbAnimauxAutreSens++;
				}
			}
			else if (grille[i][j] == 30){
				savePath[ind] = 4;
				nbRocher++;
			}
			else{
				savePath[ind] = 0;
				nbCaseVide++;
			}
			ind++;
			i++;
		}
	}
	else{
		directionOpo = 1;
		limit = j;
		while (ind <= limit){
			console.log('i = '+i);
			if(quelAnimal(grille[i][j]) == 1 || quelAnimal(grille[i][j]) == 2)
			{
				if(getOrientation(document.getElementById('plateau'+i+j).style.backgroundImage) == direction){
					console.log('même direction');
					savePath[ind] = 1;
					nbAnimauxMemeSens++;
				}
				else if (getOrientation(document.getElementById('plateau'+i+j).style.backgroundImage) == directionOpo)
				{
					console.log('direction opposée');
					savePath[ind] = 2;
					nbAnimauxSensOpo++;
				}
				else{
					console.log('oh autre direction');
					savePath[ind] = 3;
					nbAnimauxAutreSens++;
				}
			}
			else if (grille[i][j] == 30){
				console.log('rocher');
				savePath[ind] = 4;
				nbRocher++;
			}
			else{
				savePath[ind] = 0;
				nbCaseVide++;
			}
			ind++;
			j--;
		}
	}

}

function majColonne(i,j,sens)
{
	var cpt;
	var x;
	var bgImg = "";
	var objectSorti;

	if (sens == 'nord')
	{
		cpt = 0;
		x = cpt + 1;
		objectSorti = document.getElementById('plateau'+cpt+j).style.backgroundImage;
		while (cpt < i)
		{
			bgImg = document.getElementById('plateau'+x+j).style.backgroundImage;
			if (cpt == 0)
			{
				var obj = parseInt(document.getElementById('plateau'+cpt+j).style.backgroundImage.substring(14,16),10);
				if(quelAnimal(obj) == 1)
				{
				  if(retourCaserne('elephant') != -1)
				{
				    tabEle[retourCaserne('elephant')] = obj;
				    document.getElementById('elephant'+retourCaserne('elephant')).style.backgroundImage = objectSorti;
				  }
				}
				if(quelAnimal(obj) == 2)
				{
				  if(retourCaserne('rhino') != -1)
				{
				    tabRhino[retourCaserne('rhino')] = obj;
				    document.getElementById('rhino'+retourCaserne('rhino')).style.backgroundImage = objectSorti;
				  }
				}
			}
			if(document.getElementById('plateau'+x+j).style.backgroundImage == "") 
				grille[cpt][j] = 0;
			else 
				grille[cpt][j] = parseInt(document.getElementById('plateau'+x+j).style.backgroundImage.substring(14,16),10);
			document.getElementById('plateau'+cpt+j).style.backgroundImage = bgImg;
			cpt++;
			x++;
			if(x <= i){
				bgImg = document.getElementById('plateau'+x+j).style.backgroundImage;
			}
		}
		grille[cpt][j] = 0;
		document.getElementById('plateau'+cpt+j).style.backgroundImage = "";
	}

	else if (sens == 'sud')
	{
		cpt = 4;
		x = cpt - 1;
		objectSorti = document.getElementById('plateau'+cpt+j).style.backgroundImage;
		while (cpt > i)
		{
			bgImg = document.getElementById('plateau'+x+j).style.backgroundImage;
			if (cpt == 4)
			{
				var obj = parseInt(document.getElementById('plateau'+cpt+j).style.backgroundImage.substring(14,16),10);
				if(quelAnimal(obj) == 1)
				{
					if(retourCaserne('elephant') != -1)
					{
						tabEle[retourCaserne('elephant')] = obj;
						document.getElementById('elephant'+retourCaserne('elephant')).style.backgroundImage = objectSorti;
					}
				}
				if(quelAnimal(obj) == 2)
				{
					if(retourCaserne('rhino') != -1)
					{
						tabRhino[retourCaserne('rhino')] = obj;
						document.getElementById('rhino'+retourCaserne('rhino')).style.backgroundImage = objectSorti;
					}
				}
			}
			if(document.getElementById('plateau'+x+j).style.backgroundImage == "") 
				grille[cpt][j] = 0;
			else 
				grille[cpt][j] = parseInt(document.getElementById('plateau'+x+j).style.backgroundImage.substring(14,16),10);
			document.getElementById('plateau'+cpt+j).style.backgroundImage = bgImg;
			cpt--;
			x--;
			if(x >= i){
				bgImg =	document.getElementById('plateau'+x+j).style.backgroundImage;
			}
		}
		grille[cpt][j] = 0;
		document.getElementById('plateau'+cpt+j).style.backgroundImage = "";
	}

	else if (sens == 'ouest')
	{
		cpt = 0;
		x = cpt + 1;
		objectSorti = document.getElementById('plateau'+i+cpt).style.backgroundImage;
		while (cpt < j)
		{
			bgImg = document.getElementById('plateau'+i+x).style.backgroundImage;
			if (cpt == 0)
			{
				var obj = parseInt(document.getElementById('plateau'+i+cpt).style.backgroundImage.substring(14,16),10);
				if(quelAnimal(obj) == 1)
				{
					if(retourCaserne('elephant') != -1){
				    	tabEle[retourCaserne('elephant')] = obj;
				    	document.getElementById('elephant'+retourCaserne('elephant')).style.backgroundImage = objectSorti;
				  	}
				}
				if(quelAnimal(obj) == 2){
					if(retourCaserne('rhino') != -1)
					{
				    	tabRhino[retourCaserne('rhino')] = obj;
				    	document.getElementById('rhino'+retourCaserne('rhino')).style.backgroundImage = objectSorti;
				  	}
				}
			}

			if(document.getElementById('plateau'+i+x).style.backgroundImage == "") 
				grille[i][cpt] = 0;
			else 
				grille[i][cpt] = parseInt(document.getElementById('plateau'+i+x).style.backgroundImage.substring(14,16),10);
			document.getElementById('plateau'+i+cpt).style.backgroundImage = bgImg;
			cpt++;
			x++;
			if(x <= j){
				bgImg =	document.getElementById('plateau'+i+x).style.backgroundImage;
			}
		}
		grille[i][cpt] = 0;
		document.getElementById('plateau'+i+cpt).style.backgroundImage = "";
	}

	else
	{
		cpt = 4;
		x = cpt - 1;
		objectSorti = document.getElementById('plateau'+i+cpt).style.backgroundImage;
		while (cpt > j)
		{
			bgImg = document.getElementById('plateau'+i+x).style.backgroundImage;
			if (cpt == 4)
			{
				var obj = parseInt(document.getElementById('plateau'+i+cpt).style.backgroundImage.substring(14,16),10);
				if(quelAnimal(obj) == 1)
				{
					if(retourCaserne('elephant') != -1){
				    	tabEle[retourCaserne('elephant')] = obj;
				    	document.getElementById('elephant'+retourCaserne('elephant')).style.backgroundImage = objectSorti;
				  	}
				}
				if(quelAnimal(obj) == 2){
					if(retourCaserne('rhino') != -1){
				    	tabRhino[retourCaserne('rhino')] = obj;
				    	document.getElementById('rhino'+retourCaserne('rhino')).style.backgroundImage = objectSorti;
				  	}
				}
			}
			if(document.getElementById('plateau'+i+x).style.backgroundImage == "")
				grille[i][cpt] = 0;
			else
				grille[i][cpt] = parseInt(document.getElementById('plateau'+i+x).style.backgroundImage.substring(14,16),10);
			document.getElementById('plateau'+i+cpt).style.backgroundImage = bgImg;
			cpt--;
			x--;
			if(x >= j){
				bgImg =	document.getElementById('plateau'+i+x).style.backgroundImage;
			}
		}
		grille[i][cpt] = 0;
		document.getElementById('plateau'+i+cpt).style.backgroundImage = "";
	}
}


function majColonne2(backgImg,i,j,sens)
{
	var cpt;
	var x;
	var bgImg = "";
	var objectSorti;

	if (sens == 'nord')
	{
		cpt = 0;
		x = cpt + 1;
		objectSorti = document.getElementById('plateau'+cpt+j).style.backgroundImage;
		while (cpt < i)
		{
			bgImg = document.getElementById('plateau'+x+j).style.backgroundImage;
			if (cpt == 0)
			{
				var obj = parseInt(document.getElementById('plateau'+cpt+j).style.backgroundImage.substring(14,16),10);
				if(quelAnimal(obj) == 1)
				{
					if(retourCaserne('elephant') != -1)
					{
				    tabEle[retourCaserne('elephant')] = obj;
				    document.getElementById('elephant'+retourCaserne('elephant')).style.backgroundImage = objectSorti;
				    }
				}
				if(quelAnimal(obj) == 2)
				{
				   if(retourCaserne('rhino') != -1)
				  {
				    tabRhino[retourCaserne('rhino')] = obj;
				    document.getElementById('rhino'+retourCaserne('rhino')).style.backgroundImage = objectSorti;
				  }
				}
			}
			if(document.getElementById('plateau'+x+j).style.backgroundImage == "")
				grille[cpt][j] = 0;
			else 
				grille[cpt][j] = parseInt(document.getElementById('plateau'+x+j).style.backgroundImage.substring(14,16),10);
			document.getElementById('plateau'+cpt+j).style.backgroundImage = bgImg;
			cpt++;
			x++;
			console.log("i = "+i);
			console.log("x = "+x);
			if(x <= i){
				bgImg = document.getElementById('plateau'+x+j).style.backgroundImage;}
			}
		grille[cpt][j] = parseInt(backgImg.substring(14,16),10)
		document.getElementById('plateau'+cpt+j).style.backgroundImage = backgImg;
	}


	else if (sens == 'sud')
	{
		cpt = 4;
		x = cpt - 1;
		objectSorti = document.getElementById('plateau'+cpt+j).style.backgroundImage;
		console.log('68');
		while (cpt > i)
		{
			bgImg = document.getElementById('plateau'+x+j).style.backgroundImage;
			if (cpt == 4)
			{
				var obj = parseInt(document.getElementById('plateau'+cpt+j).style.backgroundImage.substring(14,16),10);
				if(quelAnimal(obj) == 1)
				{
					if(retourCaserne('elephant') != -1)
				   {
				    tabEle[retourCaserne('elephant')] = obj;
				    document.getElementById('elephant'+retourCaserne('elephant')).style.backgroundImage = objectSorti;
				    }
				}
				if(quelAnimal(obj) == 2)
				{
					if(retourCaserne('rhino') != -1)
					{
				    	tabRhino[retourCaserne('rhino')] = obj;
				    	document.getElementById('rhino'+retourCaserne('rhino')).style.backgroundImage = objectSorti;
				  	}
				}
			}
			if(document.getElementById('plateau'+x+j).style.backgroundImage == "")
				grille[cpt][j] = 0;
			else 
				grille[cpt][j] = parseInt(document.getElementById('plateau'+x+j).style.backgroundImage.substring(14,16),10);
			document.getElementById('plateau'+cpt+j).style.backgroundImage = bgImg;
			cpt--;
			x--;
			console.log("i = "+i);
			console.log("x = "+x);
			if(x >= i){
				bgImg = document.getElementById('plateau'+x+j).style.backgroundImage;
			}
		}
		grille[cpt][j] = parseInt(backgImg.substring(14,16),10)
		document.getElementById('plateau'+cpt+j).style.backgroundImage = backgImg;
	}

	else if (sens == 'est')
	{
		cpt = 4;
		x = cpt - 1;
		objectSorti = document.getElementById('plateau'+i+cpt).style.backgroundImage;
		while (cpt > j)
		{
			bgImg = document.getElementById('plateau'+i+x).style.backgroundImage;
			if (cpt == 4)
			{
				var obj = parseInt(document.getElementById('plateau'+i+cpt).style.backgroundImage.substring(14,16),10);
				if(quelAnimal(obj) == 1)
				{
					if(retourCaserne('elephant') != -1)
					{
				    	tabEle[retourCaserne('elephant')] = obj;
				    	document.getElementById('elephant'+retourCaserne('elephant')).style.backgroundImage = objectSorti;
				  	}
				}
				if(quelAnimal(obj) == 2)
				{

				  if(retourCaserne('rhino') != -1)
				 {
				    tabRhino[retourCaserne('rhino')] = obj;
				    document.getElementById('rhino'+retourCaserne('rhino')).style.backgroundImage = objectSorti;
				  }
				}
			}
			if(document.getElementById('plateau'+i+x).style.backgroundImage == "")
				grille[i][cpt] = 0;
			else 
				grille[i][cpt] = parseInt(document.getElementById('plateau'+i+x).style.backgroundImage.substring(14,16),10);
			document.getElementById('plateau'+i+cpt).style.backgroundImage = bgImg;
			cpt--;
			x--;
			console.log("j = "+j);
			console.log("x = "+x);
			if(x >= j){bgImg = document.getElementById('plateau'+i+x).style.backgroundImage;}
		}
		grille[i][cpt] = parseInt(backgImg.substring(14,16),10)
		document.getElementById('plateau'+i+cpt).style.backgroundImage = backgImg;
	}
	else
	{
		cpt = 0;
		x = cpt + 1;
		objectSorti = document.getElementById('plateau'+i+cpt).style.backgroundImage;
		while (cpt < j)
		{
			bgImg = document.getElementById('plateau'+i+x).style.backgroundImage;
			if (cpt == 0)
			{
				var obj = parseInt(document.getElementById('plateau'+i+cpt).style.backgroundImage.substring(14,16),10);
				if(quelAnimal(obj) == 1)
				{
				  if(retourCaserne('elephant') != -1)
				 {
				    tabEle[retourCaserne('elephant')] = obj;
				    document.getElementById('elephant'+retourCaserne('elephant')).style.backgroundImage = objectSorti;
				  }
				}
				if(quelAnimal(obj) == 2)
				{
				  if(retourCaserne('rhino') != -1)
				 {
				    tabRhino[retourCaserne('rhino')] = obj;
				    document.getElementById('rhino'+retourCaserne('rhino')).style.backgroundImage = objectSorti;
				  }
				}
			}
			if(document.getElementById('plateau'+i+x).style.backgroundImage == "") 
				grille[i][cpt] = 0;
			else
				grille[i][cpt] = parseInt(document.getElementById('plateau'+j+x).style.backgroundImage.substring(14,16),10);
			document.getElementById('plateau'+i+cpt).style.backgroundImage = bgImg;
			cpt++;
			x++;
			console.log("i = "+i);
			console.log("x = "+x);
			if(x <= j){
				bgImg = document.getElementById('plateau'+i+x).style.backgroundImage;
			}
		}
		grille[i][cpt] = parseInt(backgImg.substring(14,16),10)
		document.getElementById('plateau'+i+cpt).style.backgroundImage = backgImg;
	}
}

function majColonAvecCaseVide(i,j,sens)
{
	var cpt;
	var bgImgTmp;
	var bgImg = document.getElementById('plateau'+i+j).style.backgroundImage;
	document.getElementById('plateau'+i+j).style.backgroundImage = "";
	grille[i][j] = 0;

	if (sens == 'nord')
	{
		cpt = i - 1;
		while (grille[cpt][j] != 0)
		{
			bgImgTmp = document.getElementById('plateau'+cpt+j).style.backgroundImage;
			document.getElementById('plateau'+cpt+j).style.backgroundImage = bgImg;
			grille[cpt][j] = parseInt(bgImg.substring(14,16),10);
			bgImg = bgImgTmp;
			cpt--;
		}
		grille[cpt][j] = parseInt(bgImg.substring(14,16),10);
		document.getElementById('plateau'+cpt+j).style.backgroundImage = bgImg;
	}
	else if (sens == 'sud')
	{
		cpt = i + 1;
		while (grille[cpt][j] != 0)
		{
			bgImgTmp = document.getElementById('plateau'+cpt+j).style.backgroundImage;
			document.getElementById('plateau'+cpt+j).style.backgroundImage = bgImg;
			grille[cpt][j] = parseInt(bgImg.substring(14,16),10);
			bgImg = bgImgTmp;
			cpt++;
		}
		grille[cpt][j] = parseInt(bgImg.substring(14,16),10);
		document.getElementById('plateau'+cpt+j).style.backgroundImage = bgImg;
	}
	else if (sens == 'est')
	{
		cpt = j + 1;
		while (grille[i][cpt] != 0)
		{
			bgImgTmp = document.getElementById('plateau'+i+cpt).style.backgroundImage;
			document.getElementById('plateau'+i+cpt).style.backgroundImage = bgImg;
			grille[i][cpt] = parseInt(bgImg.substring(14,16),10);
			bgImg = bgImgTmp;
			cpt++;
		}
		grille[i][cpt] = parseInt(bgImg.substring(14,16),10);
		document.getElementById('plateau'+i+cpt).style.backgroundImage = bgImg;
	}
	else
	{
		cpt = j - 1;
		while (grille[i][cpt] != 0)
		{
			bgImgTmp = document.getElementById('plateau'+i+cpt).style.backgroundImage;
			document.getElementById('plateau'+i+cpt).style.backgroundImage = bgImg;
			grille[i][cpt] = parseInt(bgImg.substring(14,16),10);
			bgImg = bgImgTmp;
			cpt--;
		}
		grille[i][cpt] = parseInt(bgImg.substring(14,16),10);
		document.getElementById('plateau'+i+cpt).style.backgroundImage = bgImg;
	}
}

function majColonAvecCaseVide2(backgImg,i,j,sens)
{
	var cpt;
	var bgImgTmp;
	var bgImg = backgImg;

	if (sens == 'nord')
	{
		cpt = i;
		while (grille[cpt][j] != 0)
		{
			bgImgTmp = document.getElementById('plateau'+cpt+j).style.backgroundImage;
			document.getElementById('plateau'+cpt+j).style.backgroundImage = bgImg;
			grille[cpt][j] = parseInt(bgImg.substring(14,16),10);
			bgImg = bgImgTmp;
			cpt--;
		}
		grille[cpt][j] = parseInt(bgImg.substring(14,16),10);
		document.getElementById('plateau'+cpt+j).style.backgroundImage = bgImg;
	}
	else if (sens == 'sud')
	{
		cpt = i;
		while (grille[cpt][j] != 0)
		{
			bgImgTmp = document.getElementById('plateau'+cpt+j).style.backgroundImage;
			document.getElementById('plateau'+cpt+j).style.backgroundImage = bgImg;
			grille[cpt][j] = parseInt(bgImg.substring(14,16),10);
			bgImg = bgImgTmp;
			cpt++;
		}
		grille[cpt][j] = parseInt(bgImg.substring(14,16),10);
		document.getElementById('plateau'+cpt+j).style.backgroundImage = bgImg;
	}
	else if (sens == 'est')
	{
		cpt = j;
		while (grille[i][cpt] != 0)
		{
			bgImgTmp = document.getElementById('plateau'+i+cpt).style.backgroundImage;
			document.getElementById('plateau'+i+cpt).style.backgroundImage = bgImg;
			grille[i][cpt] = parseInt(bgImg.substring(14,16),10);
			bgImg = bgImgTmp;
			cpt++;
		}
		grille[i][cpt] = parseInt(bgImg.substring(14,16),10);
		document.getElementById('plateau'+i+cpt).style.backgroundImage = bgImg;
	}
	else
	{
		cpt = j;
		while (grille[i][cpt] != 0)
		{
			bgImgTmp = document.getElementById('plateau'+i+cpt).style.backgroundImage;
			document.getElementById('plateau'+i+cpt).style.backgroundImage = bgImg;
			grille[i][cpt] = parseInt(bgImg.substring(14,16),10);
			bgImg = bgImgTmp;
			cpt--;
		}
		grille[i][cpt] = parseInt(bgImg.substring(14,16),10);
		document.getElementById('plateau'+i+cpt).style.backgroundImage = bgImg;
	}
}


function aGagne(i, j, sens, gagnantProche) {
    var bgImg;
    if (sens == 'nord') {
        if (passeTour == 0) {
            bgImg = document.getElementById('plateau' + gagnantProche + j).style.backgroundImage;
            if (getObjet(bgImg) == 'rhino' && getOrientation(bgImg) == 0) {
				alert('LES RHINOCEROS ONT GAGNÉ');

            } else {
                alert('LES ELEPHANTS ONT GAGNÉ');
            }
        } else {
            bgImg = document.getElementById('plateau' + gagnantProche + j).style.backgroundImage;
            if (getObjet(bgImg) == 'elephant' && getOrientation(bgImg) == 0) {
                alert('LES ELEPHANTS ONT GAGNÉ');
            } else {
                alert('LES RHINOCEROS ONT GAGNÉ');
            }
        }
    } else if (sens == 'est') {
        if (passeTour == 0) {
            bgImg = document.getElementById('plateau' + i + gagnantProche).style.backgroundImage;
            if (getObjet(bgImg) == 'rhino' && getOrientation(bgImg) == 1) {
                alert('LES RHINOCEROS ONT GAGNÉ');
            } else {
                alert('LES ELEPHANTS ONT GAGNÉ');
            }
        } else {
            bgImg = document.getElementById('plateau' + i + gagnantProche).style.backgroundImage;
            if (getObjet(bgImg) == 'elephant' && getOrientation(bgImg) == 1) {
                alert('LES ELEPHANTS ONT GAGNÉ');
            } else {
                alert('LES RHINOCEROS ONT GAGNÉ');
            }
        }
    } else if (sens == 'sud') {
        if (passeTour == 0) {
            bgImg = document.getElementById('plateau' + gagnantProche + j).style.backgroundImage;
            if (getObjet(bgImg) == 'rhino' && getOrientation(bgImg) == 2) {
                alert('LES RHINOCEROS ONT GAGNÉ');
            } else {
                alert('LES ELEPHANTS ONT GAGNÉ');
            }
        } else {
            bgImg = document.getElementById('plateau' + gagnantProche + j).style.backgroundImage;
            if (getObjet(bgImg) == 'elephant' && getOrientation(bgImg) == 2) {
                alert('LES ELEPHANTS ONT GAGNÉ');
            } else {
                alert('LES RHINOCEROS ONT GAGNÉ');
            }
        }
    } else {
        if (passeTour == 0) {
            bgImg = document.getElementById('plateau' + i + gagnantProche).style.backgroundImage;
            if (getObjet(bgImg) == 'rhino' && getOrientation(bgImg) == 3) {
                alert('LES RHINOCEROS ONT GAGNÉ');
            } else {
                alert('LES ELEPHANTS ONT GAGNÉ');
            }
        } else {
            bgImg = document.getElementById('plateau' + i + gagnantProche).style.backgroundImage;
            if (getObjet(bgImg) == 'elephant' && getOrientation(bgImg) == 3) {
                alert('LES ELEPHANTS ONT GAGNÉ');
            } else {
                alert('LES RHINOCEROS ONT GAGNÉ');
            }
        }
    }
	est_fini = 1;
}

function convertirPlateauEnTableau(plateauStr){
    let lignes = plateauStr.split('||').filter(Boolean);

    let plateau = new Array(5).fill(0).map(() => new Array(5).fill(0));

    for (let i = 0; i < lignes.length; i++){
        let valeurs = lignes[i].split('-').filter(Boolean);
        for (let j = 0; j < valeurs.length; j++){
            plateau[i][j] = parseInt(valeurs[j]);
        }
    }

    return plateau;
}

function convertStringToArray(inputString){
    let cleanedStr = inputString.replace(/#/g, '');
    let substrings = cleanedStr.match(/.{1,2}/g);
    let numbers = substrings.map(substring => parseInt(substring));

    return numbers;
}




function enregistrer_partie(){
    var donneesPartie = {
        plateau: affichePlateau(),
		caserne_rhino: afficheCaserneR(),
		caserne_elephant: afficheCaserneE(),
        tour: passeTour,
		est_fini: est_fini
    };

    $.ajax({
        type: "POST",
        url: "enregistrer_partie.php",
        data: donneesPartie,
        success: function(response) {
            alert("La partie a été enregistrée avec succès !");
			window.location.href = "menu.php";
        },
        error: function(xhr, status, error) {
            alert("Une erreur s'est produite lors de l'enregistrement de la partie : " + error);
        }
    });
}

function remplirPlateauEtBases(plateauStr, caserneRhinoStr, caserneElephantStr){
    var plateau = convertirPlateauEnTableau(plateauStr);
    var caserneRhino = convertStringToArray(caserneRhinoStr);
    var caserneElephant = convertStringToArray(caserneElephantStr);

    for(var i = 0; i < 5; i++){
        for(var j = 0; j < 5; j++){
            if(plateau[i][j] !== 0){
                grille[i][j] = plateau[i][j];

				// on affiche une image d'éléphant
                if (plateau[i][j] === 10){
                    document.getElementById('plateau'+i+j).style.backgroundImage = "url('./images/10.gif')";
                } 
				else if(plateau[i][j] === 11){
					document.getElementById('plateau'+i+j).style.backgroundImage = "url('./images/11.gif')";
				}
				else if(plateau[i][j] === 12){
					document.getElementById('plateau'+i+j).style.backgroundImage = "url('./images/12.gif')";
				}
				else if(plateau[i][j] === 13){
					document.getElementById('plateau'+i+j).style.backgroundImage = "url('./images/13.gif')";
				}

				//on affiche une image de rhino
				else if (plateau[i][j] === 20){
                    document.getElementById('plateau'+i+j).style.backgroundImage = "url('./images/20.gif')";
                }
				else if (plateau[i][j] === 21){
                    document.getElementById('plateau'+i+j).style.backgroundImage = "url('./images/21.gif')";
                }
				else if (plateau[i][j] === 22){
                    document.getElementById('plateau'+i+j).style.backgroundImage = "url('./images/22.gif')";
                }
				else if (plateau[i][j] === 23){
                    document.getElementById('plateau'+i+j).style.backgroundImage = "url('./images/23.gif')";
                }

				// Si la valeur est 30, on affiche une image de rocher
				else if (plateau[i][j] === 30){
                    
                    document.getElementById('plateau'+i+j).style.backgroundImage = "url('./images/30.gif')";
                }
            }
			else{
                grille[i][j] = 0;
                document.getElementById('plateau'+i+j).style.backgroundImage = "";
            }
        }
    }

    for(var i = 0 ; i < 5 ; i++){
        if(caserneRhino[i] !== 0){
            tabRhino[i] = caserneRhino[i];
			if (tabRhino[i] === 23) {
				// Si la valeur est 23, on affiche une image de rhinocéros
				document.getElementById('rhino'+i).style.backgroundImage = "url('./images/23.gif')";
			}
        }
        else{
            tabRhino[i] = 0;
			document.getElementById('rhino'+i).style.backgroundImage = "";
        }

        if(caserneElephant[i] !== 0){
            tabEle[i] = caserneElephant[i];
			if (tabEle[i] === 11) {
				// Si la valeur est 11, on affiche une image d'éléphant
				document.getElementById('elephant'+i).style.backgroundImage = "url('./images/11.gif')";
			}
        }
        else{
            tabEle[i] = 0;
			document.getElementById('elephant'+i).style.backgroundImage = "";
        }
    }
}

function init(){
	var divTourJoueur = document.getElementById('tourJoueur');
	if (passeTour === 0) {
        divTourJoueur.textContent = "C'est le tour des Éléphants";
    } else {
        divTourJoueur.textContent = "C'est le tour des Rhinocéros";
    }

	initElephant();
	initRhino();
	initPlateau();
	initGrille();
	initTabEle();
	initTabRhino();
}