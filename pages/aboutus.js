import Dashboard from '../components/Dashboard';
import DashboardPinned from '../components/DashboardPinned';

export default function login() {
    return (
        <div class="card mb-3">
            <div class="row g-0">
                <div class="col-md-3">
                    <div class="card-body">
                        <Dashboard />
                    </div>
                </div>
                <div class="col-md-9">
                    <div class="card-body">
                        <DashboardPinned />
                    </div>
                </div>
            </div>
        </div>
    );
}