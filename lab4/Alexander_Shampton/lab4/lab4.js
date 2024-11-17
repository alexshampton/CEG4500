// Name: Alexander Shampton

var gl;
var numVertices;
var numTriangles;
var projFlag;
var light1Flag = 1;
var light2Flag = 1;
var specularFlag = 0;
var alpha = 0;

function initGL(){
    var canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }
    
    gl.enable(gl.DEPTH_TEST);
    gl.viewport( 0, 0, 512, 512 );
    gl.clearColor( 0.0, 0.0, 0.0, 1.0 );
    
    var myShaderProgram = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( myShaderProgram );

    vertices = getVertices(); // currently defined in object.js
    indexList = getFaces();
    numVertices = vertices.length;
    numTriangles = indexList.length/3;

    var faceNormals = getFaceNormals( vertices, indexList, numTriangles );
    var vertexNormals = getVertexNormals( vertices, indexList, faceNormals, numVertices, numTriangles );
    
    var indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indexList), gl.STATIC_DRAW);
    
    var verticesBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, verticesBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);
    
    var vertexPosition = gl.getAttribLocation(myShaderProgram,"vertexPosition");
    gl.vertexAttribPointer( vertexPosition, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vertexPosition );
    
    var normalsBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, normalsBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertexNormals), gl.STATIC_DRAW);
    
    var vertexNormal = gl.getAttribLocation(myShaderProgram,"vertexNormal");
    gl.vertexAttribPointer( vertexNormal, 3, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vertexNormal );

    var eye = vec3( 0.0, 0.1, -100);
    var at = vec3(0.0,0.0,0.0);
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
    gl.uniformMatrix4fv( gl.getUniformLocation( myShaderProgram, "modelviewit"), false, Mit );

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

    if (projFlag == "orth")
    {
        gl.uniformMatrix4fv( gl.getUniformLocation( myShaderProgram, "projection"), false, P_orth );
    }
    else
    {
        gl.uniformMatrix4fv( gl.getUniformLocation( myShaderProgram, "projection"), false, P_persp );
    }

    if (light1Flag == 1)
    {
        gl.uniform3f( gl.getUniformLocation( myShaderProgram, "ka"), 0.5, 0.5, 0.5 );
        gl.uniform3f( gl.getUniformLocation( myShaderProgram, "kd"), 0.5, 0.5, 0.5 );

        if (specularFlag == 0)
        {
            gl.uniform3f( gl.getUniformLocation( myShaderProgram, "ks"), 0.0, 0.0, 0.0 );
            gl.uniform3f( gl.getUniformLocation( myShaderProgram, "Is"), 0.0, 0.0, 0.0 );
        }
        else
        {
            gl.uniform3f( gl.getUniformLocation( myShaderProgram, "ks"), 0.5, 0.5, 0.5 );
            gl.uniform3f( gl.getUniformLocation( myShaderProgram, "Is"), 0.8, 0.8, 0.8 );
        }


        gl.uniform3f( gl.getUniformLocation( myShaderProgram, "Ia"), 0.2, 0.2, 0.2 );
        gl.uniform3f( gl.getUniformLocation( myShaderProgram, "Id"), 1.0, 1.0, 1.0 );
        
        gl.uniform3f( gl.getUniformLocation( myShaderProgram, "p0"), 100.0, 100.0, 0.0 );
        
        gl.uniform1f( gl.getUniformLocation( myShaderProgram, "alpha"), 10.0 );
    } 

    else
    {
        gl.uniform3f( gl.getUniformLocation( myShaderProgram, "ka"), 0.0, 0.0, 0.0 );
        gl.uniform3f( gl.getUniformLocation( myShaderProgram, "kd"), 0.0, 0.0, 0.0 );
        gl.uniform3f( gl.getUniformLocation( myShaderProgram, "ks"), 0.0, 0.0, 0.0 );


        gl.uniform3f( gl.getUniformLocation( myShaderProgram, "Ia"), 0.0, 0.0, 0.0 );
        gl.uniform3f( gl.getUniformLocation( myShaderProgram, "Id"), 0.0, 0.0, 0.0 );
        gl.uniform3f( gl.getUniformLocation( myShaderProgram, "Is"), 0.0, 0.0, 0.0  );
        
        gl.uniform3f( gl.getUniformLocation( myShaderProgram, "p0"), 0.0, 0.0, 10.0  );
        
        gl.uniform1f( gl.getUniformLocation( myShaderProgram, "alpha"), 10.0 );
    }

    if (light2Flag == 1)
    {
        gl.uniform3f( gl.getUniformLocation( myShaderProgram, "ka2"), 0.5, 0.5, 0.5 );
        gl.uniform3f( gl.getUniformLocation( myShaderProgram, "kd2"), 0.5, 0.5, 0.5 );

        if (specularFlag == 0)
        {
            gl.uniform3f( gl.getUniformLocation( myShaderProgram, "ks2"), 0.0, 0.0, 0.0 );
            gl.uniform3f( gl.getUniformLocation( myShaderProgram, "Is2"), 0.0, 0.0, 0.0 );
        }
        else
        {
            gl.uniform3f( gl.getUniformLocation( myShaderProgram, "ks2"), 0.5, 0.5, 0.5 );
            gl.uniform3f( gl.getUniformLocation( myShaderProgram, "Is2"), 0.8, 0.8, 0.8 );
        }

        gl.uniform3f( gl.getUniformLocation( myShaderProgram, "Ia2"), 0.2, 0.2, 0.2 );
        gl.uniform3f( gl.getUniformLocation( myShaderProgram, "Id2"), 1.0, 1.0, 1.0 );
        gl.uniform3f( gl.getUniformLocation( myShaderProgram, "lightDirection2"), -100.0, 0.0, 0.0 );
    } 
    else
    {
        gl.uniform3f( gl.getUniformLocation( myShaderProgram, "ka2"), 0.0, 0.0, 0.0 );
        gl.uniform3f( gl.getUniformLocation( myShaderProgram, "kd2"), 0.0, 0.0, 0.0 );
        gl.uniform3f( gl.getUniformLocation( myShaderProgram, "ks2"), 0.0, 0.0, 0.0 );


        gl.uniform3f( gl.getUniformLocation( myShaderProgram, "Ia2"), 0.0, 0.0, 0.0 );
        gl.uniform3f( gl.getUniformLocation( myShaderProgram, "Id2"), 0.0, 0.0, 0.0 );
        gl.uniform3f( gl.getUniformLocation( myShaderProgram, "Is2"), 0.0, 0.0, 0.0  );
                    }

    // render the object
    drawObject();

}
// FOLLOWING CODE SKELETON FOR getFaceNormals() NEEDS TO BE COMPLETED
function getFaceNormals( vertices, indexList, numTriangles ) {

    var faceNormals = [];

    var i = 0;
    for (i = 0; i < numTriangles; i++) {
        var i0 = indexList[3*i];
        var i1 = indexList[3*i+1];
        var i2 = indexList[3*i+2];
        var p0 = vertices[i0];
        var p1 = vertices[i1];
        var p2 = vertices[i2];

        var v1 = vec3( p1[0]-p0[0], p1[1]-p0[1], p1[2]-p0[2] );
        var v2 = vec3( p2[0]-p0[0], p2[1]-p0[1], p2[2]-p0[2] );

        var faceNormal = cross( v1,v2 );

        faceNormals.push( faceNormal );
    }


    return faceNormals;
}

// FOLLOWING CODE SKELETON FOR getVertexNormals() NEEDS TO BE COMPLETED
function getVertexNormals( vertices, indexList, faceNormals, numVertices, numTriangles ) {

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
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );
    gl.drawElements( gl.TRIANGLES, 3 * numTriangles, gl.UNSIGNED_SHORT, 0 );
}


function projectionSelect(type)
{
    if (type == "orth")
    {
        projFlag = "orth";
    }
    else
    {
        projFlag = "per"
    }
    initGL();
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
