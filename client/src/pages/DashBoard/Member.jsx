import { Link, useParams } from 'react-router';
import { useContext, useEffect, useState } from 'react';
import axios from './../../Utils/axios';
import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/url-gen';
import styles from './Member.module.scss';
import PaymentCardList from './PaymentCardList';
import PaymentForm from './PaymentForm';
import { globalContext } from '../../components/ContextProvider';

function Member() {
  const { memberId } = useParams();
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { user } = useContext(globalContext);

  useEffect(() => {
    const fetchMemberData = async () => {
      try {
        const response = await axios.get(`members/${memberId}`);
        setMember(response.data.data);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Failed to fetch member data.');
        setLoading(false);
      }
    };

    fetchMemberData();
  }, [memberId]);

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    // Adjust age if the birth month hasn't occurred yet in the current year
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      return age - 1;
    }

    return age;
  };

  if (loading) return <p>Loading member data...</p>;
  if (error) return <p>Error: {error}</p>;

  // Initialize Cloudinary instance
  const cld = new Cloudinary({
    cloud: {
      cloudName: 'dugvpesxp', // Replace with your Cloudinary cloud name
    },
  });

  const profileImage = cld.image(member.profile_image);

  // console.log('state', {
  //   memberId,
  //   monthlyAmount: member.membership_amount,
  //   userid: user?.user?.id,
  // });
  return (
    <>
      <div>
        {' '}
        <Link
          className={styles['new-button']}
          to={`./new-payment`}
          state={{
            memberId,
            monthlyAmount: member.membership_amount,
            userId: user?.user?.id,
          }}
        >
          New Payment
        </Link>{' '}
      </div>
      <div className={styles.container}>
        <div className={styles.memberProfile}>
          <div>
            <AdvancedImage
              cldImg={profileImage}
              className={styles.profileImage}
            />{' '}
          </div>
          <h2>{member.full_name}</h2>
          <p>
            <strong>Book Number:</strong> {member.book_number}
          </p>
          <p>
            <strong>Sex:</strong> {member.sex}
          </p>
          <p>
            <strong>Profession:</strong> {member.profession}
          </p>
          <p>
            <strong>Address:</strong> {member.address}
          </p>
          <p>
            <strong>Phone:</strong> {member.phone}
          </p>
          <p>
            <strong>Email:</strong> {member.email}
          </p>
          <p>
            <strong>Membership Amount:</strong> ${member.membership_amount}
          </p>
          <p>
            <strong>Signed Date:</strong>{' '}
            {new Date(member.signed_date).toLocaleDateString()}
          </p>
          <p>
            <strong>Age:</strong> {calculateAge(member.date_of_birth)}
          </p>
          <p>
            <strong>DMYJ representative :</strong>{' '}
            {Object.values(member.user).slice(0, -1).join(' ')}
          </p>
          <p>
            <strong>Note:</strong> {member.note}
          </p>
        </div>
        <PaymentCardList
          payments={member.payments}
          className={styles.paymentList}
        />
      </div>{' '}
    </>
  );
}

export default Member;
