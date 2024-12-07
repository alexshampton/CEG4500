// Name: Alexander Shampton

var gl;
var numVertices;
var numTriangles;
var projFlag;
var light1Flag = 1;
var light2Flag = 1;
var specularFlag = 1;
var boxIndexList;
var tableIndexList;

var alpha = 0.0;
var beta = 0.0;
var gamma = 0.0;
var tx = 0.0;
var ty = 0.0;
var sx = 1.0;
var sy = 1.0;

var coinTransDown = -0.1;
var coinTransX = Math.random() * (1.5 - -1.5) + -1.5;
var gameStart = Date.now();
var gameNow;

var gameOver = false;
var score = 0;

var boxShader;
var boxTriangles;
var boxindexBuffer;
var boxnormalsBuffer;
var boxvertexNormal;
var boxvertexNormals;
var boxvertexPosition;
var boxverticesBuffer;
var boxIndexList;
var boxtextureCoordinates;
var boxVerticies;
var boxtextureCoordinate;
var boxTexture;
var boxtextureVertexbuffer;

var coinShader;
var coinTriangles;
var coinindexBuffer;
var coinnormalsBuffer;
var coinvertexNormal;
var coinvertexPosition;
var coinverticesBuffer;
var coinIndexList;
var cointextureCoordinates;
var coinVerticies;
var cointextureVertexbuffer;
var coinColor;
var coinColors;
var colorBuffer;

var trafficConeColors;
var trafficConeCoordinates;
var trafficConeIndexList;
var trafficConeShader;
var trafficConeTriangles;
var trafficConeindexBuffer;
var trafficConenormalsBuffer;
var trafficConevertexNormal;
var trafficConevertexPosition;
var trafficConeverticesBuffer;
var trafficConeIndexList;
var trafficConetextureCoordinates;
var trafficConeVerticies;
var trafficConetextureCoordinate;
var trafficConevertexNormals;
var conetextureCoordinate;
var coneTexture;
var conetextureCoordinates;
var conetextureVertexbuffer;
var coneTransDown = -0.1;
var coneTransX = Math.random() * (1.5 - -1.5) + -1.5;

var shape = ["coin", "cone"];
var displayedShape = shape[Math.floor(Math.random() * shape.length)];

