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

function initGL(){
    var canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }
    
    gl.enable(gl.DEPTH_TEST);
    gl.viewport( 0, 0, 512, 512 );
    gl.clearColor( 0.0, 0.0, 0.0, 1.0 );

    var boxVerticies = [
        // box verticies
        vec4(-.3,  .45,  -.3,  1), // p0
        vec4(-.3, .0,  -.3,  1), // p1
        vec4(.3, .0,  -.3,  1), // p2
        vec4(.3,  .45,  -.3,  1), // p3
        vec4(.3,  .45,  .3,  1), // p4
        vec4(-.3,  .45,  .3,  1), // p5
        vec4(-.3, .0,  .3,  1), // p6
        vec4(.3, .0,  .3,  1), // p7
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

    // var tableVerticies = [
    
    //     // Table Verticies
    //     vec4( -.5,  .8,  -.5,  1), // p10
    //     vec4( -.5,  .5,  -.5,  1), // p11
    //     vec4(  .5,  .5,  -.5,  1), // p12
    //     vec4(  .5,  .8,  -.5,  1), // p13
    //     vec4(  .5,  .8,  .5,  1), // p14
    //     vec4( -.5,  .8,  .5,  1), // p15
    //     vec4( -.5,  .5,  .5,  1), // p16
    //     vec4(  .5,  .5,  .5,  1), // p17
    //     vec4( -.45, .5, -.45, 1), // p18
    //     vec4( -.45, .0, -.45, 1), // p19
    //     vec4( -.4, .0, -.4, 1), // p20
    //     vec4( -.4, .5, -.4, 1), // p21
    //     vec4( .45, .5, -.45, 1), // p22
    //     vec4( .45, -.0, -.45, 1), // p23
    //     vec4( .4, -.0, -.4, 1), // p24
    //     vec4( .4, .5, -.4, 1), // p25
    //     vec4( -.45, .5, .45, 1), // p26
    //     vec4( -.45, -.0, .45, 1), // p27
    //     vec4( -.4, -.0, .4, 1), // p28
    //     vec4( -.4, .5, .4, 1), // p29
    //     vec4( .45, .5, .45, 1), // p30
    //     vec4( .45, -.0, .45, 1), // p31
    //     vec4( .4, -.0, .4, 1), // p32
    //     vec4( .4, .5, .4, 1) // p33

    // ];

    // //Every face on the cube is divided into two triangles,
    // // each triangle is described by three indices into
    // // the array "verticies"
    // tableIndexList  = [

    //     // Table top
    //     0, 1, 2, 0, 2, 3,
    //     3, 2, 7, 3, 7, 4,
    //     4, 7, 6, 4, 6, 5,
    //     5, 6, 1, 5, 1, 0,
    //     0, 3, 4, 0, 4, 5,
    //     2, 1, 6, 2, 6, 7,

    //     // Legs
    //     8, 9, 10, 8, 10, 11,
    //     12, 13, 14, 12, 14, 15,
    //     16, 17, 18, 16, 18, 19,
    //     20, 21, 22, 20, 22, 23

    // ];

var octagonVertices = [
    // Front face
    vec4(-0.125, 0.25, -0.05, 1.0), // p0
    vec4(0.125, 0.25, -0.05, 1.0), // p1
    vec4(0.25, 0.125, -0.05, 1.0), // p2
    vec4(0.25, -0.125, -0.05, 1.0), // p3
    vec4(0.125, -0.25, -0.05, 1.0), // p4
    vec4(-0.125, -0.25, -0.05, 1.0), // p5dd
    vec4(-0.25, -0.125, -0.05, 1.0), // p6
    vec4(-0.25, 0.125, -0.05, 1.0), // p7

    // Back face
    vec4(-0.125, 0.25, -0.0, 1.0), // p8
    vec4(0.125, 0.25, -0.0, 1.0), // p9
    vec4(0.25, 0.125, -0.0, 1.0), // p10
    vec4(0.25, -0.125, -0.0, 1.0), // p11
    vec4(0.125, -0.25, -0.0, 1.0), // p12
    vec4(-0.125, -0.25, -0.0, 1.0), // p13
    vec4(-0.25, -0.125, -0.0, 1.0), // p14
    vec4(-0.25, 0.125, -0.0, 1.0) // p15
];


var octagonIndices = [
    //Front face
    0,4,1,
    1,4,2,
    2,4,3,
    0,5,4,
    0,6,5,
    0,7,6,

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

    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );

    var boxShader = initShaders( gl, "vertex-shaderBox", "fragment-shaderBox" );
    gl.useProgram( boxShader );

    //Initializing transformation variables
    gl.uniform1f( gl.getUniformLocation( boxShader, "alpha2"), alpha );
    gl.uniform1f( gl.getUniformLocation( boxShader, "beta"), beta );
    gl.uniform1f( gl.getUniformLocation( boxShader, "gamma"), gamma );
    gl.uniform1f( gl.getUniformLocation( boxShader, "tx"), tx );
    gl.uniform1f( gl.getUniformLocation( boxShader, "ty"), ty );
    gl.uniform1f( gl.getUniformLocation( boxShader, "sx"), sx );
    gl.uniform1f( gl.getUniformLocation( boxShader, "sy"), sy );

    initLighting(boxShader, boxVerticies, boxIndexList);

    // var tableShader = initShaders( gl, "vertex-shader", "fragment-shader" );
    // gl.useProgram( tableShader );
    // initLighting(tableShader, tableVerticies, tableIndexList);

    var coinShader = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( coinShader );
    initLighting(coinShader, octagonVertices, octagonIndices);
}

function initLighting(shader, verticies, indexList)
{
    numVertices = verticies.length;
    numTriangles = indexList.length/3;

    var faceNormals = getFaceNormals( verticies, indexList, numTriangles );
    var vertexNormals = getVertexNormals( verticies, indexList, faceNormals, numVertices, numTriangles );
    
    var indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indexList), gl.STATIC_DRAW);
    
    var verticesBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, verticesBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(verticies), gl.STATIC_DRAW);
    
    var vertexPosition = gl.getAttribLocation(shader,"vertexPosition");
    gl.vertexAttribPointer( vertexPosition, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vertexPosition );
    
    var normalsBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, normalsBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertexNormals), gl.STATIC_DRAW);
    
    var vertexNormal = gl.getAttribLocation(shader,"vertexNormal");
    gl.vertexAttribPointer( vertexNormal, 3, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vertexNormal );

    var eye = vec3( -10.0, 30.1, -200);
    var at = vec3(0.0 ,1.0, 0.0);
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
        drawObject()
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

function light1Switch()
{
    if (light1Flag == 1)
    {
        light1Flag = 0;
    }
    else
    {
        light1Flag = 1;
    }
    initGL();
}

function light2Switch()
{
    if (light2Flag == 1)
    {
        light2Flag = 0;
    }
    else
    {
        light2Flag = 1;
    }
    initGL();
}

function specularSwitch()
{
    if (specularFlag == 1)
    {
        specularFlag = 0;
    }
    else
    {
        specularFlag = 1;
    }   
    console.log(specularFlag);
    initGL();
}

function rotateAroundY() 
{
    beta += 0.1;
    console.log(beta); 
    initGL();
}

function moveX(direction)
{
    tx += 0.2 * direction;
    initGL();
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
    rotateAroundY();
    requestAnimationFrame( render );
}
