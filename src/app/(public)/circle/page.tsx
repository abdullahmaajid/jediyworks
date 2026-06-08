import { prisma } from "../../../libs/prisma";
import CircleClient from "./CircleClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Circle",
  description: "A curated collective of independent creators building under one shared standard.",
};

export const revalidate = 3600;

export default async function CirclePage() {
  const collaborators = await prisma.collaborator.findMany({
    where: { status: "active", profileVisible: true },
    orderBy: { sortOrder: "asc" },
  });

  return <CircleClient collaborators={collaborators} />;
}
