import { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import axios from '../../Utils/axios';

const General = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [yearlyPayment, setYearlyPayment] = useState([]);
  const [monthlyPayment, setMonthlyPayment] = useState([]);
  const [yearlyLoading, setYearlyLoading] = useState(true);
  const [monthlyLoading, setMonthlyLoading] = useState(true);
  const [yearlyError, setYearlyError] = useState(null);
  const [monthlyError, setMonthlyError] = useState(null);
  // Fetch data from the backend
  useEffect(() => {
    const fetchData = async () => {
      setMonthlyLoading(true);
      axios
        .get('report/monthlyPayments', { params: { pyear: year } })
        .then((res) => {
          console.log('res.data', res.data);
          setMonthlyPayment(res.data.data);
        })
        .catch((err) => setMonthlyError('Error fetching data'))
        .finally(setMonthlyLoading(false));
    };

    fetchData();
  }, [year]);

  useEffect(() => {
    const fetchData = async () => {
      setYearlyLoading(true);
      axios
        .get('report/yearlyPayments')
        .then((res) => {
          console.log('res.data', res.data);
          setYearlyPayment(res.data.data);
        })
        .catch((err) => setYearlyError('Error fetching data'))
        .finally(setYearlyLoading(false));
    };

    fetchData();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>General Report</h1>

      {/* First Graph */}
      <div style={{ marginBottom: '40px' }}>
        <h4>Membership Amounts by Year</h4>
        {yearlyLoading ? (
          <p>Loading...</p>
        ) : yearlyError ? (
          <p style={{ color: 'red' }}>{yearlyError}</p>
        ) : (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={yearlyPayment}>
              <CartesianGrid strokeDasharray="0 2" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip
                content={({ active, payload }) =>
                  active && payload ? (
                    <div
                      style={{
                        backgroundColor: '#010e30',
                        padding: '10px',
                        border: '1px solid #ccc',
                        fontSize: '12px',
                      }}
                    >
                      <p>{`Year: ${payload[0]?.payload?.year}`}</p>
                      <p>{`Total: ${payload[0]?.payload.totalMembershipAmount}`}</p>
                    </div>
                  ) : null
                }
              />

              <Legend />
              <Bar
                dataKey="totalMembershipAmount"
                fill="#8884d8"
                name="Total Membership Amount"
              />
              <Bar dataKey="count" fill="#82ca9d" name="Member Count" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Placeholder for Second Graph */}

      {/* Placeholder for Third Graph */}
      <div
        style={{
          marginBottom: '40px',
          height: '400px',
          backgroundColor: '#f5f5f5',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <h2>Placeholder for Future Graph 3</h2>
      </div>

      {/* Placeholder for Fourth Graph */}
      <div
        style={{
          marginBottom: '40px',
          height: '400px',
          backgroundColor: '#f5f5f5',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <h2>Placeholder for Future Graph 4</h2>
      </div>
    </div>
  );
};

export default General;
