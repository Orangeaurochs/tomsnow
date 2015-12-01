// TOM'S EXCELLENT JAVASCRIPT SNOW
// Unobtrusive and customisable javascript snow for web pages using no images
// Version 2. Uses canvas.
//
// tomsnow_v2.js
// http://www.aurochs.org/tomsnow/tomsnow_v2.js
// github something something
//
// By Thomas Meehan | @orangeaurochs | tom@aurochs.org
// November 2015
// INSTALLATION
// See the readme file
//



function snow () { // Start snow by setting up container div, creating first snowflake, and calling snowfall
  
  pageWidth = window.innerWidth; 
  pageHeight = window.innerHeight;

// Get page dimensions


//************************************************************************************************
// This section includes settings that can be customised, such as number of flakes and speed. Where formulas have been used, alternative lines with simple numbers are also given commented and can be uncommented and altered as necessary. 
	snowflake_crystal="*"; // Character used to draw the snowflake
	snow_font="Comic Sans MS"; // font used to draw the snowflake
	max_snowsize=30; // Maximum size of snowflakes in pixels - not points!
	min_snowsize=5;  // Minimum size of snowflakes in pixels - not points!
	snowcolour="#ddeeee"; // colour of snowflakes: default is slightly blue so they show up against white pages. For white, change to #ffffff:
	max_snowsize_for_calc=max_snowsize-min_snowsize;
        wind_speed=.25; // default wind speed, min=0, max=1

// snowflake numbers and density, and speed settings
	max_snowflakes=Math.round((pageWidth*pageHeight)/5000); // maximum number of snowflakes: this is calculated based on the screen size. Can be changed to a different formula or a simple number as in the following commented line:
	// var max_snowflakes=150;
	speed=.1; // pixels per cycle of smallest snowflake. Larger flakes fall faster.
	interval=1000/30; // milliseconds between cycle
	density=0.5/(pageHeight/max_snowflakes); // Chance of new snowflake on each iteration: this is calculated based on the screen size. Can be changed to a different formula or a simple number as in the following commented line:
	// var density=.16;
	advent = true;  // If true, every tenth snowflake is the date of the month
//************************************************************************************************

  snowflake=new Array ();
  var new_canvas=document.createElement("canvas");
  new_canvas.setAttribute("id", "snow");
  var body_node_child = document.getElementsByTagName("body")[0].firstChild;
  body_node_child.parentElement.insertBefore(new_canvas,body_node_child);
  new_canvas.style.zIndex="1";
  new_canvas.style.position="absolute";
  new_canvas.width = pageWidth*.97; 
  new_canvas.height = pageHeight*.97;
  anchors = document.getElementsByTagName("a");
  //for (var i=0; i<anchors.length; i++) {
  //  anchors[i].style.color="red";
  //}
  new_canvas.onclick = function () {
    new_canvas.style.zIndex="-1"
      setTimeout (function () {
             new_canvas.style.zIndex="1";
           },1500);
  }
  new_canvas.onmousemove = function () {
    new_canvas.style.zIndex="-1"
      setTimeout (function () {
             new_canvas.style.zIndex="1";
           },1500);
  }
    create_snowflake(0);
    setTimeout(snowfall,interval);
}


function create_snowflake (x) {
  snowflake[x] = new Object;
  snowflake[x].crystal = snowflake_crystal;
  if (advent) {
    var now = new Date();
    var today = now.getDate();
    if (x/10 == Math.round(x/10)) {
      snowflake[x].crystal = today;
    }
  }
  snowflake[x].width = Math.random()*pageWidth; // set random horizontal position of snowflake
  snowflake[x].size = min_snowsize+Math.round((Math.random()*max_snowsize_for_calc)); // set random size of snowflake
  snowflake[x].height = 0-snowflake[x].size; // set starting position of snowflake off top of screen, further up for larger flakes
}

function snowfall () { // Regulates random sideways drift, rate of snowfall, detects hitting the ground, and calls itself to continue
  for (y=0; y<snowflake.length; y++) {
    wind=Math.random(); //Determine wind effect
    snowflake[y].width+=wind_speed;
    if (wind<wind_speed) {snowflake[y].width+=1}
    if (snowflake[y].width>pageWidth) {snowflake[y].width=-snowflake[y].size}
    var dropspeed=Math.round(snowflake[y].size*speed)/16;  // Determine speed of drop, based on size of flake
    if (dropspeed<1) {dropspeed=1}
    snowflake[y].height+=dropspeed;
    if (snowflake[y].height>pageHeight+snowflake[y].size) { // Check for hitting the ground and reset random settings
      snowflake[y].width=Math.random()*pageWidth; // get snowflake off the page until other settings in place to stop it seeming to explode
      snowflake[y].size=min_snowsize+  Math.round((Math.random()*max_snowsize_for_calc));
      snowflake[y].height=0-snowflake[y].size;
    }
  }
  if (snowflake.length<max_snowflakes && Math.random()<density) { // randomly create new snowflakes if not at maximum
    create_snowflake(snowflake.length);
  }
  requestAnimationFrame(draw);
  setTimeout (snowfall, interval);
}

function draw () {
  var canvas = document.getElementById('snow');
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for (var n = 0; n<snowflake.length; n++) {
      ctx.font = snowflake[n].size+"px "+snow_font;
      ctx.fillStyle = snowcolour;
      ctx.fillText(snowflake[n].crystal, snowflake[n].width, snowflake[n].height);
      console.log (snowflake[n]);
    }
  }
}
