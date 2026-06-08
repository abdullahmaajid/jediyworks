"use server";

import { prisma } from "../../libs/prisma";
import { revalidatePath } from "next/cache";

export async function submitInquiry(formData: FormData) {
  try {
    const email = formData.get("email") as string;
    const category = formData.get("category") as string;
    const message = formData.get("message") as string;

    // Validate inputs
    if (!email || !category || !message) {
      return { success: false, error: "Missing required fields" };
    }

    if (message.length > 300) {
      return { success: false, error: "Message exceeds 300 characters" };
    }

    // Insert into database
    await prisma.inbox.create({
      data: {
        email,
        category,
        message,
        status: "new",
      },
    });

    // We can revalidate the admin inbox path if needed
    revalidatePath("/admin/inbox");

    return { success: true };
  } catch (error) {
    console.error("Failed to submit inquiry:", error);
    return { success: false, error: "Internal server error" };
  }
}
