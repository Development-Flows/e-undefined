import React from 'react'
import styles from "./index.module.scss";
type ProductGroupComp = {
    children: React.ReactNode;
    groupTitle: string;
}
const ProductGroupComp = ({ children, groupTitle }: ProductGroupComp) => {
    return (
        <div className={styles.groupCompClass}>
            <p className={styles.pTitle}>{groupTitle}</p>
            {children}
        </div>

    )
}

export default ProductGroupComp