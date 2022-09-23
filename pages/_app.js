import Layout from '../components/Layout';
// import '../style.scss';
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }) {

    return (
        <>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </>
    );
}
