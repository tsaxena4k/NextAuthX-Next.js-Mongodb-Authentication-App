import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Error from 'next/error';
import middleware from '../../../middlewares/middleware';
import { useCurrentUser } from '../../../lib/hooks';
import { getUser } from '../../../lib/db';

export default function UserPage({ user }) {

    if (!user) return <Error statusCode={404} />;
    const {
        name, email, bio, profilePicture,
    } = user || {};
    const [currentUser] = useCurrentUser();
    const isCurrentUser = currentUser?._id === user._id;
    return (
        <>
            <Head>
                <title>{name}</title>
            </Head>
            <div className="card horizontal z-depth-5 large">
                <div
                    className="card-image hide-on-small-only"
                    style={{background:'#8de'}}
                    >   
                    <img
                        className="circle"
                        src={profilePicture}
                        width="200"
                        height="200"
                        alt={name}
                    />
                </div>
                <div className="card-stacked center-align">
                    <div className="card-content">
                        <div>
                            <section>
                                <div className="hide-on-med-and-up">
                                    <img src={profilePicture} className="circle" width="150" style={{border:'5px solid #29f'}}/>
                                </div>    
                                    <h2>{name}</h2>
                                <div class="col s12 m12">
                                    <div class="card-panel blue left-align white-text" style={{fontSize:'1rem'}}>
                                    
                                    <p>Bio : {bio}</p>
                                    
                                    <p>
                                    Email :  {email}
                                    </p>
                        
                                    </div>
                                </div>
                                

                            </section>
                        </div>
                    </div>
                    <div className="card-action">
                        {isCurrentUser && (
                            <Link href="/setting">
                                <a class="waves-effect waves-light btn-small blue">Edit</a>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
export async function getServerSideProps(context) {
    await middleware.apply(context.req, context.res);
    const user = await getUser(context.req, context.params.userId);
    if (!user) context.res.statusCode = 404;
    return {
        props: {
            user,
        }, // will be passed to the page component as props
    };
}