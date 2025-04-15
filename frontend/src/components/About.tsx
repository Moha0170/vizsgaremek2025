import "../style/index.css";
import "../style/about.css";


const About = () => {


  return (
    <div className="container">
      <h1>Rólunk</h1>
      <p>A Hypercharge Market célja, hogy a legjobb minőségű termékeket kínálja versenyképes áron.
        <br></br>
        Jelenleg kizárólag utánvétes fizetési lehetőséget biztosítunk.</p>

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

    </div>
  );
};

export default About;
