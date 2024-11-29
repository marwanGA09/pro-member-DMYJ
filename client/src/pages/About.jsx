import axios from 'axios';
import { useContext } from 'react';
import { myContext } from '../components/ContextProvider';

function About() {
  const { user } = useContext(myContext);
  console.log(`Bearer ${user.token}`);
  const onFetchProtected = () => {
    axios
      .get('http://localhost:4321/v1/protected-route', {
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
