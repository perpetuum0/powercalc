import React from 'react';
import Select from 'react-select';
import './styles/Form.css';

const createOptionsBrands = (options: any) => {
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

  //TODO: implement callbacks on Model and Quantity changes.
  handleModelChange = (selected: any) => {
    this.setState({ modelValue: selected.value });
  };

  handleBrandChange = (selected: any) => {
    this.setState({ brandValue: selected.value });
  };

  handleQuantityChange = (event: any) => {
    this.setState({ quantityValue: event.target.value });
  };

  render() {
    const brandOptions = createOptionsBrands(this.state.brands);
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
            placeholder="Model"
            options={modelOptions}
          />

          <input
            className="form__selects-div__select-quantity"
            onChange={this.handleQuantityChange}
            type="number"
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
