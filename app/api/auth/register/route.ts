import { hashPassword, findUserByEmail, findUserByUsername, createUser } from "@/lib/auth";

export async function POST(request: Request) {
  const body = await request.json();
  const { username, name, email, password } = body;

  if (!username || !name || !email || !password) {
    return new Response(JSON.stringify({ message: "Missing required fields." }), { status: 400 });
  }

  if (!/^[A-Za-z0-9]{6,}$/.test(password)) {
    return new Response(JSON.stringify({ message: "Password must be at least 6 characters and contain letters and numbers only." }), { status: 400 });
  }

  const existingUsername = await findUserByUsername(username);
  if (existingUsername) {
    return new Response(JSON.stringify({ message: "Username already taken." }), { status: 409 });
  }

  const existingEmail = await findUserByEmail(email);
  if (existingEmail) {
    return new Response(JSON.stringify({ message: "Email already in use." }), { status: 409 });
  }

  const hashedPassword = await hashPassword(password);
  await createUser({ username, name, email, password: hashedPassword });

  return new Response(JSON.stringify({ message: "User created." }), { status: 201 });
}
