import Layout from '../components/Layout';
// import '../style.scss';
import '../styles/globals.css';
import {SessionProvider} from "next-auth/react";


export default function MyApp({ Component, pageProps, session }) {

    return (
        <>
            <SessionProvider session={session}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </SessionProvider>
        </>
    );
}
