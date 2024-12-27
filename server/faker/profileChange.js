const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

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

const changeProfile = async () => {
  for (let i = 125; i <= 129; i++) {
    if (i === 11 || i === 39 || i === 49) continue;
    const membersProfile = await prisma.member.update({
      where: {
        id: i,
      },
      data: {
        profile_image: publicID[Math.floor(Math.random() * publicID.length)],
      },
    });
    console.log(membersProfile);
  }
};

changeProfile();
