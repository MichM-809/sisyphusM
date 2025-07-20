/* VARIABLES */
let screen= 0;
let score= 0;
let beginButton;
let nextButton;
let restartBut;
let stopBut;
let roller;
let bolt1, bolt2, bolt3;
let rollerImg;
let bolt1Img, bolt2Img, bolt3Img;


/* PRELOAD LOADS FILES */
function preload(){
}



/* SETUP RUNS ONCE */
function setup() {
  createCanvas(400,400);

  // Home screen
  background('lightBlue');
  textAlign(CENTER);
  textSize(22);
  text('One Must Imagine Sisyphus Happy', 200, 90);

  nextButton= new Sprite(width/2, height/2 + 100);
  nextButton.w= 100;
  nextButton.h= 40;
  nextButton.color= 'Moccasin'
  nextButton.text= 'NEXT'
  nextButton.collider= 'k'

  // rule screen
  beginButton= new Sprite(-300,-300);
  beginButton.w= 100;
  beginButton.h= 40;
  beginButton.color= 'Moccasin'
  beginButton.text= 'BEGIN'
  beginButton.collider= 'k'

  //try again button
  restartBut= new Sprite(-301,-301);
  restartBut.w= 100;
  restartBut.h= 40;
  restartBut.color= 'Moccasin'
  restartBut.text= 'Restart'
  restartBut.collider= 'k'

  //Give up button
  stopBut= new Sprite(-320, -320);
  stopBut.w= 100;
  stopBut.h= 40;
  stopBut.color= 'Moccasin'
  stopBut.text= 'Home'
  stopBut.collider= 'k'

  //game objects
  roller= new Sprite(-150, -150, 'k');
  roller.color= 'grey'

  bolt1= new Sprite(-100, -100);
  bolt1.d=30;
  bolt1.color= 'yellow';
 

  bolt2= new Sprite(70, -70);
  bolt2.d=30;
  bolt2.color= 'yellow';
  

  bolt3= new Sprite(-130, -130);
  bolt3.d=30;
  bolt3.color= 'yellow';
}

