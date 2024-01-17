import { RoadnetWorkInventory } from './rodeInfo';

export interface RoadnetWorkInventoryCalculation {
  rodeInfo?: RoadnetWorkInventory;
  TDV?: any;
  CDV?: any;
  PCI?: any;
  SampleArea?: any;
  rating?: any;
}
export interface RoadnetWorkInventoryCalculationArray {
  data?: RoadnetWorkInventoryCalculation;
}
