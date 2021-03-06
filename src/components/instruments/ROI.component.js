import { Component } from 'react';

export default class ROI extends Component {
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
            "invested": +document.getElementById("invested").value,
            "returned": +document.getElementById("returned").value
        }
    }

    async getRequest(){
        let obj = await this.getParams();
        this.setState({ queryObj: obj });
        console.log(this.state.queryObj);

        const request = require('request')

        request.post(
            'http://localhost:5000/materials/instruments/ROI',
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
                        <label for="invested">Объем инвестиций</label>
                        <input type="number" className="form-control" id="invested" placeholder="Введите объем инвестиций" required="required" step="0.01" />
                    </div>
                    <div className="form-group">
                        <label for="inputNumOfPeriods">Чистая прибыль</label>
                        <input type="number" className="form-control" id="returned" placeholder="Введите чистую прибыль" required="required" />
                    </div>
                    <button onClick={this.getRequest} type="submit" class="btn btn-primary">Отправить</button>
                </div>
            );
        }
        else{
            return (
                <div className="instrument-content">
                    <div className="form-group">
                        <label for="invested">Объем инвестиций</label>
                        <input type="number" className="form-control" id="invested" placeholder="Введите объем инвестиций" required="required" step="0.01" />
                    </div>
                    <div className="form-group">
                        <label for="inputNumOfPeriods">Чистая прибыль</label>
                        <input type="number" className="form-control" id="returned" placeholder="Введите чистую прибыль" required="required" />
                    </div>
                    <button onClick={this.getRequest} type="submit" class="btn btn-primary">Отправить</button>
                    <p>Ваш ответ:   {this.state.answer}%</p>
                </div>
            );
        }
    }
}
