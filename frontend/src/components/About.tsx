import "../style/index.css";
import "../style/about.css";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h1>Rólunk</h1>
      <p>A Hypercharge Market célja, hogy a legjobb minőségű termékeket kínálja versenyképes áron.</p>

      <h2>Kik vagyunk?</h2>
      <p>Egy dinamikus csapat vagyunk, akik elkötelezettek az online vásárlási élmény fejlesztése mellett.</p>

      <h2>Felhasználói vélemények</h2>
      <div className="reviews">
        <blockquote>
          <p>“Gyors szállítás és kiváló ügyfélszolgálat! Mindenkinek ajánlom!”</p>
          <cite>- Anna K.</cite>
        </blockquote>

        <blockquote>
          <p>“Nagyszerű termékek és kiváló árak. Biztosan vásárolok még!”</p>
          <cite>- Bence T.</cite>
        </blockquote>

        <blockquote>
          <p>“A Hypercharge Market megbízható és gyors! Tökéletes vásárlási élmény.”</p>
          <cite>- Gergő M.</cite>
        </blockquote>
      </div>

      <button className="home-button" onClick={() => navigate("/")}>
        Vissza a kezdőlapra
      </button>
    </div>
  );
};

export default About;
