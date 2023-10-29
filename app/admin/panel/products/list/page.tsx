"use client"
import React, {useEffect, useState} from 'react';
import {Button, Table,} from 'antd';
import Axios from "axios";
import {ColumnsType} from "antd/es/table";
import moment from "moment";
import Link from "next/link";

interface IProducts {
    "_id": string,
    "name": string,
    "stock": number,
    "variation": string,
    "modelCode": string,
    "productCode": string,
    "photos": string[],
    "colorCode": string,
    "priceSale": number,
    "discountSale": number,
    "categories": string[],
    "recordTime": number,
    "updateTime": number
}

interface IProductsResponse {
    data: IProducts[],
    count: number | null,
    status: boolean,
    error: null | string
}

interface IGetProductsParams {
    page: number,
    modelCode?: string
}

const tablePageSize = 5


const ProductList = () => {

    const [products, setProducts] = useState<any[]>([])
    const [productCount, setProductCount] = useState<number>(0)
    const [loading, setLoading] = useState<boolean>(false)

    async function fetchProducts(params: IGetProductsParams) {
        setLoading(true)
        const result: IProductsResponse = await Axios.get(`/product/getAll?page=${params.page}&pageSize=${tablePageSize}`)
        setLoading(false)
        if (result.status) {
            setProducts(result.data)
            setProductCount(result.count ? result.count : 0)
        } else {
            //message
        }
    }

    const paginationOnChange = (page: number) => {
        fetchProducts({page})
    };


    useEffect(() => {
        fetchProducts({page: 1})
    }, [])

    const columns: ColumnsType<IProducts> = [
        {
            title: "Oluşturma Tarihi",
            key: 'recordTime',
            dataIndex: 'recordTime',
            render: (value) => <span>{moment(value).format('DD-MM-YYYY')}</span>
        },
        {
            title: 'Ürün Id',
            key: '_id',
            dataIndex: '_id',
        },
        {
            title: 'model Kodu',
            key: 'variation',
            dataIndex: 'modelCode',
            render: (value) => <div style={{display: "flex", alignItems: 'center'}}>
                <span style={{fontSize: 11, paddingRight: 5}}> {value}</span>
                <Button size={"small"}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16"
                         className="leafygreen-ui-ybc80u" role="presentation" aria-hidden="true">
                        <path fill="currentColor"
                              d="M5.5 12a2 2 0 0 0 2 2h5a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-5a2 2 0 0 0-2 2v4Z"></path>
                        <path fill="currentColor"
                              d="M4.25 10H3.5a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h5a2 2 0 0 1 2 2v.75h-2V4h-5v4h.75v2Z"></path>
                    </svg>
                </Button></div>
        },
        {
            title: 'Ürün Adı',
            key: 'name',
            dataIndex: 'name',
        },
        {
            title: 'Stok',
            key: 'stock',
            dataIndex: 'stock',
        },
        {
            title: "Satış Fiyatı",
            key: 'priceSale',
            dataIndex: 'priceSale'
        },
        {
            title: "İndirimli Satış Fiyatı",
            key: 'discountSale',
            dataIndex: 'discountSale'
        },
        {
            title: "",
            key: 'buttons',
            dataIndex: '_id',
            render: (value) => {
                return <Link href={`/admin/panel/products/${value}`}>İncele</Link>
            }
        }
    ]


    return <div>
        <Table loading={loading} columns={columns}
               pagination={{
                   position: ["bottomRight"],
                   total: productCount,
                   pageSize: tablePageSize,
                   onChange: paginationOnChange
               }}
               dataSource={products} rowKey={"_id"}/>
    </div>
}
export default ProductList