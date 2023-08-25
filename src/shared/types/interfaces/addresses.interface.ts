export interface District {
  id: number;
  name: string;
}

export interface Ward {
  id: number;
  name: string;
  districtId: number;
}
