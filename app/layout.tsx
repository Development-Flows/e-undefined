// General CSS Files
import "../styles/global.css";
import "../styles/reset.css";
import {StoreProvider} from "@/store/store-provider";
// FontFamily
import {Inter} from "@next/font/google";

const interFontFamily = Inter({subsets: ["latin"]});

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang="tr" className={interFontFamily.className}>
        <body>
        <StoreProvider>
            <div className="content">{children}</div>
        </StoreProvider>
        </body>
        </html>
    );
}
  