import { Component } from 'react';
import '../css/periods.css';

export default class NPV extends Component {
    constructor() {
        super();
        this.state = {
            queryObj: {},
            answer: null,
            count: 2
        }

        this.getParams = this.getParams.bind(this);
        this.getRequest = this.getRequest.bind(this);
        this.addPeriod = this.addPeriod.bind(this);
        this.deletePeriod = this.deletePeriod.bind(this);
    }

    async getParams() {
        let initial = +document.getElementById("inputInitialInvestment").value;
        let rate = +document.getElementById("inputRate").value;
        let cashFlows = document.getElementsByClassName("cashFlow");
        let output = {
            "initial": initial,
            "rate": rate
        }
        for(let i in cashFlows){
            output[`${i}`] = +cashFlows[i].value;
        }
        return output;
    }

    async getRequest() {
        let obj = await this.getParams();
        this.setState({ queryObj: obj });
        console.log(this.state.queryObj);

        const request = require('request')

        request.post(
            'http://localhost:5000/materials/instruments/NPV',
            {
                json: this.state.queryObj
            },
            (error, res, body) => {
                if (error) {
                    console.error(error);
                    return;
                }
                console.log(`statusCode: ${res.statusCode}`);
                this.setState({ answer: body });
            }
        );
    }

    addPeriod() {
        this.setState({ count: this.state.count + 1 });
        const periodsBlock = document.getElementsByClassName("periods")[0];
        const newPeriod = document.createElement("div");
        newPeriod.classList.add("form-row");

        const label = document.createElement("label");
        label.classList.add("col-5");
        label.htmlFor = `inputPeriod${this.state.count}`;
        label.innerText = `Период ${this.state.count}`

        const input = document.createElement("input");
        input.classList.add("form-control", "col-5", "cashFlow");
        input.type = "number";
        input.id = `inputPeriod${this.state.count}`;
        input.placeholder = "Введите денежный поток";
        input.required = true;

        const deleteBtnSpan = document.createElement("span");
        deleteBtnSpan.classList.add("delete-btn", "col-2");

        const deleteBtn = document.createElement("button");
        deleteBtn.id = `deletePeriod${this.state.count}`;
        deleteBtn.addEventListener("click", this.deletePeriod);
        deleteBtn.innerText = "Удалить период";

        deleteBtnSpan.appendChild(deleteBtn);

        newPeriod.appendChild(label);
        newPeriod.appendChild(input);
        newPeriod.appendChild(deleteBtnSpan);

        periodsBlock.appendChild(newPeriod);

    }

    deletePeriod(e) {
        e.target.parentElement.parentNode.remove();
        this.setState({ count: this.state.count - 1 });
    }

    render() {
        if (!this.state.answer) {
            return (
                <div className="instrument-content">
                    <div className="form-group">
                        <label htmlFor="inputInitialInvestment">Вложенные средства</label>
                        <input type="number" className="form-control" id="inputInitialInvestment" placeholder="Введите количесто вложенных средств" required="required" step="0.01" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputRate">Процентная ставка(%)</label>
                        <input type="number" className="form-control" id="inputRate" placeholder="Введите ставку" required="required" step="0.01" />
                    </div>
                    <div className="periods">
                        <div className="form-row">
                            <label className="col-5" htmlFor="inputPeriod1">Период 1</label>
                            <input type="number" className="cashFlow form-control col-5" id="inputPeriod1" placeholder="Введите денежный поток" required="required" />
                            <span className="delete-btn col-2"><button id="deletePeriod1" onClick={(e) => this.deletePeriod(e)}>Удалить период</button></span>
                        </div>
                    </div>
                    <div className="buttons form-row">
                        <button className="col-3" onClick={this.addPeriod}>Добавить период</button>
                        <button onClick={this.getRequest} type="submit" className="btn btn-primary col-3">Отправить</button>
                    </div>
                </div>
            );
        }
        else {
            return (
                <div className="instrument-content">
                    <div className="form-group">
                        <label htmlFor="inputInitialInvestment">Вложенные средства</label>
                        <input type="number" className="form-control" id="inputInitialInvestment" placeholder="Введите количесто вложенных средств" required="required" step="0.01" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputRate">Процентная ставка(%)</label>
                        <input type="number" className="form-control" id="inputRate" placeholder="Введите ставку" required="required" step="0.01" />
                    </div>
                    <div className="periods">
                        <div className="form-row">
                            <label className="col-5" htmlFor="inputPeriod1">Период 1</label>
                            <input type="number" className="cashFlow form-control col-5" id="inputPeriod1" placeholder="Введите денежный поток" required="required" />
                            <span className="delete-btn col-2"><button id="deletePeriod1" onClick={(e) => this.deletePeriod(e)}>Удалить период</button></span>
                        </div>
                    </div>
                    <div className="buttons form-row">
                        <button className="col-3" onClick={this.addPeriod}>Добавить период</button>
                        <button onClick={this.getRequest} type="submit" className="btn btn-primary col-3">Отправить</button>
                    </div>
                    <p>Ваш ответ:   {this.state.answer}</p>
                </div>
            );
        }
    }
}

