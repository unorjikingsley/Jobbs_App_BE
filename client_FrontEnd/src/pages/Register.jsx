import { Form, Link } from 'react-router-dom';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import { FormRow, Logo } from '../components';

export const action = async (data) => {
  console.log(data);
  return null;
}

const Register = () => {
  return (
    <Wrapper>
      <Form method='post' className="form">
        <Logo />
        <h4>Register</h4>
        <FormRow type='text' name='name' defaultValue='John' />
        <FormRow type='text' name='last name' labelText='last name' defaultValue='King' />
        <FormRow type='text' name='location' defaultValue='USA' />
        <FormRow type='email' name='email' defaultValue='johnking@gmail.com' />
        <FormRow type='password' name='password' defaultValue='secret123' />
        <button type='submit' className="btn btn-block">
          submit
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
export default Register