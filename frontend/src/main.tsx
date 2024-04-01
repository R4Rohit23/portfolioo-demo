import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { CookiesProvider } from "react-cookie";
import { Provider } from "react-redux";
import store from "./redux/store.ts";
// axios.defaults.baseURL = "https://porfoliooo-backend.vercel.app/";
axios.defaults.baseURL = "http://localhost:3000";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <CookiesProvider defaultSetOptions={{ path: "/" }}>
            <Provider store={store}>
                <BrowserRouter>
                    <NextUIProvider>
                        <QueryClientProvider client={queryClient}>
                            <ReactQueryDevtools initialIsOpen={false} />
                            <Toaster />
                            <App />
                        </QueryClientProvider>
                    </NextUIProvider>
                </BrowserRouter>
            </Provider>
        </CookiesProvider>
    </React.StrictMode>
);
