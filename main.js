video = "";
status = "";
objects = [];

function preload() {
    video = createVideo('video.mp4');
    video.hide();
}

function setup() {
    canvas = createCanvas(450,350);
    canvas.center();
}

function draw() {
    image(video,0,0,450,350);

    if(status != "") {
        objectDetector.detect(video,gotresults);
    
        for(i =0; i<objects.length; i++) {
            document.getElementById("status").innerHTML = "Objects Detected";
            document.getElementById("number_of_objects").innerHTML = "Number of Object Detected Are :"+ objects.length;

            fill("lightgreen");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " "+percent +"%",objects[i].x,objects[i].y);
            noFill();
            stroke("lightgreen");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }
}

function start() {
    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded() {
    console.log("Model is Loaded");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

function gotresults(error,results) {
    if(error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}