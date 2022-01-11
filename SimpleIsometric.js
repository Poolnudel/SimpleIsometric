var feld =  new Array();
var eingabe = prompt("Wie groß soll das Feld sein?");
var spielfeldsize = eingabe;
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
    /**Das ergibt alles keinen Sinn
     * help
     * me
     */
    if (freiesFeld(player.x+dx, player.y+dy)) {
      player.liftPlayer();
      player.x += dx;
      player.y += dy;
      player.setPlayer();
    }
  },
  punchFeind: function(dx, dy) {
    var zielx = this.x+dx;
    var ziely = this.y+dy;
      if (feindFeld(zielx,ziely)) {
        console.log("punch");
        score++;
        //feld[zielx][ziely] = 0;
        feld[this.y+dy][this.x+dx] = 0;
      }
  },
	digGold: function() {
		if ( feld[this.y+dy][this.x+dx] == 3 ) {
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
var zeit = 0;
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


var offsetX = 25*spielfeldsize;
var offsetY = -200;
var canvas, context;

function init() {
  canvas = document.getElementById("spielfeld");
  context = canvas.getContext("2d");
  context.canvas.width = window.innerWidth;
  context.canvas.height = window.innerHeight;
  //canvas.addEventListener("keydown", handleKeydown);
  canvas.focus();
  player.setPlayer(); // Spielerfigur auf Startposition setzen 
  zeit = Math.round(spielfeldsize*30+(15*Math.random()));
}

function Scoreanzeige() {
  context.font = "30px Zen Kurenaido";
  context.fillText("Score: "+score, 10, 30);
}

function zeitAnzeige() {
  context.font = "30px Zen Kurenaido";
  context.fillText("Zeit: "+zeit, 10, 60);
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
  //console.log(indx);
  //console.log(msg);
}

function freiesFeld(x,y) 
{
  if ( y>=0 && y<feld.length && x>=0 && x<feld[y].length ) 
  {
	return ( feld[y][x] <= 0 ); 
  } 
  else 
  {
	return false;
  }
}

function feindFeld(x,y) 
{
  if (feld[y][x] == 3) {
  //if ( y==3 && x==3 )
  console.log("Feind Feld: "+x+y);
	return true; //( feld[y][x] == 3 )
  } else {
  console.log("Feind Feld: "+x+y);
	return false;
  }
}

function siegAnzeige() {
  context.clearRect(0,0,canvas.width,canvas.height);
  siegText();
  playerAnzeige();
  setTimeout(siegAnzeige, 100);
}

function lossAnzeige() {
  context.clearRect(0,0,canvas.width,canvas.height);
  lossText();
  gegnerAnzeige();
  setTimeout(lossAnzeige, 100);
}

function playerAnzeige() {
  for (let i=0;i<feld.length;i++)
    for (let j=0;j<feld[i].length;j++) {
      let x = j*kachel.height+offsetX;
      let y = i*kachel.height+offsetY;
      let isoX = x-y + offsetX;
      let isoY = (x+y)/2;
      let drawFrameX = 0;
      for (let i = 0; i < animtcount; i++) {
        drawFrameX = drawFrameX + 24;
      }
      context.drawImage(player.img,24+drawFrameX,0,24,player.img.height,isoX+40,isoY-10,24,player.img.height);
    } 
}

function siegText() {
  context.font = "50px Zen Kurenaido";
  context.fillText("SIEG!", window.innerWidth/2, window.innerHeight/2);
  context.fillText("Score: "+score, window.innerWidth/2, 36+window.innerHeight/2);
}

function gegnerAnzeige() {
  for (let i=0;i<feld.length;i++)
    for (let j=0;j<feld[i].length;j++) {
      let x = j*kachel.height+offsetX;
      let y = i*kachel.height+offsetY;
      let isoX = x-y + offsetX;
      let isoY = (x+y)/2;
      let drawFrameX = 0;
      for (let i = 0; i < animtcount; i++) {
        drawFrameX = drawFrameX + 24;
      }
      context.drawImage(feindIdel.img,24+drawFrameX,0,24,feindIdel.img.height,isoX+40,isoY-10,24,feindIdel.img.height);
    } 
}

function lossText() {
  context.font = "50px Zen Kurenaido";
  context.fillText("LOSS!", window.innerWidth/2, window.innerHeight/2);
  context.fillText("Score: "+score, window.innerWidth/2, 36+window.innerHeight/2);
}

function zeichneFeld() {
  //console.log("gametick");
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
    grassDraw(isoX,isoY);
	}
	if (feld[i][j]==1) //Hindernis
	{
    steinDraw(isoX,isoY);
	}
	if (feld[i][j]==2) //Spielplayer
	{
    playerDraw(isoX,isoY);
	}
  if (feld[i][j]==3) //Feind
	{
    feindDraw(isoX,isoY);
	}
  }
  zeitAnzeige();
  update();
  setTimeout(zeichneFeld, 100);
  if (zeit <= 0) {
    sieg = 2;
  } else {
    zeit = zeit - 1;
    console.log("Zeit: "+zeit);
  }
}

function grassDraw(isoX,isoY) {
  context.drawImage(kachel,isoX,isoY,kachel.width,kachel.height/0.8);
}

function steinDraw(isoX,isoY) {
  context.drawImage(stein,isoX,isoY,stein.width,stein.height/1.2);
  isoY -= stein.height/1.2-50;
  context.drawImage(stein,isoX,isoY,stein.width,stein.height/1.2);
}

function playerDraw(isoX,isoY) {
  
  context.drawImage(kachel,isoX,isoY,kachel.width,kachel.height/0.8);
  //isoY -= stein.height/1.2-50;
  let drawFrameX = 0;
  for (let i = 0; i < animtcount; i++) {
    drawFrameX = drawFrameX + 24;
  }
  context.drawImage(player.img,24+drawFrameX,0,24,player.img.height,isoX+40,isoY-10,24,player.img.height);
}

function feindDraw(isoX,isoY) {
  
  context.drawImage(kachel,isoX,isoY,kachel.width,kachel.height/0.8);
  //isoY -= stein.height/1.2-50;
  let drawFrameX = 0;
  for (let i = 0; i < animtcount; i++) {
    drawFrameX = drawFrameX + 24;
    
  }
  context.drawImage(feindIdel.img,24+drawFrameX,0,24,feindIdel.img.height,isoX+40,isoY-10,24,feindIdel.img.height);

}

function update() {
  
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
    case 2:
      console.log("loss");
      lossAnzeige();
    default:
    break;
  }
}

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
      console.log("punchKey");
      break;
    case 98:
      player.punchFeind(0,1);
      console.log("punchKey");
      break;
    case 102:
      player.punchFeind(1,0);
      console.log("punchKey");
      break;
    case 100:
      player.punchFeind(-1,0);
      console.log("punchKey");
      break;
  }
}