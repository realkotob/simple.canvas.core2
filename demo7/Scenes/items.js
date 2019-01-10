class ItemsScene extends Scene {
    constructor(options = {}){
        options = assignDeep({}, {

        }, options);

        super(options);

        this.player = this.addGo(new Player({
            position: this.sceneCenter.clone(),
            size: new V2(100, 50),
        }));
    }

    backgroundRender(){
        SCG.contexts.background.fillStyle = 'black';
        SCG.contexts.background.fillRect(0,0,SCG.viewport.real.width,SCG.viewport.real.height);
    }
}

class Player extends GO {
    constructor(options = {}){
        options = assignDeep({}, {
            speakerColor: '#FF80AD',
            buttonsColor: '#FF80AD'
        }, options);

        super(options);

        this.body = this.addChild(new GO({
            size: this.size.clone(),
            position: new V2(),
            img: createCanvas(this.size.mul(1), (ctx, size) => {
                ctx.fillStyle = '#AD0000';
                ctx.strokeStyle = '#720000';
                ctx.beginPath();
                ctx.moveTo(size.x*0.2, 0);ctx.lineTo(size.x*0.8, 0);
                ctx.bezierCurveTo(size.x*0.9, 0, size.x, size.y*0.2, size.x, size.y*0.3);ctx.lineTo(size.x, size.y*0.7);
                ctx.bezierCurveTo(size.x, size.y*0.8, size.x*0.9, size.y, size.x*0.8, size.y);ctx.lineTo(size.x*0.2, size.y);
                ctx.bezierCurveTo(size.x*0.1, size.y, 0, size.y*0.8, 0, size.y*0.7);ctx.lineTo(0, size.y*0.3);
                ctx.bezierCurveTo(0, size.y*0.2, size.x*0.1, 0, size.x*0.2, 0);
                ctx.fill();ctx.closePath();

                ctx.save();
                ctx.clip();
                let grd = ctx.createRadialGradient(30, 0, 0, 20, 5, 80);
                grd.addColorStop(0, 'rgba(255,255,255,0.6');grd.addColorStop(1, 'rgba(255,255,255, 0');//grd.addColorStop(1, 'rgba(0,0,0, 0.5');
                ctx.scale(1,0.75)
                ctx.fillStyle = grd;ctx.fill();//ctx.fillRect(0,0, size.x, size.y);
                ctx.lineWidth = 4;ctx.stroke();ctx.closePath();
                ctx.restore();

                grd = ctx.createLinearGradient(size.x, size.y, size.x/2, size.y/2);
                grd.addColorStop(0, 'rgba(255,255,255, 0.5')
                grd.addColorStop(1, 'rgba(255,255,255, 0');
                ctx.fillStyle = grd;
                ctx.save();
                ctx.translate(-2.5,-2.5)
                ctx.beginPath();
                ctx.moveTo(size.x, size.y*0.55);ctx.lineTo(size.x*0.99, size.y*0.7);ctx.bezierCurveTo(size.x, size.y*0.8, size.x*0.95, size.y*0.975, size.x*0.8, size.y);
                ctx.lineTo(size.x*0.75, size.y*0.99);ctx.bezierCurveTo(size.x*0.85, size.y*0.95, size.x*0.975, size.y*0.95, size.x, size.y*0.55);ctx.closePath();
                ctx.fill();
                ctx.translate(2.5,2.5)
                ctx.restore();

                ctx.save();
                ctx.translate(3,3)
                grd = ctx.createLinearGradient(0, 0, size.x/2, size.y/2);
                grd.addColorStop(0, 'rgba(255,255,255, 0.7');grd.addColorStop(1, 'rgba(255,255,255, 0');
                ctx.fillStyle = grd;
                ctx.beginPath();
                ctx.moveTo(0, size.y*0.35); ctx.bezierCurveTo(0, size.y*0.1, size.x*0.1, 0, size.x*0.2, 0); ctx.lineTo(size.x*0.3, 0);
                ctx.bezierCurveTo(size.x*0.2, size.y*0.015, size.x*0.08, size.y*0.0, 0, size.y*0.3);
                ctx.closePath();
                ctx.fill();ctx.closePath();
                ctx.restore();

                // ctx.beginPath();
                // ctx.moveTo(size.x/3, size.y*2/3); ctx.lineTo(size.x/2, size.y*2/3); ctx.lineTo(size.x/3, size.y*3/4);
                // ctx.closePath();ctx.fillStyle = 'rgba(0,0,0, 1)';ctx.fill();
                
            })
        }))

        this.speaker = this.body.addChild(new GO({
            position: new V2(this.size.x/4, 0),
            size: new V2(this.size.x/4, this.size.y/2).mul(1.4),
            img: createCanvas(new V2(40, 40), (ctx, size) => {
                ctx.beginPath(); ctx.arc(size.x/2, size.y/2, size.x/2 , 0, 2 * Math.PI, false);
                ctx.fillStyle = this.speakerColor; ctx.fill();
                let grd = ctx.createLinearGradient(size.x-1, size.y-1 ,0,0);grd.addColorStop(1, 'rgba(255,255,255,0.2)');grd.addColorStop(0, 'rgba(0,0,0,0.2)');
                ctx.fillStyle = grd; ctx.fill();ctx.closePath();
                
                grd = ctx.createLinearGradient(size.x *0.8 *5/6, size.y*0.8 ,size.x*0.2,size.y*0.2);grd.addColorStop(0, 'rgba(255,255,255,0.5)');grd.addColorStop(1, 'rgba(0,0,0,0.4)');
                ctx.beginPath(); ctx.arc(size.x/2, size.y/2, size.x/2*0.8 , 0, 2 * Math.PI, false);
                ctx.fillStyle = this.speakerColor; ctx.fill();ctx.fillStyle = grd; ctx.fill();ctx.closePath();
                
                ctx.beginPath(); ctx.arc(size.x/2, size.y/2, size.x/2*0.65 , 0, 2 * Math.PI, false);
                ctx.fillStyle = '#CCE2E0'; ctx.fill();ctx.closePath();
                
                ctx.beginPath(); ctx.arc(size.x/2, size.y/2, size.x/2*0.5 , 0, 2 * Math.PI, false);
                ctx.fillStyle = this.speakerColor; ctx.fill();
                grd = ctx.createRadialGradient(size.x*8.5/20,size.y*8.5/20,0,size.x/2,size.y/2, size.x/2*0.5);grd.addColorStop(0, 'rgba(255,255,255,0.4)');grd.addColorStop(1, 'rgba(0,0,0,0.4)');
                ctx.fillStyle = grd; ctx.fill();
                // ctx.lineWidth = 2;
                // ctx.strokeStyle = '#003300';
                // ctx.stroke();
            })
        }));

        this.screen = this.body.addChild(new GO({
            position: new V2(-this.size.x*1.5/10, -this.size.y/10),
            size: new V2(this.size.x/2*1.1, this.size.y/2),
            img: createCanvas(new V2(30, 10).mul(2), (ctx, size) => {
                ctx.fillStyle = '#393A3F';
                //ctx.fillRect(0,0, size.x, size.y);
                ctx.beginPath();
                ctx.moveTo(0, size.y/2);ctx.bezierCurveTo(size.x*0, size.y*0.15, size.x*0.1, 0, size.x*0.3, 0);
                ctx.lineTo(size.x*0.9, 0);ctx.bezierCurveTo(size.x*1, size.y*0.1, size.x*0.925, size.y*0.2, size.x*0.875, size.y*0.55);
                ctx.bezierCurveTo(size.x*0.85, size.y*0.75, size.x*0.9, size.y*1, size.x*0.65, size.y); ctx.lineTo(size.x*0.2, size.y);
                ctx.bezierCurveTo(size.x*0.05, size.y*0.95, size.x*0, size.y*0.8, 0, size.y/2);
                ctx.closePath(); ctx.fill();
                ctx.strokeStyle = '#CCE2E0';
                ctx.lineWidth = 2;
                ctx.stroke();
            })
        }));

        let drawButton = function(ctx, size){
            ctx.fill();
            let grd = ctx.createRadialGradient(size.x*8.5/20,size.y*3/20, 0, size.x/2, size.y/2, size.x/2);
            grd.addColorStop(1, 'rgba(0,0,0,0.3)');grd.addColorStop(0, 'rgba(255,255,255,0.4)');ctx.fillStyle = grd;ctx.fill();
            grd = ctx.createLinearGradient(size.x/2, size.y, size.x/2, 0); grd.addColorStop(0, 'rgba(0,0,0,0.3)');grd.addColorStop(1, 'rgba(255,255,255,0.3)');
            ctx.strokeStyle = grd;ctx.lineWidth = 1;ctx.stroke();
        }
        this.buttons = [
            this.addChild(new GO({
               position: new V2(-this.size.x*7/24 - 2.5, this.size.y*4.5/16),
               size: new V2(this.size.x*0.1, this.size.y*0.15),//new V2(this.size.x*0.5, this.size.y*0.75), //
               img: createCanvas(new V2(20, 20), (ctx, size) => {
                   ctx.fillStyle = this.buttonsColor;
                   //ctx.fillRect(0,0, size.x, size.y);
                   ctx.beginPath();ctx.moveTo(size.x/2, 0);
                   ctx.bezierCurveTo(0, 0, size.x*0.1, size.y*0.5, size.x*0.4, size.y*0.75);
                   ctx.bezierCurveTo(size.x*0.7, size.y, size.x, size.y*0.9, size.x*0.95, size.y*0.7);ctx.lineTo(size.x*0.9, size.y*0.3);
                   ctx.bezierCurveTo(size.x*0.85, size.y*0.1, size.x*0.7, size.y*0, size.x*0.5, 0);
                   ctx.closePath();
                drawButton(ctx, size);
               }) 
            })),
            this.addChild(new GO({
                position: new V2(-this.size.x*5/24 - 2, this.size.y*4.5/16),
                size: new V2(this.size.x*0.1, this.size.y*0.15),
                img: createCanvas(new V2(20, 20), (ctx, size) => {
                    ctx.fillStyle = this.buttonsColor;
                    ctx.beginPath();ctx.moveTo(size.x/2, 0);
                    ctx.bezierCurveTo(size.x*0.1, 0, size.x*0.125, size.y*0.2, size.x*0.175, size.y*0.85);
                    ctx.bezierCurveTo(size.x*0.3, size.y*0.95, size.x*0.6, size.y*0.9, size.x*0.85, size.y*0.9);//ctx.lineTo(size.x*0.9, size.y*0.3);
                    ctx.bezierCurveTo(size.x, size.y*0.8, size.x*0.9, size.y*0.7, size.x*0.8, size.y*0.1);
                    ctx.bezierCurveTo(size.x*0.75, size.y*0, size.x*0.7, size.y*0, size.x*0.5, 0);
                    ctx.closePath();
                    drawButton(ctx, size);
                }) 
             })),
            this.addChild(new GO({
                position: new V2(-this.size.x*3/24 - 2, this.size.y*4.5/16),
                size: new V2(this.size.x*0.1, this.size.y*0.15),
                img: createCanvas(new V2(20, 20), (ctx, size) => {
                    ctx.fillStyle = this.buttonsColor;
                    ctx.beginPath();ctx.moveTo(size.x/2, 0);
                    ctx.bezierCurveTo(size.x*0.1, 0, size.x*0.125, size.y*0.2, size.x*0.175, size.y*0.85);
                    ctx.bezierCurveTo(size.x*0.3, size.y*0.95, size.x*0.6, size.y*0.9, size.x*0.85, size.y*0.9);//ctx.lineTo(size.x*0.9, size.y*0.3);
                    ctx.bezierCurveTo(size.x, size.y*0.8, size.x*0.9, size.y*0.7, size.x*0.8, size.y*0.1);
                    ctx.bezierCurveTo(size.x*0.75, size.y*0, size.x*0.7, size.y*0, size.x*0.5, 0);
                    ctx.closePath();
                    drawButton(ctx, size);
                }) 
             })),
             this.addChild(new GO({
                 position: new V2(-this.size.x*1/24 - 2, this.size.y*4.5/16),
                 size: new V2(this.size.x*0.1, this.size.y*0.15),
                 img: createCanvas(new V2(20, 20), (ctx, size) => {
                     ctx.fillStyle = this.buttonsColor;
                     ctx.beginPath();ctx.moveTo(size.x/2, 0);
                     ctx.bezierCurveTo(size.x*0.1, 0, size.x*0.125, size.y*0.2, size.x*0.175, size.y*0.85);
                     ctx.bezierCurveTo(size.x*0.3, size.y*0.95, size.x*0.6, size.y*0.9, size.x*0.85, size.y*0.9);//ctx.lineTo(size.x*0.9, size.y*0.3);
                     ctx.bezierCurveTo(size.x, size.y*0.8, size.x*0.9, size.y*0.7, size.x*0.8, size.y*0.1);
                     ctx.bezierCurveTo(size.x*0.75, size.y*0, size.x*0.7, size.y*0, size.x*0.5, 0);
                     ctx.closePath();
                     drawButton(ctx, size);
                 }) 
              })),
              this.addChild(new GO({
                position: new V2(this.size.x*1.1/24 - 1.5, this.size.y*4.5/16),
                size: new V2(this.size.x*0.12, this.size.y*0.15),
                img: createCanvas(new V2(20, 20), (ctx, size) => {
                    ctx.fillStyle = this.buttonsColor;
                    ctx.beginPath();ctx.moveTo(size.x*0.4, 0);
                    ctx.bezierCurveTo(size.x*0.1, 0, size.x*0.125, size.y*0.2, size.x*0.175, size.y*0.85);
                    ctx.bezierCurveTo(size.x*0.3, size.y*0.95, size.x*0.6, size.y*0.9, size.x*0.85, size.y*0.9);//ctx.lineTo(size.x*0.9, size.y*0.3);
                    ctx.bezierCurveTo(size.x, size.y*0.8, size.x*0.7, size.y*0.7, size.x*0.55, size.y*0.1);
                    ctx.bezierCurveTo(size.x*0.55, size.y*0, size.x*0.5, size.y*0, size.x*0.4, 0);
                    
                    ctx.closePath();
                    drawButton(ctx, size);
                }) 
             }))
        ]
    }
}
