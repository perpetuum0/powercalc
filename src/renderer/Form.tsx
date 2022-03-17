import React from 'react';
import Select from 'react-select';
import './styles/Form.css';
import { log } from '../logger';

const createOptions = (options: any) => {
  if (options) {
    return options.map((option: any) => {
      return { value: option, label: option };
    });
  }
};

const createOptionsModels = (options: PComponent[]) => {
  return options.map((option: any) => {
    return { value: option['model'], label: option['model'] };
  });
};

class Form extends React.Component<FormProps, FormState> {
  constructor(props: FormProps) {
    super(props);

    let brands = [];
    for (let brand in props.componentsList) {
      brands.push(brand);
    }

    this.state = {
      brandValue: brands[0],
      quantityValue: 1,
      modelValue: '',

      brands,
      models: [],
    };
  }

  callbackChosen = () => {
    //Timeout to avoid state being one step behind
    setTimeout(() => {
      let compList = this.props.componentsList[this.state.brandValue];
      let compIndex = 0;

      for (let i = 0; i < compList.length; i++) {
        if (compList[i]['model'] === this.state.modelValue) {
          compIndex = i;
        }
      }

      let chosen = compList[compIndex] as PComponentChosen;
      chosen['quantity'] = this.state.quantityValue;

      this.props.callback(chosen);
    }, 5);
  };

  handleModelChange = (selected: any) => {
    this.setState({ modelValue: selected.value });
    this.callbackChosen();
    log('Model changed in ' + this.props.categoryName);
  };

  handleQuantityChange = (ev: any) => {
    this.setState({ quantityValue: Number(ev.target.value) });
    this.callbackChosen();
    log('Quantity changed in ' + this.props.categoryName);
  };

  handleBrandChange = (selected: any) => {
    console.log(Date.now());
    this.setState({ brandValue: selected.value });
    this.modelSelectDisabled = false;
    log('Brand changed in ' + this.props.categoryName);
  };

  modelSelectDisabled = true;
  render() {
    const brandOptions = createOptions(this.state.brands);
    const modelOptions = createOptionsModels(
      this.props.componentsList[this.state.brandValue]
    );

    return (
      <div className="form">
        <h1 className="form__header">{this.props.categoryName}</h1>
        <div className="form__selects-div">
          <Select
            className="form__selects-div__select-brand"
            onChange={this.handleBrandChange}
            isSearchable={false}
            placeholder="Brand"
            menuPlacement="auto"
            options={brandOptions}
          />

          <Select
            className="form__selects-div__select-model"
            onChange={this.handleModelChange}
            isSearchable={true}
            isDisabled={this.modelSelectDisabled}
            placeholder="Model"
            menuPlacement="auto"
            options={modelOptions}
          />
        </div>
        <div className="form__quantity-div">
          <h3 className="form__quantity-div__multiplier">X</h3>
          <input
            className="form__quantity-div__select-quantity"
            type="number"
            onInput={this.handleQuantityChange}
            placeholder="Qt."
            defaultValue={1}
            min={1}
            max={this.props.maxQuantity || 12}
          />
        </div>
      </div>
    );
  }
}

export default Form;
