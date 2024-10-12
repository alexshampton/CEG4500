# Lab 3: 3D Transformations

Preparatory Material: Code and lectures from class pertaining to Transformations in 3D (helps to review animations and interactions, and Transformations in 2D)

In this lab, you will write a WebGL application that demonstrates transformations in three dimensions. You must do the following to be eligible for full credit on this lab:

1) Create a polyhedron (i.e., a 3D shape or 3D model) that is NOT a cube or a cuboid. Examples of such shapes are: tetrahedron, parallelepiped, prism, even a sphere. The polyhedron faces must be filled with color (i.e., you cannot use POINTS, LINE_LOOP, LINE_STRIP, or LINE_SEGMENTS.)
2) You should implement either 2a) or 2b):
    * (a) Each vertex has a different color and each face has interpolated colors (as we saw in class).
    * (b) Each face has a different uniform color (you would make each face using drawArrays() similar to lab 1).
3) Have three keys that rotate the polyhedron around the three axes. Each key should rotate the polyhedron around one axis for as long as the key is pressed. You can either implement this as a series of key presses, or an animation for a single key press. The amount of rotation you apply and the choice of keys is up to you.
4) Have keys that apply translations along two axes of your choosing. Each keypress should translate the polyhedron along one axis for the duration of the key press. You can either implement this as a series of key presses, or an animation for a single key press. The amount of translation and the choice of keys is up to you.
5) Have two keys that apply scaling along two axes of your choosing. These two axes may or may not be the same as the axes along which translation occurs. Each key should scale the polyhedron along one axis for the duration the key is pressed. You can either implement this as a series of key presses, or an animation for a single key press. The amount of scaling you apply  and the choice of keys is up to you.
6) You should compose all transformations. This means that if I press the key to rotate around x and then the key to rotate around y, the y-axis rotation should happen in addition to the x axis rotation. The order in which you choose to compose your transformations is up to you. As long as you compose your transformations, there are a myriad ways in which you can do the compositions, and you should explore to determine which composition you deem is the best.
7) You should specify the order in which you are composing your transformations in your README file, and the amount of rotation, scaling, and translation you apply. You will lose points if the order in your README is different from the order evident in your implementation.
8) Your README should discuss how you approached the problem. Your README should also discuss what each key in your implementation does.


NOTE: YOU ARE NOT PERMITTED USE THE FUNCTIONS rotate(), translate(), AND/OR scale() IN THE FILE MV.js! You are required to implement all your operations as matrix-vector multiplications. If you do not do so, and if you use rotate(), translate(), and/or scale() from MV.js, you stand to lose all the points for rotations, translations, and/or scaling. You are free to implement matrix-vector multiplications either in the JavaScript file, or in the vertex shader.


## Deliverable:
Submit a single zip file with all your code and your README. Your zip file folder unzipped have the following structure:

FirstName_LastName

---README.ext

---Common
------webgl-utils.js

------initShaders.js

------MV.js

---lab3

------lab3.js

------lab3.html

Scoring rubric (out of 10 points):
1) 1 point for implementing a non-cuboid polyhedron.
2) 1.5 points for implementing either one of the following two:
    * (a) Each vertex has a different color and each face has interpolated colors. No two vertices should have the same color, else you will lose all 3 points.
    * (b) Each face has a different uniform color. No two faces should have the same color, else you will lose all 3 points.
3) 2 points for rotations (1.5 points for each rotation).
4) 1.5 points for scalings (1.5 points for each scaling).
5) 1.5 points for translations (1.5 points for each translation).
6) 1 point for composing your transformations.
7) 1 point for discussing the order of composition and the amount of transformation in the README.
8) .5 point for discussing your implementation and key choices in the README.