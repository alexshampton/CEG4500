//Alexander Shampton
//10/30/2024

var gl;

//Square Vars
var shaderProgramSquare;
var squareBuffer;
var squareYCoord;
var squareYCoord1;
var squareYCoord2;
var squareXCoord = 0;
var squareXCoord1;
var squareXCoord2;
var squareYDir;
var squareAcceleration;
var MJS;
var MUniform;

//Pipe Vars
var shaderProgramPipe;
var pipe1Buffer;
var pipe2Buffer;
var pipeXDir;
var pipeXCoord;
var pipeXCoord1;
var pipeXCoord2;
var pipeAcceleration;
var pipeMJS;
var pipeMUniform;
var yCoord; 

//Sun Vars
var sunBuffer;
var shaderProgramSun;

//Cloud Vars
var cloudBuffer;
var shaderProgramCloud;

//grass Vars
var grassBuffer;
var shaderProgramGrass;

//Animation Vars
var gameStart = 0;
var gameOver = 0;

//Score Var
var score = 0;


function init() {
    // Set up the canvas
    var canvas=document.getElementById("gl-canvas");
    gl=WebGLUtils.setupWebGL(canvas);
    if (!gl) { alert( "WebGL is not available" ); }
    
    // Set up the viewport
    gl.viewport( 0, 0, 1440, 770 );   // x, y, width, height
    
    
    // Set up the background color
    gl.clearColor(116.0/255.0, 198.0/255.0, 212.0/255.0, 1.0 );
    
    
    shaderProgramSquare = initShaders( gl, "vertex-shader-square",
                                      "fragment-shader-square" );
    shaderProgramGrass = initShaders( gl, "vertex-shader-grass",
                                        "fragment-shader-grass" );
    shaderProgramPipe = initShaders( gl, "vertex-shader-pipe",
                                        "fragment-shader-pipe" );
    shaderProgramSun = initShaders( gl,"vertex-shader-sun",
                                        "fragment-shader-sun" );
    shaderProgramCloud = initShaders( gl,"vertex-shader-cloud",
                                        "fragment-shader-cloud" );
    gl.useProgram( shaderProgramSquare );
    
    // Force the WebGL context to clear the color buffer
    gl.clear( gl.COLOR_BUFFER_BIT );
    
    //initializing square variables
    squareYDir = -1.0;
    squareYCoord = 0.0;
    squareYCoord1 = 0.05;
    squareYCoord2 = -0.05;
    squareXCoord1 = -0.025;
    squareXCoord2 = 0.025
    squareAcceleration = 0.005;
    MJS = [1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0];

    //initializing pipe variables
    pipeXDir = -1.0;
    pipeAcceleration = 0.005;
    pipeXCoord1 = 0.9;
    pipeXCoord2 = 1.0;
    pipeXCoord = 0.0;
    pipeMJS = [1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0];

    //Random Number for pipe y coords so it is randomized
    yCoord = (Math.random() * 2 - 1);
    while(yCoord<=-0.6 || yCoord>=0.6)
    {
        yCoord = (Math.random() * 2 - 1);
    }

    //Matrix set up
    MUniform = gl.getUniformLocation( shaderProgramSquare, "M" );
    gl.uniformMatrix3fv( MUniform, false, MJS );

    gl.useProgram(shaderProgramPipe );
    pipeMUniform = gl.getUniformLocation( shaderProgramPipe, "M" );
    gl.uniformMatrix3fv( pipeMUniform, false, pipeMJS );

    //Draws square and grass
    setUpCloud();
    setupSquare();
    setUpSun();
}

//Sets up square that moves and grass
function setupSquare() {
    
    //Square points
    var p0 = vec2( .025, .05 );
    var p1 = vec2( .025, -.05);
    var p2 = vec2( -.025, -.05 );
    var p3 = vec2( -.025, .05 );

    //Grass points
    var grass1 = vec2( 1.0, -.65);
    var grass2 = vec2( 1.0, -1.0 );
    var grass3 = vec2( -1.0, -1.0 );
    var grass4 = vec2( -1.0, -.65  );

    var arrayOfPoints = [p0, p1, p2, p3];
    var grassPoints = [grass1,grass2,grass3,grass4];

    gl.useProgram( shaderProgramGrass );

    grass = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, grass );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(grassPoints), gl.STATIC_DRAW );
    
    // Create a pointer that iterates over the
    // array of points in the shader code
    myPositionAttribute = gl.getAttribLocation( shaderProgramGrass, "myPosition" );
    gl.vertexAttribPointer( myPositionAttribute, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( myPositionAttribute ); 
    gl.drawArrays( gl.TRIANGLE_FAN, 0, 4);

    // Create a buffer on the graphics card,
    // and send array to the buffer for use
    // in the shaders
    gl.useProgram( shaderProgramSquare );
    squareBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, squareBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(arrayOfPoints), gl.STATIC_DRAW );
    
    // Create a pointer that iterates over the
    // array of points in the shader code
    var myPositionAttribute = gl.getAttribLocation( shaderProgramSquare, "myPosition" );
    gl.vertexAttribPointer( myPositionAttribute, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( myPositionAttribute ); 
    gl.drawArrays( gl.TRIANGLE_FAN, 0, 4);
}

