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

interface CreateProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  nameInput: string;
  onNameChange: (value: string) => void;
  slug: string;
  isLoading: boolean;
  onSubmit: () => void;
}

export function CreateProjectDialog({
  open,
  onOpenChange,
  nameInput,
  onNameChange,
  slug,
  isLoading,
  onSubmit,
}: CreateProjectDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Project</DialogTitle>
          <DialogDescription>
            Give your architecture workspace a name.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1.5">
            <label
              className="text-xs text-copy-secondary font-medium"
              htmlFor="project-name"
            >
              Project name
            </label>
            <Input
              id="project-name"
              placeholder="My Project"
              value={nameInput}
              onChange={(e) => onNameChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && nameInput.trim() && !isLoading) {
                  onSubmit();
                }
              }}
              autoFocus
            />
          </div>
          {slug && (
            <p className="text-xs text-copy-muted">
              Slug:{" "}
              <span className="text-copy-secondary font-mono">{slug}</span>
            </p>
          )}
        </div>

        <DialogFooter showCloseButton>
          <Button
            onClick={onSubmit}
            disabled={!nameInput.trim() || isLoading}
          >
            Create Project
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
