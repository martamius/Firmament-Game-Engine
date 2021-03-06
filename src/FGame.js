/*  Firmament HTML 5 Game Engine
    Copyright (C) 2011 Jordan CM Wambaugh jordan@wambaugh.org http://firmament.wambaugh.org

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.
    
    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.  
 */





/**
 * FGame
 * Represents a game with worlds, entities, cameras, etc.
 * An FGame object manages both rendering and simulation of the game world.
 * @class
 */
function FGame(){
    
     
     /*
       //setup debug draw
        var debugDraw = new b2DebugDraw();
        debugDraw.SetSprite(document.getElementById("canvas").getContext("2d"));
        debugDraw.SetDrawScale(30.0);
        debugDraw.SetFillAlpha(0.3);
        debugDraw.SetLineThickness(1.0);
        debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
        this.world.SetDebugDraw(debugDraw);
        */
       
        window.setInterval(this._frameCount.bind(this),1000);
        this.fpsGoal=30;
        this.frames=0;
        this.instep=0;
        this.cameras=[];
		this.worlds=	[];
		this.fps=0;
		this.stepInterval=null;
      
}


FGame.prototype=new FObservable;

/**
 * Starts simulation and rendering loops.
 */
FGame.prototype.startSimulation=function(){
	 this.stepInterval=window.setInterval(this._step.bind(this), 1000 / this.fpsGoal);
};

/**
 * Stops simulation and rendering loops completely.
 */
FGame.prototype.stopSimulation=function(){
	 window.clearInterval(this.stepInterval);
};

/**
 * Adds a {@link FCamera} to the game.
 * A single game can have many cameras.
 * @param {FCamera} camera
 */
FGame.prototype.addCamera=function(camera){
	camera.setGame(this);
	this.cameras.push(camera);
};

/**
 * Adds a canvas to the game. This automatically creates a new camera for the canvas.
 * @param {CanvasElement} canvas
 * @return {FCamera} The generated camera object
 */
FGame.prototype.addCanvas = function(canvas){
	var c = new FCamera(canvas);
	this.addCamera(c);
	return c;
};



/**
 * Adds a {@link FWorld} to the game.
 * A single game can have many worlds.
 * @param world
 */
FGame.prototype.addWorld=function(world){
	this.worlds.push(world);
}

FGame.prototype._step=function() {
	if(this.instep)return;
	this.instep=true;
	
	if(this.fps>0&&this.fps<10){
		//Firmament.log(this.worlds);
	}
	this.emit("beginStep");
	for(var x=0;x<this.worlds.length;x++){
		this.worlds[x].step(this.fpsGoal);
	}
	this.emit("endStep");
	//window.console.log(this.world);
	//call render on all cameras
	
	this.emit("endRender");
	for(var x=0; x<this.cameras.length;x++){
		this.cameras[x].render(this.worlds);
	}
	this.emit("endRender");
	this.frames++;
	this.instep=false;
  };
  
  FGame.prototype._frameCount=function(){
	  this.fps=this.frames;
	  this.emit("fpsUpdate",[this.fps]);
	  this.frames=0;
  }


