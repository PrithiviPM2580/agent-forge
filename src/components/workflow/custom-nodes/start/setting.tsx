import { CopyIcon, FileTextIcon } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
} from "@/components/ui/input-group";
import { toast } from "@/components/ui/toast";

export default function StartNodeSetting({ nodeId }: { nodeId: string }) {
  const inputVariable = `${nodeId}.input`;

  function handleCopy() {
    navigator.clipboard.writeText(`{{${inputVariable}}}`);
    toast.add({
      type: "success",
      description: "Copied to clipboard",
    });
  }
  return (
    <div className="space-y-2">
      <h5 className="font-medium">Input Variable</h5>
      <InputGroup className="border">
        <InputGroupAddon align="inline-start">
          <FileTextIcon />
        </InputGroupAddon>
        <code className="flex-1 font-mono bg-background px-2 py-1">
          {`{{${inputVariable}}`}
        </code>
        <InputGroupButton
          variant="ghost"
          size="icon-sm"
          className="h-6"
          onClick={handleCopy}
        >
          <CopyIcon />
        </InputGroupButton>
      </InputGroup>
    </div>
  );
}
