function drawCircle() {
    
    var canvas=document.getElementById("gl-canvas");
    var gl=WebGLUtils.setupWebGL(canvas);
    if (!gl) { alert( "WebGL is not available" ); }
    
    gl.viewport( 0, 0, 512, 512 );
    
    gl.clearColor( 1.0, 0.0, 0.0, 1.0 );
    
    gl.clear( gl.COLOR_BUFFER_BIT );
    
    var arrayOfPointsForCircle=[];
    
    // Enter array setup code here
    // Use the parametric form of the circle equation here:
	// x = r cos(theta) + a
	// y = r sin(theta) + b

    var theta = 0.0;
    var i = 0;
    n = 51;
    h = 2.0 * Math.PI / n;

    r = 0.3;
    a = 0.5;
    b = 0.4; 
	
    for ( i = 0; i < n; i++ ) {
	theta = i * h;
        var x = r * Math.cos( theta ) + a;
        var y = r * Math.sin( theta ) + b;

        var point = vec2( x,y );
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
    
    // Enter draw arrays code here
    gl.drawArrays( gl.TRIANGLE_FAN, 0, n );
    
}