function initGL(){

    var canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }
    
    gl.enable(gl.DEPTH_TEST);
    gl.viewport( 0, 0, 512, 512 );
    gl.clearColor( 0.0, 0.0, 0.0, 1.0 );

    boxVerticies = [
        // box verticies
        vec4(-.3,  .0,  -.3,  1), // p0
        vec4(-.3, -.45,  -.3,  1), // p1
        vec4(.3, -.45,  -.3,  1), // p2
        vec4(.3,  .0,  -.3,  1), // p3
        vec4(.3,  .0,  .3,  1), // p4
        vec4(-.3,  .0,  .3,  1), // p5
        vec4(-.3, -.45,  .3,  1), // p6
        vec4(.3, -.45,  .3,  1), // p7
    ];

    //Every face on the cube is divided into two triangles,
    // each triangle is described by three indices into
    // the array "verticies"
    boxIndexList  = [
        // box
        0, 1, 3,
        1, 2, 3,
        6, 5, 7,
        4, 7, 5,
        0, 6, 1,
        5, 6, 0,
        2, 4, 3,
        2, 7, 4,
        2, 1, 6,
        2, 6, 7
    ];

    boxTriangles = boxIndexList.length/3;

    boxtextureCoordinates =
       [// Front
        // 0.0,  0.0,
        // 1.0,  0.0,
        // 1.0,  1.0,
        // 0.0,  1.0,
        1.0,  1.0,
        1.0,  0.0,
        0.0,  0.0,
        0.0,  1.0,
        // Back
        0.0,  0.0,
        1.0,  0.0,
        1.0,  1.0,
        0.0,  1.0,
        // Top
        0.0,  0.0,
        1.0,  0.0,
        1.0,  1.0,
        0.0,  1.0,
        // Bottom
        0.0,  0.0,
        1.0,  0.0,
        1.0,  1.0,
        0.0,  1.0,
        // Right
        0.0,  0.0,
        1.0,  0.0,
        1.0,  1.0,
        0.0,  1.0,
        // Left
        0.0,  0.0,
        1.0,  0.0,
        1.0,  1.0,
        0.0,  1.0
    ];

    coinVerticies = [

// Front face
        vec4(-0.25 , 3.00, -0.1, 1.0), // p0
        vec4(-0.125, 3.00, -0.1, 1.0), // p1
        vec4(-0.0625, 2.9375, -0.1, 1.0), // p2
        vec4(-0.0625, 2.8125, -0.1, 1.0), // p3
        vec4(-0.125, 2.75, -0.1, 1.0), // p4
        vec4(-0.25, 2.75, -0.1, 1.0), // p5
        vec4(-0.3125, 2.8125, -0.1, 1.0), // p6
        vec4(-0.3125, 2.9375, -0.1, 1.0), // p7

        // Back face
        vec4(-0.25, 3.00, 0.0, 1.0), // p8
        vec4(-0.125, 3.00, 0.0, 1.0), // p9
        vec4(-0.0625, 2.9375, 0.0, 1.0), // p10
        vec4(-0.0625, 2.8125, 0.0, 1.0), // p11
        vec4(-0.125, 2.75, 0.0, 1.0), // p12
        vec4(-0.25, 2.75, 0.0, 1.0), // p13
        vec4(-0.3125, 2.8125, 0.0, 1.0), // p14
        vec4(-0.3125, 2.9375, 0.0, 1.0) // p15

    ]  ;

    coinColors = [

// Front face
        vec4(1.0 , 223.0/255.0, 0.0, 1.0), 
        vec4(1.0 , 223.0/255.0, 0.0, 1.0), 
        vec4(1.0 , 223.0/255.0, 0.0, 1.0), 
        vec4(1.0 , 223.0/255.0, 0.0, 1.0), 
        vec4(1.0 , 223.0/255.0, 0.0, 1.0), 
        vec4(1.0 , 223.0/255.0, 0.0, 1.0), 
        vec4(1.0 , 223.0/255.0, 0.0, 1.0), 
        vec4(1.0 , 223.0/255.0, 0.0, 1.0), 

        // Back face
        vec4(1.0 , 223.0/255.0, 0.0, 1.0), 
        vec4(1.0 , 223.0/255.0, 0.0, 1.0), 
        vec4(1.0 , 223.0/255.0, 0.0, 1.0), 
        vec4(1.0 , 223.0/255.0, 0.0, 1.0), 
        vec4(1.0 , 223.0/255.0, 0.0, 1.0), 
        vec4(1.0 , 223.0/255.0, 0.0, 1.0), 
        vec4(1.0 , 223.0/255.0, 0.0, 1.0), 
        vec4(1.0 , 223.0/255.0, 0.0, 1.0)
    ]  ;


    coinIndexList = [
        //Front face
        0,7,5,
        0,6,5,
        0,5,4,
        0,4,1,
        1,4,2,
        2,4,3,

        //back face
        8,12,9,
        9,12,10,
        10,12,11,
        8,13,12,
        8,14,13,
        8,15,14,

        //Sides
        0,15,7,
        8,15,0,
        7,14,6,
        15,14,7,
        6,13,5,
        14,13,6,

        9,2,10,
        1,2,9,
        10,3,11,
        2,3,10,
        11,4,12,
        3,4,11
    ];

    conetextureCoordinates = [
    0.5, 1.0
    ];

    coinTraingles = coinIndexList.length/3;

    
    trafficConeVerticies =
    [vec4( 0.0,  3.0,  0.0,  1), // p0
    vec4( -.1,  2.7,  -.2,  1), // p1
    vec4(  .1, 2.7,  -.2,  1), // p2
    vec4(  .1,  2.7,  .2,  1), // p3
    vec4( -.1,  2.7,  .2,  1), //p4
    vec4( -.15,  2.7,  .3,  1), //p5
    vec4(  .15,  2.7,  .3,  1), //p6
    vec4( -.15,  2.7,  -.3,  1), //p7
    vec4( .15,  2.7,  -.3,  1), //p8
    vec4( -.15,  2.65,  .3,  1), //p9
    vec4( .15,  2.65,  .3,  1), //p10
    vec4( -.15,  2.65,  -.3,  1), //p11
    vec4( .15,  2.65,  -.3,  1)];  // p12
    //Colors at Vertices of Prism
   
    trafficConeColors = 
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
    trafficConeIndexList = 
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

    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );

    initBox();
    initCoin();
    initCone();
    render();
}