//draws square and grass for each call of render
function drawSquare() {
    
    //Square points
    var p0 = vec2( .025, .05 );
    var p1 = vec2( .025, -.05);
    var p2 = vec2( -.025, -.05 );
    var p3 = vec2( -.025, .05 );

    //Grass points
    var grass1 = vec2( 1.0, -.65);
    var grass2 = vec2( 1.0, -1.0 );
    var grass3 = vec2( -1.0, -1.0 );
    var grass4 = vec2( -1.0, -.65  );

    var arrayOfPoints = [p0, p1, p2, p3];
    var grassPoints = [grass1,grass2,grass3,grass4];

    gl.useProgram( shaderProgramGrass );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(grassPoints), gl.STATIC_DRAW );
    
    // Create a pointer that iterates over the
    // array of points in the shader code
    myPositionAttribute = gl.getAttribLocation( shaderProgramGrass, "myPosition" );
    gl.vertexAttribPointer( myPositionAttribute, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( myPositionAttribute ); 
    gl.drawArrays( gl.TRIANGLE_FAN, 0, 4);

    // Create a buffer on the graphics card,
    // and send array to the buffer for use
    // in the shaders
    gl.useProgram( shaderProgramSquare );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(arrayOfPoints), gl.STATIC_DRAW );
    
    // Create a pointer that iterates over the
    // array of points in the shader code
    var myPositionAttribute = gl.getAttribLocation( shaderProgramSquare, "myPosition" );
    gl.vertexAttribPointer( myPositionAttribute, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( myPositionAttribute ); 
    gl.drawArrays( gl.TRIANGLE_FAN, 0, 4);
}

//Creates 2 pipes
function setupPipes() {

    // Pipe 1 points
    var pipe1_1 = vec2( 1.0, -1.0);
    var pipe1_2 = vec2( 1.0, yCoord );
    var pipe1_3 = vec2( 0.9, yCoord );
    var pipe1_4 = vec2(0.9, -1.0);

    // Pipe 2 points (uses yCoord + 0.4 to be ontop of pipe 1)
    var pipe2_1 = vec2( 1.0, 1.0);
    var pipe2_2 = vec2( 1.0, yCoord + 0.4);
    var pipe2_3 = vec2( 0.9, yCoord + 0.4);
    var pipe2_4 = vec2(0.9, 1.0);

    var pipe1Points = [pipe1_1, pipe1_2, pipe1_3, pipe1_4];
    var pipe2Points = [pipe2_1, pipe2_2, pipe2_3, pipe2_4];

    gl.useProgram( shaderProgramPipe );

    pipe1Buffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, pipe1Buffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(pipe1Points), gl.STATIC_DRAW );
    
    // Create a pointer that iterates over the
    // array of points in the shader code
    var myPositionAttribute = gl.getAttribLocation( shaderProgramGrass, "myPosition" );
    gl.vertexAttribPointer( myPositionAttribute, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( myPositionAttribute ); 
    gl.drawArrays( gl.TRIANGLE_FAN, 0, 4);

    gl.useProgram( shaderProgramPipe);

    pipe2Buffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, pipe2Buffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(pipe2Points), gl.STATIC_DRAW );
    
    // Create a pointer that iterates over the
    // array of points in the shader code
    myPositionAttribute = gl.getAttribLocation( shaderProgramGrass, "myPosition" );
    gl.vertexAttribPointer( myPositionAttribute, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( myPositionAttribute ); 
    gl.drawArrays( gl.TRIANGLE_FAN, 0, 4);
}

