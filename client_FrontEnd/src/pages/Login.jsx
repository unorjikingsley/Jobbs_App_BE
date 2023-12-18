import { Link, Form, redirect, useNavigate } from 'react-router-dom';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import { FormRow, Logo, SubmitBtn } from '../components';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';

export const action = (queryClient) => async ({ request }) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)
  
  const errors = { msg: '' }
  if (data.password.length < 3) {
    errors.msg = 'Password must be more than 3 characters'
    return errors
  }

  try {
    await customFetch.post('/auth/login', data);

    queryClient.invalidateQueries();

    toast.success('Login successful')
    return redirect('/dashboard');
  } catch (error) {
    // toast.error(error?.response?.data?.msg)
    errors.msg = error?.response?.msg;
    return error
  }
}

const Login = () => {
  // const errors = useActionData();

  const navigate = useNavigate();

  const loginDemoUser = async () => {
    const data = {
      email: 'test@test.com',
      password: 'secret123',
    };

    try {
      await customFetch.post('/auth/login', data)
      toast.success('Test the application')
      navigate('/dashboard')
    } catch (error) {
      toast.error(error?.response?.data?.msg)
    }
  }

  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>Login</h4>
        {/* {errors?.msg && <p style={{ color: 'red' }}>{errors.msg}</p>} */}
        <FormRow
          type="email"
          name="email"
          labelText="Email"
          autoComplete="email"
        />
        <FormRow
          type="password"
          name="password"
          labelText="Password"
          autoComplete="current-password"
        />

        <SubmitBtn />

        <button type="button" className="btn btn-block" onClick={loginDemoUser}>
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
};

export default Login;
