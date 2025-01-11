// import { useState, useEffect } from 'react';
// import axios from '../../Utils/axios';
// import BarGraph from './BarGraph';
// import PieChartComponent from './PieChartComponent';

// const General = () => {
//   const currentYear = new Date().getFullYear();
//   const [year, setYear] = useState(currentYear);
//   const [yearlyPayment, setYearlyPayment] = useState([]);
//   const [monthlyPayment, setMonthlyPayment] = useState([]);
//   const [additionalData1, setAdditionalData1] = useState([]);
//   const [additionalData2, setAdditionalData2] = useState([]);

//   const [yearlyError, setYearlyError] = useState(null);
//   const [monthlyError, setMonthlyError] = useState(null);

//   useEffect(() => {
//     axios
//       .get('report/monthlyPayments', { params: { pyear: year } })
//       .then((res) => setMonthlyPayment(res.data.data))
//       .catch(() => setMonthlyError('Error fetching data'));
//   }, [year]);

//   useEffect(() => {
//     axios
//       .get('report/yearlyPayments')
//       .then((res) => setYearlyPayment(res.data.data))
//       .catch(() => setYearlyError('Error fetching data'));

//     // Fetch additional placeholder data
//     axios
//       .get('report/memberReport')
//       .then((res) => {
//         console.log(res.data.data);
//         setAdditionalData1(res.data.data);
//       })
//       .catch(() => console.error('Error fetching additionalData1'));

//     axios
//       .get('report/memberSexReport')
//       .then((res) => {
//         console.log(res.data.data);
//         setAdditionalData2(res.data.data);
//       })
//       .catch(() => console.error('Error fetching additionalData2'));
//   }, []);

//   return (
//     <div style={{ padding: '20px' }}>
//       <h1>General Report</h1>
//       {/* Yearly Membership Amounts */}
//       <BarGraph
//         title="Membership Amounts by Year"
//         data={yearlyPayment}
//         xKey="year"
//         bars={[
//           {
//             dataKey: 'totalMembershipAmount',
//             fill: '#8884d8',
//             name: 'Total Membership Amount',
//           },
//           { dataKey: 'count', fill: '#82ca9d', name: 'Member Count' },
//         ]}
//         tooltipFormatter={({ active, payload }) =>
//           active && payload ? (
//             <div
//               style={{
//                 backgroundColor: '#010e30',
//                 padding: '10px',
//                 border: '1px solid #ccc',
//                 fontSize: '12px',
//               }}
//             >
//               <p>{`Year: ${payload[0]?.payload?.year}`}</p>
//               <p>{`Total: ${payload[0]?.payload?.totalMembershipAmount}`}</p>
//               <p>{`Count: ${payload[0]?.payload?.count}`}</p>
//             </div>
//           ) : null
//         }
//       />
//       <label htmlFor="year"> year</label>{' '}
//       <select
//         name="year"
//         id="year"
//         onChange={(e) => {
//           setYear(e.target.value);
//         }}
//       >
//         {Array.from({ length: 5 }, (_, i) => (
//           <option
//             key={i}
//             selected={year === currentYear - i}
//             value={currentYear - i}
//           >
//             {currentYear - i}
//           </option>
//         ))}
//       </select>
//       {/* Monthly Membership Amounts */}
//       <BarGraph
//         title={`Membership Amounts Monthly (${year})`}
//         data={monthlyPayment}
//         xKey="month"
//         bars={[
//           {
//             dataKey: 'totalMembershipAmount',
//             fill: '#8884d8',
//             name: 'Total Membership Amount',
//           },
//           { dataKey: 'count', fill: '#82ca9d', name: 'Member Count' },
//         ]}
//         tooltipFormatter={({ active, payload }) =>
//           active && payload ? (
//             <div
//               style={{
//                 backgroundColor: '#010e30',
//                 padding: '10px',
//                 border: '1px solid #ccc',
//                 fontSize: '12px',
//               }}
//             >
//               <p>{`Month: ${payload[0]?.payload?.month}`}</p>
//               <p>{`Total: ${payload[0]?.payload.totalMembershipAmount}`}</p>
//               <p>{`Count: ${payload[0]?.payload?.count}`}</p>
//             </div>
//           ) : null
//         }
//       />
//       <BarGraph
//         title="Membership Pro Amount"
//         data={additionalData1}
//         xKey="range"
//         bars={[
//           // { dataKey: 'range', fill: '#8884d8', name: 'Range' },
//           { dataKey: 'count', fill: '#82ca9d', name: 'Count' },
//         ]}
//         tooltipFormatter={({ active, payload }) =>
//           active && payload ? (
//             <div
//               style={{
//                 backgroundColor: '#010e30',
//                 padding: '10px',
//                 border: '1px solid #ccc',
//                 fontSize: '12px',
//               }}
//             >
//               <p>{`Range: ${payload[0]?.payload?.range}`}</p>
//               <p>{`Count: ${payload[0]?.payload?.count}`}</p>
//             </div>
//           ) : null
//         }
//       />
//       {/* Placeholder Graph 4 */}
//       <div style={{ padding: '20px' }}></div>
//       <div style={{ padding: '20px' }}>
//         <PieChartComponent
//           data={additionalData2}
//           colors={['#8884d8', '#82ca9d', '#ffc658']}
//           dataKey="_count"
//           nameKey="sex"
//           title="Membership Sex Ratio"
//           labelFormatter={({ name, value }) => `${name}: ${value} units`}
//           tooltipFormatter={({ active, payload }) =>
//             active && payload ? (
//               <div
//                 style={{
//                   backgroundColor: '#000',
//                   color: '#fff',
//                   padding: '5px',
//                 }}
//               >
//                 <p>{`Category: ${payload[0]?.payload?._count}`}</p>
//                 <p>{`Quantity: ${payload[0]?.payload?.sex}`}</p>
//               </div>
//             ) : null
//           }
//         />
//       </div>
//     </div>
//   );
// };

