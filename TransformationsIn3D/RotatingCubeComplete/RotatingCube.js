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
    
    // Vertices of Cube
    var vertices =
    [vec4( 0.0,  .2,  0.0,  1), // p0
    vec4( -.2, -.2,  -.2,  1), // p1
    vec4(  .2, -.2,  -.2,  1), // p2
    vec4(  .2,  -.2,  .2,  1), // p3
    vec4( -.2,  -.2,  .2,  1), //p4
    vec4( -.3,  -.2,  .3,  1), //p5
    vec4(  .3,  -.2,  .3,  1), //p6
    vec4( -.3,  -.2,  -.3,  1), //p7
    vec4( .3,  -.2,  -.3,  1), //p8
    vec4( -.3,  -.3,  .3,  1), //p9
    vec4( .3,  -.3,  .3,  1), //p10
    vec4( -.3,  -.3,  -.3,  1), //p11
    vec4( .3,  -.3,  -.3,  1)];  // p12
    //Colors at Vertices of Prism
   
    var vertexColors = 
    [vec4( 1.0, 0.0, 0.0, 1.0), // p0
    vec4( 1.0, 0.0, 0.0, 1.0), // p1
    vec4( 1.0, 0.0, 0.0, 1.0), // p2
    vec4( 1.0, 0.0, 0.0, 1.0), // p3
    vec4( 1.0, 0.0, 0.0, 1.0), //p4
    vec4( 1.0, 0.0, 0.0, 1.0), // p5
    vec4( 1.0, 0.0, 0.0, 1.0), // p6
    vec4( 1.0, 0.0, 0.0, 1.0), // p7
    vec4( 1.0, 0.0, 0.0, 1.0), //p8
    vec4( 1.0, 0.0, 0.0, 1.0), // p9
    vec4( 1.0, 0.0, 0.0, 1.0), // p10
    vec4( 1.0, 0.0, 0.0, 1.0), // p11
    vec4( 1.0, 0.0, 0.0, 1.0)]; // p12

    //Faces of prism
     var indexList = 
    [
	//Cone
	0, 1, 2,
    0, 2, 3,
    0, 3, 4,
    0, 4, 1,
    4, 1, 2,
    3, 4, 2,

	//Rec Prism
	//Top
	6,7,8,
	5,7,6,
	
	//Bottom
	10,11,12,
	9,11,10,
	
	//Left
	5,11,7,
	9,11,5,
	
	//Right
	6,12,8,
	10,12,6,

	//Front 
	8,11,12,
	7,11,8,
	
	//Back
	6,9,10,
    5,9,6
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
    gl.drawElements( gl.TRIANGLES, 54, gl.UNSIGNED_SHORT, 0 );
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