function initBox()
{
    boxShader = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( boxShader );

    //Initializing transformation variables
    gl.uniform1f( gl.getUniformLocation( boxShader, "alpha2"), alpha );
    gl.uniform1f( gl.getUniformLocation( boxShader, "beta"), beta );
    gl.uniform1f( gl.getUniformLocation( boxShader, "gamma"), gamma );
    gl.uniform1f( gl.getUniformLocation( boxShader, "tx"), tx );
    gl.uniform1f( gl.getUniformLocation( boxShader, "ty"), ty );
    gl.uniform1f( gl.getUniformLocation( boxShader, "sx"), sx );
    gl.uniform1f( gl.getUniformLocation( boxShader, "sy"), sy );

    boxTexture = gl.createTexture(); 
    gl.bindTexture( gl.TEXTURE_2D, boxTexture );
    const myImage = new Image();
    var url = "https://live.staticflickr.com/65535/54185929641_b0cf958f6a_b.jpg";
    myImage.crossOrigin = "anonymous";

    myImage.onload = function() {
        gl.bindTexture( gl.TEXTURE_2D, boxTexture );
        gl.pixelStorei( gl.UNPACK_FLIP_Y_WEBGL, true );
        gl.texImage2D( gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, myImage );
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);        
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        //gl.generateMipmap( gl.TEXTURE_2D ); // only use this if the image is a power of 2
        return boxTexture;
    };
    myImage.src = url;

    numVertices = boxVerticies.length;
    numTriangles = boxIndexList.length/3;

    var faceNormals = getFaceNormals( boxVerticies, boxIndexList, numTriangles );
    boxvertexNormals = getVertexNormals( boxVerticies, boxIndexList, faceNormals, numVertices, numTriangles );
    
    boxindexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,boxindexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(boxIndexList), gl.STATIC_DRAW);
    
    boxverticesBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, boxverticesBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(boxVerticies), gl.STATIC_DRAW);
    
    boxvertexPosition = gl.getAttribLocation(boxShader,"vertexPosition");
    gl.vertexAttribPointer( boxvertexPosition, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( boxvertexPosition );
    
    boxnormalsBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, boxnormalsBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(boxvertexNormals), gl.STATIC_DRAW);
    
    boxvertexNormal = gl.getAttribLocation(boxShader,"vertexNormal");
    gl.vertexAttribPointer( boxvertexNormal, 3, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( boxvertexNormal );

    initLighting(boxShader);

    boxtextureVertexbuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,boxtextureVertexbuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(boxtextureCoordinates), gl.STATIC_DRAW);
    
    boxtextureCoordinate = gl.getAttribLocation(boxShader,"textureCoordinate");
    gl.vertexAttribPointer( boxtextureCoordinate, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( boxtextureCoordinate ); 

}

function initCoin()
{
    coinShader = initShaders( gl, "vertex-shaderCoin", "fragment-shaderCoin" );
    gl.useProgram( coinShader );

    // Initializing transformation variables
    gl.uniform1f( gl.getUniformLocation( coinShader, "alpha2"), alpha );
    gl.uniform1f( gl.getUniformLocation( coinShader, "beta"), beta );
    gl.uniform1f( gl.getUniformLocation( coinShader, "gamma"), gamma );
    gl.uniform1f( gl.getUniformLocation( coinShader, "tx"), tx );
    gl.uniform1f( gl.getUniformLocation( coinShader, "ty"), ty );
    gl.uniform1f( gl.getUniformLocation( coinShader, "sx"), sx );
    gl.uniform1f( gl.getUniformLocation( coinShader, "sy"), sy );

    var faceNormals = getFaceNormals( coinVerticies, coinIndexList, numTriangles );
    var coinvertexNormals = getVertexNormals( coinVerticies, coinIndexList, faceNormals, numVertices, numTriangles );
    
    coinindexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,coinindexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(coinIndexList), gl.STATIC_DRAW);
    
    coinverticesBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, coinverticesBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(coinVerticies), gl.STATIC_DRAW);
    
    coinvertexPosition = gl.getAttribLocation(coinShader,"vertexPosition");
    gl.vertexAttribPointer( coinvertexPosition, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( coinvertexPosition );
    
    colorBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, colorBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(coinColors), gl.STATIC_DRAW );
    
    coinColor = gl.getAttribLocation( coinShader, "myColor" );
    gl.vertexAttribPointer( coinColor, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( coinColor );

    coinnormalsBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, coinnormalsBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(coinvertexNormals), gl.STATIC_DRAW);
    
    coinvertexNormal = gl.getAttribLocation(coinShader,"vertexNormal");
    gl.vertexAttribPointer( coinvertexNormal, 3, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( coinvertexNormal );

    initLighting(coinShader);

}

