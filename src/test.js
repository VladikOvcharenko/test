import React, { useMemo } from 'react'
import { useFormik } from 'formik'

const calculateStrength = (password) => {
  let strength = 'easy'
  const hasLetters = /[a-zA-Z]/.test(password)
  const hasDigits = /\d/.test(password)
  const hasSymbols = /\W/.test(password)

  if (hasLetters && hasDigits && hasSymbols) strength = 'strong'
  else if (
    (hasLetters && hasDigits) ||
    (hasLetters && hasSymbols) ||
    (hasDigits && hasSymbols)
  )
    strength = 'medium'

  return strength
}

const passwordStrengthColor = (password) => {
  const length = password.length
  if (length === 0) return ['gray', 'gray', 'gray']
  if (length < 8) return ['red', 'red', 'red']
  switch (calculateStrength(password)) {
    case 'easy':
      return ['red', 'gray', 'gray']
    case 'medium':
      return ['yellow', 'yellow', 'gray']
    case 'strong':
      return ['green', 'green', 'green']
    default:
      return ['gray', 'gray', 'gray']
  }
}

const TestPasswordStrength = () => {
  const formik = useFormik({
    initialValues: {
      password: '',
    },
  })

  const colorArray = useMemo(
    () => passwordStrengthColor(formik.values.password),
    [formik.values.password]
  )

  return (
    <form className="form">
      <label htmlFor="password">Enter Password</label>
      <input
        id="password"
        name="password"
        type="password"
        onChange={formik.handleChange}
        value={formik.values.password}
        onBlur={formik.handleBlur}
      />

      <div className="password-strength">
        {colorArray.map((color, index) => (
          <div
            key={index}
            className="indicator"
            style={{
              backgroundColor: color,
            }}
          ></div>
        ))}
      </div>
    </form>
  )
}

export default TestPasswordStrength
