"use server";

import { prisma } from "../../libs/prisma";
import { revalidatePath } from "next/cache";

// Add specific typings for form data extraction based on schema models
export async function deleteProject(id: string) {
  await prisma.project.delete({ where: { id } });
  revalidatePath("/admin/projects");
  revalidatePath("/portofolio");
  revalidatePath("/");
}

export async function deleteCollaborator(id: string) {
  await prisma.collaborator.delete({ where: { id } });
  revalidatePath("/admin/network");
  revalidatePath("/circle");
  revalidatePath("/");
}

export async function deleteCreditLink(id: string) {
  await prisma.creditLink.delete({ where: { id } });
  revalidatePath("/admin/credits");
}

export async function updateInboxStatus(id: string, status: string) {
  await prisma.inbox.update({
    where: { id },
    data: { status },
  });
  revalidatePath("/admin/inbox");
}

export async function createCreditLink(formData: FormData) {
  const projectId = formData.get("projectId") as string;
  const collaboratorId = formData.get("collaboratorId") as string;
  const roleInProject = formData.get("roleInProject") as string;
  
  if (!projectId || !collaboratorId || !roleInProject) return;
  
  try {
    await prisma.creditLink.create({
      data: {
        projectId,
        collaboratorId,
        roleInProject
      }
    });
    revalidatePath("/admin/credits");
  } catch (e) {
    console.error("Failed to create credit link (might already exist)", e);
  }
}
