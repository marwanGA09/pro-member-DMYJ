import React from 'react';
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

const BarGraph = ({ title, data, xKey, bars, tooltipFormatter }) => {
  return (
    <div style={{ marginBottom: '40px' }}>
      <h4>{title}</h4>
      {data.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="0 2" />
            <XAxis dataKey={xKey} />
            <YAxis />
            <Tooltip content={tooltipFormatter} />
            <Legend />
            {bars.map((bar) => (
              <Bar
                key={bar.dataKey}
                dataKey={bar.dataKey}
                fill={bar.fill}
                name={bar.name}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default BarGraph;
