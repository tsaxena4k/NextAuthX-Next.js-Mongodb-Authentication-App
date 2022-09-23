import Universities from '../components/Universities';
import UniversitiesForm from '../components/UniversitiesForm';

export default function login() {
    return (
        <div class="card mb-3">
            <div class="row g-0">
                <div class="col-md-3">
                    <div class="card-body">
                        <Universities />
                    </div>
                </div>
                <div class="col-md-9">
                    <div class="card-body">
                        <UniversitiesForm />
                    </div>
                </div>
            </div>
        </div>
    );
}