import { TaskTypes } from "./TaskTypes";

export class TaskData {

    constructor(public TaskType: TaskTypes, public TaskText: string, public TaskAnswer: number) {}
    
}