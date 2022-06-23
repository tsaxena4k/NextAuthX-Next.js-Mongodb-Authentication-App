import Setting from '../components/setting';

export default function login() {
    return (
        <div class="card mb-3">
            <div class="row g-0">
                <div class="col-md-5">
                    <img src="/Images/Edit.png" class="img-fluid rounded-start" alt="..." />
                </div>
                <div class="col-md-7">
                    <div class="card-body">
                        <h3 class="card-title text-center">Edit Profile</h3>
                        <Setting />
                    </div>
                </div>
            </div>
        </div>
    );
}