import { auth } from "@/lib/auth";
import { getServerSession } from "@/lib/auth-session";
import prisma from "@/lib/prisma-client";

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
