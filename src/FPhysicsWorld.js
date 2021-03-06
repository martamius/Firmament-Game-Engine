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
 * @class
 * @extends FWorld
 */

function FPhysicsWorld(gravity){
	this.collisions=[]
	this.b2world = new b2World(
            new b2Vec2(gravity.x, gravity.y)    //gravity
         ,  true                 //allow sleep
      );
	this.b2world.SetContactListener({
		BeginContact:function(contact){
			this.collisions.push(contact);
		}.bind(this)
		,EndContact:function(){}
		,PreSolve:function(){}
		,PostSolve:function(){}
	})
}


//extends FWorld
FPhysicsWorld.prototype = new FWorld;



FPhysicsWorld.prototype.step=function(fpsGoal){
	this.collisions=[];
	this.b2world.Step(
            1 / fpsGoal   //frame-rate
         ,  10       //velocity iterations
         ,  10       //position iterations
      );
	for(var x=0;x<this.collisions.length;x++){
		var c=this.collisions[x];
		var ent1=c.m_fixtureA.m_body.m_userData;
		var ent2=c.m_fixtureB.m_body.m_userData;
		
		ent1.emit("collide",[ent2,c]);
		ent2.emit("collide",[ent1,c]);
		//console.log("collission!");
		//console.log(c);
		
	}
	//this.world.DrawDebugData();
	this.b2world.ClearForces();
}

FPhysicsWorld.prototype.setGravity=function(gravity){
	this.b2world.SetGravity(gravity);
}

FPhysicsWorld.prototype.createEntity=function(config){
	//Firmament.log(this);
    var ent= new FPhysicsEntity(this,config);
    this.addEntity(ent);
    if(config.init){
    	//Firmament.log(ent._connections);
    	config.init.apply(ent,[]);
    }
    return ent;
};



FPhysicsWorld.prototype.getEntitiesInBox=function(topLeftX,topLeftY,bottomRightX,bottomRightY){
	var selectEntities=[];
	var query = new Box2D.Collision.b2AABB;
	
	query.upperBound.Set(bottomRightX,bottomRightY);
    query.lowerBound.Set(topLeftX,topLeftY);
    //Firmament.log(query,true);
    //Firmament.log(query);
    this.b2world.QueryAABB(function(fixture){
    	//Firmament.log("here");
    	selectEntities.push(fixture.GetBody().GetUserData());
    	return true;
    },query);
   // Firmament.log(selectEntities.length);
    return selectEntities;
}



