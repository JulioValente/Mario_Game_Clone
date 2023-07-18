Player = function(x, y, width, height, drawWidth, drawHeight, src){
	var self = {
		x:x,
		y:y,
		drawx:x,
		width:width,
		height:height,
		drawWidth: drawWidth,
		drawHeight: drawHeight,
		drawImagey: 0,
		drawImagex: 0,
		type:"player",
		frameWidth:0,
		frameHeight:0,
		src:src,
		img: new Image(),
		pressShift:false,	
		pressRight:false,
		pressLeft:false,
		pressDown:false,
		pressUp:false,
		pressSpace:false,				
		spdx:1.5,
		jump:false,
		jumpingSpeed:3,
		fallingSpeed:0,
		limitFall:-4,
		jumpAgain:true,
		spriteCounter:0,
		spriteCounterSpeed:0.06,
		spriteY:0,
		position:"img/right-",
		win:false,
		lifes:0,
		slidingOnFlagPole: false,
		power:null,
		count:0,
		fireSprite:false,
		fireSpeed:0,
		star:false,
		starCount:0,
		invencibility:false,
	}
	self.img.src = self.position + self.src;
	self.draw = function(){
		ctx.save();			
		self.drawImagex = self.drawx;		
		self.drawImagex -= (self.drawWidth - self.width) / 2;
		self.drawImagey = self.y;		
		self.drawImgaey -= self.drawHeight - self.height;
		var spriteX = Math.floor(self.spriteCounter) % 3;
		if(!self.win){
			if(self.pressDown && self.power == "flower" && self.fireSpeed <= 40 && self.fireSpeed != 0 && self.fireSprite){
				self.spriteY = 3; //firing sprite
			}else if(self.jump && !(self.pressDown && self.fireSprite && self.fireSpeed <= 40  && self.fireSpeed != 0 && self.power == "flower")){
				self.spriteY = 1; //jumping sprite
			}else{
				self.spriteY = 0; //walk sprite
			}
		}
		if(self.power == "big"){
			self.frameWidth = 16;
			self.frameHeight = 32;
			if(!self.star && !self.invencibility){
				self.src = "mario-big.png";
			}else if(self.star){							
				if(self.starCount % 16 == 0 || self.starCount < 4){
					self.src = "mario-big-star1.png";
				}else if(self.starCount % 16 == 4){
					self.src = "mario-big-star2.png";
				}else if(self.starCount % 16 == 8){
					self.src = "mario-big-star3.png";
				}else if(self.starCount % 16 == 12){
					self.src = "mario-big-star4.png";
				}
			}else{
				self.src = "mario-transparent.png"
			}
			self.img.src = self.position + self.src;
		}else if(self.power == "flower"){
			self.frameWidth = 16;
			self.frameHeight = 32;
			if(!self.star && !self.invencibility){
				self.src = "mario-flower.png";
			}else if(self.star){
				if(self.starCount % 16 == 0 || self.starCount < 4){
					self.src = "mario-big-star1.png";
				}else if(self.starCount % 16 == 4){
					self.src = "mario-big-star2.png";
				}else if(self.starCount % 16 == 8){
					self.src = "mario-big-star3.png";
				}else if(self.starCount % 16 == 12){
					self.src = "mario-big-star4.png";
				}
			}else{
				self.src = "mario-transparent.png"
			}
			self.img.src = self.position + self.src;
		}else{
			self.frameWidth = 17;
			self.frameHeight = 16;
			if(!self.star && !self.invencibility){
				self.src = "mario.png";
			}else if(self.star){					
				if(self.starCount % 16 == 0 || self.starCount < 4){
					self.src = "mario-star1.png";
				}else if(self.starCount % 16 == 4){
					self.src = "mario-star2.png";
				}else if(self.starCount % 16 == 8){
					self.src = "mario-star3.png";
				}else if(self.starCount % 16 == 12){
					self.src = "mario-star4.png";
				}
			}else{
				self.src = "mario-transparent.png"
			}
			self.img.src = self.position + self.src;
		}
		if(self.invencibility){
			self.count++;
			if(self.count == 300){
				self.invencibility = false;
				self.count = 0;
			}					
		}
		self.img.src = self.position + self.src;	
		ctx.drawImage(self.img, spriteX * self.frameWidth, self.spriteY * self.frameHeight, self.frameWidth, self.frameHeight, self.drawImagex, self.drawImagey, self.drawWidth, self.drawHeight);
		/*
		ctx.fillStyle = self.color;				
		ctx.fillRect(self.drawx, self.y, self.width, self.height);
		*/
		ctx.restore();
	}	
	self.updatePosition = function(){
		if(self.pressShift){
			if(self.pressLeft && !self.colisionBoundLeft() && !self.colisionMapDownLeft() && !self.colisionMapLeft() && !self.colisionMapUpLeft() && !(self.pressLeft && self.pressRight) || self.pressRight && !self.colisionBoundRight() && !self.colisionMapDownRight() && !self.colisionMapRight() && !self.colisionMapUpRight() && !(self.pressLeft && self.pressRight)){

				if(self.spdx < 2.3){
					self.spdx += 0.005;
				}else{
					self.spriteCounterSpeed = 0.12;
				}
			}else{
				self.spdx = 1.5;
				self.spriteCounterSpeed = 0.06;
			}
		}else{
			self.spdx = 1.5;
			self.spriteCounterSpeed = 0.06;
		}
		if(self.pressRight && !self.colisionBoundRight() && !self.colisionMapDownRight() && !self.colisionMapRight() && !self.colisionMapUpRight() && !self.pressLeft){
			self.x += self.spdx;
			self.drawx += self.spdx;
			if(self.spriteCounter < 1){
				self.spriteCounter = 1;
			}else{
				self.spriteCounter += self.spriteCounterSpeed;
			}
			self.position = "img/right-";
		}else if(!self.pressLeft){
			self.spriteCounter = 0;
		}
		if(self.pressLeft && !self.colisionBoundLeft() && !self.colisionMapDownLeft() && !self.colisionMapLeft() && !self.colisionMapUpLeft() && !self.pressRight){
			self.x -= self.spdx;	
			self.drawx -= self.spdx;									
			if(self.spriteCounter < 1){
				self.spriteCounter = 1;
			}else{
				self.spriteCounter += self.spriteCounterSpeed;
			}
			self.position = "img/left-";
		}else if(!self.pressRight){
			self.spriteCounter = 0;
		}
		if(self.pressDown){
			if(self.power == "flower" && fireCount <= 1 && self.fireSpeed == 0){
				if(self.position == "img/left-"){
					Fire(self.x - 15, self.y + self.height/2.6, 15, 15, "img/fire.png", Math.random(), "left");
				}else if(self.position == "img/right-"){
					Fire(self.x + self.width, self.y + self.height/2.6, 15, 15, "img/fire.png", Math.random(), "right");
				}
				self.fireSprite = true;
				fireCount++;
				self.fireSpeed++;
			}
		}else{
			self.fireSprite = false;
		}
		if(self.pressUp){
		}
		if(self.pressSpace){
			if(!self.inJump){
				self.limitJump = self.y + TILE_SIZE - TILE_SIZE * 5;
				self.jump = true;
			}		
			self.pressSpace = false;					
		}
	}
	self.flying = function(){
		if(!self.colisionMapLeftDown() && !self.colisionMapDown() && !self.colisionMapRightDown() && !self.inJump){
			if(self.fallingSpeed > -3){							
				self.fallingSpeed -= 0.15;
			}else if(self.fallingSpeed > self.limitFall){
				self.fallingSpeed -= 0.015;
			}
			self.y -= self.fallingSpeed;
			return true;
		}else{
			self.fallingSpeed = 0;
		}
	}
	self.colisionBoundDown = function(){
		if(self.y + self.height >= HEIGHT ){
			if(self.y > HEIGHT - self.height){
				self.y =  HEIGHT - self.height;
			}
			return true;				
		}
	}
	self.colisionBoundLeft = function(){
		if(self.drawx  <= 0){
			return true;
			if(self.drawx < 0){
				self.drawx = 0;
			}
		}
	}
	self.colisionBoundRight = function(){
		if(self.drawx + self.width >= WIDTH){
			return true;
			if(self.drawx + self.width > WIDTH){
				self.drawx = WIDTH - self.width;
			}
		}
	}
	self.colisionMapLeftDown = function(){				
		if(Map.list.isColiding(self.x + 3, self.y + self.height) > 0){
			self.y += Map.list.isColiding(self.x + 3, self.y + self.height, "y") * TILE_SIZE - (self.y + self.height);
			return true;	
		}
	}
	self.colisionMapDown = function(){				
		if(Map.list.isColiding(self.x + self.width/2, self.y + self.height) > 0){
			self.y += Map.list.isColiding(self.x + self.width/2, self.y + self.height, "y") * TILE_SIZE - (self.y + self.height);
			return true;	
		}
	}
	self.colisionMapRightDown = function(){				
		if(Map.list.isColiding(self.x + self.width -3, self.y + self.height) > 0){
			self.y += Map.list.isColiding(self.x + self.width -3, self.y + self.height, "y") * TILE_SIZE - (self.y + self.height);
			return true;	
		}
	}
	self.colisionMapUpLeft = function(){		
		if(Map.list.isColiding(self.x, self.y+3) > 0){		
			self.drawx += ((Map.list.isColiding(self.x, self.y+3, "x") * TILE_SIZE) + TILE_SIZE) - self.x-1;	
			self.x += ((Map.list.isColiding(self.x, self.y+3, "x") * TILE_SIZE) + TILE_SIZE) - self.x-1;		
			//self.x += 0.1;
			//self.drawx += 0.1;
			return true;	
		}
	}	
	self.colisionMapLeft = function(){		
		if(Map.list.isColiding(self.x, self.y + self.height/2) > 0){
			self.drawx += ((Map.list.isColiding(self.x, self.y + self.height/2, "x") * TILE_SIZE) + TILE_SIZE) - self.x-1;
			self.x  += ((Map.list.isColiding(self.x, self.y + self.height/2, "x") * TILE_SIZE) + TILE_SIZE) - self.x-1;
			//self.x += 0.1;
			//self.drawx += 0.1;
			return true;	
		}
	}	
	self.colisionMapDownLeft = function(){		
		if(Map.list.isColiding(self.x, self.y + self.height-3) > 0){
			self.drawx += ((Map.list.isColiding(self.x, self.y + self.height-3, "x") * TILE_SIZE) + TILE_SIZE) - self.x-1;
			self.x += ((Map.list.isColiding(self.x, self.y + self.height-3, "x") * TILE_SIZE) + TILE_SIZE) - self.x-1;
			//self.x += 0.1;
			//self.drawx += 0.1;
			return true;	
		}
	}				
	self.colisionMapUpRight = function(){		
		if(Map.list.isColiding(self.x + self.width, self.y + 3) > 0){
			self.drawx += (Map.list.isColiding(self.x + self.width, self.y + 3, "x") * TILE_SIZE) - (self.x + self.width);
			self.x += (Map.list.isColiding(self.x + self.width, self.y + 3, "x") * TILE_SIZE) - (self.x + self.width);
			//self.x -= 0.1;
			//self.drawx -= 0.1;
			return true;			
		}
	}	
	self.colisionMapRight = function(){		
		if(Map.list.isColiding(self.x + self.width, self.y + self.height/2) > 0){
			self.drawx += (Map.list.isColiding(self.x + self.width, self.y + self.height/2, "x") * TILE_SIZE) - (self.x + self.width);
			self.x += (Map.list.isColiding(self.x + self.width, self.y + self.height/2, "x") * TILE_SIZE) - (self.x + self.width);
			//self.x -= 0.1;
			//self.drawx -= 0.1;
			return true;			
		}
	}		
	self.colisionMapDownRight = function(){		
		if(Map.list.isColiding(self.x + self.width, self.y + self.height-3) > 0){
			self.drawx += (Map.list.isColiding(self.x + self.width, self.y + self.height-3, "x") * TILE_SIZE) - (self.x + self.width);
			self.x += (Map.list.isColiding(self.x + self.width, self.y + self.height-3, "x") * TILE_SIZE) - (self.x + self.width);
			//self.x -= 0.1;
			//self.drawx -= 0.1;
			return true;			
		}
	}		
	self.colisionMapLeftUp = function(){		
		if(Map.list.isColiding(self.x + 3, self.y) > 0 || Map.list.isColiding(self.x + 3, self.y) == -4 && self.jumpingSpeed >= 0){
			self.jump = false;
			self.jumpingSpeed = 3;
			self.inJump = false;
			return true;	
		}
	}
	self.colisionMapUp = function(){		
		if(Map.list.isColiding(self.x + self.width/2, self.y) > 0 || Map.list.isColiding(self.x + self.width/2, self.y) == -4 && self.jumpingSpeed >= 0){
			self.jump = false;
			self.jumpingSpeed = 3;
			self.inJump = false;
			return true;	
		}
	}			
	self.colisionMapRightUp = function(){		
		if(Map.list.isColiding(self.x + self.width - 3, self.y) > 0 || Map.list.isColiding(self.x + self.width - 3, self.y) == -4 && self.jumpingSpeed >= 0){
			self.jump = false;
			self.jumpingSpeed = 3;
			self.inJump = false;
			return true;	
		}
	}
	self.killEnemy = function(){
		for(var key in Enemy.list){
			if(((self.x >= Enemy.list[key].x && self.x  <= Enemy.list[key].x + Enemy.list[key].width || self.x + self.width >= Enemy.list[key].x && self.x  + self.width <= Enemy.list[key].x + Enemy.list[key].width) || (self.x <= Enemy.list[key].x && self.x + self.width >= Enemy.list[key].x + Enemy.list[key].width)) && self.y + self.height >= Enemy.list[key].y && self.y + self.height <= Enemy.list[key].y + 4 && !Enemy.list[key].die && (self.jumpingSpeed <= 0 || self.fallingSpeed < 0)){
				if(!self.star){
					if(Enemy.list[key].type == "goomba"){
						if(Enemy.list[key].type == "cannonBall"){													
							self.limitJump = self.y + TILE_SIZE - TILE_SIZE * 5;
							self.jump = true;						
							self.jumpingSpeed = 3;
							Enemy.list[key].delete = true;
						}else{
							self.limitJump = self.y + TILE_SIZE - TILE_SIZE * 5;
							self.jump = true;						
							self.jumpingSpeed = 3;
							Enemy.list[key].die = true;
						}
					}else if(Enemy.list[key].type == "turtle"){						
						self.limitJump = self.y + TILE_SIZE - TILE_SIZE * 5;
						self.jump = true;						
						self.jumpingSpeed = 3;
						if(!Enemy.list[key].turtleSeeking){
							Enemy.list[key].turtleSeeking = true;
							Enemy.list[key].spriteY = 1;
							Enemy.list[key].spdx = 0;
						}else{
							if(!Enemy.list[key].turtleShellMoving){
								if(self.x  + self.width/2 <  Enemy.list[key].x + Enemy.list[key].width/2){
									Enemy.list[key].position = "right";
								}else{
									Enemy.list[key].position = "left";
								}
								Enemy.list[key].turtleShellMoving = true;
								Enemy.list[key].spdx = 3.5;
							}else if(Enemy.list[key].spdx == 3.5){
								Enemy.list[key].turtleShellMoving = false;
								Enemy.list[key].spdx = 0;								
							}
						}
					}else if(Enemy.list[key].type == "cannonBall"){													
						self.limitJump = self.y + TILE_SIZE - TILE_SIZE * 5;
						self.jump = true;						
						self.jumpingSpeed = 3;
						Enemy.list[key].delete = true;
					}
				}else if(self.star){
					Enemy.list[key].dieByStarMario = true;
				}
			}
		}
	}
	self.colisionEnemy = function(){
		for(var key in Enemy.list){			
			if(self.insideTurtleShell != null){
				if(!((Enemy.list[key].x >= self.x && Enemy.list[key].x  <= self.x + self.width || Enemy.list[key].x + Enemy.list[key].width >= self.x && Enemy.list[key].x  + Enemy.list[key].width <= self.x + self.width) && (Enemy.list[key].y + Enemy.list[key].height > self.y && Enemy.list[key].y + Enemy.list[key].height <= self.y + self.height || Enemy.list[key].y + 6 > self.y && Enemy.list[key].y + 6 <= self.y + self.height) && !Enemy.list[key].die) && self.insideTurtleShell == Enemy.list[key].id){						
					self.insideTurtleShell = null;
				}
			}
			if((Enemy.list[key].x >= self.x && Enemy.list[key].x  <= self.x + self.width || Enemy.list[key].x + Enemy.list[key].width >= self.x && Enemy.list[key].x  + Enemy.list[key].width <= self.x + self.width) && (Enemy.list[key].y + Enemy.list[key].height > self.y && Enemy.list[key].y + Enemy.list[key].height <= self.y + self.height || Enemy.list[key].y + 6 > self.y && Enemy.list[key].y + 6 <= self.y + self.height) && !Enemy.list[key].die){
				if(Enemy.list[key].type == "turtle" && Enemy.list[key].turtleSeeking && !Enemy.list[key].turtleShellMoving && self.insideTurtleShell != Enemy.list[key].id){
					if(self.x  + self.width/2 <  Enemy.list[key].x + Enemy.list[key].width/2){
						Enemy.list[key].position = "right";
					}else{
						Enemy.list[key].position = "left";
					}
					Enemy.list[key].turtleShellMoving = true;
					Enemy.list[key].spdx = 3.5;
					self.insideTurtleShell = Enemy.list[key].id;
				}else if(self.power == "flower" || self.power == "big" && !self.star && self.insideTurtleShell != Enemy.list[key].id){
					self.power = null;
					self.y += self.height/2;					
					self.height = self.height/2;					
					self.drawHeight = self.drawHeight/2;
					self.invencibility = true;
				}else if(!self.invencibility && !self.star && self.insideTurtleShell != Enemy.list[key].id){
					return true;
				}else if(self.star){
					Enemy.list[key].dieByStarMario = true;
				}
			}
		}
	}
	self.Jump = function(){
		if(self.jump){
			self.inJump = true;
			if(!self.colisionMapLeftDown() && !self.colisionMapDown() && !self.colisionMapRightDown() || self.jumpingSpeed == 3){
				self.y -= self.jumpingSpeed;
				if(!(self.y > self.limitJump)){
					self.jumpingSpeed -= 0.15;
				}
				if(self.jumpingSpeed < 0 && self.y > self.limitJump && self.jumpingSpeed > self.limitFall){							
					self.jumpingSpeed -= 0.015;
				}
			}else{
				self.jump = false;
				self.jumpingSpeed = 3;
				self.inJump = false;
			}
		}
	}
	self.update = function(){
		if(!self.win){				
			if(self.fireSpeed != 0){
				self.fireSpeed++;
				if(self.fireSpeed >= 50){
					self.fireSpeed = 0;
				}
			}		
			if(self.star){
				self.starCount++;
				if(self.starCount >= 1000){
					self.star = false;
					self.starCount = 0;
				}
			}
			self.updatePosition();
			self.flying();
			self.Jump();	

			self.colisionBoundDown();
			self.colisionBoundLeft();

			self.colisionMapLeftDown();
			self.colisionMapDown();
			self.colisionMapRightDown();

			self.colisionMapUpLeft();
			self.colisionMapLeft();
			self.colisionMapDownLeft();

			self.colisionMapUpRight();
			self.colisionMapRight();
			self.colisionMapDownRight();

			self.colisionMapLeftUp();
			self.colisionMapUp();				
			self.colisionMapRightUp();

			self.colisionEnemy();
			self.killEnemy();
			self.draw();
		}else{						
			self.jump = false;
			self.jumpingSpeed = 3;
			self.inJump = false;	
			self.spdx = 1.5;
			if(!self.colisionMapLeftDown() && !self.colisionMapDown() && !self.colisionMapRightDown() && self.slidingOnFlagPole){
				self.y += 1.5;
				self.spriteY = 2;
				self.draw();
			}else{
				self.slidingOnFlagPole = false;
				self.spriteY = 0;
				if(self.x < Map.list.drawWidth - (4*TILE_SIZE)){
					self.spriteCounter++;
					self.x += self.spdx;
					self.drawx += self.spdx;
					self.position = "img/right-";
					self.colisionMapUpRight();
					self.colisionMapRight();
					self.colisionMapDownRight();

					self.flying();
					self.draw();
				}else{
					if(MapNumber != MaxMapNumber){
						MapNumber++;
						PlayerPower = self.power;
						Reset = true;
					}else{					
						self.img = null;
						ctx.save();
						ctx.fillStyle = "white";
						ctx.font = "30px arial";
						ctx.fillText("You win!", WIDTH/2 - 68, HEIGHT/2 - 14.5);
						ctx.restore();					
						if(!rotating){	
							setInterval(rotate, 25);
							rotating = true;
						}
					}
				}
			}
		}	
	}			
	Player.list = self;					
}

