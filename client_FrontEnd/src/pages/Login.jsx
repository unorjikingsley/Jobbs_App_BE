import { Link, Form, redirect, useNavigation } from 'react-router-dom';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import { FormRow, Logo } from '../components';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';

export const action = async ({ request }) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)
  try {
    await customFetch.post('/auth/login', data)
    toast.success('Login successful')
    return redirect('/dashboard')
  } catch (error) {
    toast.error(error?.response?.data?.msg)
    return error
  }
}

const Login = () => {
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting';

  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>Login</h4>
        <FormRow
          type="email"
          name="email"
          labelText="Email"
          defaultValue="johnking@gmail.com"
        />
        <FormRow
          type="password"
          name="password"
          labelText="Password"
          defaultValue="secret123"
        />

        <button type="submit" className="btn btn-block" disabled={isSubmitting}>
          {isSubmitting ? 'submitting...' : 'submit'}
        </button>
        <button type="button" className="btn btn-block">
          explore the app
        </button>
      </Form>

      <p>
        Not a member yet?
        <Link to="/register" className="member-btn">
          Register
        </Link>
      </p>
    </Wrapper>
  )
}

export default Login
