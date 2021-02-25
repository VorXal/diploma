import { Component } from 'react';

export default class PMT extends Component {
    constructor() {
        super();
        this.state = {
            queryObj: {},
            answer: null
        }

        this.getParams = this.getParams.bind(this);
        this.getRequest = this.getRequest.bind(this);
    }

    async getParams() {
        return {
            "rate": +document.getElementById("rate").value,
            "numOfPayments": +document.getElementById("numOfPayments").value,
            "principal": +document.getElementById("principal").value
        }
    }

    async getRequest() {
        let obj = await this.getParams();
        this.setState({ queryObj: obj });
        console.log(this.state.queryObj);

        const request = require('request')

        request.post(
            'http://localhost:5000/materials/instruments/PMT',
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

    render() {
        if (!this.state.answer) {
            return (
                <div className="instrument-content">
                    <div className="form-group">
                        <label for="rate">Процентная ставка (%)</label>
                        <input type="number" className="form-control" id="rate" placeholder="Введите процентную ставку" required="required" step="0.01" />
                    </div>
                    <div className="form-group">
                        <label for="numOfPayments">Количество взносов (в месяцах)</label>
                        <input type="number" className="form-control" id="numOfPayments" placeholder="Введите количество взносов" required="required" step="0.01" />
                    </div>
                    <div className="form-group">
                        <label for="principal">Сумма займа</label>
                        <input type="number" className="form-control" id="principal" placeholder="Введите сумму займа" required="required" step="0.01" />
                    </div>
                    <button onClick={this.getRequest} type="submit" class="btn btn-primary">Отправить</button>
                </div>
            );
        }
        else {
            return (
                <div className="instrument-content">
                    <div className="form-group">
                        <label for="rate">Процентная ставка (%)</label>
                        <input type="number" className="form-control" id="rate" placeholder="Введите процентную ставку" required="required" step="0.01" />
                    </div>
                    <div className="form-group">
                        <label for="numOfPayments">Количество взносов (в месяцах)</label>
                        <input type="number" className="form-control" id="numOfPayments" placeholder="Введите количество взносов" required="required" step="0.01" />
                    </div>
                    <div className="form-group">
                        <label for="principal">Сумма займа</label>
                        <input type="number" className="form-control" id="principal" placeholder="Введите сумму займа" required="required" step="0.01" />
                    </div>
                    <button onClick={this.getRequest} type="submit" class="btn btn-primary">Отправить</button>
                    <p>Ваш ответ:   {this.state.answer}</p>
                </div>
            );
        }
    }
}