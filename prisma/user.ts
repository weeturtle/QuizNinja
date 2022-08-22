import { User } from '@prisma/client';
import { NewUserModel } from './zod';
import prisma from './prisma';

export const addUser = async (user: NewUserModel): Promise<User> => {
  const { firstname, lastname, email, password } = user;

  const response = await prisma.user.create({
    data: {
      firstname,
      lastname,
      email,
      password,
    }
  });

  return response;
};

export const getAllUsers = async (): Promise<User[]> => {
  const users = await prisma.user.findMany();
  console.table(users);
  return users;
};

export const getUserById = async (id: string): Promise<User | null> => {
  const user = await prisma.user.findFirst({
    where: {
      id,
    }
  });
  return user;
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
  const user = await prisma.user.findFirst({
    where: {
      email,
    }
  });
  return user;
};