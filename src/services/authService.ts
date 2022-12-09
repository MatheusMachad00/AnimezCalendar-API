import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { TypeNewUserData, TypeUserLogin } from '../types/userTypes';
import { authRepository } from '../repositories/authRepository';

async function signup(user: TypeNewUserData) {
  const { email, avatar, password } = user;
  const SALT = 10;
  const encryptedPassword = bcrypt.hashSync(password, SALT);

  const emailExists = await authRepository.checkEmail(email);
  if (emailExists)
    throw { type: 'conflict', message: 'Email already registered.' };

  await authRepository.createUser({
    email,
    avatar,
    password: encryptedPassword,
  });
}

async function login(user: TypeUserLogin) {
  const KEY_JWT = process.env.JWT_SECRET;
  const data = user;

  const { id, email, avatar } = await checkUser(data);
  const token = jwt.sign({ id, email, avatar }, String(KEY_JWT));

  return { id, avatar, token };
}

async function checkUser(user: TypeUserLogin) {
  const userData = await authRepository.checkEmail(user.email);
  if (!userData) throw { type: 'not_found', message: 'Email not found.' };

  const isPasswordValid = bcrypt.compareSync(user.password, userData.password);
  if (!isPasswordValid)
    throw { type: 'unauthorized', message: 'Wrong email or password' };

  return userData;
}

export const authService = {
  signup,
  login,
};
