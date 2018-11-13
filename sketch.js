// var weather;
// var url='http://api.openweathermap.org/data/2.5/weather?q=London&appid=b9bcb27a6ea7d8ae2d723f804c95b6e4';

// function setup() {
//     // createCanvas(windowWidth,windowHeight);
//     createCanvas(800,800);
// loadJSON(url, gotData);
// // loadJSON('weather_14.json, gotData');

// }

// function gotData(data){
//     // println(data);
//     weather= data;
// }

// function draw() {
//     background(0);

//   if (weather){
//       ellipse(100, 100, weather.main.temp,weather.main.temp);
//       ellipse(300, 100, weather.main.pressure,weather.main.humidity);
//   }
// }

var mapimg;
var clat = 0;
var clon = 0;


//Sheinghei

var lat = 31.2304;
var lon = 121.4737;

var zoom = 1;

var earthquakes;

function preload() {
    mapimg = loadImage('https://api.mapbox.com/styles/v1/mapbox/dark-v9/static/0,0,1,0,0/1024x512?access_token=pk.eyJ1IjoiY3JhbmwxMjVyZWFsIiwiYSI6ImNqb2ZhMTJyYTAyOGozcHFocXFjMzFpb2EifQ.x7l80uxVaYHOLVbRBud3Sg');
    earthquakes = loadStrings('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.csv');
    // earthquakes = loadTable('all_month.csv');

}

function mercX(lon) {
    lon = radians(lon);
    var a = (256 / PI) * pow(2, zoom);
    var b = lon + PI;
    return a * b;
}

function mercY(lat) {
    lat = radians(lat);
    var a = (256 / PI) * pow(2, zoom);
    var b = tan(PI / 4 + lat / 2);
    var c = PI - log(b);
    return a * c;
}


function setup() {
    createCanvas(1604, 1512);
    background(250,133,133);
    translate(width / 2, height / 2);
    imageMode(CENTER);

    var cx = mercX(clon);
    var cy = mercY(clat);

    for (var i = 0; i < earthquakes.length; i++) {
        var data = earthquakes[i].split(/,/);
       
        var lat = data[1];
        var lon = data[2];
        var mag = data[4];
        var x = mercX(lon) - cx;
        var y = mercY(lat) - cy;

        // var x = mercX(lon) - cx;
        // var y = mercY(lat) - cy;
        mag = pow(mag, 10);
        mag = sqrt(mag);

        var magmax = sqrt(pow(10, 10));


        var d = map(mag, 0, 10, magmax, 180);
        
        // stroke(251,173,212);
        stroke(0);
        fill(251,173,212, 200);
        ellipse(x, y, 18, 18);
       textSize(95);
        text('2018', 10, 30);
        fill(247,92,171);
        textSize(10);
        text('EARTHQUAKE', x, y);
    }



}

// function draw() {

// }