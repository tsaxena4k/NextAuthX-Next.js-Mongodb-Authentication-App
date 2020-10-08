import Signup from '../components/Signup';

export default function signup(){
    return (
        <div className="card horizontal z-depth-5">
          <div
            className="card-image hide-on-small-only"
            style={{
              display: "flex",
              background: "#f2e7de",
              alignItems: "flex-end"
            }}
          >
            
            <img
              src="https://cdn.dribbble.com/users/1090020/screenshots/14073692/media/d56030d03319818f9a9bd1b1c8152dae.png"
              className="responsive-img"
              style={{}} alt="student"
            />
          </div>
          <div className="card-stacked center-align">
            <div className="card-content">
              <Signup/>
            </div>
          </div>
        </div>
      );
}