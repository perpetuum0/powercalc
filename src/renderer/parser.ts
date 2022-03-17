import Papa from 'papaparse';
import fs from 'fs';

const parse = (partType: PartTypes): PComponent[] => {
  const data = fs.readFileSync(`./assets/data/db_${partType}.csv`).toString();
  const db = Papa.parse(data);

  const compArr: PComponent[] = [];
  db.data.forEach((row: any, i) => {
    compArr[i] = {
      model: row[0],
      consumption: row[1],
      income: row[2],
    };
  });

  return compArr;
};

//TODO: Implement separateByBrand
const separateByBrand = (partType: PartTypes, components: PComponent[]) => {
  // Brand separation is hard coded, because of unstructured data in the database.
  switch (partType) {
    case 'gpu':
      break;
    case 'cpu':
      break;
    case 'hdd':
      break;
    case 'ram':
      break;
    case 'psu':
      break;
  }

  return {};
};

const getComponentsList = (partType: PartTypes): PComponentsList => {
  const components = parse(partType);
  const compList = separateByBrand(partType, components);
  return compList;
};

export default getComponentsList;
