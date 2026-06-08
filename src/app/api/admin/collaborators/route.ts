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

    let collaborators;

    // Admin sees all. Collaborator sees only themselves.
    if (session.user.role === "admin") {
      collaborators = await prisma.collaborator.findMany({
        orderBy: { sortOrder: "asc" },
      });
    } else {
      const collaboratorId = session.user.collaboratorId;
      if (!collaboratorId) {
        return NextResponse.json({ error: "Collaborator profile not linked" }, { status: 403 });
      }

      collaborators = await prisma.collaborator.findMany({
        where: { id: collaboratorId },
      });
    }

    return NextResponse.json(collaborators);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();

    const collaborator = await prisma.collaborator.create({
      data: {
        fullName: data.fullName,
        alias: data.alias,
        brandingName: data.brandingName,
        slug: data.slug,
        defaultRole: data.defaultRole,
        photoUrl: data.photoUrl,
        bannerUrl: data.bannerUrl,
        logoUrl: data.logoUrl,
        bio: data.bio,
        positionLine: data.positionLine,
        socialIg: data.socialIg,
        socialLinkedin: data.socialLinkedin,
        socialYoutube: data.socialYoutube,
        location: data.location,
        personalWebsite: data.personalWebsite,
        skills: data.skills || [],
        status: data.status || "ACTIVE",
        profileVisible: data.profileVisible ?? true,
        sortOrder: parseInt(data.sortOrder) || 0,
      },
    });

    return NextResponse.json(collaborator, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