Enemy = function(x, y, width, height, drawWidth, drawHeight, frameWidth, frameHeight, src, id, type, position){
	var self = {
		x:x,
		y:y,
		drawx:x,
		width:width,
		height:height,
		drawWidth: drawWidth,
		drawHeight: drawHeight,
		drawImagey: 0,
		drawImagex: 0,
		frameWidth:frameWidth,
		frameHeight:frameHeight,
		src:src,
		img: new Image(),
		type:"enemy",	
		spdx:0.4,
		id:id,
		type: type,
		position:position,
		frameCounter:0,
		die:false,
		delte:false,	
		dieByStarMario:false,			
		spriteCounter:0,
		spriteCounterSpeed:0.03,
		spriteY:0,		
		turtleSeeking:false,
		turtleShellMoving:false,
	}	
	if(self.type == "cannonBall"){
		self.spdx = 2;
	}
	self.img.src = self.src;		
	self.draw = function(){
		ctx.save();			
		if(self.type == "turtle"){
			if(self.position == "right"){
				self.src = "img/right-turtle.png";
				self.img.src = self.src;
			}else{
				self.src = "img/left-turtle.png";
				self.img.src = self.src;
			}
		}
		self.drawImagex = self.drawx;		
		self.drawImagex -= (self.drawWidth - self.width) / 2;
		self.drawImagey = self.y;		
		self.drawImagey -= self.drawHeight - self.height;
		var spriteX = Math.floor(self.spriteCounter) % 2;
		if(self.type != "cannonBall"){
			ctx.drawImage(self.img, spriteX * self.frameWidth,  self.spriteY * self.frameHeight, self.frameWidth, self.frameHeight, self.drawImagex, self.drawImagey, self.drawWidth, self.drawHeight);
		}else{
			ctx.drawImage(self.img, self.drawImagex, self.drawImagey, self.drawWidth, self.drawHeight);
		}
		/*
		ctx.fillStyle = self.color;				
		ctx.fillRect(self.drawx, self.y, self.width, self.height);
		*/
		ctx.restore();
	}
	self.flying = function(){
		if(!self.colisionMapLeftDown() && !self.colisionMapDown() && !self.colisionMapRightDown()){
			self.y += 3;
			return true;
		}
	}
	self.colisionBoundLeft = function(){
		if(self.x  <= 0){
			return true;
		}
	}			
	self.colisionBoundDown = function(){
		if(self.y >= HEIGHT ){
			return true;				
		}
	}
	self.colisionMapLeftDown = function(){				
		if(Map.list.isColiding(self.x + 3, self.y + self.height)){
			self.y += Map.list.isColiding(self.x + 3, self.y + self.height, "y") * TILE_SIZE - (self.y + self.height);
			return true;	
		}
	}
	self.colisionMapDown = function(){				
		if(Map.list.isColiding(self.x + self.width/2, self.y + self.height)){
			self.y += Map.list.isColiding(self.x + self.width/2, self.y + self.height, "y") * TILE_SIZE - (self.y + self.height);
			return true;	
		}
	}
	self.colisionMapRightDown = function(){				
		if(Map.list.isColiding(self.x + self.width - 3, self.y + self.height)){
			self.y += Map.list.isColiding(self.x + self.width -3, self.y + self.height, "y") * TILE_SIZE - (self.y + self.height);
			return true;	
		}
	}
	self.colisionMapUpLeft = function(){		
		if(Map.list.isColiding(self.x, self.y+3)){
			if(!self.die){
				self.position = "right";
			}
			self.x += ((Map.list.isColiding(self.x, self.y+3, "x") * TILE_SIZE) + TILE_SIZE) - self.x;		
			return true;	
		}
	}	
	self.colisionMapLeft = function(){		
		if(Map.list.isColiding(self.x, self.y + self.height/2)){
			if(!self.die){
				self.position = "right";
			}
			self.x  += ((Map.list.isColiding(self.x, self.y + self.height/2, "x") * TILE_SIZE) + TILE_SIZE) - self.x;
			return true;	
		}
	}	
	self.colisionMapDownLeft = function(){		
		if(Map.list.isColiding(self.x, self.y + self.height-3)){
			if(!self.die){
				self.position = "right";
			}
			self.x += ((Map.list.isColiding(self.x, self.y + self.height-3, "x") * TILE_SIZE) + TILE_SIZE) - self.x;
			return true;		
		}
	}					
	self.colisionMapUpRight = function(){		
		if(Map.list.isColiding(self.x + self.width, self.y + 3)){
			if(!self.die){
				self.position = "left";
			}
			self.x += Map.list.isColiding(self.x + self.width, self.y + 3, "x") * TILE_SIZE - (self.x + self.width);
			return true;			
		}
	}	
	self.colisionMapRight = function(){		
		if(Map.list.isColiding(self.x + self.width, self.y + self.height/2)){
			if(!self.die){
				self.position = "left";
			}
			self.x += Map.list.isColiding(self.x + self.width, self.y + self.height/2, "x") * TILE_SIZE - (self.x + self.width);
			return true;				
		}
	}		
	self.colisionMapDownRight = function(){		
		if(Map.list.isColiding(self.x + self.width, self.y + self.height-3)){
			if(!self.die){
				self.position = "left";
			}
			self.x += Map.list.isColiding(self.x + self.width, self.y + self.height-3, "x") * TILE_SIZE - (self.x + self.width);
			return true;			
		}
	}	
	self.updatePosition = function(){
		if(!self.die){
			if(self.position == "right"){
				self.x += self.spdx;
			}else{
				self.x -= self.spdx;
			}
		}
		self.drawx = (self.x - Player.list.x) + Player.list.drawx;	
		self.spriteCounter += self.spriteCounterSpeed;
	}	
	self.update = function(){
		if(self.type != "cannonBall"){
			self.updatePosition();		
			self.flying();

			self.colisionMapLeftDown();
			self.colisionMapDown();
			self.colisionMapRightDown();

			self.colisionMapUpLeft();
			self.colisionMapLeft();
			self.colisionMapDownLeft();

			self.colisionMapUpRight();
			self.colisionMapRight();
			self.colisionMapDownRight();

			self.draw();	
		}else{
			self.updatePosition();
			self.draw();
		}
	}	
	Enemy.list[id] = self;
}		
Enemy.list = {};

