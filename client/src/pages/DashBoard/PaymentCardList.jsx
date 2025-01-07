import styles from './PaymentCardList.module.scss';

function PaymentCardList({ payments }) {
  // Group payments by year
  const paymentsByYear = payments.reduce((grouped, payment) => {
    const year = payment.year;
    if (!grouped[year]) {
      grouped[year] = [];
    }
    grouped[year].push(payment);
    return grouped;
  }, {});

  return (
    <div className={styles.paymentsContainer}>
      {Object.keys(paymentsByYear)
        .sort((a, b) => b - a) // Sort years in descending order
        .map((year) => (
          <div key={year} className={styles.yearGroup}>
            <h2 className={styles.yearTitle}>{year}</h2>
            {paymentsByYear[year].map((payment) => (
              <div key={payment.id} className={styles.paymentItem}>
                <p>
                  <strong>Month:</strong> {payment.month}
                </p>
                <p>
                  <strong>Payment Method:</strong>{' '}
                  {payment.payment_method
                    .split('_')
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ')}
                </p>
                <p>
                  <strong>Day of Payment:</strong>{' '}
                  {new Date(payment.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        ))}
    </div>
  );
}

export default PaymentCardList;
