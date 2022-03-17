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

  gpuCallback = (gpuChosen: PComponentChosen) => {
    this.setState({ gpuChosen });
    this.calculateResults();
  };
  cpuCallback = (cpuChosen: PComponentChosen) => {
    this.setState({ cpuChosen });
    this.calculateResults();
  };
  hddCallback = (hddChosen: PComponentChosen) => {
    this.setState({ hddChosen });
    this.calculateResults();
  };
  psuCallback = (psuChosen: PComponentChosen) => {
    this.setState({ psuChosen });
    this.calculateResults();
  };
  ramCallback = (ramChosen: PComponentChosen) => {
    this.setState({ ramChosen });
    this.calculateResults();
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
          categoryName="PSU"
          callback={this.psuCallback}
          componentsList={getComponentsList('psu')}
        />
        <Form
          categoryName="RAM"
          callback={this.ramCallback}
          componentsList={getComponentsList('ram')}
        />
        <div className="results-container">
          <p>
            <h3>Expenses:</h3>
            <p>Hourly: {this.state.costPerKwh.hourly || ''}</p>
            <p>Daily: {this.state.costPerKwh.daily || ''}</p>
            <p>Monthly: {this.state.costPerKwh.monthly || ''}</p>
            <p>Yearly: {this.state.costPerKwh.yearly || ''}</p>
          </p>
          <p>
            <h3>Income:</h3>
            <p>Hourly: {this.state.incomePerHour.hourly || ''}</p>
            <p>Daily: {this.state.incomePerHour.daily || ''}</p>
            <p>Monthly: {this.state.incomePerHour.monthly || ''}</p>
            <p>Yearly: {this.state.incomePerHour.yearly || ''}</p>
          </p>
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
