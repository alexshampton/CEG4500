// Alexander Shampton

function init() {
    // Set up the canvas
    var canvas=document.getElementById("gl-canvas");
    gl=WebGLUtils.setupWebGL(canvas);

    if (!gl) { alert( "WebGL is not available" ); }
    
    // Set up the viewport
    gl.viewport( 0, 0, 512, 512 );   // x, y, width, height
    
    // Set up the background color
    gl.clearColor( 1.0, 0.0, 0.0, 1.0 );
    
    // Force the WebGL context to clear the color buffer
    gl.clear( gl.COLOR_BUFFER_BIT );

    drawCircle();
    drawSquare();
    drawTriangle();
}


function drawCircle() {
    var arrayOfPointsForCircle=[];
    
    var theta = 0.0;
    var i = 0;
    n = 51;
    h = 2.0 * Math.PI/n;

    a = 0.0;
    b = 0.5;
    c = 0.9
    d = 0.45

    for (i=0; i < n; i++)
    {
        theta = i*h;
        var x = c * Math.cos(theta) + a;
        var y = d * Math.sin(theta) + b;
        var point = vec2(x,y)
        arrayOfPointsForCircle.push(point)
    }
    
    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER,
                  flatten(arrayOfPointsForCircle), gl.STATIC_DRAW );
    
    var myShaderProgram =
        initShaders( gl,"vertex-shader", "fragment-shader" );
    gl.useProgram( myShaderProgram );
    
    var myPosition = gl.getAttribLocation( myShaderProgram, "myPosition" );
    gl.vertexAttribPointer( myPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( myPosition );
    
    // Enter draw arrays code here
    gl.drawArrays(gl.TRIANGLE_FAN, 0, n)
}

function drawSquare() {
    

    var arrayOfPoints = [];
    
    // Enter array set up code here
    var point0 = vec2( 0.0, 0.0 );
    var point1 = vec2( -1.0, 0.0 );
    var point2 = vec2( -1.0, -1.0 );
    var point3 = vec2( 0.0, -1.0 );
    
    arrayOfPoints.push( point0 );
    arrayOfPoints.push( point1 );
    arrayOfPoints.push( point2 );
    arrayOfPoints.push( point3 );
    
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
        initShaders( gl,"vertex-shader-square", "fragment-shader-square" );
    gl.useProgram( myShaderProgram );
    
    
    // Create a pointer that iterates over the
    // array of points in the shader code
    var myPositionJS = gl.getAttribLocation( myShaderProgram, "myPosition" );
    gl.vertexAttribPointer( myPositionJS, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( myPositionJS );
    
    
    // Force a draw of the square using the
    // 'drawArrays()' call
    gl.drawArrays( gl.TRIANGLE_FAN, 0, 4 );
    
}

function drawTriangle() {
    

    var arrayOfPoints = [];
    
    // Enter array set up code here
    var point0 = vec2( 0.0, 0.0 );
    var point1 = vec2( 1.0, 0.0 );
    var point2 = vec2( 0.0, -1.0 );
    
    arrayOfPoints.push( point0 );
    arrayOfPoints.push( point1 );
    arrayOfPoints.push( point2 );
    
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
        initShaders( gl,"vertex-shader-triangle", "fragment-shader-triangle" );
    gl.useProgram( myShaderProgram );
    
    
    // Create a pointer that iterates over the
    // array of points in the shader code
    var myPositionJS = gl.getAttribLocation( myShaderProgram, "myPosition" );
    gl.vertexAttribPointer( myPositionJS, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( myPositionJS );
    
    
    // Force a draw of the square using the
    // 'drawArrays()' call
    gl.drawArrays( gl.LINE_LOOP, 0, 3 );
    
}


