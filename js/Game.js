class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }
    // creating sprites and adding images 
    car1 = createSprite(100,200);
    car1.addImage("car1",car1I);
    car2 = createSprite(300,200);
    car2.addImage("car2",car2I);
    car3 = createSprite(500,200);
    car3.addImage("car3",car3I);
    car4 = createSprite(700,200);
    car4.addImage("car3",car4I);
    cars = [car1, car2, car3, car4];
  }

  play(){
    form.hide();

    // here we are using player class to cal the function beacuse its a static function
    Player.getPlayerInfo();
    // its a non-static function it is called through individual players
    player.getCarsEnd();
    
    if(allPlayers !== undefined){
     
      background(groundI);
    
      // Adding the track image
      image(trackI, 0, -displayHeight*4, displayWidth, displayHeight*5)
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 190;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 230;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index){
          stroke(10);
          fill("red");
          ellipse(x,y,60,60);
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y
        }
       
       
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }
    // Making game to end
    if(player.distance > 4220){
         gameState = 2
         player.rank += 1 ;
         Player.updateCarsEnd(player.rank)
         textSize(35);
         fill("white");
         text("Rank : " + player.rank , displayWidth/2 - 50 , displayHeight/2 );
    }
    drawSprites();
    textSize(35);
    fill("white");
    text("Rank : " + player.rank , displayWidth/2 - 50 , displayHeight/2 );
  }
  end(){
    console.log("Game Ended");
    console.log(player.rank);
  }
}
// static functions are linked to the entire class and not individual objects 