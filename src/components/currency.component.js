import { Component } from 'react';

export default class Currency extends Component {
    constructor() {
        super();
        this.state = { data: [] };
    }

    async componentDidMount() {
        const response = await fetch('http://localhost:5000/quotes/currency');
        const json = await response.json();
        this.setState({ data: json });
    }



    render() {
        return (
            <div className="content">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Валюта</th>
                            <th scope="col">Стоимость в USD</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.data.map(el =>
                                <tr>
                                    <th scope="row"> {el.key} </th>
                                    <td>{el.value}</td>
                                </tr>
                            )}
                    </tbody>
                </table>
            </div>
        );
    }
}