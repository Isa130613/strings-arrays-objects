let users = {};
while (true) {
  let answer = Boolean(prompt('Type something if you want to exit'));
  if (answer) {
    break;
  }
  let nameArr = prompt(
    'Please enter your first and last name separated by spaces:'
  )
    .toLowerCase()
    .split(' ');

  if (nameArr.length != 2) {
    alert('Please enter valid data');
    throw new Error('Data invalid');
  }
  let username = nameArr[0].slice(0, 3) + nameArr[1].slice(0, 3);
  if (Object.keys(users).includes(username)) {
    alert('Username already exists, please try again');
    continue;
  }
  let email = username + '@myDomain.com';
  alert(`Your username and email are: ${username}, ${email}`);
  users[username] = email;
}