Blocks = function(x, y, id, type, src, number, NumberOfJumps){
	var self = {
		x:x,
		y:y,
		drawx:0,
		width:TILE_SIZE,
		height:TILE_SIZE,
		img:new Image(),
		src:src,
		number:number,
		id:id,
		type:type,
		jump:false,
		jumpingSpeed:0.3,
		oldy:y,
		limitJump:y-5,
		break:false,
		NumberOfJumps:NumberOfJumps,
		JumpCount:0,
	}
	self.img.src = src;
	self.drawx = (self.x - Player.list.x) + Player.list.drawx;
	self.playerColisionUp = function(){
		if(Map.list.isColiding(Player.list.x + Player.list.width/2, Player.list.y, "x") == Map.list.isColiding(self.x, self.y, "x") &&  Map.list.isColiding(Player.list.x + Player.list.width - 5, Player.list.y, "y") == Map.list.isColiding(self.x, self.y, "y") && Player.list.jumpingSpeed >= 0){
			if(self.type == "power"){
				if(Player.list.power == "big" || Player.list.power == "flower"){
					Power(self.x, self.y, TILE_SIZE, TILE_SIZE, "flower", "img/flower.png", Math.random(), true);
				}else{
					Power(self.x, self.y, TILE_SIZE, TILE_SIZE, "mushroom", "img/mushroom.png", Math.random(), true);
				}
			}else if(self.type == "life"){
				Power(self.x, self.y, TILE_SIZE, TILE_SIZE, "life", "img/life.png", Math.random(), true);
			}else if(self.type == "star"){
				Power(self.x, self.y, TILE_SIZE, TILE_SIZE, "star", "img/star.png", Math.random(), true);
			}else if(self.type == "gold"){
				Power(self.x, self.y - self.height, TILE_SIZE, TILE_SIZE, "gold", "img/gold.png", Math.random(), false);
			}
			if(self.type == "normal"){
				if(Player.list.power == "big" || Player.list.power == "flower"){
					self.break = true;
				}else{
					self.jump = true;
				}
			}else if(self.type != null){
				self.jump = true;
				self.JumpCount++;
				if(self.JumpCount == self.NumberOfJumps){
					self.img.src = UsedBlockSrc;						
					var gridxandy = Map.list.isColiding(self.x, self.y, "both");
					Map.list.grid[gridxandy[1]][gridxandy[0]] = 19893;
					self.number = 19893;										
					self.type = null;					
				}					
			}
		}
	}
	self.draw = function(){				
		self.drawx = (self.x - Player.list.x) + Player.list.drawx;
		ctx.save();
		ctx.drawImage(self.img, self.drawx, self.y, self.width, self.height);
		ctx.restore();	
	}			
	self.Jump = function(){
		if(self.jump){
			if(!(self.y == self.oldy) || self.jumpingSpeed == 0.3){
				self.y -= self.jumpingSpeed;
				if(!(self.y >= self.limitJump)){
					self.jumpingSpeed = -0.3;
				}
			}else{
				self.jump = false;
				self.jumpingSpeed = 0.3;
			}
		}
	}
	self.update = function(){
		self.playerColisionUp();

		self.Jump();

		self.draw();
	}

	Blocks.list[id] = self;
}
Blocks.list = {};

