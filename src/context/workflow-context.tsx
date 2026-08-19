import { createContext, useContext, useState } from "react";

export type WorkflowViewType = "edit" | "preview";

interface WorkflowContextProps {
  view: WorkflowViewType;
  setView: (view: WorkflowViewType) => void;
}

const WorkflowContext = createContext<WorkflowContextProps | undefined>(
  undefined,
);

export const WorkflowProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [view, setView] = useState<WorkflowViewType>("edit");

  return (
    <WorkflowContext.Provider value={{ view, setView }}>
      {children}
    </WorkflowContext.Provider>
  );
};

export const useWorkflowContext = () => {
  const context = useContext(WorkflowContext);
  if (!context) {
    throw new Error(
      "useWorkflowContext must be used within a WorkflowProvider",
    );
  }
  return context;
};
