import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/App.css';
import Form from './Form';
import React from 'react';
import './parser';

class Main extends React.Component {
  constructor(props: any) {
    super(props);

    this.state = {};
  }

  gpuCallback = (gpu: PcComponentChosen) => {
    this.setState({ gpu });
  };
  cpuCallback = (cpu: PcComponentChosen) => {
    this.setState({ cpu });
  };
  hddCallback = (hdd: PcComponentChosen) => {
    this.setState({ hdd });
  };
  psuCallback = (psu: PcComponentChosen) => {
    this.setState({ psu });
  };
  ramCallback = (ram: PcComponentChosen) => {
    this.setState({ ram });
  };

  render() {
    return (
      <div className="main">
        <Form categoryName="GPU" callback={this.gpuCallback} />
        <Form categoryName="CPU" callback={this.cpuCallback} />
        <Form categoryName="HDD" callback={this.hddCallback} />
        <Form categoryName="PSU" callback={this.psuCallback} />
        <Form categoryName="RAM" callback={this.ramCallback} />
        <div className="results-container">Here will be the results:</div>
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
