interface selectionItem {
  label: string;
  value: string;
}

interface FormProps {
  categoryName: string;
  callback: typeof ComponentCallback;
  maxQuantity?: number;

  //Temporarily optional, will be implemented later
  components?: PComponent[];
}

interface PComponent {
  model: string;

  //Consumption per hour in kWh
  consumption: number;

  //Income per hour in USD
  income: number;
}

interface PComponentChosen extends PComponent {
  quantity: number;
}

type PComponentsList = { [brand: string]: PComponent[] };

declare function ComponentCallback(data: PComponentChosen): void;

type PartTypes = 'gpu' | 'cpu' | 'hdd' | 'ram' | 'psu';
