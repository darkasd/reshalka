import { TaskData } from "../models/TaskData";
import { TaskTypes } from "../models/TaskTypes";
import { NumberGenerator } from "./NumberGenerator";

export class TaskGenerator {

    public static GenerateRandomTask(taskTypes: TaskTypes[], maxResult: number): TaskData {        
        let type = NumberGenerator.Generate(taskTypes.length*100, 1);
        type = Math.floor(type/100);
        if (type > taskTypes.length) type = taskTypes.length - 1;
        return this.GenerateTask(taskTypes[type], maxResult);
    }

    public static GenerateTask(taskType: TaskTypes, maxResult: number): TaskData {
        let result: TaskData;
        switch (taskType) {
            case TaskTypes.Plus:
                result = this.GenerateTaskPlus(maxResult);
                break;
            case TaskTypes.Minus:
                result = this.GenerateTaskMinus(maxResult);
                break; 
            case TaskTypes.Multiplication:
                    result = this.GenerateTaskMultiple(maxResult);
                    break;         
            default:
                throw new Error(`Неустановленный тип операции [${taskType}]`);
        }
        return result;
    }


    public static GenerateTaskPlus(maxResult: number) : TaskData {
        let sum1 = NumberGenerator.Generate(maxResult, 1);
        let sum2 = NumberGenerator.Generate(maxResult - sum1, 0);
        return new TaskData(TaskTypes.Plus, `${sum1} + ${sum2}`, sum1 + sum2);
    }


    public static GenerateTaskMinus(maxResult: number) : TaskData {
        let sum1 = NumberGenerator.Generate(maxResult, 1);
        let sum2 = NumberGenerator.Generate(sum1, 0);
        return new TaskData(TaskTypes.Plus, `${sum1} - ${sum2}`, sum1 - sum2);
    }


    public static GenerateTaskMultiple(maxResult: number) : TaskData {
        let sum1 = NumberGenerator.Generate(maxResult/2, 1);
        let sum2 = Math.floor(maxResult/sum1);
        return new TaskData(TaskTypes.Plus, `${sum1} * ${sum2}`, sum1 * sum2);
    }


}