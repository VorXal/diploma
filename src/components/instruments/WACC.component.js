import { Component } from 'react';

export default class WACC extends Component {
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
            "marketValueOfEquity": +document.getElementById("marketValueOfEquity").value,
            "marketValueOfDebt": +document.getElementById("marketValueOfDebt").value,
            "costOfEquity": +document.getElementById("costOfEquity").value,
            "costOfDebt": +document.getElementById("costOfDebt").value,
            "taxRate": +document.getElementById("taxRate").value
        }
    }

    async getRequest() {
        let obj = await this.getParams();
        this.setState({ queryObj: obj });
        console.log(this.state.queryObj);

        const request = require('request')

        request.post(
            'http://localhost:5000/materials/instruments/WACC',
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
                        <label for="marketValueOfEquity">Всего собственного капитала</label>
                        <input type="number" className="form-control" id="marketValueOfEquity" placeholder="Введите объем собственного капитала" required="required" step="0.01" />
                    </div>
                    <div className="form-group">
                        <label for="marketValueOfDebt">Всего заемных средств</label>
                        <input type="number" className="form-control" id="marketValueOfDebt" placeholder="Введите объем заемных средств" required="required" step="0.01" />
                    </div>
                    <div className="form-group">
                        <label for="costOfEquity">Требуемая или ожидаемая доходность от собственного капитала (%)</label>
                        <input type="number" className="form-control" id="costOfEquity" placeholder="Введите значение доходности" required="required" step="0.01" />
                    </div>
                    <div className="form-group">
                        <label for="costOfDebt">Требуемая или ожидаемая доходность от заемного капитала (%)</label>
                        <input type="number" className="form-control" id="costOfDebt" placeholder="Введите значение доходности" required="required" step="0.01" />
                    </div>
                    <div className="form-group">
                        <label for="taxRate">Ставка налога на прибыль (%)</label>
                        <input type="number" className="form-control" id="taxRate" placeholder="Введите ставку налога на прибыль" required="required" step="0.01" />
                    </div>
                    <button onClick={this.getRequest} type="submit" class="btn btn-primary">Отправить</button>
                </div>
            );
        }
        else {
            return (
                <div className="instrument-content">
                    <div className="form-group">
                        <label for="marketValueOfEquity">Всего собственного капитала</label>
                        <input type="number" className="form-control" id="marketValueOfEquity" placeholder="Введите объем собственного капитала" required="required" step="0.01" />
                    </div>
                    <div className="form-group">
                        <label for="marketValueOfDebt">Всего заемных средств</label>
                        <input type="number" className="form-control" id="marketValueOfDebt" placeholder="Введите объем заемных средств" required="required" step="0.01" />
                    </div>
                    <div className="form-group">
                        <label for="costOfEquity">Требуемая или ожидаемая доходность от собственного капитала (%)</label>
                        <input type="number" className="form-control" id="costOfEquity" placeholder="Введите значение доходности" required="required" step="0.01" />
                    </div>
                    <div className="form-group">
                        <label for="costOfDebt">Требуемая или ожидаемая доходность от заемного капитала (%)</label>
                        <input type="number" className="form-control" id="costOfDebt" placeholder="Введите значение доходности" required="required" step="0.01" />
                    </div>
                    <div className="form-group">
                        <label for="taxRate">Ставка налога на прибыль (%)</label>
                        <input type="number" className="form-control" id="taxRate" placeholder="Введите ставку налога на прибыль" required="required" step="0.01" />
                    </div>
                    <button onClick={this.getRequest} type="submit" class="btn btn-primary">Отправить</button>
                    <p>Ваш ответ:   {this.state.answer}</p>
                </div>
            );
        }
    }
}