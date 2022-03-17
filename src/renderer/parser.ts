import Papa from 'papaparse';
import fs from 'fs';

const parse = (partType: PartTypes): PComponent[] => {
  const data = fs.readFileSync(`./assets/data/db_${partType}.csv`).toString();
  const db = Papa.parse(data);

  const compArr: PComponent[] = [];
  db.data.forEach((row: any, i) => {
    compArr[i] = {
      model: row[0],
      costPerKwh: Number(row[1]),
      incomePerHour: Number(row[2]),
    };
  });

  return compArr;
};

const splitBrands = (
  components: PComponent[],
  brandPlace: number,
  multiWordedBrands: string[] = []
): PComponentsList => {
  let list = {} as PComponentsList;

  components.forEach((comp) => {
    let brand = '';

    //Check if the brand is a multi-worded brand
    multiWordedBrands.forEach((multiWordedBrand) => {
      if (comp.model.includes(multiWordedBrand)) {
        brand = multiWordedBrand;
      }
    });

    //If brand is not a multi-worded brand, use brandPLace
    if (!brand) brand = comp.model.split(' ')[brandPlace];

    //If brand is not in the list, add it
    if (list.hasOwnProperty(brand)) {
      list[brand].push(comp);
    } else {
      list[brand] = [comp];
    }
  });

  return list;
};

const separateByBrand = (
  partType: PartTypes,
  components: PComponent[]
): PComponentsList => {
  // Brand separation is hard coded because of unstructured data in the database.
  switch (partType) {
    case 'gpu':
    case 'cpu':
      return splitBrands(components, 0);

    case 'ram':
      return splitBrands(components, 4);

    case 'hdd':
      return splitBrands(components, 3, ['Western Digital']);
    case 'psu':
      return splitBrands(components, 2, ['be quiet!', 'Cooler Master']);
  }
};

const getComponentsList = (partType: PartTypes): PComponentsList => {
  const components = parse(partType);
  const compList = separateByBrand(partType, components);
  return compList;
};

export default getComponentsList;
