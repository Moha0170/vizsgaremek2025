import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({
    user: "",
    password: "",
    email: "",
    telefonszam: "",
    szuldatum: "",
    husegpont: 0,
    neve: ""
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/profile/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.status === 200) {
      navigate("/profile");
    } else if (response.status === 409) {
      setMessage("A felhasználónév már létezik");
    } else {
        setMessage("Hiba")
    }
  };

  return (
    <div className="register-container">
      <h2>Regisztráció</h2>
      <form onSubmit={handleRegister}>
        <input type="text" name="neve" placeholder="Név" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="text" name="telefonszam" placeholder="Telefonszám" onChange={handleChange} required />
        <input type="date" name="szuldatum" onChange={handleChange} required />
        <input type="text" name="user" placeholder="Felhasználónév" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Jelszó" onChange={handleChange} required />
        <button type="submit">Regisztráció</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Register;
