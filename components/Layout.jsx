import Head from 'next/head';
import React, { useEffect } from 'react';
import Link from 'next/link';
import { AiTwotoneHome } from 'react-icons/ai';
import { FaFacebook, FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { GiSelfLove } from 'react-icons/gi';
import { useUser } from "../lib/hooks";

export default function Layout({ children }) {
    const [user] = useUser();
    useEffect(() => {
        const M = window.M;
        M.AutoInit();
    })
    return (
        <>
            <Head>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css"></link>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
            </Head>
            <main className={user ? "#80cbc4 blue lighten-3" : "#80cbc4 teal lighten-3"}>
                <div className="container  valign-wrapper">
                    <div className="row">
                        <div className="col s12 m12 center-align"><span className={user?'waves-effect waves-light btn-small blue':'waves-effect waves-light btn-small'}><Link href="/"><AiTwotoneHome /></Link></span> <a className={!user ? "waves-effect waves-light btn-small modal-trigger" : "waves-effect waves-light btn-small modal-trigger blue"} href="#modal1">About</a></div>
                        <div className="col s12 m12">
                            {children}
                        </div>
                    </div>
                </div>
                <div id="modal1" className="modal modal-fixed-footer">
                    <div className="modal-content" style={{ backgroundImage: `url(${"https://barbarashdwallpapers.com/wp-content/uploads/2015/05/White-wave-pattern-wallpaper-1.jpg"})` }}>
                        <div className="right-align" style={{ fontSize: '2rem' }}>
                            <a href="https://github.com/tsaxena4k" target="_blank"><FaGithub /> </a>
                            <a href="https://www.facebook.com/tushar.saxena.56232/" target="_blank"><FaFacebook /> </a>
                            <a href="https://www.linkedin.com/in/tushar-saxena-94b742184/" target="_blank"><FaLinkedin /> </a>
                            <a href="https://www.instagram.com/tsaxena4k/" target="_blank"><FaInstagram /> </a>
                        </div>
                        <div className="center-align">
                            <img src="https://i.ibb.co/CKVM9CP/Pics-Art-09-11-08-53-29-removebg.png" className="responsive-img circle" style={{ height: '300px', border: '2px solid teal' }} />
                            <h4>Hola,Tushar here</h4>
                            <p><em>(A self taught Full stack Developer)</em></p>
                            <p><strong>I was just doing Frontend Development a few months ago, was enjoying building personalised UI/UX templates with React and different styling options like materialize css, material UI ,Sass and what not.
                            Though I was aware that Frontend was just not enough for me I had to start with Backend any day now, but like everyone else struggled with motivation.
                            <br /><br />For me that day of motivation came in with a college project that a team of three has to work on.As a start I switched to <a href="https://nextjs.org/" target="_blank">Next.js</a> and that was really smooth,
                            then I worked with nodejs,building API,Mongodb and all that Backend stuff.<br />But I struggled putting all of these things together to build a Login~Signup Authentication for our project.I watched every
                             single video on youtube for the topic but failed to get things working.This was the start to my backend journey and it was quite what I thought it would be like.
                             <br /><br />After alot of research and all came to know about <a href="http://www.passportjs.org/">passport.js</a> and here we are with things working. Thanks to <a href="https://hoangvvo.com/" target="_blank">Hoang</a>,his blogs helped me alot and finally
                             I completed my first backend task.<br />I do realise after all of this that there might be people like me trying hard to make there first Authentication backend to work.
                             So I decided to put this simple working model up for those who are seeking hard for it.<br /><br />I hope it helped you and I know there are tons of bugs and incomplete parts in the code I'll be working on that,
                             to know more check out the <a href="https://github.com/tsaxena4k" target="_blank">github repository</a> for the same.</strong></p>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <a href="#!" className="modal-close waves-effect waves-green btn-flat">Dissmiss</a>
                    </div>
                </div>
            </main>

            <style jsx>{`
                    main{
                        position:absolute;
                        top:0px;
                        left:0px;
                        right:0px;
                        bottom:0px;
                    }
                    .container{
                        position:absolute;
                        top:0px;
                        left:0px;
                        right:0px;
                        bottom:0px;
                    }             
                `}</style>
        </>
    );
}
