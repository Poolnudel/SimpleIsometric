var feld =  new Array();
var spielfeldsize = 5;
var score = 0;
var animtcount = 0;
for (let y = 0; y < spielfeldsize; y++) {
  feld[y] = [];
  for (let x = 0; x < spielfeldsize; x++) {
    var nextnummer = Math.round(Math.random());
    //console.log(nextnummer);
    feld[y][x] = nextnummer;
  }
}
var figurX = 1;
var figurY = 2;
feld[figurY][figurX] = 2;

var kachel = new Image();
var stein = new Image();
var figur = new Image();
kachel.src = "grass5.png"; 
//kachel.src = "kachel.gif";
stein.src = "stone2.png"; 
//stein.src = "stein.gif";
figur.src = "Skeleton Idle.gif";
//figur.src = "dirt1.png"; 
//figur.src = "figur.gif";
var offsetX = 30*spielfeldsize;
var offsetY = 0;
var canvas, context;

function init() {
  canvas = document.getElementById("spielfeld");
  context = canvas.getContext("2d");
  context.canvas.width = window.innerWidth;
  context.canvas.height = window.innerHeight;
}

function Scoreanzeige() {
  context.font = "30px Zen Kurenaido";
  context.fillText("Score: "+score, 10, 30);
}

function zeichneFeld() {
  console.log("gametick");
  animtcount++;
  if (animtcount>10) {
    animtcount = 0;
  }
 context.clearRect(0,0,canvas.width,canvas.height);
 Scoreanzeige();
 for (let i=0;i<feld.length;i++)
  for (let j=0;j<feld[i].length;j++) 
  {
	let x = j*kachel.height+offsetX;
	let y = i*kachel.height+offsetY;
  let isoX = x-y + offsetX;
  let isoY = (x+y)/2;
	if (feld[i][j]==0)	//normale Kachel
	{
    //isoY += 10;
	  context.drawImage(kachel,isoX,isoY,kachel.width,kachel.height/0.8);
	}
	if (feld[i][j]==1) //Hindernis
	{
    context.drawImage(stein,isoX,isoY,stein.width,stein.height/1.2);
    isoY -= stein.height/1.2-50;
	  context.drawImage(stein,isoX,isoY,stein.width,stein.height/1.2);
	}
	if (feld[i][j]==2) //Spielfigur
	{
    context.drawImage(kachel,isoX,isoY,kachel.width,kachel.height/0.8);
    //isoY -= stein.height/1.2-50;
	  context.drawImage(figur,isoX+40,isoY-10,figur.width,figur.height);
	}
  }
}

/**
 * MOVE
 */

function moveUp() {
 if (figurY>0 && feld[figurY-1][figurX]==0)
 {
   feld[figurY][figurX] = 0;
   figurY--;
   feld[figurY][figurX] = 2;
   console.log("Figur Y: "+figurY);
   console.log("Figur X: "+figurX);
   zeichneFeld();
 }
}

function moveRight() {
 if (figurX<feld[figurY].length && feld[figurY][figurX+1]==0)
 {
   feld[figurY][figurX] = 0;
   figurX++;
   feld[figurY][figurX] = 2;
   console.log("Figur Y: "+figurY);
   console.log("Figur X: "+figurX);
   zeichneFeld();
 }
}

function moveDown() {
 if (figurY<feld.length && feld[figurY+1][figurX]==0)
 {
   feld[figurY][figurX] = 0;
   figurY++;
   feld[figurY][figurX] = 2;
   console.log("Figur Y: "+figurY);
   console.log("Figur X: "+figurX);
   zeichneFeld();
 }
}

function moveLeft() {
 if (figurX>0 && feld[figurY][figurX-1]==0)
 {
   feld[figurY][figurX] = 0;
   figurX--;
   feld[figurY][figurX] = 2;
   console.log("Figur Y: "+figurY);
   console.log("Figur X: "+figurX);
   zeichneFeld();
 }
}

/**
 * ReMOVE
 */

 function punchUp() {
  if (feld[figurY-1][figurX]==1)
  {
    feld[figurY][figurX];
    figurY--;
    feld[figurY][figurX] = 0;
    figurY++;
    feld[figurY][figurX] = 2;
    console.log("punchUp");
    score++;
    console.log("Score: "+score);
    zeichneFeld();
  }
}

function punchRight() {
  if (feld[figurY][figurX+1]==1) {
    feld[figurY][figurX];
    figurX++;
    feld[figurY][figurX] = 0;
    figurX--;
    feld[figurY][figurX] = 2;
    console.log("punchRight");
    score++;
    console.log("Score: "+score);
    zeichneFeld();
  }
}
 
function punchDown() {
  if (feld[figurY+1][figurX]==1)
  {
    feld[figurY][figurX];
    figurY++;
    feld[figurY][figurX] = 0;
    figurY--;
    feld[figurY][figurX] = 2;
    console.log("punchDown");
    score++;
    console.log("Score: "+score);
    zeichneFeld();
  }
}
 
function punchLeft() {
  if (feld[figurY][figurX-1]==1)
  {
    feld[figurY][figurX];
    figurX--;
    feld[figurY][figurX] = 0;
    figurX++;
    feld[figurY][figurX] = 2;
    console.log("punchLeft");
    score++;
    console.log("Score: "+score);
    zeichneFeld();
  }
}


window.onkeydown = function (e) {
  var code = e.keyCode ? e.keyCode : e.which;
  switch (code) {
    default:
      break;
    //move
    case 87: //38
      moveUp();
      break;
    case 83: //40
      moveDown();
      break;
    case 68: //39
      moveRight();
      break;
    case 65: //37
      moveLeft();
      break;
    //punch
    case 104:
      punchUp();
      break;
    case 98:
      punchDown();
      break;
    case 102:
      punchRight();
      break;
    case 100:
      punchLeft();
      break;
  }
}