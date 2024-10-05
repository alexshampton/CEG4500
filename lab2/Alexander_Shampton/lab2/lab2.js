//Alexander Shampton
//10/07/2024

var gl;
var shaderProgramSquare;

//Mouse vars
var mouseUniform;
var clipX;
var clipY;

//Matrix Vars
var moveX;
var moveY;
var MJS;
var MUniform;

//Animation Vars
var acceleration;
var theta;
var keepRunning;
var xDir;
var yDir;

function init() {
    // Set up the canvas
    var canvas=document.getElementById("gl-canvas");
    gl=WebGLUtils.setupWebGL(canvas);
    if (!gl) { alert( "WebGL is not available" ); }
    
    // Set up the viewport
    gl.viewport( 0, 0, 512, 512 );   // x, y, width, height
    
    
    // Set up the background color
    gl.clearColor( 1.0, 0.0, 0.0, 1.0 );
    
    
    shaderProgramSquare = initShaders( gl, "vertex-shader-square",
                                      "fragment-shader-square" );
    gl.useProgram( shaderProgramSquare );
    
    // Force the WebGL context to clear the color buffer
    gl.clear( gl.COLOR_BUFFER_BIT );
    
    //initializing variables
    keepRunning = 0.0;
    clipX = 0.0;
    clipY = 0.0;
    xDir = 1.0;
    yDir = 0.0;
    moveX = 0.0;
    moveY = 0.0;
    acceleration = 0.001;
    theta = 0.01;
    
    MJS = [1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0];
    MUniform = gl.getUniformLocation( shaderProgramSquare, "M" );
    gl.uniformMatrix3fv( MUniform, false, MJS );

    setupSquare();
    render();
}

function setupSquare() {
    
    // Enter array set up code here
    var p0 = vec2( .2, .2 );
    var p5 = vec2( .0, .3 );
    var p1 = vec2( -.2, .2 );
    var p2 = vec2( -.2, -.2 );
    var p4 = vec2( .0, -.3 );
    var p3 = vec2( .2, -.2 );

    var arrayOfPoints = [p0,p5, p1, p2,p4, p3];
    
    // Create a buffer on the graphics card,
    // and send array to the buffer for use
    // in the shaders
    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(arrayOfPoints), gl.STATIC_DRAW );
    
    // Create a pointer that iterates over the
    // array of points in the shader code
    var myPositionAttribute = gl.getAttribLocation( shaderProgramSquare, "myPosition" );
    gl.vertexAttribPointer( myPositionAttribute, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( myPositionAttribute );    
}

//updates the direction of x/y according to key press
function moveShapeByKey(event)
{
    var keyAscii = event.keyCode
    if (keyAscii==65) //a
    {
        xDir = -1.0;
        yDir = 0.0;
    }
    else if (keyAscii==68) //d
    {
        xDir = 1.0;
        yDir = 0.0;
    }
    else if (keyAscii==87) //w
    {
        xDir = 0.0;
        yDir = 1.0;
    }
    else if (keyAscii==83) //s
    {
        xDir = 0.0;
        yDir = -1.0;
    }
}

//Updates mouse coordinates to be used by render function
function moveSquare(event)
{
    var canvasX = event.clientX;
    var canvasY = event.clientY;

    clipX = 2.0*canvasX / 512.0 - 1.0;
    clipY = -(2.0*canvasY / 512.0 - 1.0);
}

//Increase acceleration after button press
function increaseAcceleration()
{
    if(acceleration == 0.0)
    {
        acceleration = 0.001;
    }
    else
    {
        acceleration += 0.001;
    }

}

//Decrease acceleration after button press
function decreaseAcceleration()
{
    if(acceleration<=0.0)
    {
        acceleration = 0;
    }
    else
    {
        acceleration += -0.001;
    }
}

//Start rotation after button press
function startRotate()
{
    keepRunning = 1.0;
}

//Stop rotation after button press
function stopRotate()
{
    keepRunning = 0.0;
}

function render()
{
    //change coordinates according to acceleration and the direction -/+
    moveX = moveX + (acceleration * xDir);
    moveY = moveY + (acceleration * yDir);
    
    //if the is a click, change the coordinates to the coordinates where clicked
    if(clipX!=0)
    {
        moveX = clipX;
        moveY = clipY;
    }

    //Matrix to be used in the vertex shader
    MJS = [Math.cos(theta), -Math.sin(theta), 0.0, Math.sin(theta), Math.cos(theta), 0.0, moveX, moveY, 1.0];  

    gl.uniformMatrix3fv( MUniform, false, MJS );
    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.drawArrays( gl.TRIANGLE_FAN, 0, 6 );

    requestAnimationFrame( render );

    //reset clicked coords incease clicked
    clipX = 0.0;
    clipY = 0.0;

    //if the animation button is still clicked increase theta
    if(keepRunning>0)
    {
        theta += 0.01;

    }
}
