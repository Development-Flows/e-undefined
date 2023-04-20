"use client"
import type { MenuProps } from 'antd';
import React from 'react'
import { AppstoreOutlined, MailOutlined, SettingOutlined,HomeFilled,HomeOutlined } from '@ant-design/icons';
import style from './page.module.scss'
import { Menu } from 'antd';
export default function Panel(){
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
        getItem('Anasayfa', 'sub1', <HomeOutlined />),
        getItem('Navigation Two', 'sub2', <AppstoreOutlined />, [
            getItem('Option 5', '5'),
            getItem('Option 6', '6'),
            getItem('Submenu', 'sub3', null, [getItem('Option 7', '7'), getItem('Option 8', '8')]),
        ]),
        getItem('Navigation Three', 'sub4', <SettingOutlined />, [
            getItem('Option 12', '12'),
        ]),
    ];


    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
    };
    return <div>
        <div className={style.navBar}>
            <Menu           mode="inline"
                            style={{ width: 256,height:'100vh' }}
                        onClick={onClick} items={items} ></Menu>
        </div>
        Panel..
    </div>
}