interface selectionItem {
  label: string;
  value: string;
}

interface FormProps {
  categoryName: string;
  callback: typeof ComponentCallback;
  maxQuantity?: number;

  //Temporarily optional, will be implemented later
  models?: PcComponent[];
}

interface PcComponent {
  model: string;

  //Consumption per hour in kWh
  consumption: number;

  //Income per hour in USD
  income: number;
}

interface PcComponentChosen extends PcComponent {
  quantity: number;
}

declare function ComponentCallback(data: PcComponentChosen): void;
