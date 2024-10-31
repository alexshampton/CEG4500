// Name:

var gl;
var numVertices;
var numTriangles;

function initGL(){
    var canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }
    
    gl.enable(gl.DEPTH_TEST);
    gl.viewport( 0, 0, 512, 512 );
    gl.clearColor( 0.0, 0.0, 0.0, 1.0 );
    
    var myShaderProgram = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( myShaderProgram );

    
    numVertices = 2440;
    numTriangles = 4871;
    vertices = getVertices(); // vertices and faces are defined in object.js
    indexList = getFaces();
    
    
    var indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indexList), gl.STATIC_DRAW);
    
    var verticesBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, verticesBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);
    
    var vertexPosition = gl.getAttribLocation(myShaderProgram,"vertexPosition");
    gl.vertexAttribPointer( vertexPosition, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vertexPosition );
    
    //console.log(vertexPosition);
    
    // WORK ON THIS LAB IN TWO ITERATIONS
    // In the first iteration, do Steps 1 and 2 (i.e., do the Viewing portion)
    // and try to determine if you can see a silhouette (i.e., a filled outline)
    // of the chair. You will not see any inner detail, but you will at least know
    // that the chair is within the viewport. Make sure while doing this step
    // to apply the modelview and projection matrices in the vertex shader
    
    // In the second iteration, do Steps 3.1 (normal calculation and light setup), 3.2 (vertex
    // shader calculations for lighting, and steps 3.3 (fragment shader calculations
    // for lighting) so you can see the inner detail of the chair
    
    // FOLLOWING LINES IN STEPS 1 AND 2 NEED CODE FOR EACH COMMENT
    
    
    // Step 1: Position the camera using the look at method
    
    // Define eye (use vec3 in MV.js)
    var eye = vec3( 0.0, 80.0, 120.0 );
    
    // Define at point (use vec3 in MV.js)
    var at = vec3( 0.0, 0.0, 0.0 );
    
    // Define vup vector (use vec3 in MV.js)
    var vup = vec3( 0.0, 1.0, 0.0 );
    
    // Obtain n (use subtract and normalize in MV.js)
    //var d = subtract( eye,at );
    var d1 = eye[2] - at[2];
    var d = vec3( eye[0]-at[0], eye[1]-at[1], eye[2]-at[2] );
    var n = normalize( d ); 
    console.log( vup );
    console.log( n );
    
    // Obtain u (use cross and normalize in MV.js)
    var k = cross( vup, n );
    var u = normalize( k );
    
    // Obtain v (use cross and normalize in MV.js)
    var l = cross( n, u );
    var v = normalize( l );
    
    //console.log( d );
    //console.log( n );
    //console.log( k );
    console.log( u );
    //console.log( l );
    console.log( v );
    

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
    gl.uniformMatrix4fv( gl.getUniformLocation( myShaderProgram, "modelview"), false, M );
     
    // Step 2: Set up orthographic and perspective projections
    
    // Define left plane
    var leftPlane = -50.0;
    
    // Define right plane
    var rightPlane = 50.0;
    
    // Define top plane
    var topPlane = 50.0;
    
    // Define bottom plane
    var bottomPlane = -50.0;
    
    // Define near plane
    var nearPlane = 144.22 - 50.0;
    
    // Define far plane
    var farPlane = 144.22 + 50.0;
    
    // Set up orthographic projection matrix P_orth using above planes
    
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
    
    // Use a flag to determine which matrix to send as uniform to shader
    // flag value should be changed by a button that switches between
    // orthographic and perspective projections
    
    P_orth = [2.0/(rightPlane-leftPlane),
        0.0,
        0.0,
        0.0,
        0.0,
        2/(topPlane-bottomPlane),
        0.0,
        0.0,
        0.0,
        0.0,
        -2.0/(farPlane-nearPlane),
        0.0,
        (rightPlane+leftPlane)/(rightPlane-leftPlane),
        (topPlane+bottomPlane)/(topPlane-bottomPlane),
        -(farPlane+nearPlane)/(farPlane-nearPlane),
        1.0];
    gl.uniformMatrix4fv( gl.getUniformLocation( myShaderProgram, "projection"), false, P_persp );
    
    
    // render the object
    drawObject();

};

function drawObject() {
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );
    gl.drawElements( gl.TRIANGLES, 3 * numTriangles, gl.UNSIGNED_SHORT, 0 )
}

// Write a script for changing the perspective / orthographic flag
// using a button here



// Write a script for switching on / off the first light source flag
// using a button here



// Write a script for switching on / off the second light source flag
// using a button here

