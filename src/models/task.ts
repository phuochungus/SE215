import { User } from "./user";

export interface Task {
    name: string;
    startDate: string | null;
    assignee: User | null;
    subTasks: Task[];
}
