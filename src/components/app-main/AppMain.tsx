import React from 'react';
import './AppMain.css';
import {observable} from 'mobx';
import {observer} from 'mobx-react';
import ButtonClick from '../button-click/ButtonClick';
import { TaskData } from '../../models/TaskData';
import { TaskGenerator } from '../../utils/TaskGenerator';
import { TaskTypes } from '../../models/TaskTypes';
import TasksHistory from '../tasks-history/TasksHistory';
import { TaskResultData } from '../../models/TaskResultData';

@observer
export class AppMain extends React.Component {

    @observable maxResult: number;
    @observable answer: number | null;
    @observable answerDescriptionRight: string;
    @observable answerDescriptionWrong: string;
    @observable currentTaskData: TaskData | null;

    @observable plusType: boolean;
    @observable minusType: boolean;
    @observable multipleType: boolean;

    digitButtonEnabled: boolean;
    eraseButtonEnabled: boolean;
    nextButtonEnabled: boolean;
    answerButtonEnabled: boolean;
    solvedTasks: TaskResultData[];

    constructor(props: any) {
        super(props);
        this.maxResult = 20;
        this.answer = null;
        this.answerDescriptionRight = "";
        this.answerDescriptionWrong = "";
        this.currentTaskData = null;

        this.plusType = true;
        this.minusType = true;
        this.multipleType = true;

        this.digitButtonEnabled = false;
        this.eraseButtonEnabled = false;
        this.nextButtonEnabled = true;
        this.answerButtonEnabled = false;
        this.solvedTasks = [];
    }


    onDigitClick = (value: string) => {
        this.clearAnswerDescription();
        let tempAnswer: string = this.answer != null ? this.answer.toString() : "";
        tempAnswer += value;
        this.answer = parseInt(tempAnswer);
        if (this.answer >= 0) {
            this.eraseButtonEnabled = true;
            this.answerButtonEnabled = true;
        }
    }


    onEraseClick = () => {
        this.clearAnswerDescription();
        let tempAnswer: string = this.answer != null ? this.answer.toString() : "";
        if (tempAnswer.length > 0) {            
            tempAnswer = tempAnswer.substr(0, tempAnswer.length - 1);
            this.answer = tempAnswer.length > 0 ? parseInt(tempAnswer) : null;
            if (this.answer === null) {
                this.eraseButtonEnabled = false;
                this.answerButtonEnabled = false;
            }
            else {
                this.answerButtonEnabled = true;
            }
        }
    }


    onNextClick = () => {
        let types: TaskTypes[] = [];
        if (this.plusType) types.push(TaskTypes.Plus);
        if (this.minusType) types.push(TaskTypes.Minus);
        if (this.multipleType) types.push(TaskTypes.Multiplication);
        this.currentTaskData = TaskGenerator.GenerateRandomTask(types, this.maxResult);
        this.digitButtonEnabled = true;
        this.eraseButtonEnabled = false;
        this.answerButtonEnabled = false;
        this.nextButtonEnabled = false;
        this.answer = null;
        this.clearAnswerDescription();
    }


    onChangeMaxResult = (arg: React.ChangeEvent<HTMLInputElement>) => {
        this.maxResult = parseInt(arg.target.value);
    }


    onAnswerClick = () => {
        if (this.currentTaskData != null) {
            if (this.answer === this.currentTaskData.TaskAnswer) {
                this.answerDescriptionRight = `Правильно!  ${this.currentTaskData.TaskText} = ${this.answer}`;
                this.solvedTasks.push(new TaskResultData(true, this.currentTaskData.TaskText, this.currentTaskData.TaskAnswer));
                this.digitButtonEnabled = false;
                this.eraseButtonEnabled = false;
                this.nextButtonEnabled = true;
            }
            else {
                this.answerDescriptionWrong = `Неправильно!  ${this.currentTaskData.TaskText} ≠ ${this.answer}`;
            }
        }
        this.answerButtonEnabled = false;
    }