Power = function(x, y, height, width, type, src, id, animation){
	var self={
		x:x,
		y:y,
		drawx:0,
		height:height,
		width:width,
		type:type,
		src:src,
		id:id,
		spdx:0.8,				
		img:new Image(),
		jump:false,
		jumpingSpeed:3,	
		inJump:false,	
		limitJump:0,
		position:"right",
		animation:animation,
		yWhereEndAnimation:0,
		inFall:false,
	}			
	self.drawx = (self.x - Player.list.x) + Player.list.drawx;
	self.yWhereEndAnimation = y-height;
	self.img.src = self.src;
	self.draw = function(){
		ctx.save();			
		ctx.drawImage(self.img, self.drawx, self.y, self.height, self.width);
		/*
		ctx.fillStyle = self.color;				
		ctx.fillRect(self.drawx, self.y, self.width, self.height);
		*/
		ctx.restore();
	}
	self.updatePosition = function(){	
		if(self.type != "flower" && self.type != "gold"){			
			if(self.position == "right"){
				self.x += self.spdx;
			}else{
				self.x -= self.spdx;
			}				
		}
		self.drawx = (self.x - Player.list.x) + Player.list.drawx;	
	}	
	self.flying = function(){
		if(!self.colisionMapLeftDown() && !self.colisionMapDown() && !self.colisionMapRightDown() && !self.inJump){
			self.y += 3;
			self.inFall = true;
			return true;
		}else{
			self.inFall = false;
		}
	}		
	self.colisionBoundLeft = function(){
		if(self.x  <= 0){
			return true;
		}
	}	
	self.colisionBoundDown = function(){
		if(self.y >= HEIGHT ){
			return true;				
		}
	}
	self.colisionMapLeftDown = function(){				
		if(Map.list.isColiding(self.x + 3, self.y + self.height)){
			self.y += Map.list.isColiding(self.x + 3, self.y + self.height, "y") * TILE_SIZE - (self.y + self.height);
			return true;	
		}
	}
	self.colisionMapDown = function(){				
		if(Map.list.isColiding(self.x + self.width/2, self.y + self.height)){
			self.y += Map.list.isColiding(self.x + self.width/2, self.y + self.height, "y") * TILE_SIZE - (self.y + self.height);
			return true;	
		}
	}
	self.colisionMapRightDown = function(){				
		if(Map.list.isColiding(self.x + self.width - 3, self.y + self.height)){
			self.y += Map.list.isColiding(self.x + self.width -3, self.y + self.height, "y") * TILE_SIZE - (self.y + self.height);
			return true;	
		}
	}
	self.colisionMapUpLeft = function(){		
		if(Map.list.isColiding(self.x, self.y+3)){
			self.position = "right";
			self.x += ((Map.list.isColiding(self.x, self.y+3, "x") * TILE_SIZE) + TILE_SIZE) - self.x;		
			return true;	
		}
	}	
	self.colisionMapLeft = function(){		
		if(Map.list.isColiding(self.x, self.y + self.height/2)){
			self.position = "right";
			self.x  += ((Map.list.isColiding(self.x, self.y + self.height/2, "x") * TILE_SIZE) + TILE_SIZE) - self.x;
			return true;	
		}
	}	
	self.colisionMapDownLeft = function(){		
		if(Map.list.isColiding(self.x, self.y + self.height-3)){
			self.position = "right";
			self.x += ((Map.list.isColiding(self.x, self.y + self.height-3, "x") * TILE_SIZE) + TILE_SIZE) - self.x;
			return true;		
		}
	}					
	self.colisionMapUpRight = function(){		
		if(Map.list.isColiding(self.x + self.width, self.y + 3)){
			self.position = "left";
			self.x += Map.list.isColiding(self.x + self.width, self.y + 3, "x") * TILE_SIZE - (self.x + self.width);
			return true;			
		}
	}	
	self.colisionMapRight = function(){		
		if(Map.list.isColiding(self.x + self.width, self.y + self.height/2)){
			self.position = "left";
			self.x += Map.list.isColiding(self.x + self.width, self.y + self.height/2, "x") * TILE_SIZE - (self.x + self.width);
			return true;				
		}
	}		
	self.colisionMapDownRight = function(){		
		if(Map.list.isColiding(self.x + self.width, self.y + self.height-3)){
			self.position = "left";
			self.x += Map.list.isColiding(self.x + self.width, self.y + self.height-3, "x") * TILE_SIZE - (self.x + self.width);
			return true;			
		}
	}				
	self.colisionMapLeftUp = function(){		
		if(Map.list.isColiding(self.x + 3, self.y) > 0 && self.jumpingSpeed >= 0){
			self.jump = false;
			self.jumpingSpeed = 3;
			self.inJump = false;
			return true;	
		}
	}
	self.colisionMapUp = function(){		
		if(Map.list.isColiding(self.x + self.width/2, self.y) > 0 && self.jumpingSpeed >= 0){
			self.jump = false;
			self.jumpingSpeed = 3;
			self.inJump = false;
			return true;	
		}
	}			
	self.colisionMapRightUp = function(){		
		if(Map.list.isColiding(self.x + self.width - 3, self.y) > 0 && self.jumpingSpeed >= 0){
			self.jump = false;
			self.jumpingSpeed = 3;
			self.inJump = false;
			return true;	
		}
	}
	self.Jump = function(){
		if(self.jump){
			if(!self.inJump){
				self.limitJump = self.y + self.height - TILE_SIZE * 2.5;
			}
			self.inJump = true;
			if(self.type != "gold"){
				if(!self.colisionMapLeftDown() && !self.colisionMapDown() && !self.colisionMapRightDown() || self.jumpingSpeed == 3){
					self.y -= self.jumpingSpeed;
					if(!(self.y > self.limitJump)){
						self.jumpingSpeed -= 0.15;
					}
				}else{
					self.jump = false;
					self.jumpingSpeed = 3;
					self.inJump = false;
				}
			}else{						
				self.y -= self.jumpingSpeed;
			}
		}
	}
	self.playerColision = function(){
		if(((self.x >= Player.list.x && self.x  <= Player.list.x + Player.list.width || self.x + self.width >= Player.list.x && self.x  + self.width <= Player.list.x + Player.list.width) || (self.x <= Player.list.x && self.x + self.width >= Player.list.x + Player.list.width)) && ((self.y >= Player.list.y && self.y  <= Player.list.y + Player.list.height || self.y + self.height >= Player.list.y && self.y  + self.height <= Player.list.y + Player.list.height) || (self.y <= Player.list.y && self.y + self.height >= Player.list.y + Player.list.height))){
			return true;
		}				
	}
	self.playerColisionBlockAtBottom = function(){
		for(var key in Blocks.list){
			if(Blocks.list[key].jump){
				if(((self.x >= Blocks.list[key].x && self.x  <= Blocks.list[key].x + Blocks.list[key].width || self.x + self.width >= Blocks.list[key].x && self.x  + self.width <= Blocks.list[key].x + Blocks.list[key].width) || (self.x <= Blocks.list[key].x && self.x + self.width >= Blocks.list[key].x + Blocks.list[key].width)) && self.y < Blocks.list[key].y && self.y + self.height > Blocks.list[key].y - 5){
					self.jump = true;
				}
			}
		}
	}
	self.update = function(){
		if(!self.animation){
			if(self.type == "life" || self.type == "mushroom"){
				self.updatePosition();		
				self.playerColisionBlockAtBottom();
				self.flying();
				self.Jump();

				self.colisionMapLeftDown();
				self.colisionMapDown();
				self.colisionMapRightDown();

				self.colisionMapUpLeft();
				self.colisionMapLeft();
				self.colisionMapDownLeft();

				self.colisionMapUpRight();
				self.colisionMapRight();
				self.colisionMapDownRight();

				self.draw();	
			}else if(self.type == "flower"){					
				self.updatePosition();		
				self.playerColisionBlockAtBottom();
				self.flying();
				self.Jump();

				self.draw();	
			}else if(self.type == "star"){		
				self.flying();
				if(!self.colisionMapUp() && !self.colisionMapLeftUp() && !self.colisionMapRightUp() && !self.inFall){	
					self.jump = true;
				}else{
					self.jump = false;
				}
				self.updatePosition();		
				self.Jump();

				self.colisionMapLeftDown();
				self.colisionMapDown();
				self.colisionMapRightDown();

				self.colisionMapUpLeft();
				self.colisionMapLeft();
				self.colisionMapDownLeft();

				self.colisionMapUpRight();
				self.colisionMapRight();
				self.colisionMapDownRight();

				self.draw();
			}else if(self.type == "gold"){
				if(!self.jump){
					self.jump = true;
				}
				self.updatePosition();		
				self.Jump();

				self.draw();
			}
		}else{
			self.drawx = (self.x - Player.list.x) + Player.list.drawx;
			if(self.y > self.yWhereEndAnimation){
				self.y-=1;
			}else{
				self.animation = false;
			}
			self.draw();
		}
	}
	Power.list[id] = self;
}
Power.list = {};		

