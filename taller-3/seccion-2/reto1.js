let marks = prompt(
  'Please enter your marks separated by commas to calculate your average'
).split(',');
let total = 0;

marks.forEach((el) => {
  total += parseFloat(el);
});

if (isNaN(total)) {
  alert('Numbers invalid, please restart the program');
} else {
  alert(`Your average is: ${total / marks.length}`);
}
