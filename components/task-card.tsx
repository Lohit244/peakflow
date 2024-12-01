import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Task } from "../types/board";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import Link from "next/link";
import { Edit2 } from "lucide-react";

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
    data: task,
  });

  const style = transform
    ? {
        transform: CSS.Translate.toString(transform),
      }
    : undefined;

  return (
    <>
      <Link href={`/task/${task.id}`} passHref>
        <Edit2
          className="w-4 h-4 text-muted-foreground hover:text-primary"
          strokeWidth={1.5}
        />
      </Link>
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="relative group"
      >
        <Card className="cursor-grab active:cursor-grabbing hover:border-primary/50 my-4 transition-colors relative">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium">{task.title}</CardTitle>
          </CardHeader>
        </Card>
      </div>
    </>
  );
}