function initCone()
{
    trafficConeShader = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( trafficConeShader );

    //Initializing transformation variables
    gl.uniform1f( gl.getUniformLocation( trafficConeShader, "alpha2"), alpha );
    gl.uniform1f( gl.getUniformLocation( trafficConeShader, "beta"), beta );
    gl.uniform1f( gl.getUniformLocation( trafficConeShader, "gamma"), gamma );
    gl.uniform1f( gl.getUniformLocation( trafficConeShader, "tx"), tx );
    gl.uniform1f( gl.getUniformLocation( trafficConeShader, "ty"), ty );
    gl.uniform1f( gl.getUniformLocation( trafficConeShader, "sx"), sx );
    gl.uniform1f( gl.getUniformLocation( trafficConeShader, "sy"), sy );

    coneTexture = gl.createTexture(); 
    gl.bindTexture( gl.TEXTURE_2D, coneTexture );
    const newImage = new Image();
    var url = "https://live.staticflickr.com/65535/54189494144_bef4535887_w.jpg";
    newImage.crossOrigin = "anonymous";

    newImage.onload = function() {
        gl.bindTexture( gl.TEXTURE_2D, coneTexture );
        gl.pixelStorei( gl.UNPACK_FLIP_Y_WEBGL, true );
        gl.texImage2D( gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, newImage );
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);        
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        //gl.generateMipmap( gl.TEXTURE_2D ); // only use this if the image is a power of 2
        return coneTexture;
    };
    newImage.src = url;
    
    numVertices = boxVerticies.length;
    numTriangles = boxIndexList.length/3;

    var faceNormals = getFaceNormals( trafficConeVerticies, trafficConeIndexList, numTriangles );
    trafficConevertexNormals = getVertexNormals( trafficConeVerticies, trafficConeIndexList, faceNormals, numVertices, numTriangles );
    
    trafficConeindexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,trafficConeindexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(trafficConeIndexList), gl.STATIC_DRAW);
    
    trafficConeverticesBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, trafficConeverticesBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(trafficConeVerticies), gl.STATIC_DRAW);
    
    trafficConevertexPosition = gl.getAttribLocation(trafficConeShader,"vertexPosition");
    gl.vertexAttribPointer( trafficConevertexPosition, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( trafficConevertexPosition );
    
    trafficConenormalsBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, trafficConenormalsBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(trafficConevertexNormals), gl.STATIC_DRAW);
    
    trafficConevertexNormal = gl.getAttribLocation(trafficConeShader,"vertexNormal");
    gl.vertexAttribPointer( trafficConevertexNormal, 3, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( trafficConevertexNormal );

    initLighting(trafficConeShader);

    conetextureVertexbuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,conetextureVertexbuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(conetextureCoordinates), gl.STATIC_DRAW);
    
    conetextureCoordinate = gl.getAttribLocation(trafficConeShader,"textureCoordinate");
    gl.vertexAttribPointer( conetextureCoordinate, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( conetextureCoordinate ); 
}

