"use client";
import { store } from "@/lib/store";
import React from "react";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import SocketProviders from "./SocketProviders";

let persistor = persistStore(store);
const Providers = ({ children }: any) => {
  persistor.flush();
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <SocketProviders>{children}</SocketProviders>
      </PersistGate>
    </Provider>
  );
};

export default Providers;
