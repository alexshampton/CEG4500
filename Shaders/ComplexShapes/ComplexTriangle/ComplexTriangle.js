function drawTriangle() {
    // Set up the canvas
    var canvas=document.getElementById("gl-canvas");
    var gl=WebGLUtils.setupWebGL(canvas);
    if (!gl) { alert( "WebGL is not available" ); }
    
    // Set up the viewport
    gl.viewport( 0, 0, 512, 512 );   // x, y, width, height
    
    // Set up the background color
    gl.clearColor( 1.0, 0.0, 0.0, 1.0 );
    
    // Force the WebGL context to clear the color buffer
    gl.clear( gl.COLOR_BUFFER_BIT );



    var arrayOfPoints = [];
    
    // Enter array set up code here
    var point0 = vec4( 0.0, 0.0, 0.0, 1.0 );
    var scale0 = vec4( 0.3, 0.3, 0.0, 1.0 );
    var point1 = vec4( 1.0, 0.0, 0.0, 1.0 );
    var scale1 = vec4( 0.4, 0.4, 0.0, 1.0 );
    var point2 = vec4( 0.0, 1.0, 0.0, 1.0 );
    var scale2 = vec4( 0.5, 0.5, 0.0, 1.0 );
    
    arrayOfPoints.push( point0 );
    arrayOfPoints.push( scale0 );
    arrayOfPoints.push( point1 );
    arrayOfPoints.push( scale1 );
    arrayOfPoints.push( point2 );
    arrayOfPoints.push( scale2 );
    
    // Create a buffer on the graphics card,
    // and send array to the buffer for use
    // in the shaders
    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER,
                  flatten(arrayOfPoints), gl.STATIC_DRAW );
    
    // Create shader program, needs vertex and fragment shader code
    // in GLSL to be written in HTML file
    var myShaderProgram =
        initShaders( gl,"vertex-shader", "fragment-shader" );
    gl.useProgram( myShaderProgram );
    
    
    // Create a pointer that iterates over the
    // array of points in the shader code
    var myPositionJS = gl.getAttribLocation( myShaderProgram, "myPosition" );
    gl.vertexAttribPointer( myPositionJS, 4, gl.FLOAT, false, 32, 0 );
    gl.enableVertexAttribArray( myPositionJS );
    
    var myScaleAttJS = gl.getAttribLocation( myShaderProgram, "myScaleAtt" );
    gl.vertexAttribPointer( myScaleAttJS, 4, gl.FLOAT, false, 32, 16 );
    gl.enableVertexAttribArray( myScaleAttJS );
    

    // Force a draw of the triangle using the
    // 'drawArrays()' call
    gl.drawArrays( gl.TRIANGLES, 0, 3);
    
}

