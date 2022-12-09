import { prisma } from '../config/database';
import { TypeNewUserData } from '../types/userTypes';

async function checkEmail(email: string) {
  const result = await prisma.user.findFirst({ where: { email } });
  return result;
}

async function createUser(user: TypeNewUserData) {
  await prisma.user.create({ data: user });
}

export const authRepository = {
  checkEmail,
  createUser,
};
