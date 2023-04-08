import { Menu } from 'antd';
import { useState } from 'react';
import "../../../styles/reset.css";
import Link from 'next/link';

function getItem(label:React.ReactNode,  key?: React.Key | null, children?: MenuItem[],  theme?: any, ) {
  return {
    key,
    children,
    label,
    theme,
  };
}

const Panel = () => {
  const [current, setCurrent] = useState();
  const onClick = (e: any) => {
  setCurrent(e.key);
  };
  const items:MenuItem[] = [
    getItem('Anasayfa', '1'),
    getItem('Ürünler', 'sub1', [
    getItem(<Link href={"/admin/product"}>Ürünler</Link>, '3'),
    ]),
    getItem('Kategori Yönetimi', '5' ),
   
  ];
  return (
      <Menu
        onClick={onClick}
        style={{
          width: 232,
          height: "100vh"
        }}
        defaultSelectedKeys={['1']}
        mode="inline"
        theme="dark"
        items={items}
        getPopupContainer={(node) => node.parentNode}
      />
  );
};
export default Panel;