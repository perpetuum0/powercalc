import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/App.css';
import Form from './Form';
import React from 'react';
import getComponentsList from './parser';

class Main extends React.Component<MainProps, MainState> {
  constructor(props: any) {
    super(props);

    this.state = {
      cpuChosen: {} as PComponentChosen,
      gpuChosen: {} as PComponentChosen,
      ramChosen: {} as PComponentChosen,
      hddChosen: {} as PComponentChosen,
      psuChosen: {} as PComponentChosen,

      costPerKwh: {} as Periods,
      incomePerHour: {} as Periods,
    };
  }

  gpuCallback = (gpuChosen: PComponentChosen) => {
    this.setState({ gpuChosen });
  };
  cpuCallback = (cpuChosen: PComponentChosen) => {
    this.setState({ cpuChosen });
  };
  hddCallback = (hddChosen: PComponentChosen) => {
    this.setState({ hddChosen });
  };
  psuCallback = (psuChosen: PComponentChosen) => {
    this.setState({ psuChosen });
  };
  ramCallback = (ramChosen: PComponentChosen) => {
    this.setState({ ramChosen });
  };

  calculateResults = () => {
    const parts = [
      'cpuChosen',
      'gpuChosen',
      'ramChosen',
      'hddChosen',
      'psuChosen',
    ];

    let totalCostPerKwh = 0,
      totalIncomePerHour = 0;
    parts.forEach((component) => {
      totalCostPerKwh +=
        this.state[component].costPerKwh * this.state[component].quantity;
      totalIncomePerHour +=
        this.state[component].incomePerHour * this.state[component].quantity;
    });

    this.setState({
      costPerKwh: {
        hourly: Number(totalCostPerKwh.toFixed(2)),
        daily: Math.round(totalCostPerKwh * 24),
        monthly: Math.round(totalCostPerKwh * 720),
        yearly: Math.round(totalCostPerKwh * 8760),
      },

      incomePerHour: {
        hourly: Number(totalIncomePerHour.toFixed(2)),
        daily: Math.round(totalIncomePerHour * 24),
        monthly: Math.round(totalIncomePerHour * 720),
        yearly: Math.round(totalIncomePerHour * 8760),
      },
    });
  };

  render() {
    return (
      <div className="main">
        <Form
          categoryName="GPU"
          callback={this.gpuCallback}
          componentsList={getComponentsList('gpu')}
        />
        <Form
          categoryName="CPU"
          callback={this.cpuCallback}
          componentsList={getComponentsList('cpu')}
        />
        <Form
          categoryName="HDD"
          callback={this.hddCallback}
          componentsList={getComponentsList('hdd')}
        />
        <Form
          categoryName="RAM"
          callback={this.ramCallback}
          componentsList={getComponentsList('ram')}
        />
        <Form
          categoryName="PSU"
          callback={this.psuCallback}
          componentsList={getComponentsList('psu')}
        />
        <div className="results-form">
          <div className="results-container">
            <div>
              <h3 className="results-container__header"> Costs</h3>
              <p>Hourly: {this.state.costPerKwh.hourly || 0}₸</p>
              <p>Daily: {this.state.costPerKwh.daily || 0}₸</p>
              <p>Monthly: {this.state.costPerKwh.monthly || 0}₸</p>
              <p>Yearly: {this.state.costPerKwh.yearly || 0}₸</p>
            </div>
            <div>
              <h3 className="results-container__header"> Income</h3>
              <p>Hourly: {this.state.incomePerHour.hourly || 0}$</p>
              <p>Daily: {this.state.incomePerHour.daily || 0}$</p>
              <p>Monthly: {this.state.incomePerHour.monthly || 0}$</p>
              <p>Yearly: {this.state.incomePerHour.yearly || 0}$</p>
            </div>
          </div>
          <button
            className="results-form__calculate-button"
            onClick={this.calculateResults}
          >
            Calculate!
          </button>
        </div>
      </div>
    );
  }
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </Router>
  );
}
