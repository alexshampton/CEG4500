## Overview
I created a prism with 5 verticies where each vertex having a different color and each face has interpolated colors filled in. I have 7 keys that either rotate, translate, or scale the prism when the key is pressed (keys are listed below). For the x axis and y axis: the rotation matrix, translation matrix, and scaling matrix are multiplied in this order. The matricies are multiplied in this order: Mx * My * Mx * vi. All transformations are increased by 0.1 and all start at 0.0, besides scaling which starts at 1.0.

## Keys for transformations
    * Press x to rotate around x-axis
    * Press y to rotate around y-axis
    * Press z to rotate around z-axis
    * Press w to translate on the y-axis
    * Press d to translate on the x-axis
    * Press a to scale on the x-axis
    * Press s to scale on the y-axis


