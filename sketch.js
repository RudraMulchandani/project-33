const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope, rope2, rope3, fruit,ground;
var fruit_con;
var fruit_con_2;


var bg_img;
var food;
var rabbit;

var button, button2, button3, blower;
var bunny;
var blink,eat,sad;
var mute_btn;

var canW,canH;

var fr,rope2;

var bk_song;
var cut_sound;
var sad_sound;
var eating_sound;
var air;
var bubble,bubble_Img;
var shelf;

function preload()
{
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');



  blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  eat = loadAnimation("eat_0.png" , "eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png");

  bubble_Img = loadImage("bubble.png");
  
  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping= false;
  eat.looping = false; 
}

function setup() {  
 createCanvas(500,800);
  frameRate(80);

 

  engine = Engine.create();
  world = engine.world;
  
  button = createImg('cut_btn.png');
  button.position(200,320);
  button.size(50,50);
 

  button2 = createImg('cut_btn.png');
  button2.position(30,420);
  button2.size(50,50);
  button2.mouseClicked(drop);

  
  rope = new Rope(4,{x:230,y:330});
  rope2 = new Rope(4,{x:50, y:450});
  

  ground = new Ground(250,height-10,width,20);

  blink.frameDelay = 20;
  eat.frameDelay = 20;

  bunny = createSprite(270,100,100,100);
  bunny.scale = 0.2;

  bunny.addAnimation('blinking',blink);
  bunny.addAnimation('eating',eat);
  bunny.addAnimation('crying',sad);
  bunny.changeAnimation('blinking');
  
var fruit_options={
  restitution:0.8
}

  fruit = Bodies.circle(100,400,15,fruit_options);
  World.add(world,fruit);


  fruit_con = new Link(rope,fruit);
  fruit_con_2 = new Link(rope2,fruit);

  bubble = createSprite(200,460,20,20);
  bubble.addImage(bubble_Img);
  bubble.scale=0.1;

  shelf=new Ground(300,170,100,10);


  ellipseMode(RADIUS);
  textSize(50)
  
}

function draw() 
{
  background(51);
  image(bg_img,0,0,displayWidth+80,displayHeight);
  Engine.update(engine);
  push();
  imageMode(CENTER);
  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }
  pop();

  rope.show();
  rope2.show();

  shelf.show();
 


  ground.show();

  

  if(collide(fruit,bunny,80)==true)
  {
    remove_rope();
    bubble.visible=false;
    World.remove(engine.world,fruit);
    bunny.changeAnimation('eating');
    fruit=null;
  }

  if(collide(fruit,bubble,40)==true)
  {
    engine.world.gravity.y=-1;
    bubble.position.x=fruit.position.x;
    bubble.position.y=fruit.position.y;
  }


  drawSprites();
}

function drop()
{
  rope2.break();
  fruit_con_2.detach();
  fruit_con_2= null; 
}




function collide(body,sprite)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=80)
            {
              World.remove(engine.world,fruit);
               fruit = null;
               return true; 
            }
            else{
              return false;
            }
         }
}

function remove_rope(){
  rope.break();
  fruit_con.detach();
  fruit_con=null;
}
