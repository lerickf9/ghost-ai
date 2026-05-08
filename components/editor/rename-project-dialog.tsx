"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface RenameProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  nameInput: string;
  onNameChange: (value: string) => void;
  currentName: string;
  isLoading: boolean;
  onSubmit: () => void;
}

export function RenameProjectDialog({
  open,
  onOpenChange,
  nameInput,
  onNameChange,
  currentName,
  isLoading,
  onSubmit,
}: RenameProjectDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rename Project</DialogTitle>
          <DialogDescription>
            Renaming{" "}
            <strong className="text-copy-secondary font-medium">
              {currentName}
            </strong>
            .
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-1.5">
          <label
            className="text-xs text-copy-secondary font-medium"
            htmlFor="rename-input"
          >
            New name
          </label>
          <Input
            id="rename-input"
            value={nameInput}
            onChange={(e) => onNameChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") onSubmit();
            }}
            autoFocus
          />
        </div>

        <DialogFooter showCloseButton>
          <Button
            onClick={onSubmit}
            disabled={!nameInput.trim() || isLoading}
          >
            Rename
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