// export default General;

import { useState, useEffect } from 'react';
import axios from '../../Utils/axios';
import BarGraph from './BarGraph';
import PieChartComponent from './PieChartComponent';
import styles from './General.module.scss';

const General = () => {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);
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

    axios
      .get('report/memberReport')
      .then((res) => setAdditionalData1(res.data.data))
      .catch(() => console.error('Error fetching additionalData1'));

    axios
      .get('report/memberSexReport')
      .then((res) => setAdditionalData2(res.data.data))
      .catch(() => console.error('Error fetching additionalData2'));
  }, []);

  return (
    <div className={styles['general-container']}>
      <h1 className={styles.title}>General Report</h1>
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
            <div className={styles.tooltip}>
              <p>{`Year: ${payload[0]?.payload?.year}`}</p>
              <p>{`Total: ${payload[0]?.payload?.totalMembershipAmount}`}</p>
              <p>{`Count: ${payload[0]?.payload?.count}`}</p>
            </div>
          ) : null
        }
      />

      <div className={styles['select-year']}>
        <label htmlFor="year">Year</label>
        <select name="year" id="year" onChange={(e) => setYear(e.target.value)}>
          {Array.from({ length: 5 }, (_, i) => (
            <option
              key={i}
              selected={year === currentYear - i}
              value={currentYear - i}
            >
              {currentYear - i}
            </option>
          ))}
        </select>
      </div>
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
            <div className={styles.tooltip}>
              <p>{`Month: ${payload[0]?.payload?.month}`}</p>
              <p>{`Total: ${payload[0]?.payload.totalMembershipAmount}`}</p>
              <p>{`Count: ${payload[0]?.payload?.count}`}</p>
            </div>
          ) : null
        }
      />
      {/* Additional Graphs */}
      <BarGraph
        title="Membership Pro Amount"
        data={additionalData1}
        xKey="range"
        bars={[{ dataKey: 'count', fill: '#8884d8', name: 'Count' }]}
        tooltipFormatter={({ active, payload }) =>
          active && payload ? (
            <div className={styles.tooltip}>
              <p>{`Range: ${payload[0]?.payload?.range}`}</p>
              <p>{`Count: ${payload[0]?.payload?.count}`}</p>
            </div>
          ) : null
        }
      />
      <PieChartComponent
        data={additionalData2}
        colors={['#8884d8', '#82ca9d', '#ffc658']}
        dataKey="_count"
        nameKey="sex"
        title="Membership Sex Ratio"
        labelFormatter={({ name, value }) => `${name}: ${value} units`}
        tooltipFormatter={({ active, payload }) =>
          active && payload ? (
            <div className={styles.tooltip}>
              <p>{`Category: ${payload[0]?.payload?._count}`}</p>
              <p>{`Quantity: ${payload[0]?.payload?.sex}`}</p>
            </div>
          ) : null
        }
      />
    </div>
  );
};

export default General;
