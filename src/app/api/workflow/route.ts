import { getServerSession } from "@/lib/auth-session";
import prisma from "@/lib/prisma-client";

export async function GET() {
  try {
    const session = await getServerSession();

    if (!session) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const workflows = await prisma.workflow.findMany({
      where: {
        userId: session.user.id,
      },
      select: {
        id: true,
        name: true,
        description: true,
        createdAt: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    return Response.json({
      success: true,
      data: workflows,
    });
  } catch (error) {
    console.error("Error fetching workflows:", error);
    return Response.json(
      { error: "An error occurred while fetching workflows" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const { name, description } = await req.json();
    const session = await getServerSession();

    if (!session) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!name || !description) {
      return Response.json(
        { error: "Name and description are required" },
        { status: 400 },
      );
    }

    const workflow = await prisma.workflow.create({
      data: {
        name,
        description,
        userId: session.user.id,
      },
    });

    return Response.json({
      success: true,
      data: workflow,
    });
  } catch (error) {
    console.error("Error creating workflow:", error);
    return Response.json(
      { error: "An error occurred while creating the workflow" },
      { status: 500 },
    );
  }
}
