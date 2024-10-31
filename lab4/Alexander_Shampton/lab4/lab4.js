//Alexander Shampton
//10/19/2024

var gl;
var myShaderProgram;
var alpha;
var beta;
var gamma;
var tx;
var ty;
var sx;
var sy;

function init() {
    var canvas=document.getElementById("gl-canvas");
    gl=WebGLUtils.setupWebGL(canvas);
    
    if (!gl) { alert( "WebGL is not available" ); }
    
    gl.viewport( 0, 0, 512, 512 );
    
    gl.clearColor( 0.0, 0.0, 0.0, 1.0 );
    
    
    myShaderProgram =
        initShaders( gl,"vertex-shader", "fragment-shader" );
    gl.useProgram( myShaderProgram );
    gl.enable( gl.DEPTH_TEST );

    //Initializing transformation variables
    alpha = 0.0;
    gl.uniform1f( gl.getUniformLocation( myShaderProgram, "alpha"), alpha );

    beta = 0.0;
    gl.uniform1f( gl.getUniformLocation( myShaderProgram, "beta"), beta );

    gamma = 0.0;
    gl.uniform1f( gl.getUniformLocation( myShaderProgram, "gamma"), gamma );

    tx = 0.0;
    gl.uniform1f( gl.getUniformLocation( myShaderProgram, "tx"), tx );

    ty = 0.0;
    gl.uniform1f( gl.getUniformLocation( myShaderProgram, "ty"), ty );

    sx = 1.0;
    gl.uniform1f( gl.getUniformLocation( myShaderProgram, "sx"), sx );

    sy = 1.0;
    gl.uniform1f( gl.getUniformLocation( myShaderProgram, "sy"), sy );

    setUpPrism();
    render();

}

function setUpPrism() {
    
    //Vertices of Prism
    var vertices = [vec4( 0.0,  .2,  0.0,  1), // p0
                    vec4( -.2, -.2,  -.2,  1), // p1
                    vec4(  .2, -.2,  -.2,  1), // p2
                    vec4(  .2,  -.2,  .2,  1), // p3
                    vec4( -.2,  -.2,  .2,  1)];  // p4

    //Colors at Vertices of Prism
    var vertexColors = [vec4( 1.0, 0.0, 0.0, 1.0), // p0
                        vec4( 0.0, 1.0, 0.0, 1.0), // p1
                        vec4( 0.0, 0.0, 1.0, 1.0), // p2
                        vec4( 0.0, 1.0, 1.0, 1.0), // p3
                        vec4( 1.0, 1.0, 1.0, 1.0)]; // p4 // p7

    //Faces of prism
    var indexList = [0, 1, 2,
                     0, 2, 3,
                     0, 3, 4,
                     0, 4, 1,
                     4, 1, 2,
                     3, 4, 2];
    
    // Code here to handle putting above lists into buffers
    var vertexBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vertexBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );
    
    var myPosition = gl.getAttribLocation( myShaderProgram, "myPosition" );
    gl.vertexAttribPointer( myPosition, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( myPosition );
    
    var colorBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, colorBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertexColors), gl.STATIC_DRAW );
    
    var myColor = gl.getAttribLocation( myShaderProgram, "myColor" );
    gl.vertexAttribPointer( myColor, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( myColor );
    
    // will populate to create buffer for indices
    var iBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, iBuffer );
    gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indexList), gl.STATIC_DRAW );
}

//renders prism
function render() {
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );
    gl.drawElements( gl.TRIANGLES, 18, gl.UNSIGNED_SHORT, 0 );
}

//rotates prism around x axis
function rotateAroundX() {
    alpha += 0.1;
    gl.uniform1f( gl.getUniformLocation( myShaderProgram, "alpha"), alpha );
    render();
    
}

//rotates prism around y axis
function rotateAroundY() {
    beta += 0.1;
    gl.uniform1f( gl.getUniformLocation( myShaderProgram, "beta"), beta );
    render();
    
}

//rotates prism around z axis
function rotateAroundZ() {
    gamma += 0.1;
    gl.uniform1f( gl.getUniformLocation( myShaderProgram, "gamma"), gamma );
    render();
}

//translates the prism across the x axis
function translateX()
{
    tx += 0.1;
    gl.uniform1f( gl.getUniformLocation( myShaderProgram, "tx"), tx );
    render();
}

//translates the prism across the y axis
function translateY()
{
    ty += 0.1;
    gl.uniform1f( gl.getUniformLocation( myShaderProgram, "ty"), ty );
    render();   
}

//scales the prism across the x axis
function scaleX()
{
    sx += 0.1;
    gl.uniform1f( gl.getUniformLocation( myShaderProgram, "sx"), sx );
    render();
}

//scales the prism across the y axis
function scaleY()
{
    sy += 0.1;
    gl.uniform1f( gl.getUniformLocation( myShaderProgram, "sy"), sy );
    render();
}

//Moves prism up when spacebar is pressed
function moveShapeByKey(event)
{
    var keyAscii = event.keyCode;
    if (keyAscii==89) //y
    {
        rotateAroundY();
    }
    else if (keyAscii==90) //z
    {
        rotateAroundZ();
    }
    else if (keyAscii==88) //x
    {
        rotateAroundX();
    }
    else if (keyAscii==87) //w (y-Translation)
    {
        translateY();
    }
    else if (keyAscii==68) //d (x-Translation)
    {
        translateX();
    }
    else if (keyAscii==83) //s (y-Scaling)
    {
        scaleY();
    }
    else if (keyAscii==65) //a (x-Scaling)
    {
       scaleX();
    }
}
