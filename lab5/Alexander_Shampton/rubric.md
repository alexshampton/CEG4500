# Lab 5: Texture Mapping

For this lab, you will use the files you used in Lab 3, and add texture to the 3D shape you created in Lab 3. Please copy over your Lab 3 files, i.e., lab3.js and lab3.html to a new folder, and rename them ‘lab5.js’ and ‘lab5.html’. Make sure to rename the linked JS file in your new lab5.html to ‘lab5.js’, else you will not see your new lab5.js correctly.

Apply a texture of your choosing, either one that you create within the JS file or one that you load in as an image from an Internet source. If using a local image, you will need to host it from a server.

This is a fairly open lab. You are free to choose whatever scheme you like for magnification and minification, you are free to use mipmapping if you want, and you are free to modulate your texture with a color value if you want. You are also free to use whatever texture coordinates you like. If you really wanted, you could even add lighting and shading along with texture to your shape (though this is not necessary for this lab).

Please do not change the controls you had in Lab 3. They should be carried through to this lab. You should be able to rotate your 3D shape using the rotation matrices around the x, y, and z axes, and show different parts of your 3D shape, all of which must be textured. Please describe the controls and the implementation in the README.txt file.

Please look at the last few slides of the Texture Mapping lecture to address the cross-origin resources issue.

Note that while you are using the same 3D shape, you will likely have to change the vertices and index list, as you may need to duplicate a vertex if it has two different texture coordinates.

Deliverable:
Submit a single zip file with all your code and your README. Your zip file folder unzipped have the following structure:

FirstName_LastName

---README.ext

---Common

------webgl-utils.js

------initShaders.js

------MV.js

---lab5

------lab5.js

------lab5.html

------<imagefile_if_applicable>


Scoring rubric (out of 10 points):
* 4 points for seeing texture on the 3D shape when the shape loads
* 5 points for seeing texture covering the entire 3D shape by rotating it using the controls in Lab 3.
* 1 point for describing the controls and implementation in the README.