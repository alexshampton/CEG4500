function drawCircle() {
    
    var canvas=document.getElementById("gl-canvas");
    var gl=WebGLUtils.setupWebGL(canvas);
    if (!gl) { alert( "WebGL is not available" ); }
    
    gl.viewport( 0, 0, 512, 512 );
    
    gl.clearColor( 1.0, 0.0, 0.0, 1.0 );
    
    gl.clear( gl.COLOR_BUFFER_BIT );
    
    var arrayOfPointsForCircle=[];
    
    // Enter array set up code here
    // Use the implicit form
    
    var xstart = -1.0;
    var xend = 1.0;
    var n = 9;
    var stepsize = (xend - xstart) / (n-1);
    
    var i = 0;
    
    for ( i = 0; i < n; i++ ) {
        var x = xstart + i * stepsize;
        var y = Math.sqrt( 1 - x * x );
        var point = vec2( x, y );
        arrayOfPointsForCircle.push( point );
    }
    
    for ( i = 0; i < n; i++ ) {
        var x = xstart + i * stepsize;
        var y = -Math.sqrt( 1 - x * x );
        var point = vec2( x, y );
        arrayOfPointsForCircle.push( point );
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
    
    // Enter drawArrays code here
    gl.drawArrays( gl.TRIANGLE_FAN, 0, 2 * n );
}

