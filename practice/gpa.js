function getGrades(inputSelector) {
  const gradesInput = document.querySelector(inputSelector).value; // get grades from the input box
  const gradesArray = gradesInput.split(','); // split them into an array (String.split(','))
  const cleanGrades = gradesArray.map(grade => {
    return grade.trim() .toUpperCase();
  }); // clean up any extra spaces, and make the grades all uppercase. (Array.map())
  return cleanGrades; // return grades
}
const submitButton = document.querySelector("#submitButton");
submitButton.addEventListener("click", clickHandler);
function lookupGrade(grade) {
  // converts the letter grade to it's GPA point value and returns it
  let points = 0;
  if (grade === 'A') {
    points = 4;
  } else if (grade === 'B') {
    points = 3;
  } else if (grade === 'C') {
    points = 2;
  } else if (grade === 'D') {
    points = 1; 
  } else if (grade === "F") {
    points = 0;
  }
  return points
}
function calculateGpa(grades) {
  // gets a list of grades passed in
  const gpaPoints = grades.map(grade => lookupGrade(grade)); // convert the letter grades to gpa points
  const sumOfPoints = gpaPoints.reduce((total, currentPoint) => total + currentPoint, 0); // calculates the GPA
  let gpa = 0;
  if (gpaPoints.length > 0) {
    gpa = sumOfPoints / gpaPoints.length; 
  }
  return gpa.toFixed(2);; // return the GPA
}
function outputGpa(gpa, selector) {
  const outputElement = document.querySelector (selector);
  outputElement.textContent = `Your GPA is: ${gpa}`; // takes a gpa value and displays it in the HTML in the element identified by the selector
}
function clickHandler() {
    // when the button in our html is clicked:
    const grades = getGrades('#grades'); // get the grades entered into the input
    const gpa = calculateGpa(grades); // calculate the gpa from the grades entered
    outputGpa(gpa,'#output') // display the gpa
}