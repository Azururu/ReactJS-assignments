import {useUserContext} from '../hooks/contextHooks';

const Logout = () => {
  const {handleLogout} = useUserContext();

  const doLogout = () => {
    try {
      handleLogout();
    } catch (e) {
      console.error(e.message);
    }
  }

  return(
    <>
      <div>
        <h1>Logout</h1>
        <button onClick={doLogout}>Logout</button>
      </div>
    </>
  )
}

export default Logout;
