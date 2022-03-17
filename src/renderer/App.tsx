import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/App.css';
import Form from './Form';
import React from 'react';
import getComponentsList from './parser';

class Main extends React.Component {
  constructor(props: any) {
    super(props);

    this.state = {};
  }

  gpuCallback = (gpu: PComponentChosen) => {
    this.setState({ gpu });
  };
  cpuCallback = (cpu: PComponentChosen) => {
    this.setState({ cpu });
  };
  hddCallback = (hdd: PComponentChosen) => {
    this.setState({ hdd });
  };
  psuCallback = (psu: PComponentChosen) => {
    this.setState({ psu });
  };
  ramCallback = (ram: PComponentChosen) => {
    this.setState({ ram });
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
