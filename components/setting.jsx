import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { useCurrentUser } from '../lib/hooks';
import { useRouter } from 'next/router'

const ProfileSection = () => {
    const [user, { mutate }] = useCurrentUser();
    const [loading, isLoading] = useState(false);
    const nameRef = useRef();
    const bioRef = useRef();
    const profilePictureRef = useRef();
    const [msg, setMsg] = useState({ message: '', isError: false });
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push('/');
        } else {
            nameRef.current.value = user.name;
            bioRef.current.value = user.bio;
        }
    }, [user]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        isLoading(true);
        const formData = new FormData();
        if (profilePictureRef.current.files[0]) { formData.append('profilePicture', profilePictureRef.current.files[0]); }
        formData.append('name', nameRef.current.value);
        formData.append('bio', bioRef.current.value);

        const res = await fetch('/api/user', {
            method: 'PATCH',
            body: formData,
        });
        if (res.status === 200) {
            const userData = await res.json();
            mutate({
                user: {
                    ...user,
                    ...userData.user,
                },
            });
            setMsg({ message: 'Profile updated' });
        } else {
            setMsg({ message: await res.text(), isError: true });
        }
        isLoading(false);
        setTimeout(() => setMsg(''), 2500);
    };

    const handleSubmitPasswordChange = async (e) => {
        isLoading(true);
        e.preventDefault();
        const body = {
            oldPassword: e.currentTarget.oldPassword.value,
            newPassword: e.currentTarget.newPassword.value,
        };
        e.currentTarget.oldPassword.value = '';
        e.currentTarget.newPassword.value = '';

        const res = await fetch('/api/user/password', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });

        if (res.status === 200) {
            setMsg({ message: 'Password updated' });
        } else {
            setMsg({ message: await res.text(), isError: true });
        }
        isLoading(false);
        setTimeout(() => setMsg(''), 2500);
    };

    return (
        <>
            <Head>
                <title>Settings</title>
            </Head>
            <div className='card-form'>
                {msg.message && <div class="alert alert-danger" role="alert">
                    {msg.message}
                </div>}
                <form onSubmit={handleSubmit}>
                    <div class="mb-3">
                        <label for="userName" class="form-label">Name</label>
                        <input type="text" class="form-control" name="userName" id="userName" placeholder="Your Name" ref={nameRef} />
                    </div>
                    <div class="mb-3">
                        <label for="bio" class="form-label">Bio</label>
                        <textarea class="form-control" id="bio" name="bio" placeholder='Your Bio' ref={bioRef} rows="2"></textarea>
                    </div>
                    <div class="mb-3">
                        <label for="avatar" class="form-label">Profile Picture</label>
                        <input class="form-control" type="file" id="avatar" name="avatar" accept='image/png, image/jpeg' ref={profilePictureRef} />
                    </div>
                    <div className="text-center mb-3"><button type="submit" class="btn btn-primary">{loading ? <div class="spinner-border" role="status" style={{ width: '1.5rem', height: '1.5rem' }}>
                        <span class="visually-hidden">Loading...</span>
                    </div> : <>Save</>}</button></div>
                </form>
            </div>
            <div className='card-form'>
                <form class="row g-3" onSubmit={handleSubmitPasswordChange}>
                    <div class="col-md-6">
                        <label for="oldPassword" class="form-label">Old Password</label>
                        <input type="password" class="form-control" id="oldPassword" name='oldPassword' required />
                    </div>
                    <div class="col-md-6">
                        <label for="newPassword" class="form-label">New Password</label>
                        <input type="password" class="form-control" id="newPassword" name='newPassword' required />
                    </div>
                    <div className="col-sm-12 text-center">
                        <button type="submit" className="btn btn-danger">Change Password</button>
                    </div>
                </form>
            </div>
        </>
    );
};
const SettingPage = () => {
    const [user] = useCurrentUser();
    if (!user) {
        return (
            <>
                <p>Please sign in</p>
            </>
        );
    }
    return (
        <>
            <ProfileSection />
        </>
    );
};
export default SettingPage;