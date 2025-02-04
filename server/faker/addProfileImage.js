const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const urlAddress = [
  'users/gihocldeb63somult4ki',
  'users/dyuzqzojs6koyeqbuoxw',
  'users/kkkomhibgsazhmps8amn',
  'users/e4omcjnh4zrfg00qa7vv',
  'users/noek7xzrqjio8zravrbl',
  'users/sredpwgftkbhpnv2naur',
  'users/uow4pyiatb2miizxsfp6',
  'users/hyngnwspngshhtuvjpou',
  'users/wsxydo5iupms1egta0t9',
  'users/stbmyqapqigwrpxiugn2',
  'users/k3oqscescyxwdewbnp6n',
  'users/jkkr6nwotc6zhsrfabj5',
];

const func = async () => {
  const users = await prisma.user.findMany();
  users.forEach(async (user) => {
    console.log(user);
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        profileUrl: urlAddress[Math.ceil(Math.random() * 12)],
      },
    });
  });
};

func();
