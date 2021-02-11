import { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Link } from 'react-router-dom';

import Main from './main.component';
import InstrumentComponent from './instruments.component';
import TheoryComponent from './theory.component';
import Currency from './currency.component';
import Quotes from './quotes.component';
import Crypto from './crypto.component';

export default class Navbar extends Component {

    render() {
        return (
            <Router>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <Link to="/" className="navbar-brand">Главная</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link to="/instruments" className="nav-link">Инструменты</Link>
                            </li>
                            <li class="nav-item">
                                <Link to="/theory" className="nav-link">Теория</Link>
                            </li>
                            <li class="nav-item">
                                <Link to="/currency" className="nav-link">Валюта</Link>
                            </li>
                            <li class="nav-item">
                                <Link to="/quotes" className="nav-link">Акции</Link>
                            </li>
                            <li class="nav-item">
                                <Link to="/crypto" className="nav-link">Криптовалюта</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
                <Route exact path="/" component={Main}/>
                <Route exact path="/instruments" component={InstrumentComponent}/>
                <Route exact path="/theory" component={TheoryComponent} />
                <Route exact path="/currency" component={Currency} />
                <Route exact path="/quotes" component={Quotes} />
                <Route exact path="/crypto" component={Crypto} />
            </Router>
        );
    }
}