import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Invoice {
  number: string;
  name: string;
  date: string;
  amount: number;
  charges: number;
  mode: string;
  period: string;
}

interface InvoiceState {
  invoices: Invoice[];
}

const initialState: InvoiceState = {
  invoices: [
    {
      number: "#12345",
      name: "Foodoos Private Limited",
      date: "12-05-2022",
      amount: 5500,
      charges: 550,
      mode: "UPI",
      period: "12 Months",
    },
  ],
};

const invoiceSlice = createSlice({
  name: "invoices",
  initialState,
  reducers: {
    updateInvoice(
      state,
      action: PayloadAction<{ index: number; updatedInvoice: Invoice }>
    ) {
      const { index, updatedInvoice } = action.payload;
      state.invoices[index] = updatedInvoice;
    },
  },
});

export const { updateInvoice } = invoiceSlice.actions;
export default invoiceSlice.reducer;
