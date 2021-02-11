import { Component } from 'react';

export default class Navbar extends Component {

    render() {
        return (
            <div className="mainInfo">
                <p>Добро пожаловать в самое лучшее приложение для расчетов и отслеживаний котировок по мнению Воронкова Алексея</p>
                <p>Здесь вы можете:</p>
                <ul>
                    <li>Воспользоваться <a href="/instruments">инструментами</a></li>
                    <li>Узнать полезную <a href="/theory">теорию</a></li>
                    <li>Посмотреть актуальную стоимость <a href="/currency">валюты</a></li>
                    <li>Узнать стоимость <a href="/quotes">акций</a> из списка компаний <a href="https://ru.wikipedia.org/wiki/S%26P_500">S&P 500</a></li>
                    <li>Проверить актуальную цену на <a href="/crypto">криптовалюту</a></li>
                </ul>
                
            </div>

        );
    }
}