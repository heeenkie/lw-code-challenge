export interface MyLmpModel {
  countries: string[];
  xKeys: string[];
  data: MyLmpDataModel;
}

export interface MyLmpDataModel {
  [geoKey: string]: {
    [xKey: string]: {
      [yKey: string]: number;
    };
  };
}
