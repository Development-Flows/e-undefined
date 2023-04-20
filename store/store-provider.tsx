"use client"
import {Provider} from "react-redux";
import {store} from './index'
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {usePathname} from 'next/navigation';
import setupAxios from "@/lib/customAxios";

setupAxios(store)
export function StoreProvider({children}) {
    const pathname = usePathname();
    if (pathname.startsWith("/admin")) return (
        <Provider store={store}>
            {children}
        </Provider>)

    return (
        <Provider store={store}>
            <Header/>
            {children}
            <Footer/>
        </Provider>)
}

