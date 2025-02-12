import { Request, Response } from "express";
import prisma from "../config/database";
interface IUser {
  name: string;
  email: string;
}

export const submitForm = async (
  req: Request<{}, {}, IUser>,
  res: Response
): Promise<void> => {
  try {
    const { name, email } = req.body;

    console.log(name, email);

    const user = await prisma.userForm.create({
      data: { name, email },
    });
    res.json({
      message: "User created successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
    return;
  }
};
