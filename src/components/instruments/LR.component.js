import { Component } from 'react';

export default class LR extends Component {
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
            "totalDebts": +document.getElementById("totalDebts").value,
            "totalIncome": +document.getElementById("totalIncome").value
        }
    }

    async getRequest() {
        let obj = await this.getParams();
        this.setState({ queryObj: obj });
        console.log(this.state.queryObj);

        const request = require('request')

        request.post(
            'http://localhost:5000/materials/instruments/LR',
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
                        <label for="totalDebts">Заемный капитал</label>
                        <input type="number" className="form-control" id="totalDebts" placeholder="Введите первоначальную стоимость" required="required" step="0.01" />
                    </div>
                    <div className="form-group">
                        <label for="totalIncome">Собственный капитал</label>
                        <input type="number" className="form-control" id="totalIncome" placeholder="Введите конечную стоимость" required="required" step="0.01" />
                    </div>
                    <button onClick={this.getRequest} type="submit" class="btn btn-primary">Отправить</button>
                </div>
            );
        }
        else {
            return (
                <div className="instrument-content">
                    <div className="form-group">
                        <label for="totalDebts">Заемный капитал</label>
                        <input type="number" className="form-control" id="totalDebts" placeholder="Введите первоначальную стоимость" required="required" step="0.01" />
                    </div>
                    <div className="form-group">
                        <label for="totalIncome">Собственный капитал</label>
                        <input type="number" className="form-control" id="totalIncome" placeholder="Введите конечную стоимость" required="required" step="0.01" />
                    </div>
                    <button onClick={this.getRequest} type="submit" class="btn btn-primary">Отправить</button>
                    <p>Ваш ответ:   {this.state.answer}</p>
                </div>
            );
        }
    }
}