/* DRAW LOOP REPEATS */
function draw() {
//home screen
  if (screen == 0) {
    textSize(18)
  }
    //transitioning to rule screen
  if (nextButton.mouse.presses()){
    background('lightSkyBlue');
    nextButton.pos= {x:-50, y:-50};
    beginButton.pos= {x: width/2, y: height/2 + 100};
     textSize(16)
    fill('black')
    text("You are tasked with rolling a boulder up a mountain. \nYou have to avoid all of Zeus's lightning bolts \nto get to the top of the mountain. \nUse the left and right arrows move your boulder. ", 200, 100);
    
    
    screen=1;
   }
// transitioning to game screen
  if (beginButton.mouse.presses()){
    background('lightGray');
    score=0
    beginButton.pos= {x:-200, y:-200};
    bolt1.y= 0;
    bolt1.x= random(width);
    roller.pos= {x:200, y: 380};

    screen= 2;

  }
//game screen
  if (screen== 2) {
    
    //move roller
     background('lightGray');
    if (kb.pressing('left')){
      roller.vel.x= -3.5;
    } else if (kb.pressing('right')){
      roller.vel.x= 3.5;
    } else {roller.vel.x= 0;}

    //stop roller form going off screen
    if (roller.x <30) {
      roller.x= 30;
    } else if (roller.x >370){
      roller.x= 370;
    }

    //bolt1 come in
    bolt1.collider= 'd'
    bolt1.vel.y= random(2,5);
    bolt1.direction= 'down';

    //if bolt reaches bottom 
    if (bolt1.y >= height) {
      bolt1.y= 0;
      bolt1.x= random(width);
      bolt1.vel.y= random(2,5);
      bolt1.direction= 'down';
      score= score +1; 
    }

    // Levels
    if (score < 10) {
    textSize(12);
    text('Level 1', 40, 40);
    }

    if (score >= 10 && score < 30) {
      background('Gainsboro')
      textSize(12);
      text('Level 2', 40, 40);
       text('Level 1', -40, -40);
      }

    if (score >= 30) {
      background('LightSteelBlue')
      textSize(12);
      text('Level 3', 40, 40);
       text('Level 2', -40, -40);
      }
    
    //Make game harder at certain scores
    if(score>= 5){
      bolt1.vel.y= random(3,7);
      bolt2.collider= 'd'
      bolt2.vel.y= random(2,5);

      if (bolt2.y >= height){
        bolt2Added();
      }
    }
      
    if(score>= 10){
      bolt3.collider= 'd'
      bolt3.vel.y= random(2,5);
      bolt1.vel.y= random(4,8);
      bolt2.vel.y= random(3,7);

      if (bolt3.y >= height) {
        bolt3Added();
    }
    }

    if (score>= 20) {
      bolt1.vel.y= random(5,9);
      bolt2.vel.y= random(4,8);
      bolt3.vel.y= random(3,7);
    }

    if (score >= 30) {
      bolt1.vel.y= random(5,10);
      bolt2.vel.y= random(5,9);
      bolt3.vel.y= random(3,8);
    }


    // Lose if bolts hit roller
    if (bolt1.collides(roller)){
          score= -1
        }
    
    if (bolt2.collides(roller)){
      score= -1
    }
    
    if (bolt3.collides(roller)){
      score= -1
    }
    
    if (score== -1){
     screen= 3
    }

    //show score
    textSize(12);
    text('Score= ' + score, 40, 20);

    //win if score is 60
    if (score == 60) {
      screen = 4;
    }


}//gamescreenbracket

  // you win screen
  if (screen == 4){
    background('lightBlue');
    endGame();
    textSize(16);
    fill('black');
    text('Congradulations! \n You reached the top of this mountain \nbut you still have more mountains to climb.', 200, 90);
    restartBut.pos = {x: 100, y: height/2 + 100};
    stopBut.pos = {x: 300, y: height/2 + 100};
  }

  if (stopBut.mouse.presses()) {
    background('lightBlue');
    text('Congratulations! \n You reached the top of this mountain \nbut you still have more mountains to climb.', -200, -90);
    restartBut.pos = {x: -301, y: -301};
    stopBut.pos = {x: -320, y: -320};
    textSize(22);
    text('One Must Imagine Sisyphus Happy', 200, 90);
    nextButton.pos = {x: width/2, y: height/2 + 100};
    screen = 0;
  }

  //you lose screen
  if (screen == 3){
    background('LightSlateGrey');
    endGame();
    textSize(14);
    fill('white');
    text("Zeus's bolt took you off balance. \nYou slip and the boulder rolls all the way back to the beginning. \nClick restart to start climbing again.",
          200, 90);
    restartBut.pos = {x: width/2, y: height/2 + 100};
  }

  if (restartBut.mouse.presses()) {
    background('lightSkyBlue');
    text("Zeus's bolt took you off balance. \nYou slip and the boulder rolls all the way back to the beginning. \nClick restart to start climbing again.",
      -200, -90);
    restartBut.pos = {x: -301, y: -301};
    stopBut.pos = {x: -320, y: -320};
    beginButton.pos = {x: width/2, y: height/2 + 100};
    fill('black');
    textSize(16);
    text("You are tasked with rolling a boulder up a mountain. \nYou have to avoid all of Zeus's lightning bolts \nto get to the top of the mountain. \nUse the left and right arrows move your boulder. ", 200, 100);
    score = 0;
    screen = 1;
  }
}// draw

/* FUNCTIONS */

function bolt2Added(){
  bolt2.y= 0;
  bolt2.x= random(width);
  bolt2.vel.y= random(2,5);
  bolt2.direction= 'down';
  bolt2.collider= 'd';
}

function bolt3Added(){
  bolt3.y= 0;
  bolt3.x= random(width);
  bolt3.vel.y= random(2,5);
  bolt3.direction= 'down';
  bolt3.collider= 'd';
}

function endGame(){
  bolt1.vel.y=0
  bolt1.collider= 's'
  bolt1.pos= {x:-100, y:-100};

  bolt2.vel.y=0
  bolt2.collider= 's'
  bolt2.pos= {x:-170, y:-170};

  bolt3.vel.y=0
  bolt3.collider= 's'
  bolt3.pos= {x:-130, y:-130};
  roller.pos= {x:-200, y: -200};
  text('Score= ' + score, -40, -20);
}