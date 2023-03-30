import styles from "./index.module.scss";
import { FaGithub, FaFacebook } from "react-icons/fa";
import Link from "next/link";

const Footer = () => {
  return (
   <footer>
      <div className={styles.footerContainer}>
        <ul className={styles.footerList}>
          <li>Hakkımızda</li>
          <li>SSS</li>
          <li>Satış Sözleşmesi</li>
          <li>İade Koşulları</li>
          <li>Kariyer</li>
          <li>İletişim</li>
        </ul>
        <ul className={styles.social}>
          <li><Link href={"https://github.com/furkanketenci/e-undefined"}><FaGithub/></Link></li>
          <li><Link href={"/"}><FaFacebook/></Link></li>
        </ul>
        <div className={styles.description}>e-undefined <span><Link href="/">E-ticaret Altyapısı</Link></span> ile Hazırlanmıştır.</div>
      </div>
   </footer>
  )
}

export default Footer