function initLighting(shader)
{
    var eye = vec3( -10.0, 30.1, -200);
    var at = vec3(0.0, 1.0, 0.0);
    var vup = vec3( 0.0, 0.1, 0.0 );
    
    // Obtain n (use subtract and normalize in MV.js)
    //var d = subtract( eye,at );
    var d1 = eye[2] - at[2];
    var d = vec3( eye[0]-at[0], eye[1]-at[1], eye[2]-at[2] );
    var n = normalize( d ); 
    
    // Obtain u (use cross and normalize in MV.js)
    var k = cross( vup, n );
    var u = normalize( k );
    
    // Obtain v (use cross and normalize in MV.js)
    var l = cross( n, u );
    var v = normalize( l );

    // Set up Model-View matrix M and send M as uniform to shader
    var M = [ u[0], 
        v[0], 
        n[0], 
        0.0, 
        u[1], 
        v[1], 
        n[1], 
        0.0, 
        u[2], 
        v[2], 
        n[2], 
        0.0,
        -dot( eye, u ), 
        -dot( eye, v ), 
        -dot( eye, n ), 
        1.0];
    gl.uniformMatrix4fv( gl.getUniformLocation( shader, "modelview"), false, M );
     
    var Mit = [ u[0],
        v[0],
        n[0],
        eye[0],
        u[1],
        v[1],
        n[1],
        eye[1],
        u[2],
        v[2],
        n[2],
        eye[2],
        0.0,
        0.0,
        0.0,
        1.0];
    gl.uniformMatrix4fv( gl.getUniformLocation( shader, "modelviewit"), false, Mit );

    // Step 2: Set up orthographic and perspective projections
    
    // Define left plane
    var leftPlane = -1.5;
    
    // Define right plane
    var rightPlane = 1.5;
    
    // Define top plane
    var topPlane = 1.5;
    
    // Define bottom plane
    var bottomPlane = -1.5;
    
    // Define near plane
    var distance = Math.sqrt(((eye[0]-at[0]) ** 2) + ((eye[1]-at[1]) ** 2) + ((eye[2]-at[2]) ** 2));
    var nearPlane = distance - 50;


    // Define far plane
    var farPlane = distance + 50.0;
    
    // Set up perspective projection matrix P_persp using above planes
    var P_persp = [2.0*nearPlane/(rightPlane-leftPlane),
        0.0,
        0.0,
        0.0,
        0.0,
        2*nearPlane/(topPlane-bottomPlane),
        0.0,
        0.0,
        (rightPlane+leftPlane)/(rightPlane-leftPlane),
        (topPlane+bottomPlane)/(topPlane-bottomPlane),
        -(farPlane+nearPlane)/(farPlane-nearPlane),
        -1.0,
        0.0,
        0.0,
        -2.0*farPlane*nearPlane/(farPlane-nearPlane),
        0.0];
    
    gl.uniformMatrix4fv( gl.getUniformLocation( shader, "projection"), false, P_persp );

    if (light1Flag == 1)
    {
        gl.uniform3f( gl.getUniformLocation( shader, "ka"), 0.5, 0.5, 0.5 );
        gl.uniform3f( gl.getUniformLocation( shader, "kd"), 0.5, 0.5, 0.5 );

        if (specularFlag == 0)
        {
            gl.uniform3f( gl.getUniformLocation( shader, "ks"), 0.0, 0.0, 0.0 );
            gl.uniform3f( gl.getUniformLocation( shader, "Is"), 0.0, 0.0, 0.0 );
        }
        else
        {
            gl.uniform3f( gl.getUniformLocation( shader, "ks"), 0.5, 0.5, 0.5 );
            gl.uniform3f( gl.getUniformLocation( shader, "Is"), 0.8, 0.8, 0.8 );
        }


        gl.uniform3f( gl.getUniformLocation( shader, "Ia"), 0.2, 0.2, 0.2 );
        gl.uniform3f( gl.getUniformLocation( shader, "Id"), 1.0, 1.0, 1.0 );
        
        gl.uniform3f( gl.getUniformLocation( shader, "p0"), 100.0, 100.0, 0.0 );
        
        gl.uniform1f( gl.getUniformLocation( shader, "alpha"), 10.0 );
    } 

    else
    {
        gl.uniform3f( gl.getUniformLocation( shader, "ka"), 0.0, 0.0, 0.0 );
        gl.uniform3f( gl.getUniformLocation( shader, "kd"), 0.0, 0.0, 0.0 );
        gl.uniform3f( gl.getUniformLocation( shader, "ks"), 0.0, 0.0, 0.0 );


        gl.uniform3f( gl.getUniformLocation( shader, "Ia"), 0.0, 0.0, 0.0 );
        gl.uniform3f( gl.getUniformLocation( shader, "Id"), 0.0, 0.0, 0.0 );
        gl.uniform3f( gl.getUniformLocation( shader, "Is"), 0.0, 0.0, 0.0  );
        
        gl.uniform3f( gl.getUniformLocation( shader, "p0"), 0.0, 0.0, 10.0  );
        
        gl.uniform1f( gl.getUniformLocation( shader, "alpha"), 10.0 );
    }

    if (light2Flag == 1)
    {
        gl.uniform3f( gl.getUniformLocation( shader, "ka2"), 0.5, 0.5, 0.5 );
        gl.uniform3f( gl.getUniformLocation( shader, "kd2"), 0.5, 0.5, 0.5 );

        if (specularFlag == 0)
        {
            gl.uniform3f( gl.getUniformLocation( shader, "ks2"), 0.0, 0.0, 0.0 );
            gl.uniform3f( gl.getUniformLocation( shader, "Is2"), 0.0, 0.0, 0.0 );
        }
        else
        {
            gl.uniform3f( gl.getUniformLocation( shader, "ks2"), 0.5, 0.5, 0.5 );
            gl.uniform3f( gl.getUniformLocation( shader, "Is2"), 0.8, 0.8, 0.8 );
        }

        gl.uniform3f( gl.getUniformLocation( shader, "Ia2"), 0.2, 0.2, 0.2 );
        gl.uniform3f( gl.getUniformLocation( shader, "Id2"), 1.0, 1.0, 1.0 );
        gl.uniform3f( gl.getUniformLocation( shader, "lightDirection2"), -100.0, 0.0, 0.0 );
    } 
    else
    {
        gl.uniform3f( gl.getUniformLocation( shader, "ka2"), 0.0, 0.0, 0.0 );
        gl.uniform3f( gl.getUniformLocation( shader, "kd2"), 0.0, 0.0, 0.0 );
        gl.uniform3f( gl.getUniformLocation( shader, "ks2"), 0.0, 0.0, 0.0 );


        gl.uniform3f( gl.getUniformLocation( shader, "Ia2"), 0.0, 0.0, 0.0 );
        gl.uniform3f( gl.getUniformLocation( shader, "Id2"), 0.0, 0.0, 0.0 );
        gl.uniform3f( gl.getUniformLocation( shader, "Is2"), 0.0, 0.0, 0.0  );
                    }
        // drawObject()
}

