import { User } from '@prisma/client';
import { NewUserModel } from './zod';
import prisma from './prisma';

// Function that runs when /api/users POST method is called
// Takes a NewUserModel as a parameter
export const addUser = async (user: NewUserModel): Promise<User> => {
  // Extract the user's name, email and password from the NewUserModel
  const { firstname, lastname, email, password } = user;

  // Creates a new user in mongoDB
  // Stores the user that was created
  const response = await prisma.user.create({
    data: {
      firstname,
      lastname,
      email,
      password,
    }
  });

  // Return the user that was created
  return response;
};

// Function that runs when /api/users GET method is called with a query string
// Returns an array of users
export const getAllUsers = async (): Promise<User[]> => {
  // Get all of the users from mongoDB
  const users = await prisma.user.findMany();
  
  // Return the users
  return users;
};

// Function that runs when /api/users GET method is called an id query string
// Returns a user or null if no user is found
export const getUserById = async (id: string): Promise<User | null> => {
  // Gets the user by id from mongoDB
  const user = await prisma.user.findUnique({
    where: {
      id,
    }
  });

  // Return the user or null
  return user;
};

// Function that runs when /api/users GET method is called with an email query string
// Returns a user or null if no user is found
export const getUserByEmail = async (email: string): Promise<User | null> => {
  // Gets the user by email from mongoDB
  // Each user has a unique email
  const user = await prisma.user.findUnique({
    where: {
      email,
    }
  });

  // Return the user or null
  return user;
};

export const deleteUser = async (id: string): Promise<User | null> => {
  // Delete the user by id from mongoDB
  const user = await prisma.user.delete({
    where: {
      id,
    }
  });

  // Return the user or null
  return user;
};