Fire = function(x, y, height, width, src, id, position){
	var self={
		x:x,
		y:y,
		drawx:0,
		height:height,
		width:width,
		src:src,
		id:id,
		position:position,
		spdx:2.8,				
		img:new Image(),
		jump:false,
		jumpingSpeed:3,	
		inJump:false,	
		limitJump:0,
		inFall:false,
		firstTime:true,
	}			
	self.img.src = self.src;
	self.drawx = (self.x - Player.list.x) + Player.list.drawx;		
	self.draw = function(){
		ctx.save();			
		ctx.drawImage(self.img, self.drawx, self.y, self.height, self.width);
		/*
		ctx.fillStyle = self.color;				
		ctx.fillRect(self.drawx, self.y, self.width, self.height);
		*/
		ctx.restore();
	}							
	self.updatePosition = function(){	
		if(self.position == "right"){
			self.x += self.spdx;
		}else{
			self.x -= self.spdx;
		}								
		self.drawx = (self.x - Player.list.x) + Player.list.drawx;	
	}	
	self.flying = function(){
		if(!self.colisionMapLeftDown() && !self.colisionMapDown() && !self.colisionMapRightDown() && !self.inJump){
			self.y += 3;
			self.inFall = true;
			return true;
		}else{
			self.inFall = false;
		}
	}	
	self.colisionBoundLeft = function(){
		if(self.x  <= 0){
			return true;
		}
	}	
	self.colisionBoundDown = function(){
		if(self.y >= HEIGHT ){
			return true;				
		}
	}
	self.colisionMapLeftDown = function(){				
		if(Map.list.isColiding(self.x + 3, self.y + self.height)){
			self.y += Map.list.isColiding(self.x + 3, self.y + self.height, "y") * TILE_SIZE - (self.y + self.height);
			return true;	
		}
	}
	self.colisionMapDown = function(){				
		if(Map.list.isColiding(self.x + self.width/2, self.y + self.height)){
			self.y += Map.list.isColiding(self.x + self.width/2, self.y + self.height, "y") * TILE_SIZE - (self.y + self.height);
			return true;	
		}
	}
	self.colisionMapRightDown = function(){				
		if(Map.list.isColiding(self.x + self.width - 3, self.y + self.height)){
			self.y += Map.list.isColiding(self.x + self.width -3, self.y + self.height, "y") * TILE_SIZE - (self.y + self.height);
			return true;	
		}
	}
	self.colisionMapUpLeft = function(){		
		if(Map.list.isColiding(self.x, self.y+3)){
			self.x += ((Map.list.isColiding(self.x, self.y+3, "x") * TILE_SIZE) + TILE_SIZE) - self.x;		
			return true;	
		}
	}	
	self.colisionMapLeft = function(){		
		if(Map.list.isColiding(self.x, self.y + self.height/2)){
			self.x  += ((Map.list.isColiding(self.x, self.y + self.height/2, "x") * TILE_SIZE) + TILE_SIZE) - self.x;
			return true;	
		}
	}	
	self.colisionMapDownLeft = function(){		
		if(Map.list.isColiding(self.x, self.y + self.height-3)){
			self.x += ((Map.list.isColiding(self.x, self.y + self.height-3, "x") * TILE_SIZE) + TILE_SIZE) - self.x;
			return true;		
		}
	}					
	self.colisionMapUpRight = function(){		
		if(Map.list.isColiding(self.x + self.width, self.y + 3)){
			self.x += Map.list.isColiding(self.x + self.width, self.y + 3, "x") * TILE_SIZE - (self.x + self.width);
			return true;			
		}
	}	
	self.colisionMapRight = function(){		
		if(Map.list.isColiding(self.x + self.width, self.y + self.height/2)){
			self.x += Map.list.isColiding(self.x + self.width, self.y + self.height/2, "x") * TILE_SIZE - (self.x + self.width);
			return true;				
		}
	}		
	self.colisionMapDownRight = function(){		
		if(Map.list.isColiding(self.x + self.width, self.y + self.height-3)){
			self.x += Map.list.isColiding(self.x + self.width, self.y + self.height-3, "x") * TILE_SIZE - (self.x + self.width);
			return true;			
		}
	}				
	self.colisionMapLeftUp = function(){		
		if(Map.list.isColiding(self.x + 3, self.y) > 0 && self.jumpingSpeed >= 0){
			self.jump = false;
			self.jumpingSpeed = 3;
			self.inJump = false;
			return true;	
		}
	}
	self.colisionMapUp = function(){		
		if(Map.list.isColiding(self.x + self.width/2, self.y) > 0 && self.jumpingSpeed >= 0){
			self.jump = false;
			self.jumpingSpeed = 3;
			self.inJump = false;
			return true;	
		}
	}			
	self.colisionMapRightUp = function(){		
		if(Map.list.isColiding(self.x + self.width - 3, self.y) > 0 && self.jumpingSpeed >= 0){
			self.jump = false;
			self.jumpingSpeed = 3;
			self.inJump = false;
			return true;	
		}
	}			
	self.enemyColision = function(){
		for(var key in Enemy.list){
			if(((self.x >= Enemy.list[key].x && self.x  <= Enemy.list[key].x + Enemy.list[key].width || self.x + self.width >= Enemy.list[key].x && self.x  + self.width <= Enemy.list[key].x + Enemy.list[key].width) || (self.x <= Enemy.list[key].x && self.x + self.width >= Enemy.list[key].x + Enemy.list[key].width)) && ((self.y >= Enemy.list[key].y && self.y  <= Enemy.list[key].y + Enemy.list[key].height || self.y + self.height >= Enemy.list[key].y && self.y  + self.height <= Enemy.list[key].y + Enemy.list[key].height) || (self.y <= Enemy.list[key].y && self.y + self.height >= Enemy.list[key].y + Enemy.list[key].height))){
				delete Enemy.list[key];
				return true;
			}				
		}
	}
	self.Jump = function(){
		if(self.jump){
			if(!self.inJump){
				self.limitJump = self.y + self.height - TILE_SIZE * 0.5;
			}
			self.inJump = true;
			if(!self.colisionMapLeftDown() && !self.colisionMapDown() && !self.colisionMapRightDown() || self.jumpingSpeed == 3){
				self.y -= self.jumpingSpeed;
				if(!(self.y > self.limitJump)){
					self.jumpingSpeed -= 0.15;
				}
			}else{
				self.jump = false;
				self.jumpingSpeed = 3;
				self.inJump = false;
			}					
		}
	}
	self.update = function(){
		if(!self.colisionMapUp() && !self.colisionMapLeftUp() && !self.colisionMapRightUp() && !self.inFall && !self.firstTime){	
			self.jump = true;
		}else{
			self.jump = false;
		}
		self.flying();
		self.updatePosition();		
		self.Jump();

		self.colisionMapLeftDown();
		self.colisionMapDown();
		self.colisionMapRightDown();

		self.draw();
		self.firstTime = false;
	}
	Fire.list[id] = self;
}
Fire.list = {};

