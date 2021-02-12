import { Component } from 'react';

export default class Quotes extends Component {
    constructor() {
        super();
        this.state = {
            isLoaded: false,
            data: {},
            startData: [],
            currentQuery: {}
        };

        this.getChecked = this.getChecked.bind(this);
        this.getRequest = this.getRequest.bind(this);
    }

    async componentDidMount() {
        const response = await fetch('http://localhost:5000/quotes/stock');
        const json = await response.json();
        this.setState({ startData: json });
    }

    async getChecked() {
        const tBody = document.getElementById('tableBody');
        const allCheckboxes = tBody.getElementsByClassName('checkboxes');
        let checked = [];
        for (let i of allCheckboxes) {
            if (i.checked) {
                checked.push(i.parentElement.parentElement.id);
            }
        }
        let obj = {};
        for (let i of checked) {
            obj[i] = i;
        }
        return obj;
    }

    async getRequest() {
        let obj = await this.getChecked();
        this.setState({ currentQuery: obj });
        console.log(this.state.currentQuery);


        const request = require('request')

        request.post(
            'http://localhost:5000/quotes/stock',
            {
                json: this.state.currentQuery
            },
            (error, res, body) => {
                if (error) {
                    console.error(error)
                    return
                }
                console.log(`statusCode: ${res.statusCode}`)
                this.setState({data: body, isLoaded: true});
            }
        )
    }

    render() {
        if (!this.state.isLoaded) {
            return (
                <div className="content">
                    <h1>Пожалуйста выберите до 10 акций!</h1>
                    <button onClick={this.getRequest}>Отправить запрос</button>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Тикер</th>
                                <th scope="col">Название компании</th>
                                <th scope="col">Выбрать</th>
                            </tr>
                        </thead>
                        <tbody id="tableBody">
                            {
                                this.state.startData.map(el =>
                                    <tr id={el.key}>
                                        <th scope="row"> {el.key} </th>
                                        <td>{el.value}</td>
                                        <td><input className="checkboxes" type="checkbox"></input></td>
                                    </tr>
                                )}
                        </tbody>
                    </table>
                </div>);
        } else {
            return (
                <div className="content">
                    <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Тикер</th>
                            <th scope="col">Название компании</th>
                            <th scope="col">Цена</th>
                            <th scope="col">Открытие</th>
                            <th scope="col">Максимум дня</th>
                            <th scope="col">Минимум дня</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.data.map(el => 
                                <tr>
                                    <th scope="row"> {el.symbol} </th>
                                    <td>{el.displayName}</td>
                                    <td>{el.regularMarketPrice}</td>
                                    <td>{el.regularMarketOpen}</td>
                                    <td>{el.regularMarketDayHigh}</td>
                                    <td>{el.regularMarketDayLow}</td>
                                </tr>
                            )}
                    </tbody>
                </table>
                </div>
            )
        }
    }
}