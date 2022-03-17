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
const separateByBrand = (
  partType: PartTypes,
  components: PComponent[]
): PComponentsList => {
  // Brand separation is hard coded because of unstructured data in the database.
  let list = {} as PComponentsList;
  switch (partType) {
    case 'gpu':
      components.forEach((comp) => {
        let brand = comp.model.split(' ')[0];
        if (list.hasOwnProperty(brand)) {
          list[brand].push(comp);
        } else {
          list[brand] = [comp];
        }
      });
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

  return list;
};

const getComponentsList = (partType: PartTypes): PComponentsList => {
  const components = parse(partType);
  const compList = separateByBrand(partType, components);
  return compList;
};

export default getComponentsList;