// FOLLOWING CODE SKELETON FOR getFaceNormals() NEEDS TO BE COMPLETED
function getFaceNormals( verticies, indexList, numTriangles ) {

    var faceNormals = [];

    var i = 0;
    for (i = 0; i < numTriangles; i++) {
        var i0 = indexList[3*i];
        var i1 = indexList[3*i+1];
        var i2 = indexList[3*i+2];
        var p0 = verticies[i0];
        var p1 = verticies[i1];
        var p2 = verticies[i2];

        var v1 = vec3( p1[0]-p0[0], p1[1]-p0[1], p1[2]-p0[2] );
        var v2 = vec3( p2[0]-p0[0], p2[1]-p0[1], p2[2]-p0[2] );

        var faceNormal = cross( v1,v2 );

        faceNormals.push( faceNormal );
    }


    return faceNormals;
}

// FOLLOWING CODE SKELETON FOR getVertexNormals() NEEDS TO BE COMPLETED
function getVertexNormals( verticies, indexList, faceNormals, numVertices, numTriangles ) {

    var i = 0;
    var j = 0;

    var vertexNormals = [];

    for ( i = 0; i < numVertices; i++ ) {

        var vertexNormal = vec3( 0.0, 0.0, 0.0 );

        for ( j = 0; j < numTriangles; j++ ) {

            var i0 = indexList[3*j];
            var i1 = indexList[3*j+1];
            var i2 = indexList[3*j+2];

            if ( i == i0 || i == i1 || i == i2 ) {
                vertexNormal[0] += faceNormals[j][0];
                vertexNormal[1] += faceNormals[j][1];
                vertexNormal[2] += faceNormals[j][2];
                
            }

        }

        var l = length( vertexNormal );
        if ( l > 1e-6 ) {
            vertexNormal[0] = vertexNormal[0]/l;
            vertexNormal[1] = vertexNormal[1]/l;
            vertexNormal[2] = vertexNormal[2]/l;
        }
        vertexNormals.push( vertexNormal );

    }

    return vertexNormals;

}

