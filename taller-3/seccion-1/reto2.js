let password = prompt('Please enter your password');
if (
  8 < password.length < 20 &&
  /[A-Z]/.test(password) &&
  /[a-z]/.test(
    password &&
      /\d/.test(
        password && /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
      )
  )
) {
  alert('Safe password');
} else {
  alert('Unsafe password');
}
