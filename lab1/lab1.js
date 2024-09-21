// Alexander Shampton

function init() 
{
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

    // Function calls
    drawCircle();
    drawSquare();
    drawTriangle();
}

// draws ellipse
function drawCircle() 
{
    var arrayOfPointsForCircle=[];
    
    // Variables used for ellipse
    var theta = 0.0;
    var i = 0;
    n = 51;
    h = 2.0 * Math.PI/n;
    a = 0.0;
    b = 0.5;
    c = 0.9
    d = 0.45

    // Loops through n times to create and push points on array
    for (i=0; i < n; i++)
    {
        theta = i*h;
        var x = c * Math.cos(theta) + a;
        var y = d * Math.sin(theta) + b;
        var point = vec2(x,y)
        arrayOfPointsForCircle.push(point)
    }
    
    // Creates buffer and buffers the points in the array
    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER,
                  flatten(arrayOfPointsForCircle), gl.STATIC_DRAW );
    
    // Creates shader from info in html page and uses it
    var myShaderProgram =
        initShaders( gl,"vertex-shader", "fragment-shader" );
    gl.useProgram( myShaderProgram );
    
    // Create a pointer that iterates over the
    // array of points in the shader code
    var myPosition = gl.getAttribLocation( myShaderProgram, "myPosition" );
    gl.vertexAttribPointer( myPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( myPosition );
    
    // Draw circle (ellipse) using TRIANGLE_FAN
    gl.drawArrays(gl.TRIANGLE_FAN, 0, n)
}

function drawSquare() 
{
    var arrayOfPoints = [];
    
    // points that will be used for arrayOfPoints
    var point0 = vec2( 0.0, 0.0 );
    var point1 = vec2( -1.0, 0.0 );
    var point2 = vec2( -1.0, -1.0 );
    var point3 = vec2( 0.0, -1.0 );
    
    // pushes points onto array
    arrayOfPoints.push( point0 );
    arrayOfPoints.push( point1 );
    arrayOfPoints.push( point2 );
    arrayOfPoints.push( point3 );
    
    // Creates buffer and buffers the points in the array
    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER,
                  flatten(arrayOfPoints), gl.STATIC_DRAW );
    
    // Creates shader from info in html page and uses it
    var myShaderProgram =
        initShaders( gl,"vertex-shader-square", "fragment-shader-square" );
    gl.useProgram( myShaderProgram );
    
    // Create a pointer that iterates over the
    // array of points in the shader code
    var myPositionJS = gl.getAttribLocation( myShaderProgram, "myPosition" );
    gl.vertexAttribPointer( myPositionJS, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( myPositionJS );
    
    // Draws Square using TRIANGLE_FAN
    gl.drawArrays( gl.TRIANGLE_FAN, 0, 4 );
}

function drawTriangle() 
{
    var arrayOfPoints = [];
    
    // points that will be used for arrayOfPoints
    var point0 = vec2( 0.0, 0.0 );
    var point1 = vec2( 1.0, 0.0 );
    var point2 = vec2( 0.0, -1.0 );
    
    // pushes points onto array
    arrayOfPoints.push( point0 );
    arrayOfPoints.push( point1 );
    arrayOfPoints.push( point2 );
    
    // Creates buffer and buffers the points in the array
    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER,
                  flatten(arrayOfPoints), gl.STATIC_DRAW );
    
    
    // Creates shader from info in html page and uses it
    var myShaderProgram =
        initShaders( gl,"vertex-shader-triangle", "fragment-shader-triangle" );
    gl.useProgram( myShaderProgram );
    
    
    // Create a pointer that iterates over the
    // array of points in the shader code
    var myPositionJS = gl.getAttribLocation( myShaderProgram, "myPosition" );
    gl.vertexAttribPointer( myPositionJS, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( myPositionJS );
    
    
    // Draws Triangle using LINE_LOOP
    gl.drawArrays( gl.LINE_LOOP, 0, 3 );
    
}


