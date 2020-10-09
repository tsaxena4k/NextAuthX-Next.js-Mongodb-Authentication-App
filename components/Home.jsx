import Link from 'next/link';
import { useUser } from '../lib/hooks';
import AfterLogin from '../components/AfterLogin';

export default function Home() {
    const [user, { mutate }] = useUser();
    const handleLogout = async () => {
        await fetch('/api/auth', {
            method: 'DELETE',
        });
        // set the user state to null
        mutate(null);
        M.toast({ html: 'Logged out' })
    };
    return (
        <>
            <div className="card horizontal z-depth-5">
                <div
                    className="card-image hide-on-small-only"
                    style={{ display: "flex" }}
                >
                    {!user ? (<>
                        <img
                            src="https://cdn.dribbble.com/users/2251626/screenshots/6831464/welcome_dribbble.png"
                            className="responsive-img" alt=""
                        />
                    </>) : (<img
                        src="https://cdn.dribbble.com/users/1090020/screenshots/10535970/media/766c2d3d6101fca5d441420a6412abf1.png"
                        className="responsive-img" alt=""
                    />)}

                </div>
                <div className="card-stacked center-align">
                    <div className="card-content">
                        <h2 style={{ marginTop: '0' }}><span style={{ fontWeight: 'bolder', color: `${user ? '#2196f3' : '#7ed'}`, textShadow: '2px 2px black' }}>Hello </span>{!user ? 'Stranger' : user.name}</h2>
                        {!user ? <div className="card-title und">Welcome to <strong><a onClick={() => M.toast({ html: 'Coming soon', classes: 'toast' })}>Tushar.dev</a></strong></div> : null}
                        <div class="col s12 m12">
                            {!user ? (<>
                                <div class="card-panel #80cbc4 teal lighten-2">
                                    <span class="white-text" style={{ fontSize: '1.2rem' }}>This is an Authentication build in <a href="https://nextjs.org/" target="_blank" style={{ textDecoration: 'underline', color: "white" }}>Next.js</a> using <a href="http://www.passportjs.org/" target="_blank" style={{ textDecoration: 'underline', color: "white" }}>Passport.js</a> and <a href="https://www.mongodb.com/" target="_blank" style={{ textDecoration: 'underline', color: "white" }}>Mongodb </a>
                                . It is a fully functional & ready to use module build for your next web application.This is template 0.0 I will be pushing more new personalized templates soon.<br /><br />-Till then go on try it around, I hope you like it-</span>
                                </div>
                            </>) : (<AfterLogin />)}
                        </div>
                    </div>

                    <div className="card-action">
                        {!user ? (
                            <>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Link href="/login">
                                        <a class="waves-effect waves-light btn">Log in</a>
                                    </Link>
                                    <Link href="/signup">
                                        <a class="waves-effect waves-light btn">Sign up</a>
                                    </Link>
                                </div>
                            </>
                        ) : (
                                <>

                                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Link href="/user/[userId]" as={`/user/${user._id}`}>
                                            <a class="waves-effect waves-light btn blue">Profile</a>
                                        </Link>
                                        <a role="button" onClick={handleLogout} class="waves-effect waves-light btn blue">Logout</a>
                                    </div>
                                </>
                            )}
                    </div>
                </div>
            </div>
        </>
    )
}
