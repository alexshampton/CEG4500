// Name: Alexander Shampton

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

    
    // The following block of code together with the 
    // definitions in object.js are provided for diagnosis
    // 
    // For full credit, REPLACE THE FOLLOWING BLOCK with
    // a block that loads the vertices and faces from the provided ply file
    // You are encouraged to explore THREE.js by using ChatGPT
    // to investigate how to load a PLY file and get
    // access to the vertices and faces
    //
    
    vertices = getVertices(); // currently defined in object.js
    console.log(cross(vertices[0],vertices[1]))
    indexList = getFaces();
    numVertices = vertices.length;
    numTriangles = indexList.length/3;
    // End of block on reading vertices and faces that you should replace
    
    var indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indexList), gl.STATIC_DRAW);
    
    var verticesBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, verticesBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);
    
    var vertexPosition = gl.getAttribLocation(myShaderProgram,"vertexPosition");
    gl.vertexAttribPointer( vertexPosition, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vertexPosition );
    
    // Insert your code here
    // Step 1: Position the camera using the look at method
    
    // Define eye (use vec3 in MV.js)
    var eye = vec3( 100.0, 0.1, -1500);
    
    // Define at point (use vec3 in MV.js)
    var at = vec3(-0.0,-0.0,-0.0);
    
    // Define vup vector (use vec3 in MV.js)
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
    gl.uniformMatrix4fv( gl.getUniformLocation( myShaderProgram, "modelview"), false, M );
     
    // Step 2: Set up orthographic and perspective projections
    
    // Define left plane
    var leftPlane = -3;
    
    // Define right plane
    var rightPlane = 3;
    
    // Define top plane
    var topPlane = 3;
    
    // Define bottom plane
    var bottomPlane = -3;
    
    // Define near plane
    //var nearPlane = 144.22 - 50.0;
    var distance = Math.sqrt(((eye[0]-at[0]) ** 2) + ((eye[1]-at[1]) ** 2) + ((eye[2]-at[2]) ** 2));
    console.log(distance);
    //var nearPlane = -1000.0;
    var nearPlane = distance - 50;


    // Define far plane
    //var farPlane = 144.22 + 50.0;
    //var farPlane = 100.0;
    var farPlane = distance + 50.0;
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
    
    //Gouraud shading
    gl.uniform3f( gl.getUniformLocation( myShaderProgram, "p0" ), 0.0, 0.3 ,-3.0);
    
    gl.uniform3f( gl.getUniformLocation( myShaderProgram, "Ia" ), 2.0,2.0,2.0);
    gl.uniform3f( gl.getUniformLocation( myShaderProgram, "Id" ), 2.0,2.0,2.0);
    gl.uniform3f( gl.getUniformLocation( myShaderProgram, "Is" ), 2.0,2.0,2.0);

    gl.uniform3f( gl.getUniformLocation( myShaderProgram, "ka" ), 2.0,2.0,2.0);
    gl.uniform3f( gl.getUniformLocation( myShaderProgram, "kd" ), 2.0,2.0,2.0);
    gl.uniform3f( gl.getUniformLocation( myShaderProgram, "ks" ), 2.0,2.0,2.0);

    gl.uniform1f( gl.getUniformLocation( myShaderProgram, "alpha" ), 10.0);

    //Normalize N
    var nv = vec3(0.0,0.0,0.0);
    for(let q = 1; q <= indexList.length; q++)
    {
        if (q % 3 == 0) 
        {
            let crossProd = cross(vertices[indexList[q-2]], vertices[indexList[q-1]]);
            nv = vec3(nv[0] + crossProd[0], nv[1] + crossProd[1], nv[2] + crossProd[2]);
        }
    }
    
    nv = normalize(nv);
    console.log(nv);

    var nvBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, nvBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(nv), gl.STATIC_DRAW);
    
    var nvPos = gl.getAttribLocation(myShaderProgram,"nv");
    gl.vertexAttribPointer(nvPos, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(nvPos);
    drawObject();
}


function drawObject() {
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );
    gl.drawElements( gl.TRIANGLES, 3 * numTriangles, gl.UNSIGNED_SHORT, 0 )
}


