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
    var vertices = [
        // Cube vertices
        vec4( -.3,  .6,  -.3,  1), // p0
        vec4( -.3, .1,  -.3,  1), // p1
        vec4(  .3, .1,  -.3,  1), // p2
        vec4(  .3,  .6,  -.3,  1), // p3
        vec4(  .3,  .6,  .3,  1), // p4
        vec4( -.3,  .6,  .3,  1), // p5
        vec4( -.3, .1,  .3,  1), // p6
        vec4(  .3, .1,  .3,  1), // p7
        vec4( .3,  1.0,  .3,  1), // p8
        vec4(  -.3,  1.0,  .3,  1), // p9
    
        // Table vertices
        vec4( -.5,  .4,  -.5,  1), // p10
        vec4( -.5,  .1,  -.5,  1), // p11
        vec4(  .5,  .1,  -.5,  1), // p12
        vec4(  .5,  .4,  -.5,  1), // p13
        vec4(  .5,  .4,  .5,  1), // p14
        vec4( -.5,  .4,  .5,  1), // p15
        vec4( -.5,  .1,  .5,  1), // p16
        vec4(  .5,  .1,  .5,  1), // p17
        vec4( -.45, .1, -.45, 1), // p18
        vec4( -.45, -.4, -.45, 1), // p19
        vec4( -.4, -.4, -.4, 1), // p20
        vec4( -.4, .1, -.4, 1), // p21
        vec4( .45, .1, -.45, 1), // p22
        vec4( .45, -.4, -.45, 1), // p23
        vec4( .4, -.4, -.4, 1), // p24
        vec4( .4, .1, -.4, 1), // p25
        vec4( -.45, .1, .45, 1), // p26
        vec4( -.45, -.4, .45, 1), // p27
        vec4( -.4, -.4, .4, 1), // p28
        vec4( -.4, .1, .4, 1), // p29
        vec4( .45, .1, .45, 1), // p30
        vec4( .45, -.4, .45, 1), // p31
        vec4( .4, -.4, .4, 1), // p32
        vec4( .4, .1, .4, 1) // p33
    ];
// // Colors at Vertices of Cube
var vertexColors =  [
    vec4(0.6, 0.3, 0.0, 1.0), // brown
    vec4(0.6, 0.3, 0.0, 1.0), // brown
    vec4(0.6, 0.3, 0.0, 1.0), // brown
    vec4(0.6, 0.3, 0.0, 1.0), // brown
    vec4(0.6, 0.3, 0.0, 1.0), // brown
    vec4(0.6, 0.3, 0.0, 1.0), // brown
    vec4(0.6, 0.3, 0.0, 1.0), // brown
    vec4(0.6, 0.3, 0.0, 1.0), // brown
    vec4(0.6, 0.3, 0.0, 1.0), // brown
    vec4(0.6, 0.3, 0.0, 1.0), // brown
    vec4(0.6, 0.3, 0.0, 1.0), // brown
    vec4(0.6, 0.3, 0.0, 1.0), // brown
    vec4(0.6, 0.3, 0.0, 1.0), // brown
    vec4(0.6, 0.3, 0.0, 1.0), // brown
    vec4(0.6, 0.3, 0.0, 1.0), // brown
    vec4(0.6, 0.3, 0.0, 1.0), // brown
    vec4(0.6, 0.3, 0.0, 1.0), // brown
    vec4(0.6, 0.3, 0.0, 1.0), // brown
    vec4(0.6, 0.3, 0.0, 1.0), // brown
    vec4(0.6, 0.3, 0.0, 1.0), // brown
    vec4(0.6, 0.3, 0.0, 1.0), // brown
    vec4(0.6, 0.3, 0.0, 1.0), // brown
    vec4(0.6, 0.3, 0.0, 1.0), // brown
    vec4(0.6, 0.3, 0.0, 1.0), // brown
    vec4(0.6, 0.3, 0.0, 1.0), // brown
    vec4(0.6, 0.3, 0.0, 1.0), // brown
    vec4(0.6, 0.3, 0.0, 1.0), // brown
    vec4(0.6, 0.3, 0.0, 1.0), // brown
    vec4(0.6, 0.3, 0.0, 1.0), // brown
    vec4(0.6, 0.3, 0.0, 1.0), // brown
    vec4(0.6, 0.3, 0.0, 1.0), // brown
    vec4(0.6, 0.3, 0.0, 1.0), // brown
    vec4(0.6, 0.3, 0.0, 1.0), // brown
    vec4(0.6, 0.3, 0.0, 1.0) // brown
];


    //Every face on the cube is divided into two triangles,
    // each triangle is described by three indices into
    // the array "vertices"
    var indexList  = [
        // Cube
        0, 1, 3,
        1, 2, 3,
        6, 5, 7,
        4, 7, 5,
        0, 6, 1,
        5, 6, 0,
        2, 4, 3,
        2, 7, 4,
        0, 4, 5,
        0, 3, 4,
        2, 1, 6,
        2, 6, 7,
        5, 9, 4,
        8, 4, 9,
    
        // Table top
        10, 11, 12, 10, 12, 13,
        13, 12, 17, 13, 17, 14,
        14, 17, 16, 14, 16, 15,
        15, 16, 11, 15, 11, 10,
        10, 13, 14, 10, 14, 15,
        12, 11, 16, 12, 16, 17,
    
        // Legs
        18, 19, 20, 18, 20, 21,
        22, 23, 24, 22, 24, 25,
        26, 27, 28, 26, 28, 29,
        30, 31, 32, 30, 32, 33
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
    gl.drawElements( gl.TRIANGLES, 102, gl.UNSIGNED_SHORT, 0 );
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

