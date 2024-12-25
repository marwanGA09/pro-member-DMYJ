const { faker } = require('@faker-js/faker');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const numEntries = 500; // Number of records to create
  const userIdRange = { min: 2, max: 23 }; // Range for random user_id
  const memberIdRange = { min: 1, max: 128 }; // Range for random member_id

  for (let i = 0; i < numEntries; i++) {
    const paymentMethod = faker.helpers.arrayElement([
      'cash',
      'bank_transfer',
      'other',
    ]);
    // faker.number.int({ min: 1, max: 99999 });
    const data = {
      uuid: faker.number.int({ min: 1000, max: 9999 }),
      monthly_amount: faker.number.int({ min: 100, max: 5000 }),
      month: faker.number.int({ min: 1, max: 12 }),
      year: faker.number.int({ min: 2020, max: 2024 }),
      member_id: faker.number.int(memberIdRange),
      user_id: faker.number.int(userIdRange),
      payment_method: paymentMethod,
    };

    try {
      await prisma.monthlyPayment.create({
        data,
      });
      console.log(`Record ${i + 1} created successfully.`);
    } catch (error) {
      console.error(`Error creating record ${i + 1}:`, error.message);
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
