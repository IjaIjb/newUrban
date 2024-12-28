import "@/app/globals.css";
import Layout from "@/app/layouts";
import ReduxProvider from "@/redux/provider";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ReduxProvider>
      <Layout>
        <Component {...pageProps} />

        <ProgressBar
          height="4px"
          color="#036E03"
          options={{ showSpinner: true }}
          shallowRouting
        />
        <Analytics />
        <SpeedInsights />
        <ToastContainer />
      </Layout>
    </ReduxProvider>
  );
}

export default MyApp;
