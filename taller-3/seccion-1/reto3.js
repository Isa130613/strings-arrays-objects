let email = prompt('Enter your email:');
if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
  alert('Valid email');
} else {
  alert('Invalid email');
}
