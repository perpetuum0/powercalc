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
          {JSON.stringify(this.state) /*For testing purposes*/}
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
