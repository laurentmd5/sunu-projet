import { Task } from "@/type";
import React, { FC } from "react";
import UserInfo from "./UserInfo";
import Link from "next/link";
import { ArrowRight, Trash } from "lucide-react";
import { TASK_STATUS_LABELS, TASK_STATUSES } from "@/lib/task-status";

interface TaskProps {
    task: Task;
    index: number;
    canDelete?: boolean;
    onDelete?: (id: string) => void;
}

const TaskComponent: FC<TaskProps> = ({ task, index, canDelete = false, onDelete }) => {

    const handleDeleteClick = () => {
        if (onDelete) {
            onDelete(task.id);
        }
    }

    return (
        <>
            <td>
                {index + 1}
            </td>
            <td>
                <div className="flex flex-col">
                    <div className={`badge text-xd mb-2 font-semibold
                    ${task.status === TASK_STATUSES.TODO ? "bg-red-200 font-semibold" : ""}
                    ${task.status === TASK_STATUSES.IN_PROGRESS ? "bg-yellow-200 font-semibold" : ""}
                    ${task.status === TASK_STATUSES.DONE ? "bg-green-200 font-semibold" : ""}
                    `}>

                        {task.status in TASK_STATUS_LABELS
                            ? TASK_STATUS_LABELS[task.status as keyof typeof TASK_STATUS_LABELS]
                            : task.status}

                    </div>

                    <span className="text-sm font-bold">
                        {task.name.length > 100 ? `${task.name.slice(0, 100)}...` : task.name}
                    </span>

                </div>
            </td>

            <td>
                <UserInfo
                    role=""
                    email={task.user?.email || null}
                    name={task.user?.name || null}

                />
            </td>

            <td>
                <div className="text-xs text-gray-500 hidden md:flex">
                    {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "Aucune date"}
                </div>
            </td>

            <td>
                <div className="flex h-fit">
                    <Link className="btn btn-sm btn-primary" href={`/task-details/${task.id}`}>
                        Plus
                        <ArrowRight className="w-4" />
                    </Link>
                    {canDelete && (
                        <button className="btn btn-sm ml-2" onClick={handleDeleteClick}>
                            <Trash className="w-4" />

                        </button>
                    )}
                </div>
            </td>
        </>
    )
}

export default TaskComponent