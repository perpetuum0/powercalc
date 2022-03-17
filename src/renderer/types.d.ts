interface selectionItem {
  label: string;
  value: string;
}

interface MainProps {}
interface MainState {
  cpuChosen: PComponentChosen;
  gpuChosen: PComponentChosen;
  ramChosen: PComponentChosen;
  hddChosen: PComponentChosen;
  psuChosen: PComponentChosen;
}

interface FormProps {
  categoryName: string;
  callback: typeof ComponentCallback;
  maxQuantity?: number;
  componentsList: PComponentsList;
}
interface FormState {
  brandValue: string;
  modelValue: string;
  quantityValue: number;

  brands: string[];
  models: PComponent[] | {};
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
