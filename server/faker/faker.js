const { faker } = require('@faker-js/faker');
const { PrismaClient } = require('@prisma/client');
// const prisma = new PrismaClient({
//   log: ['query', 'info', 'warn', 'error'],
// });
const prisma = new PrismaClient();
// Enum options for `sex`
const sexes = ['male', 'female'];
const publicID = [
  'members/photo/tsrqake1ogvs13grpt6w',
  'members/photo/autgaowr2beadw675xxd',
  'members/photo/omkbdjfef7kuoomcnxov',
  'members/photo/cd78jqrfxk5fwnevxzen',
  'members/photo/fge6weyw7kdp60nxsqlt',
  'members/photo/vbvgrrfswyiyzckakcba',
  'members/photo/avgm2mumjlqyj23buhrr',
  'members/photo/ys4pycmuefqtbabsmp5i',
  'members/photo/zpq7ofbpi3bbmhh9ztfy',
  'members/photo/jnzm8uab00aemrd8amaa',
  'members/photo/wr3kuvzdroul624iu28w',
  'members/photo/kw9oolcqjioxureomr0g',
  'members/photo/iqmim5xwuwfutpsvo68d',
  'members/photo/mim6p9ihetex4xfs6der',
  'members/photo/gbvsw4cxo92xcce3mfmm',
  'members/photo/aeo4lqipu0io8zqcp0zz',
  'members/photo/clehnwl0witxzstwn9pw',
  'members/photo/ddd-ddd-632',
  'members/photo/ddd-ddd-796',
  'members/photo/abdul-551',
];

// async function main() {
//   const numEntries = 500; // Number of records to create
//   const userIdRange = { min: 2, max: 23 }; // Range for random user_id
//   const memberIdRange = { min: 1, max: 128 }; // Range for random member_id

//   for (let i = 0; i < numEntries; i++) {
//     const paymentMethod = faker.helpers.arrayElement([
//       'cash',
//       'bank_transfer',
//       'other',
//     ]);
//     // faker.number.int({ min: 1, max: 99999 });
//     const data = {
//       uuid: faker.number.int({ min: 1000, max: 9999 }),
//       monthly_amount: faker.number.int({ min: 100, max: 5000 }),
//       month: faker.number.int({ min: 1, max: 12 }),
//       year: faker.number.int({ min: 2020, max: 2024 }),
//       member_id: faker.number.int(memberIdRange),
//       user_id: faker.number.int(userIdRange),
//       payment_method: paymentMethod,
//     };

//     try {
//       await prisma.monthlyPayment.create({
//         data,
//       });
//       console.log(`Record ${i + 1} created successfully.`);
//     } catch (error) {
//       console.error(`Error creating record ${i + 1}:`, error.message);
//     }
//   }
// }

async function generatePayments(userId, memberId) {
  for (let i = 2022; i <= 2024; i++) {
    for (let j = 1; j <= 12; j++) {
      if (Math.random() * 100 < 17) {
        const data = {
          uuid: `${faker.number.int({ min: 1000000, max: 999999999 })}`,
          month: j,
          year: i,
          payment_method: faker.helpers.arrayElement([
            'cash',
            'bank_transfer',
            'other',
          ]),
          member_id: memberId,
          user_id: userId,
        };

        try {
          await prisma.monthlyPayment.create({
            data,
          });
          console.log(
            `Record ${i} / ${j} created successfully. for userid and member_id`,
            userId,
            memberId
          );
        } catch (error) {
          console.error(`Error creating record  ${i} / ${j}:`, error.message);
        }
      }
    }
  }
}

// Function to generate random members for a user
async function generateRandomMembers(userId, count) {
  for (let i = 0; i < count; i++) {
    const member = {
      full_name: faker.person.fullName().slice(0, 100), // Updated faker API
      sex: faker.helpers.arrayElement(sexes),
      book_number: `${faker.number.int({ min: 1, max: 99999 })}`, // Generate book number between 1 and 9999
      profession: faker.person.jobTitle(),
      address: faker.location
        .streetAddress({ useFullAddress: true })
        .slice(0, 100), // Updated API for street address
      phone: faker.phone.number('+251 ### ### ####').slice(0, 18), // Ethiopian phone format
      email: faker.internet.email(),
      membership_amount: faker.number.int({ min: 10, max: 1000 }), // Updated API for numbers
      profile_image: faker.helpers.arrayElement(publicID),
      signed_date: faker.date.recent({ days: 30 }), // Updated API for recent date
      date_of_birth: faker.date.birthdate({ min: 18, max: 65, mode: 'age' }), // Updated API for birthdate
      note: faker.lorem.sentence().slice(0, 100),
      created_by: userId, // Link to user ID
    };
    // console.log('created member at ', i, member);
    const dbMember = await prisma.member.create({ data: member });

    console.log('member with i and id by user id ', i, dbMember.id, userId);

    await generatePayments(userId, dbMember.id);

    // console.log(('dbMember', dbMember));
  }
  //   return members;
  //   console.log('create members successfully');
}

// Function to generate random users and their members
async function generateRandomUsersWithMembers(userCount, membersPerUser) {
  //   const users = [];
  //   const allMembers = [];

  for (let i = 0; i < userCount; i++) {
    const user = {
      //   id: i + 1, // Incremental ID
      username: faker.internet.username(),
      first_name: faker.person.firstName(), // Updated API for firstName
      middle_name: faker.person.middleName(), // Updated API for middleName
      last_name: faker.person.lastName(), // Updated API for lastName
      date_of_birth: faker.date.birthdate({ min: 18, max: 65, mode: 'age' }),
      email: faker.internet.email(),
      sector: faker.helpers.arrayElement([
        'economy',
        'academy',
        'social',
        'dawah',
        'management',
        'other',
      ]),
      password: '12345678', // Updated API for password
      phone_number: faker.phone.number('+251 ### ### ####').slice(0, 15),
      role: faker.helpers.arrayElement(['user', 'admin']),
      sex: faker.helpers.arrayElement(sexes),
    };
    // users.push(user);
    // console.log('test', user);
    const dbUser = await prisma.user.create({ data: user });
    // console.log('db', dbUser);
    console.log('user with i, and id of this created', i, dbUser.id);
    // Generate members for this user
    await generateRandomMembers(dbUser.id, membersPerUser);
  }
  //   console.log('create Users successfully');

  //   return { users, members: allMembers };
}

// Generate data
// const { users, members } = generateRandomUsersWithMembers(2, 5);
generateRandomUsersWithMembers(5, 11)
  .then((e) => {
    console.log('successfully generated');
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
