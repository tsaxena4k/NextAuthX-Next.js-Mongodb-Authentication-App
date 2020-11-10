import Layout from '../components/Layout';
import '../style.scss';

export default function MyApp({ Component, pageProps }) {

    return (
        <>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </>
    );
}
