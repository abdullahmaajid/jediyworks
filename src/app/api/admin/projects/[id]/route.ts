import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/route";

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const project = await prisma.project.findUnique({
      where: { id: params.id },
      include: {
        credits: {
          include: {
            collaborator: true
          }
        }
      }
    });

    if (!project) {
      return NextResponse.json({ error: "Not Found" }, { status: 404 });
    }

    // Role check
    if (session.user.role !== "admin") {
      const isCollaborator = project.credits.some(c => c.collaboratorId === session.user.collaboratorId);
      if (!isCollaborator) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }
    }

    return NextResponse.json(project);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();

    // Verify access
    const existing = await prisma.project.findUnique({
      where: { id: params.id },
      include: { credits: true }
    });

    if (!existing) {
      return NextResponse.json({ error: "Not Found" }, { status: 404 });
    }

    if (session.user.role !== "admin") {
      const isCollaborator = existing.credits.some(c => c.collaboratorId === session.user.collaboratorId);
      if (!isCollaborator) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }
    }

    const project = await prisma.project.update({
      where: { id: params.id },
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
        status: data.status,
        featured: data.featured,
      },
    });

    return NextResponse.json(project);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await prisma.creditLink.deleteMany({
      where: { projectId: params.id }
    });

    await prisma.project.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
