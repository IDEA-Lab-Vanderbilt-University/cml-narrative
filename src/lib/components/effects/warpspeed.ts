// WarpSpeed.js originally by Federico Dossena https://github.com/adolfintel/warpspeed
class WarpSpeed {
	targetId: string;
	SPEED: number;
	TARGET_SPEED: number;
	SPEED_ADJ_FACTOR: number;
	DENSITY: number;
	USE_CIRCLES: boolean;
	DEPTH_ALPHA: boolean;
	WARP_EFFECT: boolean;
	WARP_EFFECT_LENGTH: number;
	STAR_SCALE: number;
	BACKGROUND_COLOR: string;
	LAST_RENDER_T: number = 0;
	STAR_COLOR: string = "#FFFFFF";
	prevW: number = -1;
	prevH: number = -1;
	stars: WarpSpeedStar[] = [];
	lastMoveTS: number = 0;
	drawRequest: number | null = null;
	PAUSED: boolean = false;
	maxLineWidth: number = 10;
	size: number = 3;

	constructor(targetId: string, config: any) {
		this.targetId=targetId;
		if(RUNNING_INSTANCES==undefined)RUNNING_INSTANCES={};
		if(RUNNING_INSTANCES[targetId]){RUNNING_INSTANCES[targetId].destroy();}
		config=config||{};
		if(typeof config == "string")try{config=JSON.parse(config);}catch(e){config={}}
		this.SPEED=config.speed==undefined||config.speed<0?0.7:config.speed;
		this.TARGET_SPEED=config.targetSpeed==undefined||config.targetSpeed<0?this.SPEED:config.targetSpeed;
		this.SPEED_ADJ_FACTOR=config.speedAdjFactor==undefined?0.03:config.speedAdjFactor<0?0:config.speedAdjFactor>1?1:config.speedAdjFactor;
		this.DENSITY=config.density==undefined||config.density<=0?0.7:config.density;
		this.USE_CIRCLES=config.shape==undefined?false:config.shape=="circle";
		this.DEPTH_ALPHA=config.depthFade==undefined?true:config.depthFade;
		this.WARP_EFFECT=config.warpEffect==undefined?true:config.warpEffect;
		this.WARP_EFFECT_LENGTH=config.warpEffectLength==undefined?5:config.warpEffectLength<0?0:config.warpEffectLength;
		this.STAR_SCALE=config.starSize==undefined||config.starSize<=0?3:config.starSize;
		this.BACKGROUND_COLOR=config.backgroundColor==undefined?"hsl(263,45%,7%)":config.backgroundColor;	
		var canvas=document.getElementById(this.targetId);
	
		if(!canvas || canvas instanceof HTMLCanvasElement === false){
			console.error("WarpSpeed: canvas element not found");
			return;
		}

		canvas.width=1; canvas.height=1;
		this.STAR_COLOR=config.starColor==undefined?"#FFFFFF":config.starColor;
		for(var i=0;i<this.DENSITY*1000;i++){
			this.stars.push(new WarpSpeedStar((Math.random()-0.5)*1000,(Math.random()-0.5)*1000,1000*Math.random()));
		}
		this.lastMoveTS=this.timeStamp();
		this.drawRequest=null;
		this.LAST_RENDER_T=0;
		RUNNING_INSTANCES[targetId]=this;
		this.draw();
	}

