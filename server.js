var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require('fs');

app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);

//kapum em classner@
var Grass = require("./modules/grass.js")
var GrassEater = require("./modules/grasseater.js")
var Predator = require("./modules/predator.js")
var Xotaqayl = require("./modules/xotaqayl.js")
var XotaqaylEater = require("./modules/xotaqayleater.js")

//haytararum em arrayner
grassArr = [];
geArr = [];
predatorArr = [];
xotaqaylArr = [];
xotaqaylEaterArr = [];
//Matrix stexum em
function getMatrix() {
    var matrix = []; // Մատրիցի ստեղծում
    var rows = 100; // Տողերի քանակ
    var columns = 100; // Սյուների քանակ

    for (var y = 0; y < rows; y++) {
        matrix[y] = []; // Մատրիցի նոր տողի ստեղծում
        for (var x = 0; x < columns; x++) {
            var a = Math.floor(Random() * 100);
            if (a >= 0 && a < 20) {
                matrix[y][x] = 0; // Մատրիցի 20 տոկոսը կլինի 0
            }
            if (a >= 20 && a < 40) {
                matrix[y][x] = 1; // Մատրիցի 20 տոկոսը կլինի 1
            }
            else if (a >= 40 && a < 50) {
                matrix[y][x] = 2; // Մատրիցի 10 տոկոսը կլինի 2
            }
            else if (a >= 50 && a < 70) {
                matrix[y][x] = 3; // Մատրիցի 20 տոկոսը կլինի 3
            }
            else if (a >= 70 && a < 90) {
                matrix[y][x] = 4; // Մատրիցի 20 տոկոսը կլինի 4
            }
            else if (a >= 90 && a < 100) {
                matrix[y][x] = 5; // Մատրիցի 10 տոկոսը կլինի 5
            }
        }
    }
    return matrix;
}
//haytararum em matrix popoxakan@ vor kanchi getmatrix funcian
matrix = getMatrix()
//pttvel matrix-i vrayov stexcum enq objectner
for (var y = 0; y < matrix.length; y++) {
    for (var x = 0; x < matrix[y].length; x++) {

        if (matrix[y][x] == 1) {
            var gr = new Grass(x, y, 1);
            grassArr.push(gr);
        }
        else if (matrix[y][x] == 2) {
            var ge = new GrassEater(x, y, 2);
            geArr.push(ge);
        }
        else if (matrix[y][x] == 3) {
            var pr = new Predator(x, y, 3);
            predatorArr.push(pr);
        }
        else if (matrix[y][x] == 4) {
            var xoteri_vq = new Xotaqayl(x, y, 4);
            xotaqaylArr.push(xoteri_vq);
        }
        else if (matrix[y][x] == 5) {
            var ankE = new XotaqaylEater(x, y, 5);
            xotaqaylEaterArr.push(ankE);
        }

    }
}

function drawserver() {
    for (var i in grassArr) {
        grassArr[i].mul();
    }
    for (var i in geArr) {
        geArr[i].move();
        geArr[i].eat();
        geArr[i].mul();
        geArr[i].die();
    }
    for (var i in predatorArr) {
        predatorArr[i].move();
        predatorArr[i].eat();
        predatorArr[i].mul();
        predatorArr[i].die();
    }
    for (var i in xotaqaylArr) {
        xotaqaylArr[i].move();
        xotaqaylArr[i].eat();
        xotaqaylArr[i].mul();
        xotaqaylArr[i].die();
    }
    for (var i in xotaqaylEaterArr) {
        xotaqaylEaterArr[i].move();
        xotaqaylEaterArr[i].eat();
        xotaqaylEaterArr[i].mul();
        xotaqaylEaterArr[i].die();
    }
}

//uxarkum em clentin
io.sockets.emit("matrix",matrix)
//interval vor popoxivi 3 vrk mek
setInterval(drawserver,3000)

Random=function(arr){
    return arr[Math.floor[Math.random()*arr.length]]
}