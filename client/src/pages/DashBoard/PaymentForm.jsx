import { useState } from 'react';
import { useLocation } from 'react-router';
import style from './PaymentForm.module.scss';
const PaymentForm = () => {
  const { state } = useLocation();
  const [formData, setFormData] = useState({
    monthlyAmount: state.monthlyAmount,
    totalAmount: 0,
    monthCovered: [],
    year: new Date().getFullYear(),
    paymentMethod: 'cash',
    memberId: state.memberId,
    userId: state.userId,
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      totalAmount:
        name === 'monthlyAmount' || name === 'monthCovered'
          ? prev.monthlyAmount * prev.monthCovered.length
          : prev.totalAmount,
    }));
  };

  // Handle months covered selection
  const handleMonthsChange = (e) => {
    const selectedMonths = Array.from(e.target.selectedOptions, (option) =>
      parseInt(option.value, 10)
    );
    if (selectedMonths.length <= 12) {
      setFormData((prev) => ({
        ...prev,
        monthCovered: selectedMonths,
        totalAmount: selectedMonths.length * prev.monthlyAmount,
      }));
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted Payment Data:', formData);
    // Perform form submission logic here (e.g., API call)
  };

  return (
    <form
      onSubmit={handleSubmit}
      //   style={{ maxWidth: '400px', margin: '0 auto' }}
      className={style.form}
    >
      <div>
        <label>Monthly Amount:</label>
        <input
          //   type="number"
          name="monthlyAmount"
          value={formData.monthlyAmount}
          onChange={handleChange}
          min="0"
          required
          disabled
        />
      </div>
      <div>
        <label>Months Covered (Select up to 12):</label>
        <select
          name="monthCovered"
          multiple
          value={formData.monthCovered}
          onChange={handleMonthsChange}
          required
        >
          {[...Array(12)].map((_, index) => (
            <option key={index + 1} value={index + 1}>
              {new Date(0, index).toLocaleString('default', { month: 'long' })}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Total Amount:</label>
        <input
          //   type="number"
          name="totalAmount"
          value={formData.totalAmount}
          disabled
        />
      </div>
      <div>
        <label>Year:</label>
        <input
          type="number"
          name="year"
          value={formData.year}
          onChange={handleChange}
          min="2000"
          required
        />
      </div>
      <div>
        <label>Payment Method:</label>
        <select
          name="paymentMethod"
          value={formData.paymentMethod}
          onChange={handleChange}
          required
        >
          <option value="cash">Cash</option>
          <option value="bank_transfer">Bank Transfer</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div>
        <button type="submit">Submit Payment</button>
      </div>
    </form>
  );
};

export default PaymentForm;