FlagPole = function(x, y, width, height, id){
	var self = {
		x:x,
		y:y,
		width:width,
		height:height,
		id:id,
	}			
	FlagPole.list[id] = self;
	for (var key in FlagPole.list){
		if(FlagPole.list[key].y < FlagPole.bigger){
			FlagPole.bigger = FlagPole.list[key].y;
		}
		if(FlagPole.list[key].y + FlagPole.list[key].height > FlagPole.less){
			FlagPole.less = FlagPole.list[key].y + FlagPole.list[key].height;			
		}
	}
}
FlagPole.list = {};
FlagPole.bigger = HEIGHT;
FlagPole.less = 0;

Cannon = function(x, y, width, height, id){
	var self = {
		x:x,
		y:y,
		width:width,
		height:height,
		id:id,
		cannonCount:0,
	}
	self.createCannonBall = function(){
		if(self.cannonCount >= 300 && (Player.list.x < self.x - 80 || Player.list.x > self.x + self.width + 80) && Map.list.x + WIDTH >=  self.x  && Map.list.x <=  self.x + self.width){
			if(Player.list.x < self.x){
				Enemy(self.x - 40, self.y, 35, 40, 35, 40, 0, 0, "img/left-cannon-ball.png", Math.random(), "cannonBall", "left");
				console.log("yesLeft");
			}else{
				Enemy(self.x + self.width, self.y, 35, 40, 35, 40, 0, 0, "img/right-cannon-ball.png", Math.random(), "cannonBall", "right");
				console.log("yesRight");
			}
			self.cannonCount = 0;
		}
	}
	self.update = function(){
		if(Map.list.x + WIDTH >=  self.x  && Map.list.x <=  self.x + self.width){
			self.cannonCount++;
		}
		self.createCannonBall();
	}

	Cannon.list[id] = self;
}
Cannon.list = {};