    onCheckedChanged = (arg: React.ChangeEvent<HTMLInputElement>) => {
        switch (arg.target.name) {
            case "plus":
                this.plusType = arg.target.checked;
                break;
            case "minus":
                this.minusType = arg.target.checked;
                break;
            case "multiple":
                this.multipleType = arg.target.checked;
                break;
            default:
                break;
        }
    }


    clearAnswerDescription = () => {
        if (this.answerDescriptionRight !== "") {
            this.answerDescriptionRight = "";
        }
        if (this.answerDescriptionWrong !== "") {
            this.answerDescriptionWrong = "";
        }
    }


    render() {
        return (
            <div className="row-flex top">
                <div className="container-flex main-area">
                    <div>
                        <div className="row-flex">
                            <span>Максимум:&nbsp;</span>
                            <input type="number" value={this.maxResult} onChange={this.onChangeMaxResult} style={{ width: 50 }}/>
                        </div>
                        <div className="column-flex">
                            <div className="row-flex">
                                <input type="checkbox" name="plus" checked={this.plusType} onChange={this.onCheckedChanged} />
                                <span>+ (сложение)</span>
                            </div>
                            <div className="row-flex">
                                <input type="checkbox" name="minus" checked={this.minusType} onChange={this.onCheckedChanged} />
                                <span>- (вычитание)</span>
                            </div>
                            <div className="row-flex">
                                <input type="checkbox" name="multiple" checked={this.multipleType} onChange={this.onCheckedChanged} />
                                <span>* (умножение)</span>
                            </div>
                        </div>
                        <ButtonClick text="Начать" onClick={this.onNextClick} isEnabled={true}></ButtonClick>
                        <div className="column-flex center">
                            <span className="task-text">&nbsp;{this.currentTaskData != null ? this.currentTaskData.TaskText : ""}</span>
                            <span className="task-answer">&nbsp;{this.answer}</span>
                            <div className="task-answer-description">                                
                                <span className="right">&nbsp;{this.answerDescriptionRight}</span>
                                <span className="wrong">{this.answerDescriptionWrong}</span>
                            </div>
                        </div>                        
                        <div className="row-flex">                            
                            <ButtonClick text="1" onClick={this.onDigitClick} isEnabled={this.digitButtonEnabled}></ButtonClick>
                            <ButtonClick text="2" onClick={this.onDigitClick} isEnabled={this.digitButtonEnabled}></ButtonClick>
                            <ButtonClick text="3" onClick={this.onDigitClick} isEnabled={this.digitButtonEnabled}></ButtonClick>
                            <ButtonClick text="4" onClick={this.onDigitClick} isEnabled={this.digitButtonEnabled}></ButtonClick>
                            <ButtonClick text="5" onClick={this.onDigitClick} isEnabled={this.digitButtonEnabled}></ButtonClick>
                            <ButtonClick text="6" onClick={this.onDigitClick} isEnabled={this.digitButtonEnabled}></ButtonClick>
                            <ButtonClick text="7" onClick={this.onDigitClick} isEnabled={this.digitButtonEnabled}></ButtonClick>
                            <ButtonClick text="8" onClick={this.onDigitClick} isEnabled={this.digitButtonEnabled}></ButtonClick>
                            <ButtonClick text="9" onClick={this.onDigitClick} isEnabled={this.digitButtonEnabled}></ButtonClick>
                            <ButtonClick text="0" onClick={this.onDigitClick} isEnabled={this.digitButtonEnabled}></ButtonClick>
                            <ButtonClick text="<" onClick={this.onEraseClick} isEnabled={this.eraseButtonEnabled}></ButtonClick>
                            <ButtonClick text="Ответить" onClick={this.onAnswerClick} isEnabled={this.answerButtonEnabled}></ButtonClick>
                            <ButtonClick text="Следующий" onClick={this.onNextClick} isEnabled={this.nextButtonEnabled}></ButtonClick>
                        </div>
                    </div>
                </div>
                <div>
                    <TasksHistory Tasks={this.solvedTasks}></TasksHistory>
                </div>                
            </div>
        );
    }
};