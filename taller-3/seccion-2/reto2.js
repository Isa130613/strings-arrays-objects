//57,14,82,35,91

let marks = prompt("Type the students' marks separated only by commas").split(
  ','
);

marks = marks.map((el) => parseFloat(el));

marks.sort((a, b) => {
  return a - b;
});

let minimum = marks[0];
let maximum = marks.pop();
let average = 0;
let passed = 0;
let failed = 0;

marks.forEach((el) => {
  average += el;
  if (el >= 70) {
    passed += 1;
  } else {
    failed += 1;
  }
});

if (isNaN(average)) {
  alert('Numbers invalid, please restart the program');
} else {
  alert(
    `Students' results are: average is ${
      average / marks.length
    }, maximum mark is ${maximum}, minimum mark is ${minimum}, ${passed} passed, ${failed} failed and the sorted marks are ${marks}.`
  );
}
