import { useState, useEffect } from 'react';
import axios from './../../Utils/axios';
import styles from './Payments.module.scss';
import { Link } from 'react-router';
import { Pagination } from '@mui/material';
const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(4);
  const limit = 10;
  const [totalPages, setTotalPages] = useState(1);
  const [advancedSearch, setAdvancedSearch] = useState(false);

  // Function to fetch data from the backend
  const fetchData = async () => {
    const params = {
      q: search,
      page,
      limit,
      // sort: 'createdAt',
      ...filters,
    };

    try {
      const response = await axios.get('payments', { params });
      const { data, totalPayments } = response.data;

      setPayments(data);
      setTotalPages(Math.ceil(totalPayments / limit));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Trigger fetchData whenever search, filters, page, or limit changes
  useEffect(() => {
    fetchData();
  }, [search, filters, page, limit]);

  // Handle pagination
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  // Handle filtering updates
  const handleFilterChange = (field, value) => {
    if (value !== '') {
      setFilters((prev) => ({ ...prev, [field]: value }));
    }
  };

  // Handle search
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const changeFilterDisplay = () => setAdvancedSearch((pre) => !pre);

  return (
    <div className={styles.container}>
      {/* Search Input */}
      <div className={styles['search-bar']}>
        {/* <input
          type="text"
          placeholder="Search by month..."
          value={search}
          onChange={handleSearchChange}
        /> */}

        <input
          type="number"
          placeholder="Year"
          onChange={(e) => handleFilterChange('year', e.target.value)}
          min={2020}
          max={2026}
        />
        <input
          type="number"
          placeholder="Month"
          onChange={(e) => handleFilterChange('month', e.target.value)}
          min={1}
          max={12}
        />

        {/* <button onClick={changeFilterDisplay}>
          {advancedSearch ? 'Close Advanced Search' : 'Advanced Search'}
        </button> */}
      </div>

      {/* {advancedSearch && (
        <div className={styles['advanced-search']}>
          <input
            type="text"
            placeholder="Book Number"
            onChange={(e) => handleFilterChange('book_number', e.target.value)}
          />
          <input
            type="text"
            placeholder="Full Name"
            onChange={(e) => handleFilterChange('full_name', e.target.value)}
          />
          <input
            type="text"
            placeholder="Payment Method"
            onChange={(e) =>
              handleFilterChange('payment_method', e.target.value)
            }
          />
          <input
            type="number"
            placeholder="Year"
            onChange={(e) => handleFilterChange('year', e.target.value)}
          />
          <input
            type="number"
            placeholder="Month"
            onChange={(e) => handleFilterChange('month', e.target.value)}
          />
        </div>
      )} */}

      {/* Payments List */}
      <div className={styles['payments-list']}>
        <div className={`${styles['payment-row']} ${styles['header']}`}>
          <h3>Full Name</h3>
          <p>Book Number</p>
          <p>Payment Method</p>
          <p>mm / yy</p>
        </div>
        {payments.map((payment) => (
          // <Link to={'./' + payment.id} key={payment.id}>
          <Link key={payment.id}>
            <div className={styles['payment-row']}>
              <h3>{payment.member.full_name}</h3>
              <p>{payment.member.book_number}</p>
              <p>
                {' '}
                {payment.payment_method
                  .split('_')
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(' ')}
              </p>

              <p>
                {payment.month} / {payment.year}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      <div className={styles.pagination}>
        <Pagination
          classes={'MuiPagination-root MuiPaginationItem-root Mui-selected'}
          count={totalPages}
          page={page}
          onChange={(event, value) => handlePageChange(value)}
          color="primary"
          // shape="rounded"
          sx={{
            '& .MuiPaginationItem-root': {
              color: '#007bff',
              '&:hover': {
                backgroundColor: '#e0f7fa',
              },
            },
            '& .Mui-selected': {
              backgroundColor: '#007bff',
              color: '#fff',
              fontWeight: 'bold',
            },
          }}
        />
      </div>
    </div>
  );
};

export default Payments;
