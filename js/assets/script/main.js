window.gLocalAssetContainer["main"] = function(g) { (function(exports, require, module, __filename, __dirname) {
exports.main = void 0;
var b2 = require("@akashic-extension/akashic-box2d");
var camera = new g.Camera2D({x:-225,y:-105});
var params = new URLSearchParams(window.location.search);
var paramValue = params.get("map");
g.game.focusingCamera = camera;
function main(param) {
	var random = param.random;
	var gameTime = 30;
	var randomGenerate = random.generate();//1700419934089485
	var randomGenerate2 =[];
	for(var i=0;i<16;i++){
		randomGenerate2[i]=Math.floor(randomGenerate*(10**(i+1)))%10;
	}
	g.game.vars.gameState = { score: 0 };
	var score=0;
	function createSceneB() {
		var scene = new g.Scene({game: g.game ,assetPaths: ["/**/*"]});
			var box2d = new b2.Box2D({
			gravity: [0, 9.8],
			scale: 50,
			sleep: false
		});
		var staticDef = box2d.createBodyDef({
			type: b2.BodyType.Static
		});
		var dynamicDef = box2d.createBodyDef({
				type: b2.BodyType.Dynamic
			});
		var time=Math.ceil(gameTime);//json35→38
		var labelTime=time;
		var start=0;
		var reset=false;
		var color="white";
		var carColor="#FFCC33";
		var re=false;
		var fo=false;
		var seTime=0;
		var hit=false;
		scene.onLoad.add(function () {
			scene.asset.getAudioById("bgm").play();
			var box2d = new b2.Box2D({
				gravity: [0, 9.8],
				scale: 50,
				sleep: false
			});
			var bg = new g.FilledRect({
				scene: scene,
				cssColor: bgColor,
				width: 1280,
				height: 720,
				opacity: 1,
				parent:scene
			});
			// 地面エンティティの生成
			var floor = new g.FilledRect({
				scene: scene,
				cssColor: color,
				x: -1000,
				y: 500,
				width: 1500,
				height: 50,
				parent: scene
			});
			var stop=false;
			/*var floorD = new g.FilledRect({
				scene: scene,
				cssColor: "red",
				x:1000,
				y: 300,
				width: 300,
				height: 50,
				touchable:true,
				angle:0
			});
			scene.append(floorD);
			var mode="xy";
			floorD.onPointDown.add(function (e) {if(e.button==2){if(!stop){stop=true;}else{stop=false;}}});
			floorD.onPointUp.add(function (e) {
				if(mode=="xy"){
					mode="w";floorD.cssColor="blue";
				}else if(mode=="w"){
					mode="angle";floorD.cssColor="Yellow";
				}else if(mode=="angle"){
					mode="xy";floorD.cssColor="red";
				}
				floorD.modified();
			});
			floorD.onPointMove.add(function (e) {
				if (mode=="xy") {
					floorD.x+=e.prevDelta.x;
					floorD.y+=e.prevDelta.y;
				}
				if (mode=="w") {
					floorD.width-=e.prevDelta.y;
				}
				if (mode=="angle") {
					floorD.angle+=e.prevDelta.y;
				}
				floorD.modified();console.log(floorD.x+","+floorD.y+","+floorD.width+","+floorD.height+","+floorD.angle);
			});*/
			
			create(-1000,450,50,50);
			create(-395,502,300,50,-10);
			create(-100,450,300,50,10);
			create(466.5,510,376.5,50,-39);
			create(750,283.5,211.5,50,-57);
			create(864,108,306,50,-43.5);
			create(1077,-88.5,214.5,50,-61.5);
			create(1182,-276,300,50,0);
			create(1431,-324,51,50,0);
			create(1482,-369,51,50,0);
			create(1534.5,-418.5,51,50,0);
			create(1582.5,-468,222,50,0);
			create(1893,-489,256.5,50,-43.5);
			create(2070,-652.5,219,50,-61.5);
			create(2190,-817.5,300,50,0);
			create(2176.5,-844.5,54,50,0);
			create(2640,-817,300,50,0);
			create(2925,-840,325.5,50,48);
			create(3144,-597,5000.5,50,64.5);
			create(2868,-838.5,57,50,0);
			
			function create(x,y,w,h,a){
				var floor3 = new g.FilledRect({
					scene: scene,
					cssColor: color,
					x: x,
					y: y,
					width: w,
					height: h,
					angle: a,
					parent: scene
				});
				var floorDef = box2d.createFixtureDef({
					density: 1.0,
					friction: 1.5,
					restitution: 0.3,
					shape: box2d.createRectShape(floor3.width, floor3.height),angle:floor3.angle, // 地面エンティティを四角に設定
					filter: {
						categoryBits: 1,
	     				maskBits: 7
					}
				});
				box2d.createBody(floor3, staticDef, floorDef);
			}
			// 地面エンティティの性質を定義
			var floorDef = box2d.createFixtureDef({
				density: 1.0,
				friction: 1.5,
				restitution: 0.3,
				shape: box2d.createRectShape(floor.width, floor.height), // 地面エンティティを四角に設定
				filter: {
					categoryBits: 1,
        maskBits: 7
				}
			});
			// Box2Dに地面エンティティを追加
			box2d.createBody(floor, staticDef, floorDef);
			var rect1 = new g.FilledRect({
				scene: scene,
				cssColor: carColor,
				x: 200,
				y: 270,
				width: 150,
				height: 50,
				parent:scene
			});
			var rect2 = new g.FilledRect({
				scene: scene,
				cssColor: carColor,
				x: 200,
				y: 220,
				width: 100,
				height: 60,
				parent:scene
			});
			var rect3 = new g.FilledRect({
				scene: scene,
				cssColor: "lightblue",
				x: 55,
				y: 5,
				width: 40,
				height: 40,
				parent:rect2
			});
			var rect4 = new g.FilledRect({
				scene: scene,
				cssColor: "gray",
				x: 226,
				y: 305,
				width: 98,
				height: 40,
				parent:scene
			});
			var rect5 = new g.FilledRect({
				scene: scene,
				cssColor: "black",
				x: 10,
				y: 30,
				width: 10,
				height: 30,
				parent:rect2
			});
			function smoke(){
				var  radian = rect1.angle * (Math.PI / 180);
				var smoke = new g.FilledRect({
					scene: scene,
					cssColor: "black",
					x: rect1.x - (rect1.width / 2-16) * Math.cos(radian) + (rect1.height / 2+23) * Math.sin(radian),
					y: rect1.y - (rect1.width / 2-16) * Math.sin(radian) - (rect1.height / 2+23) * Math.cos(radian),
					angle:rect1.angle+45,
					anchorX:0.5,
					anchorY:0.5,
					width: 20,
					height: 20,
					opacity:0.3,
					parent:scene
				});
				smoke.onUpdate.add(function () {
					smoke.x-=1;
					smoke.y-=2;
					smoke.scaleX+=0.06;
					smoke.scaleY+=0.06;
					smoke.opacity-=0.005;
					smoke.modified();
					if(smoke.opacity<0){smoke.destroy();}
				});
			}
			var lamp1 = new g.FilledRect({
				scene: scene,
				cssColor: "red",
				x: 0,
				y: 25,
				width: 5,
				height: 10,
				opacity: 0.3,
				parent:rect1
			});
			var lamp2 = new g.FilledRect({
				scene: scene,
				cssColor: "red",
				x: -15,
				y: 20,
				width: 20,
				height: 20,
				opacity: 0.3,
				hidden: true,
				parent:rect1
			});
			var tire1 = new g.Sprite({
				scene: scene,
				src: scene.asset.getImageById("tire"),
				x: 175,
				y: 300,
				parent:scene
			});
			var tire2 = new g.Sprite({
				scene: scene,
				src: scene.asset.getImageById("tire"),
				x: 325,
				y: 300,
				parent:scene
			});
			var beltW = 20;
			var beltH = 7;
			var belts = [];
			var beltX=175;
			var beltY=300;
			for (var i = 0; i < 10; i++) {
				var belt = new g.FilledRect({
					scene: scene,
					cssColor: "olive",
					x: beltX,
					y: beltY,
					anchorX:0.5,
					anchorY:0.5,
					width: beltW-3,
					height: beltH,
					parent: scene
				});
				belts.push(belt);
				beltX+=beltW;
			}
			beltX-=beltW/2;
			beltY+=beltW/2;
			for (var i = 0; i < 2; i++) {
				var belt = new g.FilledRect({
					scene: scene,
					cssColor: "olive",
					x: beltX,
					y: beltY,
					anchorX:0.5,
					anchorY:0.5,
					angle:90,
					width: beltW-3,
					height: beltH,
					parent: scene
				});
				belts.push(belt);
				beltY+=beltW;
			}
			beltX-=beltW/2;
			beltY-=beltW/2;
			for (var i = 0; i < 10; i++) {
				var belt = new g.FilledRect({
					scene: scene,
					cssColor: "olive",
					x: beltX,
					y: beltY,
					anchorX:0.5,
					anchorY:0.5,
					angle:180,
					width: beltW-3,
					height: beltH,
					parent: scene
				});
				belts.push(belt);
				beltX-=beltW;
			}
			beltX+=beltW/2;
			beltY-=beltW/2;
			for (var i = 0; i < 2; i++) {
				var belt = new g.FilledRect({
					scene: scene,
					cssColor: "olive",
					x: beltX,
					y: beltY,
					anchorX:0.5,
					anchorY:0.5,
					angle:270,
					width: beltW-3,
					height: beltH,
					parent: scene
				});
				belts.push(belt);
				beltY-=beltW;
			}
			// rect1
			var a = box2d.createBody(
				rect1,
				dynamicDef,
				box2d.createFixtureDef({
					density: 0.5,//密度
					friction: 0.5,//摩擦0.5
					restitution: 0, // 反発係数0.5
					shape: box2d.createRectShape(rect1.width, rect1.height),
					filter: {
						categoryBits: 2,
						maskBits: 1
		            }
				})
			  );
			// rect2
			var a2 = box2d.createBody(
				rect2,
				dynamicDef,
				box2d.createFixtureDef({
					density: 0.1,//密度0.1
					friction: 0.5,//摩擦
					restitution: 0, // 反発係数
					shape: box2d.createRectShape(rect2.width, rect2.height),
					filter: {
						categoryBits: 2,
						maskBits: 1
		            }
				})
			);
			// rect4
			var a4 = box2d.createBody(
				rect4,
				dynamicDef,
				box2d.createFixtureDef({
					density: 0.8,//密度0.1
					friction: 0.1,//摩擦
					restitution: 0, // 反発係数
					shape: box2d.createRectShape(rect4.width, rect4.height),
					filter: {
						categoryBits: 2,
						maskBits: 5
		            }
				})
			);

			// タイヤ1
			var b = box2d.createBody(
				tire1,
				dynamicDef,
				box2d.createFixtureDef({
					density: 1.5,//密度
					friction: 0.5,//摩擦
					restitution: 0.2,// 反発係数
					shape: box2d.createCircleShape(tire1.width),
					filter: { 
						categoryBits: 2,
						maskBits: 5
					}
		        })
			);
			// タイヤ2
			var c = box2d.createBody(
				tire2,
				dynamicDef,
				box2d.createFixtureDef({
					density: 1.5,//密度
					friction: 0.5,//摩擦
					restitution: 0.2,// 反発係数
					shape: box2d.createCircleShape(tire2.width),
					filter: { 
						categoryBits: 2,
						maskBits: 5
					}
		        })
			);
			var beltsBody = [];
			for (var i = 0; i < belts.length; i++) {
				var t = box2d.createBody(
					belts[i],
					dynamicDef,
					box2d.createFixtureDef({
						density: 0.8,
						friction: 5.0,
						restitution: 0,
						shape: box2d.createRectShape(beltW, 5),
						filter: {
					                    categoryBits: 4,
			        maskBits: 3
					            }
					})
				);
				beltsBody.push(t);
			}
			var P=beltW/2
			for (var i = 0; i < belts.length; i++) {
				var X=-P;
				var Y=0;
				if(i==0){var beltParent=beltsBody[beltsBody.length-1]}else{beltParent=beltsBody[i-1]}
				if(belts[i].angle==90){X=0;Y=-P;}
				if(belts[i].angle==180){X=P;Y=0;}
				if(belts[i].angle==270){X=0;Y=P;}
				var def = new b2.Box2DWeb.Dynamics.Joints.b2RevoluteJointDef();
				def.Initialize(beltParent.b2Body, beltsBody[i].b2Body, box2d.vec2(belts[i].x+X, belts[i].y+Y));
				def.enableMotor = false;
				var joint1=box2d.world.CreateJoint(def);
			}
			var axis = new b2.Box2DWeb.Common.Math.b2Vec2(0, -1);//下向き(yがマイナスになる)　
			// ジョイントの定義と初期化

			var def3 = new b2.Box2DWeb.Dynamics.Joints.b2WeldJointDef();
			def3.Initialize(a.b2Body, a2.b2Body,  a2.b2Body.GetPosition());
			var joint3 = box2d.world.CreateJoint(def3);

			var def31 = new b2.Box2DWeb.Dynamics.Joints.b2WeldJointDef();
			def31.Initialize(a.b2Body, a4.b2Body,  a4.b2Body.GetPosition());
			var joint31 = box2d.world.CreateJoint(def31);
			
			var def4 = new b2.Box2DWeb.Dynamics.Joints.b2RevoluteJointDef();
			def4.Initialize(a.b2Body, b.b2Body, box2d.vec2(tire1.x, tire1.y));
			def4.maxMotorTorque = 3;
	        def4.motorSpeed = 0;
	        def4.enableMotor = true;
			var def5 = new b2.Box2DWeb.Dynamics.Joints.b2RevoluteJointDef();
			def5.Initialize(a.b2Body, c.b2Body, box2d.vec2(tire2.x, tire2.y));
			def5.enableMotor = false;

			var joint4 = box2d.world.CreateJoint(def4);
			var joint5 = box2d.world.CreateJoint(def5);
			var def6 = new b2.Box2DWeb.Dynamics.Joints.b2GearJointDef();
			def6.bodyA = joint5.GetBodyA();
			def6.bodyB = joint4.GetBodyB();
			def6.joint1 = joint5;
			def6.joint2 = joint4;
			def6.ratio = -1;
			var gearJoint = box2d.world.CreateJoint(def6);
			var L=false;
			var R=false;
			scene.onPointDownCapture.add(function (e) {
				if(!stop){
					if (e.button === 2) {
						reverse();R=true;
					}else{
						on();L=true;
					}
				}
			});
			scene.onPointUpCapture.add(function (e) {
				if(!stop){
					if (e.button === 0) {
						seOff();
					}
					off();
				}
			});
			scene.onPointMoveCapture.add(function (e) {
				if(!stop){
					if (e.button === 2) {
						if(R){
							on();R=false;
						}else{
							seOff();
							reverse();R=true;
						}
					}else if (e.button === 0) {
						if(L){
							seOff();
							reverse();L=false;
						}else{
							on();L=true;
						}
					}
					else if(e.prevDelta.x<-20){
						seOff();
						reverse();
					}
				}
			});
			function on(){
				joint4.SetMaxMotorTorque(100);
				joint4.SetMotorSpeed(8);
				lamp2.hide();
				scene.asset.getAudioById("on").stop();
				scene.asset.getAudioById("on").play();
				re=false;
				fo=true;
				seTime=0;
			}
			function off(){
				L=false;
				R=false;
				joint4.SetMaxMotorTorque((joint4.GetMotorSpeed()/1000)+3);//+1
				joint4.SetMotorSpeed(0);
				lamp2.hide();
				re=false;
				fo=false;
			}
			function reverse(){
				joint4.SetMaxMotorTorque(100);
				joint4.SetMotorSpeed(-8);//-10
				lamp2.show();
				re=true;
				fo=false;
			}
			var context;
			function seOff() {
				if(!re){
				scene.asset.getAudioById("on").stop();
				if(context){context.stop();}
				var offse = scene.asset.getAudioById("off");
				context = g.game.audio.sound.create(offse);
				context.play();
				g.AudioUtil.fadeOut(g.game, context, 2300);
				}
			}
			var E = new g.E({
				scene: scene,
				x: camera.x,
				y: camera.y,
				parent:scene
			});
			var scoreLabel = new g.Label({
				scene: scene,
				x: 950,
				text: "SCORE: "+g.game.vars.gameState.score,
				font: font,
				fontSize: font.size,
				textColor: "silver",
				parent:E
			});
			var timeLabel = new g.Label({
				scene: scene,
				x: 50,
				text: "TIME: "+time,
				font: font,
				fontSize: font.size,
				textColor: "silver",
				parent:E
			});
			var resetLabel = new g.Label({
				scene: scene,
				x: 25,
				y: 100,
				text: "リセット",
				font: font,
				fontSize: 24,
				textColor: "silver",
				touchable: true,
				parent:E
			});
			var black = new g.FilledRect({
				scene: scene,
				cssColor: "black",
				width: 1280,
				height: 720,
				opacity: 1,
				parent:E
			});
			resetLabel.onPointDown.add(function () {
				if(time>0){
					reset=true;
					box2d.destroy();
					camera.x=-225;
					camera.y=-105;
					g.game.replaceScene(createSceneB());
				}
			});
			function cameraXY(){
				camera.x=(camera.x*3+rect1.x-500)/4;
				camera.y=(camera.y*7+rect1.y-400)/8;
				camera.modified();
				E.x=camera.x;
				E.y=camera.y;
				E.modified();
				bg.x=camera.x;
				bg.y=camera.y;
				bg.modified();
			}
			scene.onUpdate.add(function () {
				if(!reset){
					if(!start){black.destroy();start=true;}
					box2d.step(1 / g.game.fps);
					if(fo){
						seTime++;
						if(seTime>180){
							seTime=0;
							scene.asset.getAudioById("on").stop();
							scene.asset.getAudioById("on").play();
						}
					}
					if (gameTime <= 0) {
						gameTime = 0; // timeを0に固定
					} else {
						gameTime -= 1 / g.game.fps;
						time = Math.ceil(gameTime);
						if(time<labelTime){
							labelTime=time;
							timeLabel.text = "TIME: " + time;
							timeLabel.invalidate();
						}
						score=Math.ceil(rect1.x/20);
						if(g.game.vars.gameState.score<score){
							g.game.vars.gameState.score=score;
							scoreLabel.text = "SCORE: " + g.game.vars.gameState.score;
							scoreLabel.invalidate();
						}
						cameraXY();
					}
				}
			});
			var rectAngle=0;
			scene.setInterval(function() {
				if(rect1.x<39000&&rect1.y<3000){
					if((rect1.angle<-720||rect1.angle>720)&&rectAngle<1){
						box2d.world.DestroyJoint(joint1);
						rectAngle=1;
					}
					if((rect1.angle<-1080||rect1.angle>1080)&&rectAngle<2){
						box2d.world.DestroyJoint(joint4);
						box2d.world.DestroyJoint(joint5);
						rectAngle=2;
					}
					if((rect1.angle<-1440||rect1.angle>1440)&&rectAngle<3){
						box2d.world.DestroyJoint(joint3);
						box2d.world.DestroyJoint(joint31);
						//box2d.world.DestroyJoint(joint5);
						rectAngle=3;
					}
				}
			}, 500);
			scene.setInterval(function() {
				if(fo){smoke();}
			}, 300);
			console.log("map : 10000000000000000");
		});
		return scene;
	}

	function createSceneA2() {
		var scene = new g.Scene({game: g.game ,assetPaths: ["/**/*"]});
		var box2d = new b2.Box2D({
		gravity: [0, 9.8],
		scale: 50,
		sleep: false
		});
		var staticDef = box2d.createBodyDef({
			type: b2.BodyType.Static
		});
		var dynamicDef = box2d.createBodyDef({
				type: b2.BodyType.Dynamic
			});
		var time=Math.ceil(gameTime);//json35→38
		var labelTime=time;
		var start=0;
		var reset=false;
		var color="#977609";//#808000
		var carColor="#FFCC33";
		var re=false;
		var fo=false;
		var seTime=0;
		var hit=false;
		var angleOver=0;
		scene.onLoad.add(function () {
			scene.asset.getAudioById("bgm").play();
			var bg = new g.FilledRect({
				scene: scene,
				x: camera.x,
				y: camera.y,
				cssColor: bgColor,
				width: 1280,
				height: 720,
				opacity: 1,
				parent:scene
			});var count=0;
			var objects = [];
			var angle=0;
			var ab=1;
			var floor = new g.FilledRect({
				scene: scene,
				cssColor: color,
				x:200,
				y:400,
				angle: 0,
				width:50,
				height: 1000,
				parent: scene
			});
			objects.push(floor);
			var amplitude = 10 + randomGenerate* 30; // 10から40のランダムな振幅//20-40
			var frequency = 0.1 + randomGenerate* 0.3; // 0.1から0.4のランダムな周波数
			var totalSegments = 280;//500
			var randomCount=0;
			var randomCount2=9;
			var y=0;
			var addAngle=0;
			var angleLimit=false;
			var amp1=10;
			var amp2=3;
			var fre1=0.1;
			var fre2=0.03;
			var maxAngle=-67;
			var minAngle=-35;
			var angleI1=0;
			var angleI2=0;
			var max=0;
			for (var i = 0; i < totalSegments; i++) {
				if(!angleLimit){angleI1+=1;}else{angleI1-=3;}
				if(i>totalSegments-20&&!angleLimit){angleI2+=0.7;}//console.log("angleI2",i);
				addAngle=-0.20*angleI1-(angleI2*2);
				var d = -amplitude * Math.sin(frequency * (i+y))+(addAngle);
				var prevFloor = objects[i];
				if (((d>addAngle&&angle<addAngle)||(d<addAngle&&angle>addAngle))&&count>10){
					amplitude = amp1 + randomGenerate2[randomCount]* amp2;
					frequency = fre1 + randomGenerate2[randomCount2]* fre2;
					//if(i>totalSegments-20){amplitude=40;}
					var d1 = amplitude * Math.sin(frequency * (i))+(addAngle);
					var step = 1;
					for (var j = 0; j < 100; j += step) {
						var d2 = amplitude * Math.sin(frequency * (i + j)) + addAngle;
							if ((d1 <= addAngle && d2 >= addAngle ) || (d1 >= addAngle && d2 <= addAngle )) {
							y = j;
							break;
						}
					}
					for (var k = y - step,p=0; k < y + step; p += 1) {
						var d2 = amplitude * Math.sin(frequency * (i + k+(p/10))) + addAngle;
						if ((d1 <= addAngle && d2 >= addAngle) || (d1 >= addAngle && d2 <= addAngle )) {
							y = k+(p/10);
							break;
						}
					}
					d = amplitude * Math.sin(frequency * (i+y))+(addAngle);
					count=0;
					if(randomCount==15){randomCount=0;}else{randomCount++}
					if(randomCount2==15){randomCount2=0;}else{randomCount2++}
				}
				angle=d;
				count++;
				if(d<-80){d=-80;}
				if(d<max){max=d;}
				if(d<maxAngle&&!angleLimit){angleLimit=true;}//console.log("angleLimit",i);
				if(d>minAngle&&angleLimit){angleLimit=false;}//console.log("!angleLimit",i);
				if(i==totalSegments-1&&d>-40){
					d/=2;
				}
				var floorX=prevFloor.x + 50 * Math.cos(prevFloor.angle * Math.PI / 180);
				var floorY=prevFloor.y + 50 * Math.sin(prevFloor.angle * Math.PI / 180);
				if(d*ab<=prevFloor.angle){
					var gapAngle=((d*ab)-prevFloor.angle)/3;
					if(gapAngle>-2){
						var gapFloor = new g.FilledRect({
							scene: scene,
							x: floorX,
							y: floorY,
							anchorX:0.5,
							angle: (prevFloor.angle+d)/2,
							cssColor: color,
							width: 100,
							height: 1000,
							parent: scene
						});
					}else{
						var gapFloor = new g.FilledRect({
							scene: scene,
							x: floorX,
							y: floorY,
							anchorX:0.5,
							angle: prevFloor.angle+gapAngle,
							cssColor: color,
							width: 100,
							height: 1000,
							parent: scene
						});
						var gapFloor = new g.FilledRect({
							scene: scene,
							x: floorX,
							y: floorY,
							anchorX:0.5,
							angle: prevFloor.angle+(gapAngle*2),
							cssColor: color,
							width: 100,
							height: 1000,
							parent: scene
						});
					}
				}
				var floor = new g.FilledRect({
					scene: scene,
					x: floorX,
					y: floorY,
					angle: d*ab,
					cssColor: color,
					width: 50,
					height: 1000,
					parent: scene
				});
				objects.push(floor);
				var floorDef = box2d.createFixtureDef({
					density: 1.0,
					friction: 0.5,
					restitution: 0.3,
					shape: box2d.createRectShape(floor.width, floor.height), // 地面エンティティを四角に設定
					filter: {
						categoryBits: 1,
						maskBits: 7
					}
				});
				box2d.createBody(objects[i], staticDef, floorDef);
			}
			var ki1 = new g.Sprite({
				scene: scene,
				src: scene.asset.getImageById("ki"),
				x: -50,
				y: 250,
				scaleX: -0.8,
				scaleY: 0.8,
				parent:scene
			});
			var ki3 = new g.Sprite({
				scene: scene,
				src: scene.asset.getImageById("ki"),
				x: -250,
				y: 250,
				scaleX: -0.8,
				scaleY: 0.8,
				parent:scene
			});
			var floorTop = new g.FilledRect({
				scene: scene,
				x: -999,
				y: 400,
				angle: 0,
				cssColor: color,
				width: 1200,
				height: 1000,
				parent: scene
			});
			//objects.push(floorTop);
			var floorTopDef = box2d.createFixtureDef({
				density: 1.0,
				friction: 0.5,
				restitution: 0.3,
				shape: box2d.createRectShape(floorTop.width, floorTop.height), // 地面エンティティを四角に設定
				filter: {
					categoryBits: 1,
					maskBits: 7
				}
			});
			box2d.createBody(floorTop, staticDef, floorTopDef);
			//var endX=objects[totalSegments].x + (50 * Math.cos(objects[totalSegments].angle * Math.PI / 180))
			//if(objects[totalSegments].angle>-0.5){endX-=1;}
			var endX=objects[totalSegments].x + (50 * Math.cos(objects[totalSegments].angle * Math.PI / 180));
			var endY=objects[totalSegments].y + (50 * Math.sin(objects[totalSegments].angle * Math.PI / 180));
			if(objects[objects.length-1].angle>-0.5){
				var floor = new g.FilledRect({
					scene: scene,
					x: endX,
					y: endY,
					anchorX:0.5,
					angle: objects[objects.length-1].angle/2,
					cssColor: color,
					width: 100,
					height: 1000,
					parent: scene
				});
			}
			
			var ki4 = new g.Sprite({
				scene: scene,
				src: scene.asset.getImageById("ki"),
				x: endX+100,
				y: endY-150,
				scaleX: -0.8,
				scaleY: 0.8,
				parent:scene
			});
			var floorEnd = new g.FilledRect({
				scene: scene,
				x: endX,
				y: endY,
				angle: 0,
				cssColor: color,
				width: 5000,
				height: 1000,
				parent: scene
			});
			objects.push(floorEnd);
			var floorEndDef = box2d.createFixtureDef({
				density: 1.0,
				friction: 0.5,
				restitution: 0.3,
				shape: box2d.createRectShape(floorEnd.width, floorEnd.height), // 地面エンティティを四角に設定
				filter: {
					categoryBits: 1,
					maskBits: 7
				}
			});
			box2d.createBody(floorEnd, staticDef, floorEndDef);
			var floorEndDef = box2d.createFixtureDef({
				density: 1.0,
				friction: 0.5,
				restitution: 0.3,
				shape: box2d.createRectShape(floor.width, floor.height), // 地面エンティティを四角に設定
				filter: {
					categoryBits: 1,
					maskBits: 7
				}
			});
			box2d.createBody(objects[totalSegments], staticDef, floorDef);
			var rect1 = new g.FilledRect({
				scene: scene,
				cssColor: carColor,
				x: 200,
				y: 270,
				width: 150,
				height: 50,
				parent:scene
			});
			var rect2 = new g.FilledRect({
				scene: scene,
				cssColor: carColor,
				x: 200,
				y: 220,
				width: 100,
				height: 60,
				parent:scene
			});
			var rect3 = new g.FilledRect({
				scene: scene,
				cssColor: "lightblue",
				x: 55,
				y: 5,
				width: 40,
				height: 40,
				parent:rect2
			});
			var rect4 = new g.FilledRect({
				scene: scene,
				cssColor: "gray",
				x: 226,
				y: 305,
				width: 98,
				height: 40,
				parent:scene
			});
			var rect5 = new g.FilledRect({
				scene: scene,
				cssColor: "black",
				x: 10,
				y: 30,
				width: 10,
				height: 30,
				parent:rect2
			});
			function smoke(){
				var  radian = rect1.angle * (Math.PI / 180);
				var smoke = new g.FilledRect({
					scene: scene,
					cssColor: "black",
					x: rect1.x - (rect1.width / 2-16) * Math.cos(radian) + (rect1.height / 2+23) * Math.sin(radian),
					y: rect1.y - (rect1.width / 2-16) * Math.sin(radian) - (rect1.height / 2+23) * Math.cos(radian),
					angle:rect1.angle+45,
					anchorX:0.5,
					anchorY:0.5,
					width: 20,
					height: 20,
					opacity:0.3,
					parent:scene
				});
				smoke.onUpdate.add(function () {
					smoke.x-=1;
					smoke.y-=2;
					smoke.scaleX+=0.06;
					smoke.scaleY+=0.06;
					smoke.opacity-=0.005;
					smoke.modified();
					if(smoke.opacity<0){smoke.destroy();}
				});
			}
			var lamp1 = new g.FilledRect({
				scene: scene,
				cssColor: "red",
				x: 0,
				y: 25,
				width: 5,
				height: 10,
				opacity: 0.3,
				parent:rect1
			});
			var lamp2 = new g.FilledRect({
				scene: scene,
				cssColor: "red",
				x: -15,
				y: 20,
				width: 20,
				height: 20,
				opacity: 0.3,
				hidden: true,
				parent:rect1
			});
			var tire1 = new g.Sprite({
				scene: scene,
				src: scene.asset.getImageById("tire"),
				x: 175,
				y: 300,
				parent:scene
			});
			var tire2 = new g.Sprite({
				scene: scene,
				src: scene.asset.getImageById("tire"),
				x: 325,
				y: 300,
				parent:scene
			});			var ki2 = new g.Sprite({
				scene: scene,
				src: scene.asset.getImageById("ki"),
				x: -1000,
				y: 200,
				//scaleX: -1,
				parent:scene
			});
			box2d.createBody(
				ki2,
				dynamicDef,
				box2d.createFixtureDef({
					density: 15,//密度0.1
					friction: 1,//摩擦
					restitution: 0, // 反発係数
					shape: box2d.createRectShape(ki2.width-40, ki2.height-30),
					filter: {
		                    categoryBits: 4,
		                    maskBits: 3
		            }
				})
			);
			var beltW = 20;
			var beltH = 7;
			var belts = [];
			var beltX=175;
			var beltY=300;
			for (var i = 0; i < 10; i++) {
				var belt = new g.FilledRect({
					scene: scene,
					cssColor: "olive",
					x: beltX,
					y: beltY,
					anchorX:0.5,
					anchorY:0.5,
					width: beltW-3,
					height: beltH,
					parent: scene
				});
				belts.push(belt);
				beltX+=beltW;
			}
			beltX-=beltW/2;
			beltY+=beltW/2;
			for (var i = 0; i < 2; i++) {
				var belt = new g.FilledRect({
					scene: scene,
					cssColor: "olive",
					x: beltX,
					y: beltY,
					anchorX:0.5,
					anchorY:0.5,
					angle:90,
					width: beltW-3,
					height: beltH,
					parent: scene
				});
				belts.push(belt);
				beltY+=beltW;
			}
			beltX-=beltW/2;
			beltY-=beltW/2;
			for (var i = 0; i < 10; i++) {
				var belt = new g.FilledRect({
					scene: scene,
					cssColor: "olive",
					x: beltX,
					y: beltY,
					anchorX:0.5,
					anchorY:0.5,
					angle:180,
					width: beltW-3,
					height: beltH,
					parent: scene
				});
				belts.push(belt);
				beltX-=beltW;
			}
			beltX+=beltW/2;
			beltY-=beltW/2;
			for (var i = 0; i < 2; i++) {
				var belt = new g.FilledRect({
					scene: scene,
					cssColor: "olive",
					x: beltX,
					y: beltY,
					anchorX:0.5,
					anchorY:0.5,
					angle:270,
					width: beltW-3,
					height: beltH,
					parent: scene
				});
				belts.push(belt);
				beltY-=beltW;
			}
			// rect1
			var a = box2d.createBody(
				rect1,
				dynamicDef,
				box2d.createFixtureDef({
					density: 0.5,//密度
					friction: 0.5,//摩擦0.5
					restitution: 0, // 反発係数0.5
					shape: box2d.createRectShape(rect1.width, rect1.height),
					filter: {
						ategoryBits: 2,
						maskBits: 1
		            }
				})
			  );
			// rect2
			var a2 = box2d.createBody(
				rect2,
				dynamicDef,
				box2d.createFixtureDef({
					density: 0.1,//密度0.1
					friction: 0.5,//摩擦
					restitution: 0, // 反発係数
					shape: box2d.createRectShape(rect2.width, rect2.height),
					filter: {
						categoryBits: 2,
						maskBits: 1
		            }
				})
			);
			// rect4
			var a4 = box2d.createBody(
				rect4,
				dynamicDef,
				box2d.createFixtureDef({
					density: 0.8,//密度0.1
					friction: 0,//摩擦
					restitution: 0, // 反発係数
					shape: box2d.createRectShape(rect4.width, rect4.height),
					filter: {
						categoryBits: 2,
						maskBits: 5
		            }
				})
			);

			// タイヤ1
			var b = box2d.createBody(
				tire1,
				dynamicDef,
				box2d.createFixtureDef({
					density: 1.5,//密度
					friction: 0.5,//摩擦
					restitution: 0.2,// 反発係数
					shape: box2d.createCircleShape(tire1.width),
					filter: { 
						categoryBits: 2,
						maskBits: 5
					}
		        })
			);
			// タイヤ2
			var c = box2d.createBody(
				tire2,
				dynamicDef,
				box2d.createFixtureDef({
					density: 1.5,//密度
					friction: 0.5,//摩擦
					restitution: 0.2,// 反発係数
					shape: box2d.createCircleShape(tire2.width),
					filter: { 
						categoryBits: 2,
						maskBits: 5
					}
		        })
			);
			var beltsBody = [];
			for (var i = 0; i < belts.length; i++) {
				var t = box2d.createBody(
					belts[i],
					dynamicDef,
					box2d.createFixtureDef({
						density: 0.8,
						friction: 5.0,
						restitution: 0,
						shape: box2d.createRectShape(beltW, 5),
						filter: {
							categoryBits: 4,
							maskBits: 3
						}
					})
				);
				beltsBody.push(t);
			}
			var P=beltW/2
			for (var i = 0; i < belts.length; i++) {
				var X=-P;
				var Y=0;
				if(i==0){var beltParent=beltsBody[beltsBody.length-1]}else{beltParent=beltsBody[i-1]}
				if(belts[i].angle==90){X=0;Y=-P;}
				if(belts[i].angle==180){X=P;Y=0;}
				if(belts[i].angle==270){X=0;Y=P;}
				var def = new b2.Box2DWeb.Dynamics.Joints.b2RevoluteJointDef();
				def.Initialize(beltParent.b2Body, beltsBody[i].b2Body, box2d.vec2(belts[i].x+X, belts[i].y+Y));
				def.enableMotor = false;
				var joint1=box2d.world.CreateJoint(def);
			}
			var axis = new b2.Box2DWeb.Common.Math.b2Vec2(0, -1);//下向き(yがマイナスになる)　
			// ジョイントの定義と初期化

			var def3 = new b2.Box2DWeb.Dynamics.Joints.b2WeldJointDef();
			def3.Initialize(a.b2Body, a2.b2Body,  a2.b2Body.GetPosition());
			var joint3 = box2d.world.CreateJoint(def3);

			var def31 = new b2.Box2DWeb.Dynamics.Joints.b2WeldJointDef();
			def31.Initialize(a.b2Body, a4.b2Body,  a4.b2Body.GetPosition());
			var joint31 = box2d.world.CreateJoint(def31);
			
			var def4 = new b2.Box2DWeb.Dynamics.Joints.b2RevoluteJointDef();
			def4.Initialize(a.b2Body, b.b2Body, box2d.vec2(tire1.x, tire1.y));
			def4.maxMotorTorque = 3;
	        def4.motorSpeed = 0;
	        def4.enableMotor = true;
			var def5 = new b2.Box2DWeb.Dynamics.Joints.b2RevoluteJointDef();
			def5.Initialize(a.b2Body, c.b2Body, box2d.vec2(tire2.x, tire2.y));
			def5.enableMotor = false;

			var joint4 = box2d.world.CreateJoint(def4);
			var joint5 = box2d.world.CreateJoint(def5);
			var def6 = new b2.Box2DWeb.Dynamics.Joints.b2GearJointDef();
			def6.bodyA = joint5.GetBodyA();
			def6.bodyB = joint4.GetBodyB();
			def6.joint1 = joint5;
			def6.joint2 = joint4;
			def6.ratio = -1;
			var gearJoint = box2d.world.CreateJoint(def6);
			var L=false;
			var R=false;
			scene.onPointDownCapture.add(function (e) {
				
					if (e.button === 2) {
						reverse();R=true;
					}else{
						on();L=true;
					}
				
			});
			scene.onPointUpCapture.add(function (e) {
				
					if (e.button === 0) {
						seOff();
					}
					off();
				
			});
			scene.onPointMoveCapture.add(function (e) {
				
					if (e.button === 2) {
						if(R){
							on();R=false;
						}else{
							seOff();
							reverse();R=true;
						}
					}else if (e.button === 0) {
						if(L){
							seOff();
							reverse();L=false;
						}else{
							on();L=true;
						}
					}
					else if(e.prevDelta.x<-20){
						seOff();
						reverse();
					}
			
			});
			function on(){
				joint4.SetMaxMotorTorque(30);
				joint4.SetMotorSpeed(30);
				lamp2.hide();
				scene.asset.getAudioById("on").stop();
				scene.asset.getAudioById("on").play();
				re=false;
				fo=true;
				seTime=0;
			}
			function off(){
				L=false;
				R=false;
				joint4.SetMaxMotorTorque((joint4.GetMotorSpeed()/1000)+3);//+1
				joint4.SetMotorSpeed(0);
				lamp2.hide();
				re=false;
				fo=false;
			}
			function reverse(){
				joint4.SetMaxMotorTorque(30);
				joint4.SetMotorSpeed(-30);//-10
				lamp2.show();
				re=true;
				fo=false;
			}
			var context;
			function seOff() {
				if(!re){
				scene.asset.getAudioById("on").stop();
				if(context){context.stop();}
					var offse = scene.asset.getAudioById("off");
					context = g.game.audio.sound.create(offse);
					context.play();
					g.AudioUtil.fadeOut(g.game, context, 2300);
				}
			}
			var E = new g.E({
				scene: scene,
				x: camera.x,
				y: camera.y,
				parent:scene
			});
			var scoreLabel = new g.Label({
				scene: scene,
				x: 950,
				text: "SCORE: "+g.game.vars.gameState.score,
				font: font,
				fontSize: font.size,
				textColor: "white",
				parent:E
			});
			var timeLabel = new g.Label({
				scene: scene,
				x: 50,
				text: "TIME: "+time,
				font: font,
				fontSize: font.size,
				textColor: "white",
				parent:E
			});
			var resetLabel = new g.Label({
				scene: scene,
				x: 25,
				y: 100,
				text: "リセット",
				font: font,
				fontSize: 24,
				textColor: "white",
				touchable: true,
				parent:E
			});
			var black = new g.FilledRect({
				scene: scene,
				cssColor: "black",
				width: 1280,
				height: 720,
				opacity: 1,
				parent:E
			});
			resetLabel.onPointDown.add(function () {
				if(time>0){
					reset=true;
					box2d.destroy();
					camera.x=-225;
					camera.y=-105;
					g.game.replaceScene(createSceneA2());
				}
			});
			function cameraXY(){
				camera.x=(camera.x*3+rect1.x-500)/4;
				camera.y=(camera.y*7+rect1.y-400)/8;
				camera.modified();
				E.x=camera.x;
				E.y=camera.y;
				E.modified();
				bg.x=camera.x;
				bg.y=camera.y;
				bg.modified();
			}
			scene.onUpdate.add(function () {
				if(!reset){
					if(!start){black.destroy();start=true;}
					box2d.step(1 / g.game.fps);
					if(fo){
						seTime++;
						if(seTime>180){
							seTime=0;
							scene.asset.getAudioById("on").stop();
							scene.asset.getAudioById("on").play();
						}
					}
					if (gameTime <= 0) {
						gameTime = 0; // timeを0に固定
					} else {
						gameTime -= 1 / g.game.fps;
						time = Math.ceil(gameTime);
						if(time<labelTime){
							labelTime=time;
							timeLabel.text = "TIME: " + time;
							timeLabel.invalidate();
						}
						score=Math.ceil(rect1.x/20);
						if(g.game.vars.gameState.score<score){
							g.game.vars.gameState.score=score;
							scoreLabel.text = "SCORE: " + g.game.vars.gameState.score;
							scoreLabel.invalidate();
						}
						cameraXY();
					}
				}
			});
			var rectAngle=0;
			scene.setInterval(function() {
				if(rect1.x<39000&&rect1.y<3000){
					if((rect1.angle<-720||rect1.angle>720)&&rectAngle<1){
						box2d.world.DestroyJoint(joint1);
						rectAngle=1;
					}
					if((rect1.angle<-1080||rect1.angle>1080)&&rectAngle<2){
						box2d.world.DestroyJoint(joint4);
						box2d.world.DestroyJoint(joint5);
						rectAngle=2;
					}
					if((rect1.angle<-1440||rect1.angle>1440)&&rectAngle<3){
						box2d.world.DestroyJoint(joint3);
						box2d.world.DestroyJoint(joint31);
						//box2d.world.DestroyJoint(joint5);
						rectAngle=3;
					}
				}
			}, 500);
			scene.setInterval(function() {
				if(fo){smoke();}
			}, 100);
			console.log("map : " + Math.floor(randomGenerate * 10 ** 16));
			//console.log(`マップを保存: %c${""}`, "color: blue; text-decoration: underline;");
		});
		return scene;
	}
	var font = new g.DynamicFont({
		game: g.game,
		fontFamily: "sans-serif",
		size: 48
	});
	var map=random.get(1, 20);
	if(map==1){
		g.game.pushScene(createSceneB());//雪
	}else{
		g.game.pushScene(createSceneA2());//ジープ
	}
	var bgColor="#0F5474";
	/*
	var hours = new Date(g.game.getCurrentTime()).getHours();
	if (hours >= 2 && hours < 3) {
		bgColor = "#9400D3";
	} else if (hours >= 6 && hours < 18) {
		bgColor = "#0F5474";
	} else {
		bgColor = "#555555";
	}*/
}
exports.main = main;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}
