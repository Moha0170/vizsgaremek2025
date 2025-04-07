import "../style/index.css";


function Contacts() {

  return (
    <div className="contacts-container">
      <div className="contact-not-iframe">
        <h1>Kapcsolat</h1>
        <p>Ha kérdésed van, itt elérhetsz minket:</p>

        <div className="contact-info">
          <p>📍 Cím: 1146 Budapest, Thököly út 48.</p>
          <p>📞 Telefon: +36 1 234 5678</p>
          <p>📧 Email: info@webshop.hu</p>
        </div>

        <h2>Üzenet küldése</h2>
        <form className="contact-form">
          <input type="text" placeholder="Név" required />
          <input type="email" placeholder="Email" required />
          <textarea placeholder="Üzenet" rows={5} required></textarea>
          <button type="submit">Küldés</button>
        </form>
      </div>

      <div className="iframe-div">
        <iframe
          className="map-iframe"
          title="Google Maps Location"
          src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10789.80816092363!2d19.0934019!3d47.5047036!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4741dc39b77cbcaf%3A0x79c81d12f4620f0e!2sBudapest%2C%20Th%C3%B6k%C3%B6ly%20%C3%9At%2048%2C%201140!5e0!3m2!1shu!2shu!4v1707766345391`}
          width="600"
          height="450"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
}

export default Contacts;
