import prisma from "@/lib/prisma";
import { compare, hash } from "bcryptjs";

export async function hashPassword(password: string) {
  return hash(password, 10);
}

export async function verifyPassword(password: string, hashedPassword: string) {
  return compare(password, hashedPassword);
}

export async function findUserByEmail(email: string) {
  return prisma.user.findUnique({ where: { email } });
}

export async function findUserByUsername(username: string) {
  return prisma.user.findUnique({ where: { username } });
}

export async function createUser(data: {
  username: string;
  email: string;
  name: string;
  password: string;
  role?: string;
}) {
  return prisma.user.create({
    data: {
      username: data.username,
      email: data.email,
      name: data.name,
      password: data.password,
      role: data.role ?? "student",
    },
  });
}
