export interface LmpModel {
  value: {
    [key: string]: number;
  };
  id: string[];
  size: number[];
  extension: {
    status: {
      label: {
        [key: string]: string;
      };
    };
  };
  dimension: {
    [key: string]: {
      category: {
        index: {
          [key: string]: number;
        };
        label: {
          [key: string]: string;
        };
      };
    };
  };
}