Map = function(width, height,drawWidth, drawHeight, src, grid){
	var self = {
		img: new Image(),
		x:0,	
		y:0,	
		oldx:0,		
		width:width,
		height:height,
		drawWidth:drawWidth,
		drawHeight:drawHeight,
		src:src,
		grid:grid,
	}
	self.img.src = self.src;
	self.move = function(){
		if(Player.list.drawx > WIDTH/2 - Player.list.width/2 && !(self.x + WIDTH >= self.width)){
			self.oldx = self.x;
			self.x += Player.list.drawx + Player.list.width/2 - WIDTH/2; 
			Player.list.drawx = WIDTH/2 - Player.list.width/2;	
			if(self.x + WIDTH/2.5 > self.width){
				self.x = self.width - WIDTH/2.5;
			}
		}
	}
	self.isColiding = function(pointx, pointy, returnArrayPosition){
		gridX = Math.floor(pointx/TILE_SIZE);
		gridY = Math.floor(pointy/TILE_SIZE);
		if(gridX < 0 || gridX >= self.grid[0].length){
			return false;
		}
		if(gridY < 0 || gridY >= self.grid.length){
			return false;
		}
		if(returnArrayPosition == null){
			return self.grid[gridY][gridX];				
		}else if(returnArrayPosition == "x"){
			return gridX;				
		}else if(returnArrayPosition == "y"){
			return gridY;				
		}else if(returnArrayPosition == "both"){
			return [gridX, gridY];
		}
	}
	self.draw = function(){
		ctx.save();
		ctx.drawImage(self.img, self.x, 0, self.width, self.height, 0, 0, self.drawWidth, self.drawHeight);
		ctx.restore();				
	}
	self.update = function(){
		self.move();
		self.draw();
	}
	Map.list = self;
}	

