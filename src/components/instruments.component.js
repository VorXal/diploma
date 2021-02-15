import { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Link } from 'react-router-dom';

import PV from './instruments/PV.component';
import FV from './instruments/FV.component';
import NPV from './instruments/NPV.component';
import IRR from './instruments/IRR.component';
import PP from './instruments/PP.component';
import ROI from './instruments/ROI.component';

export default class Instruments extends Component {

    render() {
        return (
            <div className="content">
                <Router>
                    <div className="card-columns">
                        <div className="card bg-light">
                            <div className="card-body text-center">
                                <Link to="/instruments/PV" className="card-text">Дисконтированная стоимость (Present Value)</Link>
                            </div>
                        </div>
                        <div className="card bg-light">
                            <div className="card-body text-center">
                                <Link to="/instruments/FV" className="card-text">Будущая стоимость (Future Value)</Link>
                            </div>
                        </div>
                        <div className="card bg-light">
                            <div className="card-body text-center">
                                <Link to="/instruments/NPV" className="card-text">Чистая приведённая стоимость (Net Present Value)</Link>
                            </div>
                        </div>
                        <div className="card bg-light">
                            <div className="card-body text-center">
                                <Link to="/instruments/IRR" className="card-text">Внутренняя норма доходности (Internal Rate of Return)</Link>
                            </div>
                        </div>
                        <div className="card bg-light">
                            <div className="card-body text-center">
                                <Link to="/instruments/PP" className="card-text">Срок окупаемости (Payback Period)</Link>
                            </div>
                        </div>
                        <div className="card bg-light">
                            <div className="card-body text-center">
                                <Link to="/instruments/ROI" className="card-text">Коэффициент возврата инвестиций (Return On Investment)</Link>
                            </div>
                        </div>
                        <div className="card bg-light">
                            <div className="card-body text-center">
                                <Link to="/instruments/R72" className="card-text">Правило 72 (Rule 72)</Link>
                            </div>
                        </div>
                        <div className="card bg-light">
                            <div className="card-body text-center">
                                <Link to="/instruments/AM" className="card-text">Амортизация (Amortiztion)</Link>
                            </div>
                        </div>
                        <div className="card bg-light">
                            <div className="card-body text-center">
                                <Link to="/instruments/PI" className="card-text">Индекс доходности (Profitability Index)</Link>
                            </div>
                        </div>
                        <div className="card bg-light">
                            <div className="card-body text-center">
                                <Link to="/instruments/DF" className="card-text">Коэффициент дисконтирования (Discount Factor)</Link>
                            </div>
                        </div>
                        <div className="card bg-light">
                            <div className="card-body text-center">
                                <Link to="/instruments/CI" className="card-text">Сложные проценты (Compound Interest)</Link>
                            </div>
                        </div>
                        <div className="card bg-light">
                            <div className="card-body text-center">
                                <Link to="/instruments/CAGR" className="card-text">Совокупный среднегодовой темп роста(Compound Annual Growth Rate)</Link>
                            </div>
                        </div>
                        <div className="card bg-light">
                            <div className="card-body text-center">
                                <Link to="/instruments/LR" className="card-text">Финансовый рычаг (Leverage Ratio)</Link>
                            </div>
                        </div>
                        <div className="card bg-light">
                            <div className="card-body text-center">
                                <Link to="/instruments/WACC" className="card-text">Средневзвешенная стоимость капитала (Weight Average Cost of Capital)</Link>
                            </div>
                        </div>
                        <div className="card bg-light">
                            <div className="card-body text-center">
                                <Link to="/instruments/PMT" className="card-text">Платеж по кредиту (Loan Payment)</Link>
                            </div>
                        </div>
                        <div className="card bg-light">
                            <div className="card-body text-center">
                                <Link to="/instruments/IAR" className="card-text">Инфляция инвестиций (Investment Inflation)</Link>
                            </div>
                        </div>
                    </div>

                    <Route exact path="/instruments/PV" component={PV}/>
                    <Route exact path="/instruments/FV" component={FV}/>
                    <Route exact path="/instruments/NPV" component={NPV}/>
                    <Route exact path="/instruments/IRR" component={IRR}/>
                    <Route exact path="/instruments/PP" component={PP}/>
                    <Route exact path="/instruments/ROI" component={ROI}/>
                </Router>
            </div>
        );
    }
}