import Login from "../components/Login";
import Link from 'next/link';

export default function login() {
    return (
        <div className="card horizontal z-depth-5">
            <div
                className="card-image hide-on-small-only"
                style={{
                    display: "flex",
                    background: "#f2e7de",
                    alignItems: "flex-end"
                }}>
                <img
                    src="https://cdn.dribbble.com/users/1090020/screenshots/14127411/media/6927761ee5cd727f655a3f8f5e112ef0.png"
                    className="responsive-img"
                    style={{}} alt="student"
                />
            </div>
            <div className="card-stacked center-align">
                <div className="card-content">
                    <Login />
                </div>
            </div>
        </div>
    );
}