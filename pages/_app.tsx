import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { Analytics } from "@vercel/analytics/react";
import { Inter } from "@next/font/google";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;
import { Provider } from "../lib/context/context";
import MenuContextProvider from "../lib/context/MenuContext";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider attribute="class">
        <MenuContextProvider>
          <Provider>
            <div className={`${inter.className} h-full w-full`}>
              <Component {...pageProps} />
              <Analytics />
            </div>
          </Provider>
        </MenuContextProvider>
      </ThemeProvider>
    </>
  );
}
