//canvas setup
const cvs = document.querySelector("canvas");
const ctx = cvs.getContext("2d");

const cvsWidth = 1655;
const cvsHeight = 171;

cvs.width = cvsWidth;
cvs.height = cvsHeight;

//stroke setup
ctx.strokeStyle = "black";
ctx.lineWidth = 3;


//variable setup
let xPos = "";
let yPos = "";



//positioning
const cvsSize = cvs.getBoundingClientRect();
const xRatio = cvsWidth / cvsSize.width;
const yRatio = cvsHeight / cvsSize.height;
function xpos (event) {
  return (event.targetTouches[0].clientX - cvsSize.left) * xRatio;
}
function ypos (event) {
  return (event.targetTouches[0].clientY - cvsSize.top) * yRatio;
}



//When touched, use moveto current position and reset path
function drawStart (event) {
  event.preventDefault();
  ctx.beginPath();
  ctx.moveTo(xpos(event), ypos(event));
}
cvs.addEventListener("touchstart", drawStart);



//When onMouse variable turn on, use lineto with current position
function handleDraw (event) {
    event.preventDefault();
    xPos = xpos(event);
    yPos = ypos(event);
    ctx.lineTo(xPos, yPos);
    ctx.stroke();
}
cvs.addEventListener("touchmove", handleDraw);

//collect pressure and tilt data
let pressure = "";
let tiltX = "";
let tiltY = "";

function exportData (event) {
    pressure = event.pressure;
    tiltX = event.tiltX;
    tiltY = event.tiltY;
} 
export { xPos, yPos, pressure, tiltX, tiltY, };

cvs.addEventListener("pointermove", exportData);

//------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------