	draw(){
		var TIME=this.timeStamp();
		if(!(document.getElementById(this.targetId))){
			this.destroy();
			return;
		}
		this.move();
		var canvas=document.getElementById(this.targetId);

		if(!canvas || canvas instanceof HTMLCanvasElement === false){
			console.error("WarpSpeed: canvas element not found");
			return;
		}

		if(!this.PAUSED&&this.isVisible(canvas)){
			if(this.prevW!=canvas.clientWidth||this.prevH!=canvas.clientHeight){
				canvas.width=(canvas.clientWidth<10?10:canvas.clientWidth)*(window.devicePixelRatio||1);
				canvas.height=(canvas.clientHeight<10?10:canvas.clientHeight)*(window.devicePixelRatio||1);
			}
			this.size=(canvas.height<canvas.width?canvas.height:canvas.width)/(10/(this.STAR_SCALE<=0?0:this.STAR_SCALE));
			if(this.WARP_EFFECT) this.maxLineWidth=this.size/30;
			var ctx=canvas.getContext("2d");

			if(!ctx){
				console.error("WarpSpeed: canvas context error");
				return;
			}

            ctx.globalAlpha=1.0;
			
			ctx.clearRect(0,0,canvas.width,canvas.height);
			// ctx.fillStyle=this.BACKGROUND_COLOR;
			// ctx.fillRect(0,0,canvas.width,canvas.height);
			ctx.fillStyle=this.STAR_COLOR;
			for(var i=0;i<this.stars.length;i++){
				var s=this.stars[i];
                var xOnDisplay=s.x/s.z, yOnDisplay=s.y/s.z;
				if(!this.WARP_EFFECT&&(xOnDisplay<-0.5||xOnDisplay>0.5||yOnDisplay<-0.5||yOnDisplay>0.5))continue;
				var size=s.size*this.size/s.z;
				if(size<0.3) continue; //don't draw very small dots
				if(this.DEPTH_ALPHA){
					var alpha=(1000-s.z)/1000;
					ctx.globalAlpha=alpha<0?0:alpha>1?1:alpha;
				}
				if(this.WARP_EFFECT){
					ctx.beginPath();
					var x2OnDisplay=s.x/(s.z+this.WARP_EFFECT_LENGTH*this.SPEED), y2OnDisplay=s.y/(s.z+this.WARP_EFFECT_LENGTH*this.SPEED);
					if(x2OnDisplay<-0.5||x2OnDisplay>0.5||y2OnDisplay<-0.5||y2OnDisplay>0.5)continue;
					ctx.moveTo(canvas.width*(xOnDisplay+0.5)-size/2,canvas.height*(yOnDisplay+0.5)-size/2);
					ctx.lineTo(canvas.width*(x2OnDisplay+0.5)-size/2,canvas.height*(y2OnDisplay+0.5)-size/2);
					ctx.lineWidth=size>this.maxLineWidth?this.maxLineWidth:size;
					if(this.USE_CIRCLES){ctx.lineCap="round";}else{ctx.lineCap="butt"}
					ctx.strokeStyle=ctx.fillStyle;
					ctx.stroke();
				}else if(this.USE_CIRCLES){
					ctx.beginPath();
					ctx.arc(canvas.width*(xOnDisplay+0.5)-size/2,canvas.height*(yOnDisplay+0.5)-size/2,size/2,0,2*Math.PI);
					ctx.fill();
				}else{

					ctx.beginPath();
					ctx.lineWidth=size>this.maxLineWidth?this.maxLineWidth:size;
					let x = canvas.width*(xOnDisplay+0.5)+size/2;
					let y = canvas.height*(yOnDisplay+0.5)-size/2;
					ctx.moveTo(x, y);
					
					var x2OnDisplay=s.x/(s.z+this.WARP_EFFECT_LENGTH*this.SPEED), y2OnDisplay=s.y/(s.z+this.WARP_EFFECT_LENGTH*this.SPEED);
					ctx.lineTo(canvas.width*(x2OnDisplay+0.5)-size/2,canvas.height*(y2OnDisplay+0.5)-size/2);
					ctx.strokeStyle=ctx.fillStyle;
					ctx.stroke();
					//ctx.fillRect(canvas.width*(xOnDisplay+0.5)-size/2,canvas.height*(yOnDisplay+0.5)-size/2,size,size);
				}
			}
			this.prevW=canvas.clientWidth;
			this.prevH=canvas.clientHeight;
		}
		if(this.drawRequest!=-1)this.drawRequest=requestAnimationFrame(this.draw.bind(this));
		this.LAST_RENDER_T=this.timeStamp()-TIME;
	}

	move(){
		var t=this.timeStamp(), speedMulF=(t-this.lastMoveTS)/(1000/60);
		this.lastMoveTS=t;
		if(this.PAUSED)return;
		var speedAdjF=Math.pow(this.SPEED_ADJ_FACTOR<0?0:this.SPEED_ADJ_FACTOR>1?1:this.SPEED_ADJ_FACTOR,1/speedMulF);
		this.SPEED=this.TARGET_SPEED*speedAdjF+this.SPEED*(1-speedAdjF);
		if(this.SPEED<0)this.SPEED=0;
		var speed=this.SPEED*speedMulF;
		for(var i=0;i<this.stars.length;i++){
			var s=this.stars[i];
			s.z-=speed;
			while(s.z<1){
				s.z+=1000;
				s.x=(Math.random()-0.5)*s.z;
				s.y=(Math.random()-0.5)*s.z;
			}
		}
	}

	destroy(targetId = null){
		if(targetId){
			if(RUNNING_INSTANCES[targetId])RUNNING_INSTANCES[targetId].destroy();
		}else{
			try{cancelAnimationFrame(this.drawRequest ?? -1);}catch(e){this.drawRequest=-1;}
			RUNNING_INSTANCES[this.targetId]=undefined;
		}
	}

	pause(){
		this.PAUSED=true;
	}

	resume(){
		this.PAUSED=false;
	}

	timeStamp(){
		if(window.performance.now)return window.performance.now(); else return Date.now();
	}

	isVisible = function(el: HTMLElement){
		var r = el.getBoundingClientRect();
		return r.top+r.height >= 0 &&r.left+r.width >= 0 &&r.bottom-r.height <= (window.innerHeight || document.documentElement.clientHeight) && r.right-r.width <= (window.innerWidth || document.documentElement.clientWidth);
	}
}

class WarpSpeedStar {
	constructor(x: number, y: number, z: number){
		this.x=x;
		this.y=y;
		this.z=z;
		this.size=0.5+Math.random();
	}

	x: number;
	y: number;
	z: number;
	size: number;
}

var RUNNING_INSTANCES: any = {};

export default WarpSpeed;