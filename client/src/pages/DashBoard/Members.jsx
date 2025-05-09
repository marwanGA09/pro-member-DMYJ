import { useState, useEffect } from 'react';
import axios from './../../Utils/axios';
import styles from './Members.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import LoadingPage from '../../components/LoadingPage';
const Members = () => {
  const [loading, setLoading] = useState(true);

  const [members, setMembers] = useState([]);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('');
  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(1);
  // const [limit, setLimit] = useState(10);

  const navigate = useNavigate();

  const [isPaid, setIsPaid] = useState('');
  const currentTime = new Date();
  const [month, setMonth] = useState(currentTime.getMonth() + 1);
  const [year, setYear] = useState(currentTime.getFullYear());
  const limit = 10;
  const [totalPages, setTotalPages] = useState(1);
  const [advancedSearch, setAdvancedSearch] = useState(false);
  // Function to fetch data from the backend
  const fetchData = async () => {
    const params = {
      q: search,
      sort,
      page,
      limit,
      ...filters,
      pyear: year,
      pmonth: month,
      payments: isPaid,
    };

    console.log('params', params);

    try {
      setLoading(true);
      const response = await axios.get('members', {
        withCredentials: true,
        params,
      });
      const { data, totalMembers } = response.data;

      setMembers(data);
      setTotalPages(Math.ceil(totalMembers / limit));
    } catch (err) {
      // catch (error) {
      //   console.error('Error fetching data:', error);
      // }
      navigate('/error', {
        state: {
          message:
            err?.response?.data?.message ||
            err.message ||
            'Failed to fetch member data.',
        },
        replace: true, // optional: avoids back button returning to error
      });
    } finally {
      setLoading(false);
    }
  };

  // Trigger fetchData whenever search, sort, filters, page, or limit changes
  console.log('FILTER i want ', Object.keys(filters));
  useEffect(() => {
    fetchData();
  }, [search, sort, filters, page, limit, month, year, isPaid]);
  // Handle Year
  const handleYear = (event) => {
    setYear(event.target.value);
  };

  // Handle Month
  const handleMonth = (event) => {
    setMonth(event.target.value);
  };

  // Handle IsPaid
  const handleIsPaid = (event) => {
    setIsPaid(event.target.value);
  };

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

  const changeFilterDisplay = () => setAdvancedSearch((pre) => !pre);

  return (
    <div className={styles.container}>
      {/* Search Input */}
      <div className={styles['search-bar']}>
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={changeFilterDisplay}>
          {advancedSearch ? 'Close Advanced Search' : 'Advanced Search'}
        </button>
      </div>

      {advancedSearch && (
        <div className={styles['advanced-search']}>
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

          {/* Paid */}

          <select name="" id="" onChange={handleIsPaid}>
            <option value="">All</option>
            <option value="some">Paid</option>
            <option value="none">Not Paid</option>
          </select>

          {isPaid && (
            <>
              <select name="" id="" onChange={handleMonth}>
                <option selected={month === 1} value="1">
                  Jan{' '}
                </option>
                <option selected={month === 2} value="2">
                  Feb
                </option>
                <option selected={month === 3} value="3">
                  Mar
                </option>
                <option selected={month === 4} value="3">
                  Apr
                </option>
                <option selected={month === 5} value="5">
                  May
                </option>
                <option selected={month === 6} value="6">
                  Jun
                </option>
                <option selected={month === 7} value="7">
                  Jul
                </option>
                <option selected={month === 8} value="8">
                  Aug
                </option>
                <option selected={month === 9} value="9">
                  Sep
                </option>
                <option selected={month === 10} value="10">
                  Oct
                </option>
                <option selected={month === 11} value="11">
                  Nov
                </option>
                <option selected={month === 12} value="12">
                  Dec
                </option>
              </select>

              <select name="" id="" onChange={handleYear}>
                <option selected={year === 2022} value="2022">
                  2022
                </option>
                <option selected={year === 2023} value="2023">
                  2023
                </option>
                <option selected={year === 2024} value="2024">
                  2024
                </option>
                <option selected={year === 2025} value="2025">
                  2025
                </option>
                <option selected={year === 2026} value="2026">
                  2026
                </option>
              </select>
            </>
          )}

          {/* Filters */}

          <input
            type="text"
            placeholder="Book Number"
            onChange={(e) => handleFilterChange('book_number', e.target.value)}
          />
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
      )}

      {/* Members List */}
      <div className={styles['members-list']}>
        {' '}
        <div className={`${styles['member-row']} ${styles['header']}`}>
          <h3>Full Name</h3>
          <p>Book No</p>
          <p>Profession</p>
          <p>Pro Amount</p>
          <p>Phone</p>
        </div>
        {loading ? (
          <LoadingPage />
        ) : (
          members.map((member) => (
            <Link to={'./' + member.id} key={member.id}>
              <div
                className={`${styles['member-row']}  ${
                  member?.payments.length > 0 ? styles.paid : ''
                }`}
              >
                <h3>{member.full_name}</h3>
                <p> {member.book_number}</p>
                <p> {member?.profession || '---'}</p>
                <p>${member.membership_amount}</p>
                <p>{member.phone}</p>
              </div>
            </Link>
          ))
        )}
        {/* {} */}
      </div>

      {/* Pagination */}
      <div className={styles.pagination}>
        <Pagination
          classes={'MuiPagination-root MuiPaginationItem-root Mui-selected'}
          count={totalPages}
          page={page}
          onChange={(event, value) => handlePageChange(value)}
          color="primary"
          shape="rounded"
          sx={{
            '& .MuiPaginationItem-root': {
              color: '#4caf50',
              '&:hover': {
                backgroundColor: '#678568',
                color: '#64e768',
              },
            },
            '& .Mui-selected': {
              backgroundColor: '#4caf50',
              color: '#fff',
              fontWeight: 'bold',
            },
          }}
        />
      </div>
    </div>
  );
};

export default Members;
