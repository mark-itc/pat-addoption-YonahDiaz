import "./Home.css";
import background from "../images/Dog-and-cat-friends-pets_2560x1600.jpg";
function Home() {
  return (
    <div className="home" style={{ backgroundImage: `url(${background})` }}>
      <div className="home-text">
        Welcome to adoptapetitc.com, here you would be able to adopt a pet or
        foster. Create a free account and give a home to our pets.
      </div>
    </div>
  );
}
export default Home;
