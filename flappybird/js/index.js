var objContainer = document.getElementById("container");
var objBird = document.getElementById("bird");
var objGameOver = document.getElementById("gameOver");
var objPoints = document.getElementById("points");
topPos=0;
leftPos=0;
coef=1;
framerate=false;
framerate_jump=false;
framerate_pipes = false;
framerate_addPipes = false;
framerate_collision = false;
endOn=true;

retry();


clearInterval(framerate);
framerate = setInterval(upBird,1000/30);

function upBird() {
  if(objBird.offsetTop < (objContainer.offsetHeight-30)){
    objBird.style.top = objBird.offsetTop + 1*coef + "px";
    coef+=0.15;
  }
    
    else{
      objBird.style.top = objContainer.offsetHeight-30+"px";
      clearInterval(framerate);
      endOn=false;
      objGameOver.style.zIndex = "100";
      objGameOver.style.opacity = "1";
      objBird.style.background = "url(http://www.memes.at/faces/forever_alone_face_only.jpg)";
      objBird.style.backgroundSize = "100%"; 
    }
  }
  
function jump() {
  clearInterval(framerate);
  coef=5
  ;
  clearInterval(framerate_jump);
  framerate_jump = setInterval(doJump,1000/30);
}


function doJump() {
  
  if(objBird.offsetTop > 0 && coef>1 && endOn){
     objBird.style.top = objBird.offsetTop - 1*coef + "px";
    coef-=0.3;
  }
  
  else{
    clearInterval(framerate_jump);
    coef=1;
    clearInterval(framerate);
    framerate = setInterval(upBird,1000/30);}
}


clearInterval(framerate_addPipes);
framerate_addPipes = setInterval(addPipe,3000);

function addPipe() {
  if(endOn){
    pipe = document.createElement("div");
    pipe.setAttribute("class","pipe");
    objContainer.appendChild(pipe);
    objInsidePipe = document.createElement("div");
    objInsidePipe.setAttribute("class","insidePipe");
    objInsidePipe2 = objInsidePipe.cloneNode(true);
    
    
    									  
      top1 = Math.floor(150+(Math.random()*350));
      top2 =  0;
    
      while( !( top2>((500 - top1)+100) && top2<((500 - top1)+150) ) ){
         top2 =  Math.floor(100+(Math.random()*400));
      }

    
    objInsidePipe.style.top = - top1 + "px";
    objInsidePipe2.style.top = top2 + "px";
    objInsidePipe2.setAttribute("id","pipe2");
    
    pipe.appendChild(objInsidePipe);
    pipe.appendChild(objInsidePipe2);
    
  }
}



clearInterval(framerate_pipes);
framerate_pipes = setInterval(goPipes,1000/30);



function goPipes() {
  if(endOn){
   var objPipes = document.getElementsByClassName("pipe");
      if(objPipes != null){
          for(var i=0; i<objPipes.length; i+=1) {
              objPipes[i].style.left = objPipes[i].offsetLeft - 2 +"px";
              
              if(  (objBird.offsetLeft >= (objPipes[i].offsetLeft+80)) && (objBird.offsetLeft <= (objPipes[i].offsetLeft+81))  ){
                
                 objPoints.innerHTML = parseInt(objPoints.innerHTML) + 1;

                
              }


            
              
            
              if(objPipes[i].offsetLeft<-85){
                  objPipes[i].parentNode.removeChild(objPipes[i]);
              }
          }
      } 
  }
}


function retry() {
	clearInterval(framerate_collision);
	framerate_collision = setInterval(doCollision,1000/60);
  objGameOver.style.zIndex = "-100";
  objGameOver.style.opacity = "0";
  objBird.style.top = "0px";
  objBird.style.background = "url(http://orig07.deviantart.net/41a2/f/2010/189/d/f/trollface_by_deniskapwnz.png)";
  objBird.style.backgroundSize = "100%"; 
  objPoints.innerHTML = 0;
  var objPipes = document.getElementsByClassName("pipe");
  var nbrPipes = objPipes.length;
  
  for(var i=nbrPipes; i>-1; i-=1) {
    if(objPipes[i] != null){
    objPipes[i].parentNode.removeChild(objPipes[i]);
    }
  }
  endOn = true;
}





/* gestion des collisions sur le côté */
function doCollision() {


                      var objInnerPipe = document.getElementsByClassName("insidePipe");

                      for (var k = 0; k < objInnerPipe.length; k+=2) {

                      	
                      		
                      		if( !( (objBird.offsetTop>(500 + objInnerPipe[k].offsetTop)) && ((objBird.offsetTop+30)<(objInnerPipe[k+1].offsetTop)) ) ) {

                       			if( (objBird.offsetLeft+30 >= (objInnerPipe[k].parentNode.offsetLeft)) && (objBird.offsetLeft+30 <= (objInnerPipe[k].parentNode.offsetLeft+80) ) && (objBird.offsetLeft >= (objInnerPipe[k].parentNode.offsetLeft)) && (objBird.offsetLeft <= (objInnerPipe[k].parentNode.offsetLeft+80) ) ) {

                       				endOn = false;
                       				
                       			}
                        
                      }

                      };
}