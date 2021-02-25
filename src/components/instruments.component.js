import { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Link } from 'react-router-dom';

import PV from './instruments/PV.component';
import FV from './instruments/FV.component';
import NPV from './instruments/NPV.component';
import PP from './instruments/PP.component';
import ROI from './instruments/ROI.component';
import R72 from './instruments/R72.component';
import AM from './instruments/AM.component';
import PI from './instruments/PI.component';
import DF from './instruments/DF.component';
import CI from './instruments/CI.component';
import CAGR from './instruments/CAGR.component';
import LR from './instruments/LR.component';
import WACC from './instruments/WACC.component';
import PMT from './instruments/PMT.component';
import IAR from './instruments/IAR.component';

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
                    <Route exact path="/instruments/PP" component={PP}/>
                    <Route exact path="/instruments/ROI" component={ROI}/>
                    <Route exact path="/instruments/R72" component={R72}/>
                    <Route exact path="/instruments/AM" component={AM}/>
                    <Route exact path="/instruments/PI" component={PI}/>
                    <Route exact path="/instruments/DF" component={DF}/>
                    <Route exact path="/instruments/CI" component={CI}/>
                    <Route exact path="/instruments/CAGR" component={CAGR}/>
                    <Route exact path="/instruments/LR" component={LR}/>
                    <Route exact path="/instruments/WACC" component={WACC}/>
                    <Route exact path="/instruments/PMT" component={PMT}/>
                    <Route exact path="/instruments/IAR" component={IAR}/>
                </Router>
            </div>
        );
    }
}