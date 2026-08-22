import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  BackgroundVariant,
  type Connection,
  Controls,
  type Edge,
  MiniMap,
  type Node,
  ReactFlow,
  useReactFlow,
} from "@xyflow/react";
import { useCallback, useState } from "react";
import "@xyflow/react/dist/style.css";
import { useWorkflowContext } from "@/context/workflow-context";
import { cn } from "@/lib/utils";
import {
  createNode,
  type NodeType,
  NodeTypeEnum,
} from "@/lib/workflow/node-config";
import { TOOL_MODE_ENUM, type ToolModeType } from "@/utils/constants";
import AgentNode from "./custom-nodes/agent/node";
import StartNode from "./custom-nodes/start/node";
import NodePanel from "./node-panel";
import WorkflowControls from "./workflow-controls";

const startNode = createNode({
  type: NodeTypeEnum.START,
});

export default function WorkflowCanvas() {
  const [nodes, setNodes] = useState<Node[]>([startNode]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [toolMode, setToolMode] = useState<ToolModeType>(TOOL_MODE_ENUM.HAND);
  const { view, setView } = useWorkflowContext();
  const { screenToFlowPosition } = useReactFlow();

  const isSelected = toolMode === TOOL_MODE_ENUM.SELECT;
  const isPreview = view === "preview";

  const nodeTypes = {
    [NodeTypeEnum.START]: StartNode,
    [NodeTypeEnum.AGENT]: AgentNode,
  };

  const onNodesChange = useCallback(
    (changes: any) =>
      setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    [],
  );
  const onEdgesChange = useCallback(
    (changes: any) =>
      setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    [],
  );
  const onConnect = useCallback(
    (params: any): any =>
      setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    [],
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const node_type = event.dataTransfer.getData(
        "application/reactflow",
      ) as NodeType;
      if (!node_type) return null;

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode = createNode({
        type: node_type,
        position,
      });

      setNodes((nds) => [...nds, newNode]);
    },
    [screenToFlowPosition],
  );

  console.log("All Nodes", nodes);
  console.log("All Edges", edges);

  return (
    <>
      <div className="relative flex flex-1 h-full overflow-hidden">
        <div style={{ width: "100vw", height: "100vh" }}>
          <ReactFlow
            className={cn(
              isSelected
                ? "cursor-default"
                : "cursor-grab active:cursor-pointer",
            )}
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            panOnDrag={!isSelected}
            panOnScroll={!isSelected}
            zoomOnScroll={!isSelected}
            selectionOnDrag
            onDrop={onDrop}
            onDragOver={onDragOver}
            defaultViewport={{ x: 0, y: 0, zoom: 1.2 }}
          >
            <Background variant={BackgroundVariant.Dots} />
            {!isPreview && <NodePanel />}
            {!isPreview && (
              <WorkflowControls toolMode={toolMode} setToolMode={setToolMode} />
            )}
            <MiniMap />
          </ReactFlow>
        </div>
      </div>
    </>
  );
}
