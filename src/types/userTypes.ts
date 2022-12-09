import { User } from '@prisma/client';

export type TypeNewUserData = Omit<User, 'id'>;
export type TypeUserLogin = Omit<User, 'id' | 'avatar'>;
