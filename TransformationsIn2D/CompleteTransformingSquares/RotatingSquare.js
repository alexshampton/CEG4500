var gl;
var shaderProgramSquare;
var thetaJS;
//var thetaUniform;
var MJS;
var MUniform;
var keepRunning;


function init() {
    // Set up the canvas
    var canvas=document.getElementById("gl-canvas");
    gl=WebGLUtils.setupWebGL(canvas);
    if (!gl) { alert( "WebGL is not available" ); }
    
    // Set up the viewport
    gl.viewport( 0, 0, 512, 512 );   // x, y, width, height
    
    
    // Set up the background color
    gl.clearColor( 1.0, 0.0, 0.0, 1.0 );
    
    
    shaderProgramSquare = initShaders( gl, "vertex-shader-square",
                                      "fragment-shader-square" );
    gl.useProgram( shaderProgramSquare );
    
    // Force the WebGL context to clear the color buffer
    gl.clear( gl.COLOR_BUFFER_BIT );

    thetaJS = 0.0;

    keepRunning = 1.0;

    //thetaUniform = gl.getUniformLocation( shaderProgramSquare, "theta" );
    //gl.uniform1f( thetaUniform, thetaJS );

    MJS = [1.0,
        0.0,
        0.0,
        1.0];
    MUniform = gl.getUniformLocation( shaderProgramSquare, "M" );
    gl.uniformMatrix2fv( MUniform, false, MJS );
    
    setupSquare();
    
    requestAnimationFrame( render );
}

function setupSquare() {
    
    // Enter array set up code here
    var p0 = vec2( .2, .2 );
    var p1 = vec2( -.2, .2 );
    var p2 = vec2( -.2, -.2 );
    var p3 = vec2( .2, -.2 );
    var arrayOfPoints = [p0, p1, p2, p3];
    
    // Create a buffer on the graphics card,
    // and send array to the buffer for use
    // in the shaders
    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(arrayOfPoints), gl.STATIC_DRAW );
    
    // Create a pointer that iterates over the
    // array of points in the shader code
    var myPositionAttribute = gl.getAttribLocation( shaderProgramSquare, "myPosition" );
    gl.vertexAttribPointer( myPositionAttribute, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( myPositionAttribute );    
}


function stopStartAnim() {
    if ( keepRunning > 0.5 ) {
        keepRunning = 0.0;
    } else {
        keepRunning = 1.0;
    }
}

function render() {
        
    thetaJS = thetaJS + (.005 * keepRunning);

    MJS = [Math.cos( thetaJS ),
        -Math.sin( thetaJS ),
        Math.sin( thetaJS ),
        Math.cos( thetaJS )];
    gl.uniformMatrix2fv( MUniform, false, MJS );
    

    //gl.uniform1f( thetaUniform, thetaJS );
    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.drawArrays( gl.TRIANGLE_FAN, 0, 4 );

    requestAnimationFrame( render );
    
}
