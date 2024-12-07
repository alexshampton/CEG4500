//Alexander Shampton
//10/19/2024

var gl;
var myShaderProgram;
var alpha;
var beta;
var gamma;
var tx;
var ty;
var sx;
var sy;

function init() {
    var canvas=document.getElementById("gl-canvas");
    gl=WebGLUtils.setupWebGL(canvas);
    
    if (!gl) { alert( "WebGL is not available" ); }
    
    gl.viewport( 0, 0, 512, 512 );
    
    gl.clearColor( 0.0, 0.0, 0.0, 1.0 );
    
    
    myShaderProgram =
        initShaders( gl,"vertex-shader", "fragment-shader" );
    gl.useProgram( myShaderProgram );
    gl.enable( gl.DEPTH_TEST );

    //Initializing transformation variables
    alpha = 0.0;
    gl.uniform1f( gl.getUniformLocation( myShaderProgram, "alpha"), alpha );

    beta = 0.0;
    gl.uniform1f( gl.getUniformLocation( myShaderProgram, "beta"), beta );

    gamma = 0.0;
    gl.uniform1f( gl.getUniformLocation( myShaderProgram, "gamma"), gamma );

    tx = 0.0;
    gl.uniform1f( gl.getUniformLocation( myShaderProgram, "tx"), tx );

    ty = 0.0;
    gl.uniform1f( gl.getUniformLocation( myShaderProgram, "ty"), ty );

    sx = 1.0;
    gl.uniform1f( gl.getUniformLocation( myShaderProgram, "sx"), sx );

    sy = 1.0;
    gl.uniform1f( gl.getUniformLocation( myShaderProgram, "sy"), sy );

    setUpPrism();
    render();

}

function setUpPrism() {
    
    //Vertices of Prism
    var vertices = [//Front
                    vec4( 0.0,  .2,  0.0,  1), // p0
                    vec4( -.2, -.2,  -.2,  1), // p1
                    vec4(  .2, -.2,  -.2,  1), // p2

                    //Right
                    vec4( 0.0,  .2,  0.0,  1), // p3
                    vec4(  .2, -.2,  -.2,  1), // p4
                    vec4(  .2,  -.2,  .2,  1), // p5

                    //Back
                    vec4( 0.0,  .2,  0.0,  1), // p6
                    vec4(  .2,  -.2,  .2,  1), // p7
                    vec4( -.2,  -.2,  .2,  1), //p8
                    
                    //Left
                    vec4( 0.0,  .2,  0.0,  1), // p9
                    vec4( -.2,  -.2,  .2,  1), //p10
                    vec4(  -.2, -.2,  -.2,  1), // p11

                    //Bottom
                    vec4( -.2, -.2,  -.2,  1), // p12
                    vec4(  .2, -.2,  -.2,  1), // p13
                    vec4(  .2,  -.2,  .2,  1), // p14
                    vec4( -.2,  -.2,  .2,  1) //p15

    ]; 

    //Colors at Vertices of Prism
    var vertexCoordinates = [
                    //Front
                    0.5, 1.0,
                    0.0, 0.0,
                    1.0, 0.0,

                    //Right
                    0.5, 1.0,
                    0.0, 0.0,
                    1.0, 0.0,

                    //Back
                    0.5, 1.0,
                    0.0, 0.0,
                    1.0, 0.0,

                    //Left
                    0.5, 1.0,
                    0.0, 0.0,
                    1.0, 0.0,

                    //Bottom
                    1.0, 1.0,
                    0.0, 1.0,
                    0.0, 0.0,
                    1.0, 0.0

                    // 1.0, 1.0,
                    // 0.5, 1.0

                    ]

    //Faces of prism
    var indexList = [//Front
                     0, 1, 2,
                     
                     //Right
                     3, 4, 5,

                     //Back
                     6, 7, 8,

                     //Left
                     9, 10, 11,

                    //Bottom
                     12, 13, 14,
                     12, 14, 15];

    var prismTexture = gl.createTexture(); 
    gl.bindTexture( gl.TEXTURE_2D, prismTexture );
    const newImage = new Image();
    var url = "https://live.staticflickr.com/65535/54189494144_bef4535887_w.jpg";
    newImage.crossOrigin = "anonymous";

    newImage.onload = function() {
        gl.bindTexture( gl.TEXTURE_2D, prismTexture );
        gl.pixelStorei( gl.UNPACK_FLIP_Y_WEBGL, true );
        gl.texImage2D( gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, newImage );
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);        
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        //gl.generateMipmap( gl.TEXTURE_2D ); // only use this if the image is a power of 2
        return prismTexture;
    };
    newImage.src = url;
    
    // Code here to handle putting above lists into buffers
    var vertexBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vertexBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );
    
    var myPosition = gl.getAttribLocation( myShaderProgram, "myPosition" );
    gl.vertexAttribPointer( myPosition, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( myPosition );
    
    // will populate to create buffer for indices
    var iBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, iBuffer );
    gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indexList), gl.STATIC_DRAW );

    var textureVertexbuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,textureVertexbuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertexCoordinates), gl.STATIC_DRAW);
    
    var textureCoordinate = gl.getAttribLocation(myShaderProgram,"textureCoordinate");
    gl.vertexAttribPointer( textureCoordinate, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( textureCoordinate ); 
}

//renders prism
function render() {
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );
    gl.uniform1i(gl.getUniformLocation(myShaderProgram, "texMap0"), 0);
    gl.drawElements( gl.TRIANGLES, 18, gl.UNSIGNED_SHORT, 0 );
    requestAnimationFrame( render ); 
}

//rotates prism around x axis
function rotateAroundX() {
    alpha += 0.1;
    gl.uniform1f( gl.getUniformLocation( myShaderProgram, "alpha"), alpha );
    render();
    
}

//rotates prism around y axis
function rotateAroundY() {
    beta += 0.1;
    gl.uniform1f( gl.getUniformLocation( myShaderProgram, "beta"), beta );
    render();
    
}

//rotates prism around z axis
function rotateAroundZ() {
    gamma += 0.1;
    gl.uniform1f( gl.getUniformLocation( myShaderProgram, "gamma"), gamma );
    render();
}

//translates the prism across the x axis
function translateX()
{
    tx += 0.1;
    gl.uniform1f( gl.getUniformLocation( myShaderProgram, "tx"), tx );
    render();
}

//translates the prism across the y axis
function translateY()
{
    ty += 0.1;
    gl.uniform1f( gl.getUniformLocation( myShaderProgram, "ty"), ty );
    render();   
}

//scales the prism across the x axis
function scaleX()
{
    sx += 0.1;
    gl.uniform1f( gl.getUniformLocation( myShaderProgram, "sx"), sx );
    render();
}

//scales the prism across the y axis
function scaleY()
{
    sy += 0.1;
    gl.uniform1f( gl.getUniformLocation( myShaderProgram, "sy"), sy );
    render();
}

//Moves prism up when spacebar is pressed
function moveShapeByKey(event)
{
    var keyAscii = event.keyCode;
    if (keyAscii==89) //y
    {
        rotateAroundY();
    }
    else if (keyAscii==90) //z
    {
        rotateAroundZ();
    }
    else if (keyAscii==88) //x
    {
        rotateAroundX();
    }
    else if (keyAscii==87) //w (y-Translation)
    {
        translateY();
    }
    else if (keyAscii==68) //d (x-Translation)
    {
        translateX();
    }
    else if (keyAscii==83) //s (y-Scaling)
    {
        scaleY();
    }
    else if (keyAscii==65) //a (x-Scaling)
    {
       scaleX();
    }
}