function drawObject() {
    gl.drawElements( gl.TRIANGLES, numTriangles*3, gl.UNSIGNED_SHORT, 0 );
}


function rotateAroundY() 
{
    beta += 0.1;
    console.log(beta); 
    //initGL();
}

function moveX(direction)
{
    if(-1.6<Math.round(tx * 10)/10  && Math.round(tx * 10)/10<1.6)
    {
        tx += 0.2 * direction;
    }

    else
    {
        if(direction == -1 && Math.round(tx * 10)/10>=1.6)
        {
            tx += 0.2 * direction;
        }
        else if(direction == 1 && Math.round(tx * 10)/10<1.6)
        {
            tx += 0.2 * direction;
        }
    }
    gl.useProgram(boxShader);
    gl.uniform1f( gl.getUniformLocation( boxShader, "tx"), tx );

}

//Moves square up when spacebar is pressed
function moveShapeByKey(event)
{
    var keyAscii = event.keyCode;
    if (keyAscii==65) //A
    {
        moveX(1);
    }
    else if (keyAscii==68) //D
    {
        moveX(-1);
    }
}

function render()
{
    if(gameOver == false){

        //box tracking vars
        var boxX1 = (.3 + tx);
        var boxX2 = (-.3 + tx);
        var boxY1 = 0.0;
        var boxY2 = -0.45;

        //Coin tracking vars
        var coinY1 = (2.8125 + coinTransDown);
        var coinY2 = (2.75 + coinTransDown);
        var coinX1 = -0.0625 + coinTransX;
        var coinX4 = -0.3125 + coinTransX;

        //cone tracking vars
        var coneY1 = (2.7 + coneTransDown);
        var coneY2 = (2.65 + coneTransDown);
        var coneX1 = 0.15 + coneTransX;
        var coneX4 = -0.15 + coneTransX;

        if (displayedShape == "coin")
        {        
            //Checks Y coordinates of coin to randomize x axis randomly
            if (Math.round(coinTransDown * 1000)/1000  == -0.405 || Math.round(coinTransDown * 1000)/1000  == -1.505)
            {
                coinTransX = Math.random() * (1.3 - -1.3) + -1.3;
                gl.useProgram(coinShader);
                gl.uniform1f( gl.getUniformLocation( coinShader, "tx"), coinTransX);
            }

            //If the coins Y coords match the box's Y coords
            if(coinY1 <= boxY1 && coinY2 >= boxY2)
            {
                if((coinX1>=boxX1 && coinX4<=boxX1) || (coinX1>=boxX2 && coinX4<=boxX2))
                {
                    document.getElementById("gameover").innerHTML = "Game Over";
                    gameOver = true;
                }

                else if(boxX1> coinX1 && coinX4 > boxX2 && Math.round(coinY1 * 1000)/1000  == -0.137)
                {
                    console.log("SCORE" );
                    coinTransDown = -0.1;
                    gl.useProgram(coinShader);
                    gl.uniform1f( gl.getUniformLocation( coinShader, "ty"), coinTransDown );
                    score += 1;
                    document.getElementById("score").innerHTML = score;
                    displayedShape = shape[Math.floor(Math.random() * shape.length)];
                }
            }
        
            //Translate coin downward
            coinTransDown += -0.005;
            gl.useProgram(coinShader);
            gl.uniform1f( gl.getUniformLocation( coinShader, "ty"), coinTransDown );
        
            // //If the coin goes off the screen, game is over
            if(coinTransDown <= -3.5)
            {
                document.getElementById("gameover").innerHTML = "Game Over";
                gameOver = true;
            }

        }

        //Move cone
        else
        {        
            //Checks Y coordinates of coin to randomize x axis randomly
            console.log(coneTransDown);

            if (Math.round(coneTransDown * 1000)/1000  == -0.405 || Math.round(coneTransDown * 1000)/1000  == -1.205 || Math.round(coneTransDown * 1000)/1000  == -1.640)
            {
                coneTransX = Math.random() * (1.3 - -1.3) + -1.3;
                gl.useProgram(trafficConeShader);
                gl.uniform1f( gl.getUniformLocation( trafficConeShader, "tx"), coneTransX);
            }

            //If the coins Y coords match the box's Y coords
            if(coneY1 <= boxY1 && coneY2 >= boxY2)
            {
                if((coneX1>=boxX1 && coneX4<=boxX1) || (coneX1>=boxX2 && coneX4<=boxX2))
                {
                    document.getElementById("gameover").innerHTML = "Game Over";
                    gameOver = true;
                }
                // console.log("BOX: " + boxX1 + ", " + boxX2 + "Coin: " + coneX1 + ", " + coneX4);

                else if(boxX1> coneX1 && coneX4 > boxX2 && Math.round(coneY1 * 1000)/1000  == -0.105)
                {
                    document.getElementById("gameover").innerHTML = "Game Over";
                    gameOver = true;
                }
            }
        
                //Translate coin downward
            coneTransDown += -0.005;
            gl.useProgram(trafficConeShader);
            gl.uniform1f( gl.getUniformLocation( trafficConeShader, "ty"), coneTransDown );
        
            // //If the coin goes off the screen, game is over
            if(coneTransDown <= -3.5)
            {
                coneTransDown = -0.1;
                displayedShape = shape[Math.floor(Math.random() * shape.length)];
            }
        }

        //redraw box
        gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );

        gl.useProgram(boxShader);

        gl.bindBuffer(gl.ARRAY_BUFFER, boxverticesBuffer);
        gl.vertexAttribPointer( boxvertexPosition, 4, gl.FLOAT, false, 0, 0 );
        gl.enableVertexAttribArray(boxvertexPosition);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, boxindexBuffer);
        gl.bindBuffer(gl.ARRAY_BUFFER, boxnormalsBuffer);
        gl.vertexAttribPointer( boxvertexNormal, 3, gl.FLOAT, false, 0, 0 );
        
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, boxTexture);
        gl.uniform1i(gl.getUniformLocation(boxShader, "texMap0"), 0);
        gl.bindBuffer(gl.ARRAY_BUFFER,boxtextureVertexbuffer);
        gl.vertexAttribPointer( boxtextureCoordinate, 2, gl.FLOAT, false, 0, 0 );

        initLighting(boxShader);
        gl.drawElements( gl.TRIANGLES, boxIndexList.length , gl.UNSIGNED_SHORT, 0 );
        
        gl.useProgram(coinShader);

        gl.bindBuffer(gl.ARRAY_BUFFER, coinverticesBuffer);
        gl.vertexAttribPointer( coinvertexPosition, 4, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(coinvertexPosition);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, coinindexBuffer);
        gl.bindBuffer( gl.ARRAY_BUFFER, colorBuffer );
        gl.vertexAttribPointer( coinColor, 4, gl.FLOAT, false, 0, 0 );
        gl.bindBuffer(gl.ARRAY_BUFFER, coinnormalsBuffer);
        gl.vertexAttribPointer( coinvertexNormal, 3, gl.FLOAT, false, 0, 0 );

        initLighting(coinShader);
        gl.drawElements( gl.TRIANGLES, coinIndexList.length, gl.UNSIGNED_SHORT, 0 );

        gl.useProgram(trafficConeShader);

        gl.bindBuffer(gl.ARRAY_BUFFER, trafficConeverticesBuffer);
        gl.vertexAttribPointer( trafficConevertexPosition, 4, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(trafficConevertexPosition);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, trafficConeindexBuffer);
        gl.bindBuffer(gl.ARRAY_BUFFER, trafficConenormalsBuffer);
        gl.vertexAttribPointer( trafficConevertexNormal, 3, gl.FLOAT, false, 0, 0 );

        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, coneTexture);
        gl.uniform1i(gl.getUniformLocation(trafficConeShader, "texMap0"), 1);
        gl.bindBuffer(gl.ARRAY_BUFFER,conetextureVertexbuffer);
        gl.vertexAttribPointer( conetextureCoordinate, 2, gl.FLOAT, false, 0, 0 );
        initLighting(trafficConeShader);
        gl.drawElements( gl.TRIANGLES, trafficConeIndexList.length, gl.UNSIGNED_SHORT, 0 );

        requestAnimationFrame( render ); 
    }
}
