import Posters from '../components/Posters';
import PostersForm from '../components/PostersForm';

export default function login() {
    return (
        <div class="card mb-3">
            <div class="row g-0">
                <div class="col-md-3">
                    <div class="card-body">
                        <Posters />
                    </div>
                </div>
                <div class="col-md-9">
                    <div class="card-body">
                        <PostersForm />
                    </div>
                </div>
            </div>
        </div>
    );
}