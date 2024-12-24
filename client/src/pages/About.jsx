import axios from './../Utils/axios';
import { useContext } from 'react';
import { globalContext } from '../components/ContextProvider';

function About() {
  const { user } = useContext(globalContext);
  console.log(`Bearer ${user.token}`);
  const onFetchProtected = () => {
    axios
      .get('protected-route', {
        headers: {
          authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err.response.data));
  };

  return (
    <div>
      <h1>About page</h1>
      <div>
        <button onClick={onFetchProtected}>fetch protected</button>
      </div>
    </div>
  );
}

export default About;
