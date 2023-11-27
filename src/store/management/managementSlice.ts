import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface TradeOptions {
  sellProduct: boolean;
  setPrices: boolean;
  viewAnalytics: boolean;
}

export interface SkirmishOptions {
  duel: boolean;
  makeClaims: boolean;
}

export interface ManufacturingOptions {
  purchaseMaterials: boolean;
  assignWorkers: boolean;
}

export interface ManagementOptions {
  assignPositions: boolean;
  expelFromGang: boolean;
}

export interface ManagementState {
  position: string;
  trade: TradeOptions;
  skirmish: SkirmishOptions;
  manufacturing: ManufacturingOptions;
  management: ManagementOptions;
}

const initialState: ManagementState = {
  position: '',
  trade: {
    sellProduct: false,
    setPrices: false,
    viewAnalytics: false,
  },
  skirmish: {
    duel: false,
    makeClaims: false,
  },
  manufacturing: {
    purchaseMaterials: false,
    assignWorkers: false,
  },
  management: {
    assignPositions: false,
    expelFromGang: false,
  },
  
};

export const managementSlice = createSlice({
  name: 'management',
  initialState,
  reducers: {
    setPosition: (state, action: PayloadAction<string>) => {
      state.position = action.payload;
    },
    setTrade: (state, action: PayloadAction<TradeOptions>) => {
      state.trade = action.payload;
    },
    setSkirmish: (state, action: PayloadAction<SkirmishOptions>) => {
      state.skirmish = action.payload;
    },
    setManufacturing: (state, action: PayloadAction<ManufacturingOptions>) => {
      state.manufacturing = action.payload;
    },
    setManagement: (state, action: PayloadAction<ManagementOptions>) => {
      state.management = action.payload;
    }
  }
});

export const { setPosition, setTrade, setSkirmish, setManufacturing, setManagement } = managementSlice.actions;
export default managementSlice.reducer;