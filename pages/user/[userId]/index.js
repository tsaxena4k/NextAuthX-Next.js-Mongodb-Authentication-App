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
            <div class="card mb-3">
                <div class="row g-0">
                    <div class="col-md-4 p-3 d-flex align-items-center" style={{backgroundColor:'#5c9eff'}}>
                        <img src={profilePicture} class="img-fluid border border-2" style={{height:'auto'}}/>
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h3 class="card-title text-center">Profile</h3>
                            <div class="card mb-3">
                                <div class="card-body">
                                    <h3 className='card-title'>Name</h3>
                                    <div class="card-text">{name}</div>
                                </div>
                            </div>
                            <div class="card mb-3">
                                <div class="card-body">
                                    <h3 className='card-title'>Bio</h3>
                                    <div class="card-text">{bio}</div>
                                </div>
                            </div>
                            <div class="card mb-3">
                                <div class="card-body">
                                    <h3 className='card-title'>Email</h3>
                                    <div class="card-text">{email}</div>
                                </div>
                            </div>
                        </div>
                        <div className='card-action text-center mb-3'>
                            <Link href='/setting'><a className='btn btn-primary'>Edit</a></Link>
                        </div>
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