// import { useState, useEffect } from 'react';
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from 'recharts';
// import axios from '../../Utils/axios';

// const General = () => {
//   const [year, setYear] = useState(new Date().getFullYear());
//   const [yearlyPayment, setYearlyPayment] = useState([]);
//   const [monthlyPayment, setMonthlyPayment] = useState([]);
//   const [yearlyLoading, setYearlyLoading] = useState(true);
//   const [monthlyLoading, setMonthlyLoading] = useState(true);
//   const [yearlyError, setYearlyError] = useState(null);
//   const [monthlyError, setMonthlyError] = useState(null);
//   // Fetch data from the backend
//   useEffect(() => {
//     const fetchData = async () => {
//       setMonthlyLoading(true);
//       axios
//         .get('report/monthlyPayments', { params: { pyear: year } })
//         .then((res) => {
//           console.log('res.data', res.data);
//           setMonthlyPayment(res.data.data);
//         })
//         .catch((err) => {
//           setMonthlyError('Error fetching data');
//         })
//         .finally(setMonthlyLoading(false));
//     };

//     fetchData();
//   }, [year]);

//   useEffect(() => {
//     const fetchData = async () => {
//       setYearlyLoading(true);
//       axios
//         .get('report/yearlyPayments')
//         .then((res) => {
//           console.log('res.data', res.data);
//           setYearlyPayment(res.data.data);
//         })
//         .catch((err) => {
//           console.log(err);
//           setYearlyError('Error fetching data');
//         })
//         .finally(setYearlyLoading(false));
//     };

//     fetchData();
//   }, []);

//   return (
//     <div style={{ padding: '20px' }}>
//       <h1>General Report</h1>

//       {/* First Graph */}
//       <div style={{ marginBottom: '40px' }}>
//         <h4>Membership Amounts by Year</h4>
//         {yearlyLoading ? (
//           <p>Loading...</p>
//         ) : yearlyError ? (
//           <p style={{ color: 'red' }}>{yearlyError}</p>
//         ) : (
//           <ResponsiveContainer width="100%" height={400}>
//             <BarChart data={yearlyPayment}>
//               <CartesianGrid strokeDasharray="0 2" />
//               <XAxis dataKey="year" />
//               <YAxis />
//               <Tooltip
//                 content={({ active, payload }) =>
//                   active && payload ? (
//                     <div
//                       style={{
//                         backgroundColor: '#010e30',
//                         padding: '10px',
//                         border: '1px solid #ccc',
//                         fontSize: '12px',
//                       }}
//                     >
//                       <p>{`Year: ${payload[0]?.payload?.year}`}</p>
//                       <p>{`Total: ${payload[0]?.payload?.totalMembershipAmount}`}</p>
//                       <p>{`Count: ${payload[0]?.payload?.count}`}</p>
//                     </div>
//                   ) : null
//                 }
//               />

//               <Legend />
//               <Bar
//                 dataKey="totalMembershipAmount"
//                 fill="#8884d8"
//                 name="Total Membership Amount"
//               />
//               <Bar dataKey="count" fill="#82ca9d" name="Member Count" />
//             </BarChart>
//           </ResponsiveContainer>
//         )}
//       </div>

//       {/* Placeholder for Second Graph */}
//       <div style={{ marginBottom: '40px' }}>
//         <h4>{year}</h4>
//         <label htmlFor="year"> year</label>{' '}
//         <select
//           name="year"
//           id="year"
//           onChange={(e) => {
//             setYear(e.target.value);
//           }}
//         >
//           <option value="2022">2022</option>
//           <option value="2023">2023</option>
//           <option value="2024">2024</option>
//           <option value="2025">2025</option>
//           <option value="2026">2026</option>
//         </select>
//         <h4>Membership Amounts Monthly</h4>
//         {monthlyLoading ? (
//           <p>Loading...</p>
//         ) : monthlyError ? (
//           <p style={{ color: 'red' }}>{monthlyError}</p>
//         ) : (
//           <ResponsiveContainer width="100%" height={400}>
//             <BarChart data={monthlyPayment}>
//               <CartesianGrid strokeDasharray="0 2" />
//               <XAxis dataKey="month" />
//               <YAxis />
//               <Tooltip
//                 content={({ active, payload }) =>
//                   active && payload ? (
//                     <div
//                       style={{
//                         backgroundColor: '#010e30',
//                         padding: '10px',
//                         border: '1px solid #ccc',
//                         fontSize: '12px',
//                       }}
//                     >
//                       <p>{`Month: ${payload[0]?.payload?.month}`}</p>
//                       <p>{`Total: ${payload[0]?.payload.totalMembershipAmount}`}</p>
//                       <p>{`Count: ${payload[0]?.payload?.count}`}</p>
//                     </div>
//                   ) : null
//                 }
//               />

//               <Legend />
//               <Bar
//                 dataKey="totalMembershipAmount"
//                 fill="#8884d8"
//                 name="Total Membership Amount"
//               />
//               <Bar dataKey="count" fill="#82ca9d" name="Member Count" />
//             </BarChart>
//           </ResponsiveContainer>
//         )}
//       </div>

//       {/* Placeholder for Third Graph */}
//       <div
//         style={{
//           marginBottom: '40px',
//           height: '400px',
//           backgroundColor: '#f5f5f5',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//         }}
//       >
//         <h2>Placeholder for Future Graph 3</h2>
//       </div>

