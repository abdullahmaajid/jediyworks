import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/route";

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    if (
      session.user.role !== "admin" &&
      session.user.collaboratorId !== id
    ) {
      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      );
    }

    const collaborator = await prisma.collaborator.findUnique({
      where: { id },
    });

    return NextResponse.json(collaborator);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (
      session.user.role !== "admin" &&
      session.user.collaboratorId !== id
    ) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const data = await request.json();

    const collaborator = await prisma.collaborator.update({
      where: { id },
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
        status: data.status,
        profileVisible: data.profileVisible,
        sortOrder: parseInt(data.sortOrder),
      },
    });

    return NextResponse.json(collaborator);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Hapus relasi credit terlebih dahulu
    await prisma.creditLink.deleteMany({
      where: { collaboratorId: id },
    });

    // Lepaskan relasi user
    await prisma.user.updateMany({
      where: { collaboratorId: id },
      data: { collaboratorId: null },
    });

    // Hapus collaborator
    await prisma.collaborator.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
