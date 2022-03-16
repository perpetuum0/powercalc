import React from 'react';
import Select from 'react-select';
import './styles/Form.css';

const testGpuBrands = [
  { value: 'nvidia', label: 'NVIDIA' },
  { value: 'amd', label: 'AMD' },
];

const testModels = [
  { value: 'nvidia-tesla-k80', label: 'Tesla K80' },
  { value: 'nvidia-tesla-p100', label: 'Tesla P100' },
  { value: 'nvidia-tesla-v100', label: 'Tesla V100' },
];

class Form extends React.Component<FormProps, {}> {
  constructor(props: FormProps) {
    super(props);

    this.state = {
      brands: '',
      currentBrand: '',
      currentModel: '',
      currentQuantity: 1,
    };
  }

  render() {
    //TODO: Separate PcComponents into different arrays for each brand
    //TODO: Implement onChange to the inputs
    //TODO: Implement brand influence on model selection
    return (
      <div className="form">
        <div className="form__selects-div">
          <Select
            className="form__selects-div__select-brand"
            onChange={(e) => {}}
            isSearchable={false}
            placeholder="Brand"
            options={testGpuBrands} // for testing purposes
          />

          <Select
            className="form__selects-div__select-model"
            onChange={(e) => {}}
            isSearchable={true}
            placeholder={'Model'}
            options={testModels} // for testing purposes
          />

          <input
            className="form__selects-div__select-quantity"
            onChange={(e) => {}}
            type="number"
            placeholder="Qt."
            min={0}
            max={this.props.maxQuantity || 12}
          />
        </div>

        <h1>{this.props.categoryName}</h1>
      </div>
    );
  }
}

export default Form;