Enemy.Die = function(id){	
	Enemy.list[id].spriteY = 1;
	Enemy.list[id].frameCounter++;
	if(Enemy.list[id].frameCounter == 200){
		delete Enemy.list[id];
	}
}		
Enemy.UpdateEnemies = function(){
	for(var key in Enemy.list){
		if(Enemy.list[key].delete){
			delete Enemy.list[key];
			break;
		}
		var xlimit = Enemy.list[key].x - Player.list.x;
		if(xlimit < 800 && xlimit > -500 + Player.list.width/2 || Enemy.list[key].type == "cannonBall"){
			Enemy.list[key].update();
			for(var key2 in Enemy.list){
				if(Enemy.list[key] != Enemy.list[key2]){
					if(Enemy.list[key].inside != null){
						if(!((Enemy.list[key].x >= Enemy.list[key2].x && Enemy.list[key].x  <= Enemy.list[key2].x + Enemy.list[key2].width || Enemy.list[key].x + Enemy.list[key].width >= Enemy.list[key2].x && Enemy.list[key].x  + Enemy.list[key].width <= Enemy.list[key2].x + Enemy.list[key2].width) && Enemy.list[key].y + Enemy.list[key].height > Enemy.list[key2].y && Enemy.list[key].y + Enemy.list[key].height <= Enemy.list[key2].y + Enemy.list[key2].height && !Enemy.list[key].die && !Enemy.list[key2].die && Enemy.list[key2].type != "cannonBall" && Enemy.list[key].type != "cannonBall") && Enemy.list[key].inside == Enemy.list[key2].id){						
							Enemy.list[key].inside = null;
						}
					}
					if((Enemy.list[key].x >= Enemy.list[key2].x && Enemy.list[key].x  <= Enemy.list[key2].x + Enemy.list[key2].width || Enemy.list[key].x + Enemy.list[key].width >= Enemy.list[key2].x && Enemy.list[key].x  + Enemy.list[key].width <= Enemy.list[key2].x + Enemy.list[key2].width) && Enemy.list[key].y + Enemy.list[key].height > Enemy.list[key2].y && Enemy.list[key].y + Enemy.list[key].height <= Enemy.list[key2].y + Enemy.list[key2].height && !Enemy.list[key].die && !Enemy.list[key2].die && Enemy.list[key2].type != "cannonBall" && Enemy.list[key].type != "cannonBall" && Enemy.list[key].inside == null){
						if(!(Enemy.list[key].type == "turtle" || Enemy.list[key].turtleShellMoving)){	
							if(Enemy.list[key].position != Enemy.list[key2].position){
								if(Enemy.list[key].position == "left"){
									Enemy.list[key].position = "right";
								}else if(Enemy.list[key].position == "right"){
									Enemy.list[key].position = "left";
								}							
								if(Enemy.list[key2].position == "left"){
									Enemy.list[key2].position = "right";
								}else if(Enemy.list[key2].position == "right"){
									Enemy.list[key2].position = "left";
								}
								Enemy.list[key].inside = Enemy.list[key2].id;
							}else{							
								if(Enemy.list[key].position == "left"){
									Enemy.list[key].position = "right";
								}else if(Enemy.list[key].position == "right"){
									Enemy.list[key].position = "left";
								}	
							}
						}else if(Enemy.list[key].type == "turtle" && Enemy.list[key].turtleShellMoving && xlimit > -800 + Player.list.width/2){
							delete Enemy.list[key2];
						}
					}
				}
			}
		}else{
			if(Enemy.list[key].type == "turtle" && Enemy.list[key].turtleShellMoving){
				delete Enemy.list[key];
			}
		}
		if(Enemy.list[key].type == "cannonBall" && xlimit < -300 + Player.list.width/2 && Enemy.list[key].position == "left"){
			delete Enemy.list[key];
			break;
		}					
		if(Enemy.list[key].colisionBoundDown() || Enemy.list[key].colisionBoundLeft()){
			delete Enemy.list[key];
			break;
		}
		if(Enemy.list[key].x > Map.list.drawWidth && Enemy.list[key].type == "cannonBall"){
			delete Enemy.list[key];
			break;
		}
		var breakFor = false;
		for(var key2 in Blocks.list){					
			if(Blocks.list[key2].jump){
				if(((Enemy.list[key].x >= Blocks.list[key2].x && Enemy.list[key].x  <= Blocks.list[key2].x + Blocks.list[key2].width || Enemy.list[key].x + Enemy.list[key].width >= Blocks.list[key2].x && Enemy.list[key].x  + Enemy.list[key].width <= Blocks.list[key2].x + Blocks.list[key2].width) || (Enemy.list[key].x <= Blocks.list[key2].x && Enemy.list[key].x + Enemy.list[key].width >= Blocks.list[key2].x + Blocks.list[key2].width)) && Enemy.list[key].y < Blocks.list[key2].y && Enemy.list[key].y + Enemy.list[key].height > Blocks.list[key2].y - 5 && !Enemy.list[key].die){
					delete Enemy.list[key];		
					breakFor = true;			
				}
			}
		}	
		if(breakFor){
			break;
		}
		if(Enemy.list[key].dieByStarMario && !Enemy.list[key].die){
			delete Enemy.list[key];
			break;
		}
		if(Enemy.list[key].die){
			if(Enemy.list[key].type == "goomba"){
				Enemy.Die(key);
			}else{
				delete Enemy.list[key];
			}
		}
	}
}		

Blocks.UpdateBlocks = function(){
	for(var key in Blocks.list){
		Blocks.list[key].update();
		Blocks.Brake(key);
	}
}		
Blocks.Brake = function(id){	
	if(Blocks.list[id].break){
		for(var key in Enemy.list){
			if(((Enemy.list[key].x >= Blocks.list[id].x && Enemy.list[key].x  <= Blocks.list[id].x + Blocks.list[id].width || Enemy.list[key].x + Enemy.list[key].width >= Blocks.list[id].x && Enemy.list[key].x  + Enemy.list[key].width <= Blocks.list[id].x + Blocks.list[id].width) || (Enemy.list[key].x <= Blocks.list[id].x && Enemy.list[key].x + Enemy.list[key].width >= Blocks.list[id].x + Blocks.list[id].width)) && Enemy.list[key].y < Blocks.list[id].y && Enemy.list[key].y + Enemy.list[key].height > Blocks.list[id].y - 5 && !Enemy.list[key].die){
				Enemy.list[key].delete = true;
			}
		}
		var gridNumber = Map.list.isColiding(Blocks.list[id].x, Blocks.list[id].y, "both");
		Map.list.grid[gridNumber[1]][gridNumber[0]] = 0;
		delete Blocks.list[id];
	}
}		

Power.UpdatePowers = function(){
	for(var key in Power.list){
		Power.list[key].update();
		if(Power.list[key].playerColision() && !Power.list[key].animation && Power.list[key].type != "gold"){
			if(Power.list[key].type == "mushroom"){
				Player.list.power = "big";	
				Player.list.y -= Player.list.height;					
				Player.list.height = Player.list.height*2;
				Player.list.drawHeight = Player.list.drawHeight*2;
			}else if(Power.list[key].type == "flower"){
				Player.list.power = "flower";
			}else if(Power.list[key].type == "life"){
				life++;
			}else if(Power.list[key].type == "star"){
				Player.list.star = true;
			}
			delete Power.list[key];					
			break;
		}
		if(Power.list[key].type == "gold"){
			if(!(Power.list[key].y > Power.list[key].limitJump)){
				gold++;
				delete Power.list[key];
				break;
			}
		}
	}
}

Fire.UpdateFires = function(){			
	for(var key in Fire.list){
		var xlimit = Fire.list[key].x - Player.list.x;
		if(xlimit > 600 || xlimit < -300 + Player.list.width/2){
			fireCount--;
			delete Fire.list[key];
			break;
		}
		Fire.list[key].update();
		if(Fire.list[key].enemyColision() || Fire.list[key].colisionMapUpLeft() || Fire.list[key].colisionMapLeft() || Fire.list[key].colisionMapDownLeft() || Fire.list[key].colisionMapUpRight() || Fire.list[key].colisionMapRight() || Fire.list[key].colisionMapDownRight() || Fire.list[key].colisionBoundDown() || Fire.list[key].colisionBoundLeft()){
			fireCount--;
			delete Fire.list[key];
			break;
		}
		if(Fire.list[key].colisionBoundDown() || Fire.list[key].colisionBoundLeft()){
			delete Fire.list[key];
		}
	}
}
Cannon.UpdateCannons = function(){	
	for(var key in Cannon.list){
		Cannon.list[key].update();
	}
}

DeleteEntities = function(){
	for(var key in Enemy.list){
		delete Enemy.list[key];
	}
	for(var key in Blocks.list){
		delete Blocks.list[key];
	}
	for(var key in Power.list){
		delete Power.list[key];
	}
	for(var key in Fire.list){
		delete Fire.list[key];
	}
	for(var key in Cannon.list){
		delete Cannon.list[key];
	}
	for(var key in FlagPole.list){
		delete FlagPole.list[key];
	}
	delete Player.list;
	delete Map.list;
}