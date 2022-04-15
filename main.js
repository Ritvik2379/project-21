function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier=ml5.imageClassifier('MobileNet',modelLoaded);
}
function draw(){
  image(video,0,0,300,300);
  classifier.classify(video,gotResults);
}
function modelLoaded(){
  console.log("Model Loaded");
}
var previous_result="";
function gotResults(error,results){
   if (error){
     console.error(error);
   }
   else{
     if ((results[0].confidence>0.5) && (previous_result != results[0].label)){
     console.log(results);
     previous_result=results[0].label;
     synth = window.speechSynthesis;
     speak_data = "Object detected is " + results[0].label;
     utter_this = new SpeechSynthesisUtterance(speak_data);
     synth.speak(utter_this);
     document.getElementById("results_object_name").innerHTML=results[0].label;
     document.getElementById("results_object_accuracy").innerHTML=results[0].confidence.toFixed(4);
    }
  }
}