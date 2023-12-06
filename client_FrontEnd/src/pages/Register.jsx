import { Form, redirect, useNavigation, Link } from 'react-router-dom';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import { FormRow, Logo } from '../components';
import customFetch from '../utils/customFetch';
import {toast} from 'react-toastify';

export const action = async ({ request }) => {
  const formData = await request.formData();
  // console.log(formData);
  const data = Object.fromEntries(formData);
  // console.log(data);

  try {
    await customFetch.post('/auth/register', data)
    toast.success('Registration Successful')
    return redirect('/login');
  } catch (error) {
    toast.error(error?.response?.data?.msg)
    return error;
  }
}

const Register = () => {
  const navigation = useNavigation();
  console.log(navigation);
  const isSubmitting = navigation.state === 'submitting'

  return (
    <Wrapper>
      <Form method='post' className="form">
        <Logo />
        <h4>Register</h4>
        <FormRow type='text' name='name' defaultValue='John' />
        <FormRow type='text' name='lastName' labelText='last name' defaultValue='King' />
        <FormRow type='text' name='location' defaultValue='USA' />
        <FormRow type='email' name='email' defaultValue='johnking@gmail.com' />
        <FormRow type='password' name='password' defaultValue='secret123' />

        <button type='submit' className="btn btn-block" disabled={isSubmitting}>
          {isSubmitting ? 'submitting...' : 'submit'}
        </button>
        <p>
          Already a member?
          <Link to='/login' className='member-btn'>
            Login
          </Link>
        </p>
      </Form>
    </Wrapper>
  )
}

export default Register;
