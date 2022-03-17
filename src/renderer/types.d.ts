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

  costPerKwh: Periods;
  incomePerHour: Periods;
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
  costPerKwh: number;

  //Income per hour in USD
  incomePerHour: number;
}
interface PComponentChosen extends PComponent {
  quantity: number;
}

type PComponentsList = { [brand: string]: PComponent[] };

declare function ComponentCallback(data: PComponentChosen): void;

type PartTypes = 'gpu' | 'cpu' | 'hdd' | 'ram' | 'psu';

interface Periods {
  hourly: number;
  daily: number;
  monthly: number;
  yearly: number;
}
