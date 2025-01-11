import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const PieChartComponent = ({
  data,
  colors = ['#8884d8', '#83a6ed', '#8dd1e1', '#82ca9d'],
  dataKey = 'value',
  nameKey = 'name',
  title = 'Pie Chart',
  outerRadius = 150,
  labelFormatter = ({ name, value }) => `${name} (${value})`,
  tooltipFormatter = ({ active, payload }) =>
    active && payload ? (
      <div
        style={{
          backgroundColor: '#fff',
          border: '1px solid #ccc',
          padding: '5px',
          fontSize: '12px',
        }}
      >
        <p>{`${payload[0]?.name}: ${payload[0]?.value}`}</p>
      </div>
    ) : null,
}) => {
  return (
    <div style={{ marginBottom: '40px' }}>
      <h4>{title}</h4>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={data}
            dataKey={dataKey}
            nameKey={nameKey}
            cx="50%"
            cy="50%"
            outerRadius={outerRadius}
            label={labelFormatter}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
          </Pie>
          <Tooltip content={tooltipFormatter} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChartComponent;
