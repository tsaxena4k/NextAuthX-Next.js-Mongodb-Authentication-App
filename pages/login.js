import Login from "../components/Login";

export default function login() {
    return (
        <>
            <div class="card mb-3">
                <div class="row g-0">
                    <div class="col-md-5">
                        <img src="/Images/Login.png"
                            class="img-fluid" />
                    </div>
                    <div class="col-md-7">
                        <div class="card-body">
                            <h3 class="card-title text-center">Login</h3>
                            <Login />
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="card horizontal z-depth-5">
                <div
                    className="card-image hide-on-small-only"
                    style={{
                        display: "flex",
                        background: "#f2e7de",
                        alignItems: "flex-end"
                    }}>
                    <img
                        src="https://cdn.dribbble.com/users/1090020/screenshots/14127411/media/6927761ee5cd727f655a3f8f5e112ef0.png"
                        className="img-fluid"
                        style={{}} alt="student"
                    />
                </div>
                <Login />
            </div> */}
        </>
    );
}