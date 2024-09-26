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
    var arrayOfColors = [];
    
    
    // Enter array set up code here
    var point0 = vec4( 0.0, 0.0, 0.0, 1.0 );
    var point1 = vec4( 1.0, 0.0, 0.0, 1.0 );
    var point2 = vec4( 0.0, 1.0, 0.0, 1.0 );
    
    var color0 = vec4( 0.0, 0.0, 0.0, 1.0 );
    var color1 = vec4( 1.0, 0.0, 0.0, 1.0 );
    var color2 = vec4( 0.0, 1.0, 0.0, 1.0 );
    
    arrayOfPoints.push( point0 );
    arrayOfPoints.push( point1 );
    arrayOfPoints.push( point2 );
    
    arrayOfColors.push( color0 );
    arrayOfColors.push( color1 );
    arrayOfColors.push( color2 );
    
    
    
    // Create a buffer on the graphics card,
    // and send array to the buffer for use
    // in the shaders
    var bufferIdPoints = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferIdPoints );
    gl.bufferData( gl.ARRAY_BUFFER,
                  flatten(arrayOfPoints), gl.STATIC_DRAW );
    
                  
    var bufferIdColors = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferIdColors );
    gl.bufferData( gl.ARRAY_BUFFER,
                  flatten(arrayOfColors), gl.STATIC_DRAW );
    
    
    // Create a pointer that iterates over the
    // array of points in the shader code
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferIdPoints );
    var myPositionJS = gl.getAttribLocation( myShaderProgram, "myPosition" );
    gl.vertexAttribPointer( myPositionJS, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( myPositionJS );
    
    
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferIdColors );
    var myColorAttJS = gl.getAttribLocation( myShaderProgram, "myColorAtt" );
    gl.vertexAttribPointer( myColorAttJS, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( myColorAttJS );
    

    // Force a draw of the triangle using the
    // 'drawArrays()' call
    gl.drawArrays( gl.TRIANGLES, 0, 3);
    
}

