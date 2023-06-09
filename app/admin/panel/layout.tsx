"use client"
import type {MenuProps} from 'antd';
import React from 'react'
import {AppstoreOutlined, ShoppingCartOutlined, MenuOutlined, HomeFilled, HomeOutlined} from '@ant-design/icons';
import style from './page.module.scss'
import {Menu} from 'antd';
import Link from "next/link";

export default function PanelLayout({children}: { children: React.ReactNode }) {

    type MenuItem = Required<MenuProps>['items'][number];

    function getItem(
        label: React.ReactNode,
        key: React.Key,
        icon?: React.ReactNode,
        children?: MenuItem[],
        type?: 'group',
    ): MenuItem {
        return {
            key,
            icon,
            children,
            label,
            type,
        } as MenuItem;
    }

    const items: MenuItem[] = [
        getItem(<Link href={"/admin/panel"}>Anasayfa</Link>, 'sub1',<HomeOutlined /> ),
        getItem('Ürün Yönetimi', 'sub2', <AppstoreOutlined/>, [
            getItem(<Link href={"/admin/panel/products/add"}>Ürün Ekleme</Link>, 'sub2_1'),
            getItem('Ürün Listesi', 'sub2_2'),
        ]),
        getItem('Kategori Yönetimi', 'sub3', <MenuOutlined/>, [
            getItem('Kategori Ekleme', 'sub3_1'),
            getItem('Kategori Listesi', 'sub3_2'),
        ]),
        getItem("Sipariş Yönetimi", "sub4", <ShoppingCartOutlined/>, [
            getItem("Sipariş Listesi", 'sub4_1')
        ])
    ];

    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
    };

    return <div>
        <Menu mode="inline" className={style.menuContent} onClick={onClick} items={items}></Menu>
        <div className={style.content}>{children}</div>
    </div>
}