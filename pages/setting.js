import Setting from '../components/setting';

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
                    src="https://cdn.dribbble.com/users/1090020/screenshots/14218299/media/1ecb6705993dc024056b9d3b9a206f1a.png"
                    className="responsive-img"
                    style={{}} alt="student"
                />
            </div>
            <div className="card-stacked center-align">
                <div className="card-content">
                    <Setting />
                </div>
            </div>
        </div>
    );
}