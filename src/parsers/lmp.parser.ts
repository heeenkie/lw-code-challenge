import { LmpModel } from '../models/lmp.model';
import { MyLmpModel } from '../models/my-lmp.model';

export function parseLmp(response: LmpModel): MyLmpModel {
  const result: MyLmpModel = { countries: [], xKeys: [], data: {} };
  const timeKeys = new Set<string>();

  // Invert records for easy lookup
  const invertedGeoIndex = invertRecord(response.dimension['GEO'].category.index);
  const invertedTimeIndex = invertRecord(response.dimension['TIME_PERIOD'].category.index);
  const invertedSexIndex = invertRecord(response.dimension['SEX'].category.index);
  const invertedAgeIndex = invertRecord(response.dimension['AGE'].category.index);
  const invertedRegisIndex = invertRecord(response.dimension['REGIS_ES'].category.index);
  const invertedLmpIndex = invertRecord(response.dimension['LMP_TYPE'].category.index);

  for (const keyStr in response.value) {
    // set key and value
    const key = +keyStr;
    const value = response.value[key];

    // set relevant values
    const idToValue = createIdValueRecord(key, response.size, response.id);
    const geoValue = idToValue['GEO'];
    const timeValue = idToValue['TIME_PERIOD'];
    const sexValue = idToValue['SEX'];
    const ageValue = idToValue['AGE'];
    const regisValue = idToValue['REGIS_ES'];
    const lmpValue = idToValue['LMP_TYPE'];

    // set corresponding keys
    const geoKey = invertedGeoIndex[geoValue];
    const timeKey = invertedTimeIndex[timeValue];
    const sexKey = invertedSexIndex[sexValue];
    const ageKey = invertedAgeIndex[ageValue];
    const regisKey = invertedRegisIndex[regisValue];
    const lmpKey = invertedLmpIndex[lmpValue];

    // Only consider AGE=TOTAL, REGIS_ES=REG_UNE and LMP_TYPE="TOT2_7
    if (ageKey !== 'TOTAL' || regisKey !== 'REG_UNE' || lmpKey !== 'TOT2_7') continue;

    // Initialize geo container
    if (!result.data[geoKey]) {
      result.data[geoKey] = {};
    }

    // Initialize time container
    if (!result.data[geoKey][timeKey]) {
      result.data[geoKey][timeKey] = {};
    }

    if (result.data[geoKey][timeKey][sexKey]) console.error('Data point already exists');

    // Assign value
    result.data[geoKey][timeKey][sexKey] = value;
    timeKeys.add(timeKey);
  }

  result.xKeys = Array.from(timeKeys).sort();
  result.countries = Object.keys(result.data);

  return result;
}

// Creates a record of id to value.
// Values are calculated by modulo and division operations based on the sizes of each dimension.
function createIdValueRecord(key: number, sizes: number[], id: string[]): Record<string, number> {
  const idValue: Record<string, number> = {};
  for (let i = sizes.length - 1; i >= 0; i--) {
    idValue[id[i]] = key % sizes[i];
    key = Math.floor(key / sizes[i]);
  }

  return idValue;
}

// Invert a record.
// Key becomes value and value becomes key.
function invertRecord(record: Record<string, number>): Record<number, string> {
  const inverted: Record<number, string> = {};
  Object.entries(record).forEach(([key, value]) => {
    inverted[value] = key;
  });

  return inverted;
}
