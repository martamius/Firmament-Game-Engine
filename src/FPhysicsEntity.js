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



//FEntity extends FRenderable
FPhysicsEntity.prototype = new FRenderable;
FPhysicsEntity.prototype.constructor=FPhysicsEntity;

/**
 * 
 * A an entity used in {@link FPhysicsWorld}
 * @class
 * @extends FRenderable
 */

function FPhysicsEntity(world,config){
	this.world=world;
    this.config=config;
    var def = new b2BodyDef;
    var width=0;
    
    if(config.position){
        def.position.x=config.position.x;
        def.position.y=config.position.y;
    } else {
        def.position.x=0;
        def.position.y=0;
    }
    if(config.positionX!=undefined){
    	def.position.x=config.positionX;
    }
    if(config.positionY!=undefined){
    	def.position.y=config.positionY;
    }
    //def.fixedRotation=false;
    if(config.type=='static')def.type=b2Body.b2_staticBody;
    else def.type=Box2D.Dynamics.b2Body.b2_dynamicBody;
    if(config.angle){
    	def.angle=config.angle;
    }
    
    
    
    
    
    def.userData=this;
    //console.log(def);
    this.body=this.world.b2world.CreateBody(def);
    //process shape definitions
    for(var x=0;x<config.shapes.length;x++){
        var fixDef=new b2FixtureDef;
        var shape = config.shapes[x];
        
        if(shape.type=='box'){
        	shape.width= shape.width!=undefined?shape.width:1;
        	shape.height= shape.height!=undefined?shape.height:1;
        	
            fixDef.shape=new b2PolygonShape();
            fixDef.shape.SetAsBox(shape.width/2,shape.height/2);
            width=shape.width;
        } else if(shape.type=='circle'){
        	width=shape.radius*2;
            fixDef.shape = new b2CircleShape(shape.radius);
        }
        
        fixDef.density=shape.density!=undefined?shape.density:1;
        fixDef.friction=shape.friction!=undefined?shape.friction:1;
        fixDef.restitution=shape.restitution!=undefined?shape.restitution:0;
        //console.log(fixDef)
        this.body.CreateFixture(fixDef);
    }
   // Firmament.log(this.body);
    this.body.ResetMassData();
    //this.position=this.body.m_xf.position; //tie the entity's position to the body's position
    
    //set z value
    this.zPosition =0;
    
    
    if(config.maxLifeSeconds){
    	setTimeout(function(){
    		this.destroy();
    	}.bind(this),config.maxLifeSeconds*1000);
    }
    
    
    if(config.color)this.setColor(config.color);
    
    
    if(config.image){
    	//console.log(typeof(config.image))
    	if(typeof(config.image)=='string'){
    		var i= document.createElement('img');
    		i.src=config.image;
    		config.image=i;
    	}
    	this.currentImage=config.image;
    	this.setRenderer(new FSpriteRenderer);
    	
    	if(config.imageScale){
        	if(config.imageScale=='auto'){
        		if(!config.imageWidth){
        			Firmament.log("Image width must be set for auto scale! Defaulting to 1:1");
        			this.imageScale=100;
        		}else {
        			this.imageScale=config.imageWidth/width;
        		}
        	}else{
        		this.imageScale=config.imageScale;
        	}
        }
    	
    	
    }else{
    	this.setRenderer(new FWireframeRenderer);
    }
    
    
    
}



FPhysicsEntity.prototype.getShapes=function(){
	var shapes = [];
	var s = this.body.GetFixtureList();
	while(s){
		shapes.push(s.GetShape());
		s = s.GetNext();
	}
	return shapes;
}

FPhysicsEntity.prototype.getPosition=function(){
	
	return this.body.GetPosition();
}

FPhysicsEntity.prototype.getAngle=function(){
	
	return this.body.GetAngle();
}

FPhysicsEntity.prototype.getCurrentImage=function(){
	return this.currentImage;
}



FPhysicsEntity.prototype.setVelocity=function(v){
	this.body.SetLinearVelocity(v);
}


FPhysicsEntity.prototype.destroy=function(){
	this.world.b2world.DestroyBody(this.body);
	this.world.destroyEntity(this)
}


FPhysicsEntity.prototype.deleteLater=FPhysicsEntity.prototype.destroy;



