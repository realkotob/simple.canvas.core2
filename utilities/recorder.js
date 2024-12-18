class Recorder {
    static process() {
        if(SCG.scenes.activeScene.capturing && SCG.scenes.activeScene.capturing.enabled){
            let c = SCG.scenes.activeScene.capturing;
            if(
                (!c.stopByCode && c.currentFrame < c.totalFramesToRecord) ||
                (c.stopByCode && !c.stop)
                 ){
                let frame = createCanvas(c.size, (ctx, size, hlp) => {
                    ctx.drawImage(c.canvas, 0,0, size.x, size.y)
                });

                if(c.cut) {
                    frame = createCanvas(c.cut.size, (ctx, size, hlp) => {
                        ctx.drawImage(frame, -c.cut.shift.x,-c.cut.shift.y)
                    })
                }

                if(c.type == 'gif') {
                    c.gifWriter.addFrame(frame, { delay: c.frameDelay})
                }
                else if(c.type == 'zip') {
                    c.zip.file("frame_" + zeroPad(c.frameCounter++, 4) + '.png', frame.toDataURL().split(',')[1], {base64: true});
                }
                else {
                    c.videoWriter.addFrame(frame);
                }
                
                if(!c.stopByCode)
                    console.log(`${c.currentFrame} from ${c.totalFramesToRecord} added`);
                else 
                    console.log(`${c.currentFrame} frame added`);

                c.currentFrame++;
            }
            else {
                if(c.addFrameBeforeStop){
                    let frame = createCanvas(c.size, (ctx, size, hlp) => {
                        ctx.drawImage(c.canvas, 0,0, size.x, size.y)
                    });

                    if(c.cut) {
                        frame = createCanvas(c.cut.size, (ctx, size, hlp) => {
                            ctx.drawImage(frame, -c.cut.shift.x,-c.cut.shift.y)
                        })
                    }

                    c.videoWriter.addFrame(frame);
                }

                if(c.addRedFrame){
                    let frame = createCanvas(c.size, (ctx, size, hlp) => {
                        hlp.setFillColor('red').rect(0,0, size.x, size.y)
                    });
                    c.videoWriter.addFrame(frame);
                }
                
                console.log('recording is completed');

                if(c.type == 'gif') {
                    c.gifWriter.on('finished', function(blob) {
                        console.log('gif render finished')
                        //window.open(URL.createObjectURL(blob));
                        let name = c.fileNamePrefix + '_' + new Date().getTime() + '.gif';
                        let url = window.URL.createObjectURL(blob);
                        let a = document.createElement('a');
                        a.style.display = 'none';
                        a.href = url;
                        a.download = name;
                        document.body.appendChild(a);
                        a.click();
                        setTimeout(() => {
                            document.body.removeChild(a);
                            window.URL.revokeObjectURL(url);
                        }, 100)
                    });

                    c.gifWriter.render();
                }
                else if(c.type == 'zip') {
                    c.zip.generateAsync({type: 'base64'}).then(function(content) {
                        let link = document.createElement("a");
                        link.download = c.fileNamePrefix + '_' + new Date().getTime() +'.zip';
                        link.href = "data:application/zip;base64,"+content
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                    });
                }
                else {
                    c.videoWriter.complete().then(function(blob){
                        let name = c.fileNamePrefix + '_' + new Date().getTime() + '.webm';
                        // let blob = new Blob(this.recordedBlobs, { type: this.mimeType });
                        let url = window.URL.createObjectURL(blob);
                        let a = document.createElement('a');
                        a.style.display = 'none';
                        a.href = url;
                        a.download = name;
                        document.body.appendChild(a);
                        a.click();
                        setTimeout(() => {
                            document.body.removeChild(a);
                            window.URL.revokeObjectURL(url);
                        }, 100)
                    });
                }
                

                c.enabled = false;

                return {
                    stopCycle: true
                };
            }
        }
    }
}

Recorder.gif = {
    ditherTypes: {
        FloydSteinberg: 'FloydSteinberg',
        FloydSteinbergSerpentine: 'FloydSteinberg-serpentine',
        FalseFloydSteinberg: 'FalseFloydSteinberg',
        FalseFloydSteinbergSerpentine: 'FalseFloydSteinberg-serpentine',
        Stucki: 'Stucki',
        StuckiSerpentine: 'Stucki-serpentine',
        Atkinson: 'Atkinson',
        AtkinsonSerpentine: 'Atkinson-serpentine'
    }
}

/*class Recorder {
    constructor(canvas, frameRate) {
        this.recordedBlobs = [];
        this.frameRate = frameRate;
        this.mimeType = 'video/webm'
        this.mediaRecorder = undefined;
        this.canvas = canvas;

        this.stopped = false;

        if(!MediaRecorder.isTypeSupported(this.mimeType)){
            throw 'No webm support';
        }
    }

    start() {
        let options = {
            mimeType: this.mimeType,
            videoBitsPerSecond: 2500000
        }

        this.recordedBlobs = [];

        this.stream = this.canvas.captureStream(0);
        if(this.stream == undefined){
            throw 'No stream for record';
        }

        try {
            this.mediaRecorder = new MediaRecorder(this.stream, options);
        }
        catch(e) {
            alert('MediaRecorder is not supports');
            console.error('Failed to create MediaRecorder instance', e);
            return;
        }

        this.mediaRecorder.onstop = this.handleStop;
        this.mediaRecorder.ondataavailable = this.handleDataAvailable.bind(this);
        this.mediaRecorder.start(100);
        console.log('recorder started');
    }

    handleDataAvailable(event) {
        if(event.data && event.data.size > 0){
            this.recordedBlobs.push(event.data);
        }

        if(this.stopped){
            this.download();
        }
    }

    handleStop(event) {
        console.log('recorder stopped', event);
    }

    stop() {
        this.mediaRecorder.stop();
        this.stopped = true;
        //this.download();
    }

    download() {
        let name = new Date().getTime() + '.webm';
        let blob = new Blob(this.recordedBlobs, { type: this.mimeType });
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = name;
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 100)
    }
}*/