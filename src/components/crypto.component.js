import { Component } from 'react';
import "./css/crypto.css";

export default class Crypto extends Component {
    constructor() {
        super();
        this.state = { coins: [] };
    }

    async componentDidMount() {
        const response = await fetch('http://localhost:5000/quotes/crypto');
        const json = await response.json();
        this.setState({ coins: json });
    }

    render() {
        return (
            <div className="content">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Ранг</th>
                            <th scope="col">Тикер</th>
                            <th scope="col">Название</th>
                            <th scope="col">Цена(USD)</th>
                            <th scope="col">Изменение % (24 ч.)</th>
                            <th scope="col">Сайт</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.coins.map(el => 
                                <tr>
                                    <th scope="row"> {el.rank} </th>
                                    <td>{el.symbol}</td>
                                    <td>{el.name}</td>
                                    <td>{el.price}</td>
                                    <td>{el.change}</td>
                                    <td><a href={el.websiteUrl}>Ссылка</a></td>
                                </tr>
                            )}
                    </tbody>
                </table>
            </div>
        );
    }
}