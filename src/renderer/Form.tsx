import React from 'react';
import Select from 'react-select';
import './styles/Form.css';

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
  };

  handleQuantityChange = (ev: any) => {
    this.setState({ quantityValue: Number(ev.target.value) });
    this.callbackChosen();
  };

  handleBrandChange = (selected: any) => {
    this.setState({ brandValue: selected.value });
    this.modelSelectDisabled = false;
  };

  modelSelectDisabled = true;
  render() {
    const brandOptions = createOptions(this.state.brands);
    const modelOptions = createOptionsModels(
      this.props.componentsList[this.state.brandValue]
    );

    return (
      <div className="form">
        <div className="form__selects-div">
          <Select
            className="form__selects-div__select-brand"
            onChange={this.handleBrandChange}
            isSearchable={false}
            placeholder="Brand"
            options={brandOptions}
          />

          <Select
            className="form__selects-div__select-model"
            onChange={this.handleModelChange}
            isSearchable={true}
            isDisabled={this.modelSelectDisabled}
            placeholder="Model"
            options={modelOptions}
          />

          <input
            className="form__selects-div__select-quantity"
            type="number"
            onInput={this.handleQuantityChange}
            placeholder="Qt."
            defaultValue={1}
            min={1}
            max={this.props.maxQuantity || 12}
          />
        </div>

        <h1>{this.props.categoryName}</h1>
      </div>
    );
  }
}

export default Form;
