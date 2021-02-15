import { Component } from 'react';

export default class PV extends Component {
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
        let FV = +document.getElementById("inputFV").value;
        let numOfPeriods = +document.getElementById("inputNumOfPeriods").value;
        let rate = +document.getElementById("inputRate").value;
        return {
            "FV": FV,
            "numOfPeriods": numOfPeriods,
            "rate": rate
        }
    }

    async getRequest(){
        let obj = await this.getParams();
        this.setState({ queryObj: obj });
        console.log(this.state.queryObj);

        const request = require('request')

        request.post(
            'http://localhost:5000/materials/instruments/PV',
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
        if(!this.state.answer){
            return (
                <div className="instrument-content">
                    <div className="form-group">
                        <label for="inputFV">Ожидаемая стоимость</label>
                        <input type="number" className="form-control" id="inputFV" placeholder="Введите ожидаемую стоимость" required="required" step="0.01" />
                    </div>
                    <div className="form-group">
                        <label for="inputNumOfPeriods">Количество периодов</label>
                        <input type="number" className="form-control" id="inputNumOfPeriods" placeholder="Введите количество периодов" required="required" />
                    </div>
                    <div className="form-group">
                        <label for="inputRate">Процентная ставка</label>
                        <input type="number" className="form-control" id="inputRate" placeholder="Введите ставку" required="required" step="0.01" />
                    </div>
                    <button onClick={this.getRequest} type="submit" class="btn btn-primary">Отправить</button>
                </div>
            );
        }
        else{
            return (
                <div className="instrument-content">
                    <div className="form-group">
                        <label for="inputFV">Ожидаемая стоимость</label>
                        <input type="number" className="form-control" id="inputFV" placeholder="Введите ожидаемую стоимость" required="required" step="0.01" />
                    </div>
                    <div className="form-group">
                        <label for="inputNumOfPeriods">Количество периодов</label>
                        <input type="number" className="form-control" id="inputNumOfPeriods" placeholder="Введите количество периодов" required="required" />
                    </div>
                    <div className="form-group">
                        <label for="inputRate">Процентная ставка</label>
                        <input type="number" className="form-control" id="inputRate" placeholder="Введите ставку" required="required" step="0.01" />
                    </div>
                    <button onClick={this.getRequest} type="submit" class="btn btn-primary">Отправить</button>
                    <p>Ваш ответ:   {this.state.answer}</p>
                </div>
            );
        }
    }
}

