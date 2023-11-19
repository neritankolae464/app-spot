/**
 * Complex JavaScript Code Example
 * 
 * Description: This code generates a pyramid of numbers using advanced mathematical calculations and algorithms.
 * Filename: pyramidGenerator.js
 */

function generatePyramid(height) {
  // Create an empty array to store each row of the pyramid
  var pyramid = [];

  // Loop to generate each row
  for (var row = 1; row <= height; row++) {
    // Create an empty array for the current row
    var currentRow = [];

    // Calculate the number of spaces and numbers for each row
    var numSpaces = height - row;
    var numNumbers = (2 * row) - 1;

    // Add the necessary number of spaces at the beginning of the row
    for (var i = 0; i < numSpaces; i++) {
      currentRow.push(" ");
    }

    // Add the numbers in an ascending order
    for (var j = 1; j <= numNumbers; j++) {
      currentRow.push(j);
    }

    // Add the numbers in a descending order
    for (var k = numNumbers - 1; k >= 1; k--) {
      currentRow.push(k);
    }

    // Add the current row to the pyramid array
    pyramid.push(currentRow.join(""));
  }

  // Print the pyramid
  for (var p = 0; p < pyramid.length; p++) {
    console.log(pyramid[p]);
  }
}

// Test the pyramid generator
generatePyramid(10);