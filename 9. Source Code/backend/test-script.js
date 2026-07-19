const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function test() {
  try {
    const user = await prisma.user.findFirst();
    console.log('Found user:', user.name, user.id);
    const byId = await prisma.user.findUnique({ where: { id: user.id } });
    console.log('Found by id:', byId.name);
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await prisma.$disconnect();
  }
}
test();
