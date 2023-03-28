// Components
import Header from "../components/Header/";
import Footer from "../components/Footer/";

// General CSS Files
import "../styles/global.css";
import "../styles/reset.css";


// FontFamily
import { Inter } from "@next/font/google";
const interFontFamily = Inter({ subsets: ["latin"] });

export default function RootLayout({ children } : {children : React.ReactNode}) {
    return (
      <html lang="en" className={interFontFamily.className}>
        <body className="container">
          <Header/>
          <div className="content">{children}</div>
          <Footer/>
        </body>
      </html>
    );
  }
  