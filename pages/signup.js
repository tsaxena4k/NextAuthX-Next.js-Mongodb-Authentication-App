import Signup from '../components/Signup';

export default function signup() {
  return (
    <div class="card mb-3">
      <div class="row g-0">
        <div class="col-md-5">
          <img src="Images/Signup.png"

            class="img-fluid" />
        </div>
        <div class="col-md-7">
          <div class="card-body">
            <h3 class="card-title text-center">Sign up</h3>
            <Signup />
          </div>
        </div>
      </div>
    </div>
  );
}