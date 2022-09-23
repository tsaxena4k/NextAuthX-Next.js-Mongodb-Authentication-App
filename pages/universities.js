import Universities from '../components/Universities';
import UniversitiesTables from '../components/UniversitiesTables';

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
                        <UniversitiesTables />
                    </div>
                </div>
            </div>
        </div>
    );
}