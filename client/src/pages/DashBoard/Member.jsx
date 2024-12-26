import { useParams } from 'react-router';

function Member() {
  const { memberId } = useParams();

  return (
    <div>
      <h2>MemberPage</h2>
      <h3>{memberId}</h3>
      {/* <p> {member.book_number}</p> */}
    </div>
  );
}

export default Member;
