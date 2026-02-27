import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { apiWrapper } from "@/lib/api-wrapper";
import dbConnect from "@/lib/dbConnect";
import { User } from "@/models/User/user";
import { registerSchema } from "@/lib/zodSchemas";
import { StatusCodes } from "http-status-codes";

export const POST = apiWrapper(async (req: Request) => {
  const formData: FormData = await req.formData();
  const nameForParsing = formData.get("name")?.toString().trim();
  const emailForParsing = formData.get("email")?.toString().trim();
  const passwordForParsing = formData.get("password")?.toString();

  //   zod server-side validating on top of mongoose validating

  const parsed = registerSchema.safeParse({
    name: nameForParsing,
    email: emailForParsing,
    password: passwordForParsing,
  });
  if (!parsed.success) {
    return NextResponse.json(
      {
        message: parsed.error.issues.map((i) => i.message).join(", "),
        statusCode: StatusCodes.BAD_REQUEST,
      },
      { status: StatusCodes.BAD_REQUEST },
    );
  }
  const { name, email, password } = parsed.data;
  // connect to our lovely DB
  await dbConnect();
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return NextResponse.json(
      { message: "User already exists", statusCode: StatusCodes.BAD_REQUEST },
      { status: StatusCodes.BAD_REQUEST },
    );
  }
  // password hashing and storing
  const hashedPassword = await bcrypt.hash(password, 12);
  await User.create({
    name,
    email,
    password: hashedPassword,
  });
  return NextResponse.json(
    {
      success: true,
      message: "Account created !",
      statusCode: StatusCodes.CREATED,
    },
    { status: StatusCodes.CREATED },
  );
});
