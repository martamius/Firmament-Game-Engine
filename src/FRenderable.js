
function FRenderable(){
	
	
}

FRenderable.prototype={
		renderer: null
		,position: new FVector(0,0)
		,positionBase:'w' //'w' = world based, 'c' = camera based
		
};


FRenderable.prototype.getRelativeCameraPosition=function(cameraPosition){
	if(this.positionBase == 'c')return this.position;
	
};

FRenderable.prototype.setRenderer=function(r){
	this.renderer=r;
};


FRenderable.prototype.getRenderer=function(){
	return this.renderer;
};

FRenderable.prototype.setPosition=function(p){
	this.position = p;
};