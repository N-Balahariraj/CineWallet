
export function registerValidation( name, email, password ) {
  const nameRegex = /^(?:[a-zA-Z]{3,}|\b[a-zA-Z]+\.[a-zA-Z]+\b)$/
  const emailRegex = /^[\w.-]+@[\w.-]+\.\w{2,3}$/
  const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@!#$%&?])[A-Za-z\d@!#$%&?]{8,}$/

  if(!(nameRegex.test(name)))
    return [false,"Enter a valid name"]

  if(!(emailRegex.test(email)))
    return [false,"Enter a valid mail"]

  if(!(passRegex.test(password)))
    return [false,"Enter a valid password"]

  return [true,"Waiting for server ..."];
}

export function loginValidation(email, password ) {
  const emailRegex = /^[\w.-]+@[\w.-]+\.\w{2,3}$/

  if(!(emailRegex.test(email)))
    return [false,"Enter a valid mail"]

  if(!password)
    return [false,"Enter a valid password"]

  return [true, "Waiting for server ..."];
}