const { faker } = require('@faker-js/faker');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});
// Enum options for `sex`
const sexes = ['male', 'female'];

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
      profile_image: faker.image.avatar(),
      signed_date: faker.date.recent({ days: 30 }), // Updated API for recent date
      date_of_birth: faker.date.birthdate({ min: 18, max: 65, mode: 'age' }), // Updated API for birthdate
      note: faker.lorem.sentence().slice(0, 100),
      created_by: userId, // Link to user ID
    };
    // console.log('created member at ', i, member);
    const dbMember = await prisma.member.create({ data: member });
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
      phone_number: faker.phone.number('+251 ### ### ####').slice(0, 18),
      role: faker.helpers.arrayElement(['user', 'admin']),
      sex: faker.helpers.arrayElement(sexes),
    };
    // users.push(user);
    // console.log('test', user);
    const dbUser = await prisma.user.create({ data: user });
    // console.log('db', dbUser);
    // Generate members for this user
    await generateRandomMembers(dbUser.id, membersPerUser);
  }
  //   console.log('create Users successfully');

  //   return { users, members: allMembers };
}

// Generate data
const { users, members } = generateRandomUsersWithMembers(4, 11);

// Log the generated users and members
// console.log('Generated Users:', users);
// console.log('Generated Members:', members);
