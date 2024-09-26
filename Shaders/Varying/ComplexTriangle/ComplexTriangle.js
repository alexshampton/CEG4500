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

    // Create shader program, needs vertex and fragment shader code
    // in GLSL to be written in HTML file
    var myShaderProgram =
        initShaders( gl,"vertex-shader", "fragment-shader" );
    gl.useProgram( myShaderProgram );
    

    var arrayOfPoints = [];
    var arrayOfScales = [];
    
    
    // Enter array set up code here
    var point0 = vec4( 0.0, 0.0, 0.0, 1.0 );
    var point1 = vec4( 1.0, 0.0, 0.0, 1.0 );
    var point2 = vec4( 0.0, 1.0, 0.0, 1.0 );
    
    var scale0 = vec4( 0.3, 0.3, 0.0, 1.0 );
    var scale1 = vec4( 0.4, 0.4, 0.0, 1.0 );
    var scale2 = vec4( 0.5, 0.5, 0.0, 1.0 );
    
    arrayOfPoints.push( point0 );
    arrayOfPoints.push( point1 );
    arrayOfPoints.push( point2 );
    
    arrayOfScales.push( scale0 );
    arrayOfScales.push( scale1 );
    arrayOfScales.push( scale2 );
    
    
    
    // Create a buffer on the graphics card,
    // and send array to the buffer for use
    // in the shaders
    var bufferIdPoints = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferIdPoints );
    gl.bufferData( gl.ARRAY_BUFFER,
                  flatten(arrayOfPoints), gl.STATIC_DRAW );
    
                  
    var bufferIdScales = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferIdScales );
    gl.bufferData( gl.ARRAY_BUFFER,
                  flatten(arrayOfScales), gl.STATIC_DRAW );
    
    
    // Create a pointer that iterates over the
    // array of points in the shader code
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferIdPoints );
    var myPositionJS = gl.getAttribLocation( myShaderProgram, "myPosition" );
    gl.vertexAttribPointer( myPositionJS, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( myPositionJS );
    
    
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferIdScales );
    var myScaleAttJS = gl.getAttribLocation( myShaderProgram, "myScaleAtt" );
    gl.vertexAttribPointer( myScaleAttJS, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( myScaleAttJS );
    

    // Force a draw of the triangle using the
    // 'drawArrays()' call
    gl.drawArrays( gl.TRIANGLES, 0, 3);
    
}

