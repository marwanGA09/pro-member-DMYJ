import { useState, useEffect } from 'react';

const MembersList = () => {
  const [members, setMembers] = useState([]);
  const [viewMode, setViewMode] = useState('rows'); // 'rows' or 'cards'
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch members from the API
    const fetchMembers = async () => {
      try {
        const response = await fetch('http://localhost:4321/v1/members'); // Replace with your actual URL
        const result = await response.json();
        if (result.status === 'success') {
          setMembers(result.data);
        }
      } catch (error) {
        console.error('Error fetching members:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => setViewMode('rows')}>View as Rows</button>
        <button onClick={() => setViewMode('cards')}>View as Cards</button>
      </div>

      {viewMode === 'rows' ? (
        <table border="1" style={{ width: '100%', textAlign: 'left' }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Full Name</th>
              <th>Sex</th>
              <th>Book Number</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Membership Amount</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <tr key={member.id}>
                <td>{member.id}</td>
                <td>{member.full_name}</td>
                <td>{member.sex}</td>
                <td>{member.book_number}</td>
                <td>{member.address}</td>
                <td>{member.phone}</td>
                <td>{member.email || 'N/A'}</td>
                <td>{member.membership_amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          {members.map((member) => (
            <div
              key={member.id}
              style={{
                border: '1px solid #ddd',
                borderRadius: '10px',
                padding: '20px',
                width: '300px',
              }}
            >
              {member.profile_image && (
                <img
                  src={member.profile_image}
                  alt={member.full_name}
                  style={{
                    width: '100%',
                    height: '150px',
                    objectFit: 'cover',
                    borderRadius: '10px 10px 0 0',
                  }}
                />
              )}
              <h3>{member.full_name}</h3>
              <p>
                <strong>Sex:</strong> {member.sex}
              </p>
              <p>
                <strong>Book Number:</strong> {member.book_number}
              </p>
              <p>
                <strong>Address:</strong> {member.address}
              </p>
              <p>
                <strong>Phone:</strong> {member.phone}
              </p>
              <p>
                <strong>Email:</strong> {member.email || 'N/A'}
              </p>
              <p>
                <strong>Membership Amount:</strong> {member.membership_amount}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MembersList;
