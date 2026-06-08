import { prisma } from "../../../libs/prisma";
import PortfolioClient from "./PortfolioClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work",
  description: "A selection of client and experimental work built by the JEDIYWORKS circle.",
};

export const revalidate = 3600; // Revalidate every hour

export default async function PortfolioPage() {
  const projects = await prisma.project.findMany({
    where: { status: "published" },
    orderBy: { createdAt: "desc" },
  });

  return <PortfolioClient initialProjects={projects} />;
}