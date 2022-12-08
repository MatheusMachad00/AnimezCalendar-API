import { weekdays } from './weekdays';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
  for (let weekday of weekdays) {
    await prisma.weekday.create({
      data: weekday,
    });
  }
}

seed()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
