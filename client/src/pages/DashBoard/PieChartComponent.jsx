import React from 'react';
import PieChartComponent from './PieChartComponent';

const data = [
  { category: 'Apples', quantity: 20 },
  { category: 'Bananas', quantity: 30 },
  { category: 'Cherries', quantity: 10 },
];

const App = () => {
  const customLabel = ({ name, value }) => `${name}: ${value} units`;
  const customTooltip = ({ active, payload }) =>
    active && payload ? (
      <div style={{ backgroundColor: '#000', color: '#fff', padding: '5px' }}>
        <p>{`Category: ${payload[0]?.payload?.category}`}</p>
        <p>{`Quantity: ${payload[0]?.payload?.quantity}`}</p>
      </div>
    ) : null;

  return (
    <div>
      <PieChartComponent
        data={data}
        colors={['#8884d8', '#82ca9d', '#ffc658']}
        dataKey="quantity"
        nameKey="category"
        title="Fruit Quantities"
        labelFormatter={customLabel}
        tooltipFormatter={customTooltip}
      />
    </div>
  );
};

export default App;
