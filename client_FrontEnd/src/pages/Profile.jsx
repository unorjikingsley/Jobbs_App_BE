import { FormRow, SubmitBtn } from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { redirect, useOutletContext } from 'react-router-dom';
import { Form } from 'react-router-dom';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';

export const action = (queryClient) => async({ request }) => {
  const formData = await request.formData();

  const file = formData.get('avatar');
  if(file && file.size > 500000) {
    toast.error('Image file size is larger than 1 mb');
    return null;
  }

  try {
    await customFetch.patch('/users/update-user', formData);

    queryClient.invalidateQueries(['user']);
    
    toast.success('Profile updated successfully');
    return redirect('/dashboard')
  } catch (error) {
    toast.error(error?.response?.data?.msg);
  }
  return null;
}

const Profile = () => {
  const { user } = useOutletContext();
  const { name, lastName, email, location } = user;

  return (
    <Wrapper>
      <Form method="post" className="form" encType="multipart/form-data">
        <h4 className="form-title">profile</h4>

        <div className="form-center">
          <div className="form-row">
            <label htmlFor="" className="form-label">
              Select an image file (max 0.5 MB):
            </label>
            <input
              type="file"
              id="avatar"
              name="avatar"
              className="form-input"
              accept="image/*"
            />
          </div>

          {/* file input */}
          <FormRow type="text" name="name" defaultValue={name} />
          <FormRow
            type="text"
            name="lastName"
            labelText="last name"
            defaultValue={lastName}
          />
          <FormRow type="text" name="email" defaultValue={email} />
          <FormRow type="text" name="location" defaultValue={location} />

          {/* <button
            className="btn btn-block form-btn"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'submitting...' : 'save changes'}
          </button> */}

          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  )
}

export default Profile;
