var feld =  new Array();
var spielfeldsize = 5;
var score = 0;
var animtcount = 0;
for (let y = 0; y < spielfeldsize; y++) {
  feld[y] = [];
  for (let x = 0; x < spielfeldsize; x++) {
    var nextnummer = Math.round(Math.random());
    if (nextnummer == 1) {
      var wenigerfeinde  = Math.round(Math.random());
      if (wenigerfeinde == 1) {
        if (nextnummer == 1) {
          var feindgen = Math.round(Math.random());
          if (feindgen == 1) {
            nextnummer = 3;
            //console.log(nextnummer);
            feld[y][x] = nextnummer;
          } else {
            nextnummer = 1;
            //console.log(nextnummer);
            feld[y][x] = nextnummer;
          }
        } else {
          nextnummer = 0;
          //console.log(nextnummer);
          feld[y][x] = nextnummer;  
        }
      } else {
        nextnummer = 0;
        //console.log(nextnummer);
        feld[y][x] = nextnummer;  
      }
    } else {
      //console.log(nextnummer);
      feld[y][x] = nextnummer; 
    }
  }
}

var player = {
	x: 1,
	y: 2,
  img: new Image(),

	//score: 0,
	setPlayer: function() {
		feld[this.y][this.x] = 2;
	},
	liftPlayer: function() {
		feld[this.y][this.x] = 0;
	},
  movePlayer: function(dx, dy) {
    if (freiesFeld(player.x+dx, player.y+dy)) {
      player.liftFigur();
      player.x += dx;
      player.y += dy;
      player.digGold();
      player.setFigur();
    }
  },
	digGold: function() {
		if ( feld[this.y][this.x] == -3 ) {
			this.score++;
		}
	}
}

class Feind {
  constructor(name) {
    this.img = new Image();
    this.img.src = name;
    
  }
  setFeind() {
		  feld[this.y][this.x] = 3;
	  }
}

var sieg = 0;
var msg;
var indx=[0,0];
var gegnerAnzahl = 0;

/** Zähler für die game loop */
var counter = 0;

var kachel = new Image();
kachel.src = "grass5.png";

var stein = new Image();
stein.src = "stone2.png";

//var figur = new Image();
player.img.src = "Skeleton test.png";

var feindIdel = new Feind("Feind Idle.png");


var offsetX = 30*spielfeldsize;
var offsetY = 0;
var canvas, context;

function init() {
  canvas = document.getElementById("spielfeld");
  context = canvas.getContext("2d");
  context.canvas.width = window.innerWidth;
  context.canvas.height = window.innerHeight;
  //canvas.addEventListener("keydown", handleKeydown);
  canvas.focus();
  player.setPlayer(); // Spielerfigur auf Startposition setzen 
}

function Scoreanzeige() {
  context.font = "30px Zen Kurenaido";
  context.fillText("Score: "+score, 10, 30);
}

function gegnerCheck() {
/** Gegner check */
  var feldTest = 3;

  for (var i=0; i<feld.length; i++) {
    for (var k=0; k<feld[i].length; k++) {
      if (feld[i][k] === feldTest) {
        //indx = [i,k];
        gegnerAnzahl++;
      }  
    }
  }

  if (typeof indx[0] == "undefined" || typeof indx[1] == "undefined") { 
    msg = ("Not found");
  }
  if (gegnerAnzahl == 0) {
    msg = "Sieg";
    sieg = 1;
  } else {
    msg = "Kein Sieg";
    sieg = 0;
  }
  console.log(indx);
  console.log(msg);
}

function siegAnzeige() {
  alert("Sieg");
}

function zeichneFeld() {
  console.log("gametick");
  animtcount++;
  if (animtcount>9) {
    animtcount = 0;
  }
 context.clearRect(0,0,canvas.width,canvas.height);
 Scoreanzeige();
 for (let i=0;i<feld.length;i++)
  for (let j=0;j<feld[i].length;j++) {
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
	if (feld[i][j]==2) //Spielplayer
	{
    context.drawImage(kachel,isoX,isoY,kachel.width,kachel.height/0.8);
    //isoY -= stein.height/1.2-50;
    let drawFrameX = 0;
    for (let i = 0; i < animtcount; i++) {
      drawFrameX = drawFrameX + 24;
      
    }
    context.drawImage(player.img,24+drawFrameX,0,24,player.img.height,isoX+40,isoY-10,24,player.img.height);

	}
  if (feld[i][j]==3) //Feind
	{
    context.drawImage(kachel,isoX,isoY,kachel.width,kachel.height/0.8);
    //isoY -= stein.height/1.2-50;
    let drawFrameX = 0;
    for (let i = 0; i < animtcount; i++) {
      drawFrameX = drawFrameX + 24;
      
    }
    context.drawImage(feind,24+drawFrameX,0,24,feind.height,isoX+40,isoY-10,24,feind.height);

	}
  }
  update();
  setTimeout(zeichneFeld, 100);
}

function update() {
  console.log("A: "+gegnerAnzahl);
  switch (sieg) {
    case 0:
      counter++;
      gegnerAnzahl = 0;
      gegnerCheck();
      break;
    case 1:
      console.log(sieg);
      siegAnzeige();
      break;
    default:
    break;
  }
}

function animation(aniType, ) {
  switch (aniType) {
    case value:
      
      break;
  
    default:
      break;
  }
}

/**
 * ReMOVE
 *

 function punchUp() {
  if (feld[player.y-1][player.x]==3)
  {
    feld[player.y][player.x];
    player.y--;
    feld[player.y][player.x] = 0;
    player.y++;
    feld[player.y][player.x] = 2;
    console.log("punchUp");
    score++;
    console.log("Score: "+score);
    update();
  }
}

function punchRight() {
  if (feld[player.y][player.x+1]==3) {
    feld[player.y][player.x];
    player.x++;
    feld[player.y][player.x] = 0;
    player.x--;
    feld[player.y][player.x] = 2;
    console.log("punchRight");
    score++;
    console.log("Score: "+score);
    update();
  }
}
 
function punchDown() {
  if (feld[player.y+1][player.x]==3)
  {
    feld[player.y][player.x];
    player.y++;
    feld[player.y][player.x] = 0;
    player.y--;
    feld[player.y][player.x] = 2;
    console.log("punchDown");
    score++;
    console.log("Score: "+score);
    update();
  }
}
 
function punchLeft() {
  if (feld[player.y][player.x-1]==3)
  {
    feld[player.y][player.x];
    player.x--;
    feld[player.y][player.x] = 0;
    player.x++;
    feld[player.y][player.x] = 2;
    console.log("punchLeft");
    score++;
    console.log("Score: "+score);
    update();
  }
}
*/

window.onkeydown = function (e) {
  var code = e.keyCode ? e.keyCode : e.which;
  switch (code) {
    default:
      break;
    //move
    case 87:
      player.movePlayer(0,-1);
      break;
    case 83:
      player.movePlayer(0,1);
      break;
    case 68:
      player.movePlayer(1,0);
      break;
    case 65:
      player.movePlayer(-1,0);
      break;
    //punch
    case 104:
      player.punchFeind(0,-1);
      break;
    case 98:
      player.punchFeind(0,1);
      break;
    case 102:
      player.punchFeind(1,0);
      break;
    case 100:
      player.punchFeind(-1,0);
      break;
  }
}