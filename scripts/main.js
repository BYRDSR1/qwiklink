/**
 * main.js - main functions for app
 *
 */

intervalID = undefined;

// Adjust the canvas elements size responsively
const adjustCanvasSize = () => {
  const canvas = document.getElementById("canvas");
  canvas.width = document.documentElement.clientWidth;
  canvas.height = document.documentElement.clientHeight;
}

// Set up the feed from the <video> element to the <canvas> element
const canvasFeed = () => {
  const video = document.getElementById('video');
  const box = document.getElementById("box");
  
  const canvas = document.getElementById('canvas');
  const context = canvas.getContext('2d');

  canvas.width = video.videoWidth;

  let boxRatio = box.clientWidth / box.clientHeight;

  let boxWidth = video.videoWidth;
  let boxHeight = boxWidth / boxRatio;
  let boxMargin = (video.videoHeight - boxHeight) / 2;
  

  let x1 = 0
  let y1 = boxMargin;

  let x2 = boxWidth;
  let y2 = boxHeight;


  //context.drawImage(video, 0, 0, canvas.width, canvas.height);
  context.drawImage(video, x1, y1, x2, y2, 0, 0, boxWidth, boxHeight);
}

// Runs on the DOMContentLoaded event
const onLoad = () => {
  //adjustCanvasSize();
  adjustVideoSize();
  const video = document.getElementById("video");
  video.style["position"] = "absolute";
  resizeBox();

}

// Adjusts the video elements size responsively
const adjustVideoSize = () => {
  const video = document.getElementById("video");
  video.width = document.documentElement.clientWidth;
  //console.log("video resized");
}

const resizeBox = () => {
  adjustVideoSize();

  let videoHeight = (document.getElementById("video").clientWidth * 3) / 4;

  document.getElementById("box").width = document.getElementById("video").width;
  document.getElementById("box").style["margin-top"] = ((videoHeight - document.getElementById("box").clientHeight) / 2) + "px";

  
  document.getElementById("status-bar").innerHTML = `${video.clientWidth}, ${video.clientHeight}`;

}

const startInterval = () => {
  intervalID = setInterval(getURL, 1000); 
}

const stopInterval = () => {
  stopInterval(intervalID);
}

const getURL = () => {
  canvasFeed();

  document.getElementById("link").value = "";

  const statusBar = document.getElementById("status-bar");
  statusBar.style["margin-right"] = "0%";


  runOCR();
}

const checkConnection = () => {
  if(!window.navigator.onLine) {
    switchPage("error");
    displayError("internet");
    return false;
  } else {
    return true;
  }
}

const showStatus = (status) => {
  const statusBar = document.getElementById("status-bar");
  let margin = (100 - status) + "%";
  statusBar.style["margin-right"] = margin;
}

const progress = (obj) => {
  console.log(obj);
  if(obj.status === "loading tesseract core") {
    showStatus(25);
  } else if(obj.status === "initializing tesseract") {
    showStatus(50);
  } else if(obj.status === "loading language traineddata") {
    showStatus(75);
  } else if(obj.status === "initializing api") {
    showStatus(100);
  }
}
