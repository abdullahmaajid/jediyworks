import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let projects;
    
    // If Admin, fetch all. If Collaborator, fetch only their projects (via credit links)
    if (session.user.role === "admin") {
      projects = await prisma.project.findMany({
        orderBy: { createdAt: "desc" },
      });
    } else {
      const collaboratorId = session.user.collaboratorId;
      if (!collaboratorId) {
        return NextResponse.json({ error: "Collaborator profile not linked" }, { status: 403 });
      }

      projects = await prisma.project.findMany({
        where: {
          credits: {
            some: {
              collaboratorId: collaboratorId
            }
          }
        },
        orderBy: { createdAt: "desc" },
      });
    }

    return NextResponse.json(projects);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      // For now, only admin can create new projects. Collaborators can only edit theirs.
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();

    const project = await prisma.project.create({
      data: {
        title: data.title,
        slug: data.slug,
        summary: data.summary,
        thumbnailUrl: data.thumbnailUrl,
        thumbnailAlt: data.thumbnailAlt,
        category: data.category,
        pillar: data.pillar,
        clientName: data.clientName,
        year: parseInt(data.year),
        duration: data.duration,
        liveLink: data.liveLink,
        scopeOfWork: data.scopeOfWork || [],
        problem: data.problem,
        strategy: data.strategy,
        execution: data.execution,
        impact: data.impact,
        techStack: data.techStack || [],
        status: data.status || "DRAFT",
        featured: data.featured || false,
      },
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
