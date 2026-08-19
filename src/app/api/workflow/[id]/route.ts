import { getServerSession } from "@/lib/auth-session";
import prisma from "@/lib/prisma-client";
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const session = await getServerSession();

    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    const workflow = await prisma.workflow.findUnique({
      where: {
        id,
        userId: session.user.id,
      },
    });

    if (!workflow) {
      return new Response("Workflow not found", { status: 404 });
    }

    const flowObject = JSON.parse(workflow.flowObject);

    return Response.json({
      success: true,
      data: {
        id: workflow.id,
        name: workflow.name,
        flowObject: flowObject,
      },
    });
  } catch (error) {
    console.error("Error fetching workflow:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