//       {/* Placeholder for Fourth Graph */}
//       <div
//         style={{
//           marginBottom: '40px',
//           height: '400px',
//           backgroundColor: '#f5f5f5',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//         }}
//       >
//         <h2>Placeholder for Future Graph 4</h2>
//       </div>
//     </div>
//   );
// };

// export default General;

import { useState, useEffect } from 'react';
import axios from '../../Utils/axios';
import BarGraph from './BarGraph';
import PieChartComponent from './PieChartComponent';

const General = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [yearlyPayment, setYearlyPayment] = useState([]);
  const [monthlyPayment, setMonthlyPayment] = useState([]);
  const [additionalData1, setAdditionalData1] = useState([]);
  const [additionalData2, setAdditionalData2] = useState([]);

  const [yearlyError, setYearlyError] = useState(null);
  const [monthlyError, setMonthlyError] = useState(null);

  useEffect(() => {
    axios
      .get('report/monthlyPayments', { params: { pyear: year } })
      .then((res) => setMonthlyPayment(res.data.data))
      .catch(() => setMonthlyError('Error fetching data'));
  }, [year]);

  useEffect(() => {
    axios
      .get('report/yearlyPayments')
      .then((res) => setYearlyPayment(res.data.data))
      .catch(() => setYearlyError('Error fetching data'));

    // Fetch additional placeholder data
    axios
      .get('report/memberReport')
      .then((res) => {
        console.log(res.data.data);
        setAdditionalData1(res.data.data);
      })
      .catch(() => console.error('Error fetching additionalData1'));

    axios
      .get('report/memberSexReport')
      .then((res) => {
        console.log(res.data.data);
        setAdditionalData2(res.data.data);
      })
      .catch(() => console.error('Error fetching additionalData2'));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>General Report</h1>
      {/* Yearly Membership Amounts */}
      <BarGraph
        title="Membership Amounts by Year"
        data={yearlyPayment}
        xKey="year"
        bars={[
          {
            dataKey: 'totalMembershipAmount',
            fill: '#8884d8',
            name: 'Total Membership Amount',
          },
          { dataKey: 'count', fill: '#82ca9d', name: 'Member Count' },
        ]}
        tooltipFormatter={({ active, payload }) =>
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
              <p>{`Total: ${payload[0]?.payload?.totalMembershipAmount}`}</p>
              <p>{`Count: ${payload[0]?.payload?.count}`}</p>
            </div>
          ) : null
        }
      />
      <label htmlFor="year"> year</label>{' '}
      <select
        name="year"
        id="year"
        onChange={(e) => {
          setYear(e.target.value);
        }}
      >
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
      {/* Monthly Membership Amounts */}
      <BarGraph
        title={`Membership Amounts Monthly (${year})`}
        data={monthlyPayment}
        xKey="month"
        bars={[
          {
            dataKey: 'totalMembershipAmount',
            fill: '#8884d8',
            name: 'Total Membership Amount',
          },
          { dataKey: 'count', fill: '#82ca9d', name: 'Member Count' },
        ]}
        tooltipFormatter={({ active, payload }) =>
          active && payload ? (
            <div
              style={{
                backgroundColor: '#010e30',
                padding: '10px',
                border: '1px solid #ccc',
                fontSize: '12px',
              }}
            >
              <p>{`Month: ${payload[0]?.payload?.month}`}</p>
              <p>{`Total: ${payload[0]?.payload.totalMembershipAmount}`}</p>
              <p>{`Count: ${payload[0]?.payload?.count}`}</p>
            </div>
          ) : null
        }
      />
      <BarGraph
        title="Membership Pro Amount"
        data={additionalData1}
        xKey="range"
        bars={[
          // { dataKey: 'range', fill: '#8884d8', name: 'Range' },
          { dataKey: 'count', fill: '#82ca9d', name: 'Count' },
        ]}
        tooltipFormatter={({ active, payload }) =>
          active && payload ? (
            <div
              style={{
                backgroundColor: '#010e30',
                padding: '10px',
                border: '1px solid #ccc',
                fontSize: '12px',
              }}
            >
              <p>{`Range: ${payload[0]?.payload?.range}`}</p>
              <p>{`Count: ${payload[0]?.payload?.count}`}</p>
            </div>
          ) : null
        }
      />
      {/* Placeholder Graph 4 */}
      <div style={{ padding: '20px' }}>
        <h1>General Report</h1>
        <PieChartComponent
          data={additionalData1}
          colors={['#ff8042', '#ffbb28', '#0088fe', '#00c49f']}
          dataKey="count"
          nameKey="range"
          title="Distribution of Ranges"
        />
      </div>
      <div style={{ padding: '20px' }}>
        <h1>General Report</h1>
        {/* <PieChartComponent
          data={additionalData2}
          colors={['#8884d8', '#82ca9d']}
          title="Gender Distribution"
        /> */}

        {/* <PieChartComponent
          data={additionalData2}
          colors={['#ff8042', '#ffbb28', '#0088fe', '#00c49f']}
          dataKey="count"
          nameKey="range"
          title="Distribution of Ranges"
        /> */}
      </div>
    </div>
  );
};

export default General;
