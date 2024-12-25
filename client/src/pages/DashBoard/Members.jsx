// import { useState, useEffect } from 'react';
// import axios from './../../Utils/axios';

// const MembersList = () => {
//   const [members, setMembers] = useState([]);
//   const [viewMode, setViewMode] = useState('rows'); // 'rows' or 'cards'
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Fetch members from the API
//     const fetchMembers = async () => {
//       try {
//         const response = await axios.get('members'); // Replace with your actual URL
//         if (response.data.status === 'success') {
//           setMembers(response.data.data); // Update with your API's response structure
//         }
//       } catch (error) {
//         console.error('Error fetching members:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMembers();
//   }, []);

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <div>
//       <div style={{ marginBottom: '20px' }}>
//         <button onClick={() => setViewMode('rows')}>View as Rows</button>
//         <button onClick={() => setViewMode('cards')}>View as Cards</button>
//       </div>

//       {viewMode === 'rows' ? (
//         <table border="1" style={{ width: '100%', textAlign: 'left' }}>
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Full Name</th>
//               <th>Sex</th>
//               <th>Book Number</th>
//               <th>Address</th>
//               <th>Phone</th>
//               <th>Email</th>
//               <th>Membership Amount</th>
//             </tr>
//           </thead>
//           <tbody>
//             {members.map((member) => (
//               <tr key={member.id}>
//                 <td>{member.id}</td>
//                 <td>{member.full_name}</td>
//                 <td>{member.sex}</td>
//                 <td>{member.book_number}</td>
//                 <td>{member.address}</td>
//                 <td>{member.phone}</td>
//                 <td>{member.email || 'N/A'}</td>
//                 <td>{member.membership_amount}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
//           {members.map((member) => (
//             <div
//               key={member.id}
//               style={{
//                 border: '1px solid #ddd',
//                 borderRadius: '10px',
//                 padding: '20px',
//                 width: '300px',
//               }}
//             >
//               {member.profile_image && (
//                 <img
//                   src={member.profile_image}
//                   alt={member.full_name}
//                   style={{
//                     width: '100%',
//                     height: '150px',
//                     objectFit: 'cover',
//                     borderRadius: '10px 10px 0 0',
//                   }}
//                 />
//               )}
//               <h3>{member.full_name}</h3>
//               <p>
//                 <strong>Sex:</strong> {member.sex}
//               </p>
//               <p>
//                 <strong>Book Number:</strong> {member.book_number}
//               </p>
//               <p>
//                 <strong>Address:</strong> {member.address}
//               </p>
//               <p>
//                 <strong>Phone:</strong> {member.phone}
//               </p>
//               <p>
//                 <strong>Email:</strong> {member.email || 'N/A'}
//               </p>
//               <p>
//                 <strong>Membership Amount:</strong> {member.membership_amount}
//               </p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default MembersList;

import { useState, useEffect } from 'react';
import axios from './../../Utils/axios';

const MembersList = () => {
  const [members, setMembers] = useState([]);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('');
  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(1);
  // const [limit, setLimit] = useState(10);
  const limit = 10;
  const [totalPages, setTotalPages] = useState(1);

  // Function to fetch data from the backend
  const fetchData = async () => {
    const params = {
      q: search,
      sort,
      page,
      limit,
      ...filters,
    };

    try {
      const response = await axios.get('members', { params });
      const { data, totalMembers } = response.data;

      setMembers(data);
      setTotalPages(Math.ceil(totalMembers / limit));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Trigger fetchData whenever search, sort, filters, page, or limit changes
  useEffect(() => {
    fetchData();
  }, [search, sort, filters, page, limit]);

  // Handle pagination
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  // Handle filtering updates
  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  // Handle sorting
  const handleSortChange = (event) => {
    setSort(event.target.value);
  };

  return (
    <div>
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Sort Dropdown */}
      <select onChange={handleSortChange}>
        <option value="">Sort by</option>
        <option value="full_name">Name (A-Z)</option>
        <option value="-full_name">Name (Z-A)</option>
        <option value="membership_amount">
          Membership Amount (Low to High)
        </option>
        <option value="-membership_amount">
          Membership Amount (High to Low)
        </option>
      </select>

      {/* Filters */}
      <div>
        <input
          type="text"
          placeholder="Address"
          onChange={(e) => handleFilterChange('address', e.target.value)}
        />
        <input
          type="text"
          placeholder="Profession"
          onChange={(e) => handleFilterChange('profession', e.target.value)}
        />
        <input
          type="number"
          placeholder="Membership Amount"
          onChange={(e) =>
            handleFilterChange('membership_amount', e.target.value)
          }
        />
      </div>

      {/* Members List */}
      <div>
        {members.map((member) => (
          <div
            key={member.id}
            style={{
              border: '1px solid #ddd',
              padding: '10px',
              margin: '10px',
            }}
          >
            <h3>{member.full_name}</h3>
            <p>Address: {member.address}</p>
            <p>Profession: {member.profession}</p>
            <p>Membership Amount: ${member.membership_amount}</p>
            <p>Phone: {member.phone}</p>
            {member.payments.length > 0 ? <p>r</p> : <p>x</p>}
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            disabled={page === index + 1}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MembersList;
