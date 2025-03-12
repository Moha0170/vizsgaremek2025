import "../style/index.css";

function Contacts() {
  return (
    <div className="contacts-container">
      <h1>Kapcsolat</h1>
      <p>Ha kérdésed van, itt elérhetsz minket:</p>

      <div className="contact-info">
        <p>📍 Cím: 1234 Budapest, Webshop utca 10.</p>
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
  );
}

export default Contacts;
