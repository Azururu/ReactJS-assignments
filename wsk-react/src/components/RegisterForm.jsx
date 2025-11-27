import useForm from '../hooks/formHooks';
import {useUser} from '../hooks/apiHooks';

const RegisterForm = () => {
  const {postUser} = useUser();

  const initValues = {
    username: '',
    password: '',
    email: '',
  };

  const doRegister = async (formData) => {
    try {
      const info = await postUser(formData);
      console.log(info);
    } catch (error) {
      console.log('register error', error);
    }
  };

  const {inputs, handleInputChange, handleSubmit} = useForm(doRegister, initValues);
  console.log(inputs);
  return (
    <>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="registerusername">Username</label>
          <input
            name="username"
            type="text"
            id="registerusername"
            onChange={handleInputChange}
            autoComplete="username"
          />
        </div>
        <div>
          <label htmlFor="registerpassword">Password</label>
          <input
            name="password"
            type="password"
            id="registerpassword"
            onChange={handleInputChange}
            autoComplete="password"
          />
        </div>
        <div>
          <label htmlFor="registeremail">Email</label>
          <input
            name="email"
            type="email"
            id="registeremail"
            onChange={handleInputChange}
            autoComplete="email"
          />
        </div>
        <button type={"submit"}>Register</button>
      </form>
    </>
  )
};



export default RegisterForm;
