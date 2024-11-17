# Lab 4: Viewing and Lighting an Unknown Object

In this lab, you are given vertices and faces for an object. You need to use the look at method to view the object from an alternate viewpoint, and add lighting to the object. 

Code practice material:
All material on Viewing, Lighting, and Lighting Continued.


To work with this lab, make sure you download the following files into a single directory: lab4.html, lab4.js, and object.js. Include the Common folder one level above. Load the file ‘lab4.html’ in your browser. You should see a light gray canvas. Here’s why: there is a big light gray object sitting right on top of the camera. The code in lab4.html and lab4.js does draw the object, but because it sits on top of the camera, you cannot see the object itself (imagine a big cave enclosing you, then you would  not really see the outside of the cave. At the moment, the object is kind of like that cave).

You need to fulfill the following requirements for this lab:-

1) Set up the camera position using the look at method. You must position your camera so that you can reveal the identity of your object. Note: you are NOT permitted to use the lookAt() function provided by the authors in MV.js for this lab.

2) Implement two buttons, one that creates a camera with orthographic projection called ‘Orthographic’, and one that creates a camera with perspective projection called ‘Perspective’. You must use set up projection matrices for each type of projection. For the projective transformation, you are free to choose either an asymmetric or a symmetric frustum. For the symmetric frustum, you are free to specify right, top, near, and far planes, or near plane, far plane, aspect ratio, and field of view in y. Note: you are NOT permitted to use the functions ortho(), frustum(), and perspective() provided by the authors in MV.js for this lab.

3) Implement two buttons that each switch on and switch off two different lights. Each light must have ambient, diffuse, and specular components. You can choose between point light source, spotlight, and directional light source. One button should switch on or off one kind of light source, and the other should switch on a different kind of light source. Example: LightButton1 can switch on and switch off a point light source. LightButton2 can switch on and switch off a spotlight source. If you use a spotlight and a point light source, they should each be at different locations from each other. Using LightButton1 and LightButton2, I should be able to switch on both lights, or just one of the lights, or switch off all lights.

For this lab, you are not permitted to use ambient light source on its own (if you want, you can use it in conjunction with another light source). 

4) Implement one button that toggles the specular reflection output, called ‘Specular’. When switched on (i.e., when you press the button an odd number of times), the object should have ambient, diffuse, and specular reflection. When switched off (i.e., when you press the button an even number of times), the object should have just ambient and diffuse reflection. When showing specular reflection, your chosen viewpoint should reveal specular highlights on the object.

The object must have interpolated shading, and not flat shading. You can choose whether you interpolate colors or normals, i.e., whether you implement Gouraud shading or whether you implement Phong shading.

5) Your README should discuss your implementation method. Your README should also name the object (i.e., you should provide its identity). 

The lab is fairly challenging so get started soon! At the moment, the object is not set up for you to see its identity that easily. In particular, it will be hard for you to set up your camera before you set up your lights and object materials: without light, it is nearly impossible to tell what is the front of the object and what is the back of the object. 

As a hint: when setting up your camera with the look at method, it is easier to have your ‘at’ point as the center of the object, which is currently at the origin (you will not really be observing the center point, but it is a good anchor point to set up your camera coordinate system). Once you have your lights, you will need to try out a variety of eye points to assist you with revealing your object.

## Deliverable:

Submit a single zip file with all your code and your README. Your zip file folder unzipped have the following structure:

FirstName_LastName

---README.ext

---Common

------webgl-utils.js

------initShaders.js

------MV.js

---lab4

------lab4.js

------lab4.html

------object.js


## Scoring Rubric (out of 10 points)
* 2 points for setting up the camera using the look at method to reveal the identity of the object.
### These points include identifying the object in the README:
* 2 points for implementing orthographic and perspective projections.
* 2 points for implementing two different lights.
* 2 points for implementing specular and non-specular toggle.
* 1 point for discussing your implementation in the README.