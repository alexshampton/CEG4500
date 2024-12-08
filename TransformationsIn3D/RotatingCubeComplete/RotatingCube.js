var gl;
var myShaderProgram;
var alpha;
var beta;

function init() {
    var canvas=document.getElementById("gl-canvas");
    gl=WebGLUtils.setupWebGL(canvas);
    
    if (!gl) { alert( "WebGL is not available" ); }
    
    gl.viewport( 0, 0, 512, 512 );
    
    gl.clearColor( 0.0, 0.0, 0.0, 1.0 );
    
    
    myShaderProgram =
        initShaders( gl,"vertex-shader", "fragment-shader" );
    gl.useProgram( myShaderProgram );
    
    // will include depth test to render faces correctly!
    gl.enable( gl.DEPTH_TEST );

    alpha = 0.0;
    gl.uniform1f( gl.getUniformLocation( myShaderProgram, "alpha"), alpha );
    beta = 0.0;
    gl.uniform1f( gl.getUniformLocation( myShaderProgram, "beta"), beta );

    setupCube();
    
    render();

}

function setupCube() {
    
var vertices = [

// Front face
vec4(-0.25, 0.00, -0.1, 1.0), // p0
vec4(-0.125, 0.00, -0.1, 1.0), // p1
vec4(-0.0625, -0.0625, -0.1, 1.0), // p2
vec4(-0.0625, -0.1875, -0.1, 1.0), // p3
vec4(-0.125, -0.25, -0.1, 1.0), // p4
vec4(-0.25, -0.25, -0.1, 1.0), // p5
vec4(-0.3125, -0.1875, -0.1, 1.0), // p6
vec4(-0.3125, -0.0625, -0.1, 1.0), // p7

// Back face
vec4(-0.25, 0.00, 0.0, 1.0), // p8
vec4(-0.125, 0.00, 0.0, 1.0), // p9
vec4(-0.0625, -0.0625, 0.0, 1.0), // p10
vec4(-0.0625, -0.1875, 0.0, 1.0), // p11
vec4(-0.125, -0.25, 0.0, 1.0), // p12
vec4(-0.25, -0.25, 0.0, 1.0), // p13
vec4(-0.3125, -0.1875, 0.0, 1.0), // p14
vec4(-0.3125, -0.0625, 0.0, 1.0) // p15


];

var vertexColors = [

    // Front face
    vec4(1.0, 223.0 / 255.0, 0.0, 1.0),
    vec4(1.0, 223.0 / 255.0, 0.0, 1.0),
    vec4(1.0, 223.0 / 255.0, 0.0, 1.0),
    vec4(1.0, 223.0 / 255.0, 0.0, 1.0),
    vec4(1.0, 223.0 / 255.0, 0.0, 1.0),
    vec4(1.0, 223.0 / 255.0, 0.0, 1.0),
    vec4(1.0, 223.0 / 255.0, 0.0, 1.0),
    vec4(1.0, 223.0 / 255.0, 0.0, 1.0),

    // Back face
    vec4(1.0, 223.0 / 255.0, 0.0, 1.0),
    vec4(1.0, 223.0 / 255.0, 0.0, 1.0),
    vec4(1.0, 223.0 / 255.0, 0.0, 1.0),
    vec4(1.0, 223.0 / 255.0, 0.0, 1.0),
    vec4(1.0, 223.0 / 255.0, 0.0, 1.0),
    vec4(1.0, 223.0 / 255.0, 0.0, 1.0),
    vec4(1.0, 223.0 / 255.0, 0.0, 1.0),
    vec4(1.0, 223.0 / 255.0, 0.0, 1.0)
];


var indexList = [
    //Front face
    0, 7, 5,
    0, 6, 5,
    0, 5, 4,
    0, 4, 1,
    1, 4, 2,
    2, 4, 3,

    //back face
    8, 12, 9,
    9, 12, 10,
    10, 12, 11,
    8, 13, 12,
    8, 14, 13,
    8, 15, 14,

    //Sides
    0, 15, 7,
    8, 15, 0,
    7, 14, 6,
    15, 14, 7,
    6, 13, 5,
    14, 13, 6,

    9, 2, 10,
    1, 2, 9,
    10, 3, 11,
    2, 3, 10,
    11, 4, 12,
    3, 4, 11,

    //Top
    0, 9, 8,
    0, 1, 9,

    //Bottom
    5, 12, 13,
    5, 4, 12
];
        
    console.log((indexList.length));
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

function render() {
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );
    
    // will populate to render the cube
    gl.drawElements( gl.TRIANGLES, 84, gl.UNSIGNED_SHORT, 0 );
}

function rotateAroundX() {
    // will implement this to rotate the cube around the X-axis
    
    alpha += 0.1;
    gl.uniform1f( gl.getUniformLocation( myShaderProgram, "alpha"), alpha );
    render();
    
}

function rotateAroundY() {
    // will implement to rotate the cube around the Y-axis
    
    beta += 0.1;
    gl.uniform1f( gl.getUniformLocation( myShaderProgram, "beta"), beta );
    render();
    
}


// function render()
// {
//     // rotateAroundX()
//     requestAnimationFrame( render );
// }