//Creates 2 pipes
function drawPipes() {

    // Pipe 1 points
    var pipe1_1 = vec2( 1.0, -1.0);
    var pipe1_2 = vec2( 1.0, yCoord );
    var pipe1_3 = vec2( 0.9, yCoord );
    var pipe1_4 = vec2(0.9, -1.0);

    // Pipe 2 points (uses yCoord + 0.4 to be ontop of pipe 1)
    var pipe2_1 = vec2( 1.0, 1.0);
    var pipe2_2 = vec2( 1.0, yCoord + 0.4);
    var pipe2_3 = vec2( 0.9, yCoord + 0.4);
    var pipe2_4 = vec2(0.9, 1.0);

    var pipe1Points = [pipe1_1, pipe1_2, pipe1_3, pipe1_4];
    var pipe2Points = [pipe2_1, pipe2_2, pipe2_3, pipe2_4];

    gl.useProgram( shaderProgramPipe );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(pipe1Points), gl.STATIC_DRAW );
    
    // Create a pointer that iterates over the
    // array of points in the shader code
    var myPositionAttribute = gl.getAttribLocation( shaderProgramGrass, "myPosition" );
    gl.vertexAttribPointer( myPositionAttribute, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( myPositionAttribute ); 
    gl.drawArrays( gl.TRIANGLE_FAN, 0, 4);

    gl.useProgram( shaderProgramPipe);
    gl.bufferData( gl.ARRAY_BUFFER, flatten(pipe2Points), gl.STATIC_DRAW );
    
    // Create a pointer that iterates over the
    // array of points in the shader code
    myPositionAttribute = gl.getAttribLocation( shaderProgramGrass, "myPosition" );
    gl.vertexAttribPointer( myPositionAttribute, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( myPositionAttribute ); 
    gl.drawArrays( gl.TRIANGLE_FAN, 0, 4);
}

//setsup sun initally
function setUpSun() 
{
    var arrayOfPointsForCircle=[];
    var theta = 0.0;
    var i = 0;
    var n = 51;
    var h = 2.0 * Math.PI / n;

    var r = 0.3;
    var a = -1.0;
    var b = 1.05; 
	
    for ( i = 0; i < n; i++ ) {
	    theta = i * h;
        var x = r * Math.cos( theta ) + a;
        var y = r * Math.sin( theta ) + b;

        var point = vec2( x,y );
        arrayOfPointsForCircle.push( point );
    }
    
    gl.useProgram( shaderProgramSun);

    sunBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, sunBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(arrayOfPointsForCircle), gl.STATIC_DRAW );
    
    // Create a pointer that iterates over the
    // array of points in the shader code
    myPositionAttribute = gl.getAttribLocation( shaderProgramSun, "myPosition" );
    gl.vertexAttribPointer( myPositionAttribute, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( myPositionAttribute ); 
    gl.drawArrays( gl.TRIANGLE_FAN, 0, n);
}

// draws sun each time called by render
function drawSun() 
{
    var arrayOfPointsForCircle=[];
    var theta = 0.0;
    var i = 0;
    var n = 51;
    var h = 2.0 * Math.PI / n;

    var r = 0.3;
    var a = -1.0;
    var b = 1.05; 
	
    for ( i = 0; i < n; i++ ) {
	    theta = i * h;
        var x = r * Math.cos( theta ) + a;
        var y = r * Math.sin( theta ) + b;

        var point = vec2( x,y );
        arrayOfPointsForCircle.push( point );
    }
    
    gl.useProgram( shaderProgramSun);
    gl.bufferData( gl.ARRAY_BUFFER, flatten(arrayOfPointsForCircle), gl.STATIC_DRAW );
    
    // Create a pointer that iterates over the
    // array of points in the shader code
    myPositionAttribute = gl.getAttribLocation( shaderProgramSun, "myPosition" );
    gl.vertexAttribPointer( myPositionAttribute, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( myPositionAttribute ); 
    gl.drawArrays( gl.TRIANGLE_FAN, 0, n);
}

//initially sets up cloud and its buffer
function setUpCloud() {
    var arrayOfPointsForCloud = [];
    var n = 500;  // Number of points for each circle
    var numCircles = 3;  // Number of circles for the cloud shape
    var radiusVariation = 0.01;  // Radius variation for randomness
    var circleRadius = 0.45;  // Base radius for circles
    var offsets = [
        { x: -0.6, y: -0.74 },
        { x: 0.0, y: -0.5 },
        { x: 0.6, y: -0.75 }
    ];  // Offsets to position circles relative to the center
    
    // Generate points for each circle to form a cloud
    for (var j = 0; j < numCircles; j++) {
        var offsetX = offsets[j].x;
        var offsetY = offsets[j].y;
        
        for (var i = 0; i < n; i++) {
            var theta = (i * 2 * Math.PI) / n;
            var r = circleRadius + 0.5 * radiusVariation;  // Adding randomness to radius
            var x = r * Math.cos(theta) + offsetX;
            var y = r * Math.sin(theta) + offsetY;
            var point = vec2(x, y);
            arrayOfPointsForCloud.push(point);
        }
    }
    
    // Create and bind buffer, and render
    gl.useProgram(shaderProgramCloud);
    cloudBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cloudBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(arrayOfPointsForCloud), gl.STATIC_DRAW);

    var myPositionAttribute = gl.getAttribLocation(shaderProgramCloud, "myPosition");
    gl.vertexAttribPointer(myPositionAttribute, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(myPositionAttribute);

    // Drawing points as a TRIANGLE_FAN to make cloud puffs
    gl.drawArrays(gl.TRIANGLE_FAN, 0, arrayOfPointsForCloud.length);
}

//Draws cloud for each call
function drawCloud() {
    var arrayOfPointsForCloud = [];
    var n = 500;  // Number of points for each circle
    var numCircles = 3;  // Number of circles for the cloud shape
    var radiusVariation = 0.01;  // Radius variation for randomness
    var circleRadius = 0.45;  // Base radius for circles
    var offsets = [
        { x: -0.6, y: -0.74 },
        { x: 0.0, y: -0.5 },
        { x: 0.6, y: -0.75 }
    ];  // Offsets to position circles relative to the center
    
    // Generate points for each circle to form a cloud
    for (var j = 0; j < numCircles; j++) {
        var offsetX = offsets[j].x;
        var offsetY = offsets[j].y;
        
        for (var i = 0; i < n; i++) {
            var theta = (i * 2 * Math.PI) / n;
            var r = circleRadius + 0.5 * radiusVariation;  // Adding randomness to radius
            var x = r * Math.cos(theta) + offsetX;
            var y = r * Math.sin(theta) + offsetY;
            var point = vec2(x, y);
            arrayOfPointsForCloud.push(point);
        }
    }
    
    // Create and bind buffer, and render
    gl.useProgram(shaderProgramCloud);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(arrayOfPointsForCloud), gl.STATIC_DRAW);

    var myPositionAttribute = gl.getAttribLocation(shaderProgramCloud, "myPosition");
    gl.vertexAttribPointer(myPositionAttribute, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(myPositionAttribute);

    // Drawing points as a TRIANGLE_FAN to make cloud puffs
    gl.drawArrays(gl.TRIANGLE_FAN, 0, arrayOfPointsForCloud.length);
}

//Moves square up when spacebar is pressed
function moveShapeByKey(event)
{
    var keyAscii = event.keyCode;
    if (keyAscii==32) //spacebar
    {
        if(gameStart==0)
        {
            gameStart = 1;
            document.getElementById("start").innerHTML = "";
            render();
        }
        squareYCoord += 0.2;
        squareYCoord1 += 0.2;
        squareYCoord2 += 0.2;

    }
}

//Moves square up when mouse is clicked
function mouseClick()
{
    if(gameStart==0)
    {
        gameStart = 1;
        document.getElementById("start").innerHTML = "";
        render();
    }
    squareYCoord += 0.20;
    squareYCoord1 += 0.2;
    squareYCoord2 += 0.2;

}
    
//updates score variable and score on html page 
function updateScore() {
    score += 1;
    document.getElementById("score").innerHTML = score;
}

//renders all the shapes
function render()
{
    if (!gameOver)
    {
        //change coordinates according to squareAcceleration and the direction -/+
        squareYCoord = squareYCoord + (squareAcceleration * squareYDir);
        squareYCoord1 = squareYCoord1 + (squareAcceleration * squareYDir);
        squareYCoord2 = squareYCoord2 + (squareAcceleration * squareYDir);

        //If the square goes above the canvas, give resisitance
        if(squareYCoord>=1.0)
        {
            squareYCoord -= squareAcceleration;
            squareYCoord1 -= squareAcceleration;
            squareYCoord2 -= squareAcceleration;

        }
        //If the square touches the grass end game
        else if(squareYCoord<=-0.6)
        {
            squareYDir = 0.0;
            gameOver = 1;
            document.getElementById("gameover").innerHTML = "Game Over";
            squareAcceleration = pipeAcceleration * pipeXDir;
            squareYCoord = -0.6;
        }

        //square Matrix to be used in the vertex shader
        MJS = [1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, squareYCoord, 1.0];  
        
        //change pipe xcoordinates according to pipeAcceleration and the direction -/+
        pipeXCoord = pipeXCoord + (pipeAcceleration * pipeXDir);
        pipeXCoord1 = pipeXCoord1 + (pipeAcceleration * pipeXDir);
        pipeXCoord2 = pipeXCoord2 + (pipeAcceleration * pipeXDir);

        //If pipe goes off the screen then regenerate the pipes y posisiton and go in different direction
        if(pipeXCoord<=-2.0 || pipeXCoord>=0.1)
        {
            yCoord = (Math.random() * 2 - 1);
            while(yCoord<=-0.6 || yCoord>=0.6)
            {
                yCoord = (Math.random() * 2 - 1);
            }
            if(pipeXCoord>=0.1)
            {
                pipeXDir = -1;
            }
            else
            {
                pipeXDir = 1;
            }
        }
        
        //boolean for scoring
        //If the square passes between the pipes and the end point of the pipe
        var bool = ((((squareXCoord1.toFixed(3)) == pipeXCoord2.toFixed(3)) && pipeXDir == -1) || (((squareXCoord2.toFixed(3)) == pipeXCoord1.toFixed(3)) && pipeXDir == 1) ) ;

        //If the square touches the pipe end game
        //Have to check the bounds of the xCoords and yCoords of the pipes and square and see if either pipe and square touch
        if(((pipeXCoord1<=squareXCoord2 && pipeXCoord2>=squareXCoord1) || (pipeXCoord2<=squareXCoord1 && pipeXCoord1>=squareXCoord2)) && (((-1.0<=squareYCoord2 && squareYCoord2<=yCoord) || (squareYCoord2>=yCoord+0.4 && 100.0>=squareYCoord2 )) || ((100.0>=squareYCoord1 && yCoord+0.4<=squareYCoord1) || (yCoord>=squareYCoord1 && squareYCoord1>=-1.0))))
        {
            gameOver = 1;
            document.getElementById("gameover").innerHTML = "Game Over";
            squareAcceleration = pipeAcceleration * pipeXDir;
            squareYCoord = -0.6;
        }

        //If the square passes between the pipes and the end point of the pipe, update score
        else if (bool)
        {
            updateScore();
        }

        //If the user passes between the pipes 10 times, then they win the game
        if(score==10)
        {
            gameOver = 1;
            document.getElementById("gameover").innerHTML = "You Won!";
        }

        
        //pipe Matrix to be used in the vertex shader
        pipeMJS = [1.0, 0.0, 0.0, 0.0, 1.0, 0.0, pipeXCoord, 0.0, 1.0];  

        gl.useProgram( shaderProgramSquare );
        gl.uniformMatrix3fv( MUniform, false, MJS );

        gl.useProgram( shaderProgramPipe );
        gl.uniformMatrix3fv( pipeMUniform, false, pipeMJS );

        gl.clear( gl.COLOR_BUFFER_BIT );

        //Redraw shapes
        drawSun();
        drawCloud();
        drawPipes();
        drawSquare();
        requestAnimationFrame( render );
    }

    //Keep background running after game is over
    else
    {
        //change square xcoord to move the square off screen after falling
        squareXCoord = squareXCoord + squareAcceleration; 

        //square Matrix to be used in the vertex shader
        MJS = [1.0, 0.0, 0.0, 0.0, 1.0, 0.0, squareXCoord, -0.6, 1.0];  

        //change pipe coordinates according to squareAcceleration and the direction -/+
        pipeXCoord = pipeXCoord + (pipeAcceleration * pipeXDir);
        pipeXCoord1 = pipeXCoord1 + (pipeAcceleration * pipeXDir);
        pipeXCoord2 = pipeXCoord2 + (pipeAcceleration * pipeXDir);

        //If pipe goes off the screen then regenerate the pipes y posisiton and go in different direction
        if(pipeXCoord<=-2.0 || pipeXCoord>=0.1)
        {
            yCoord = (Math.random() * 2 - 1);
            while(yCoord<=-0.6 || yCoord>=0.6)
            {
                yCoord = (Math.random() * 2 - 1);
            }
            if(pipeXCoord>=0.1)
            {
                pipeXDir = -1;
            }
            else
            {
                pipeXDir = 1;
            }
        }

        //pipe Matrix to be used in the vertex shader
        pipeMJS = [1.0, 0.0, 0.0, 0.0, 1.0, 0.0, pipeXCoord, 0.0, 1.0];  

        gl.useProgram( shaderProgramSquare );
        gl.uniformMatrix3fv( MUniform, false, MJS );

        gl.useProgram( shaderProgramPipe );
        gl.uniformMatrix3fv( pipeMUniform, false, pipeMJS );

        gl.clear( gl.COLOR_BUFFER_BIT );

        //Redraw shapes
        drawSun();
        drawCloud();
        drawPipes();
        drawSquare();
        requestAnimationFrame( render );
    }
}
