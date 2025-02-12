import { Request, Response } from "express";
import prisma from "../config/database";
interface IUser {
  name: string;
  email: string;
}
export const submitForm = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    console.log("Received data:", req.body);

    if (!Array.isArray(req.body)) {
      res.status(400).json({ message: "Invalid data format" });
      return;
    }

    // Extract name and email from the array
    const formData = req.body.reduce((acc, item) => {
      if (item.question === "Name") acc.name = item.answer;
      if (item.question === "Email") acc.email = item.answer;
      return acc;
    }, {} as { name?: string; email?: string });

    if (!formData.name || !formData.email) {
      res.status(400).json({ message: "Missing name or email" });
      return;
    }

    console.log("Extracted Data:", formData);

    // Save to database
    const user = await prisma.userForm.create({
      data: { name: formData.name, email: formData.email },
    });

    res.json({
      message: "User created successfully",
      user,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
