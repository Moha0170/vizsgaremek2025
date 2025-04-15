import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

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
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const nameRegex = /^[A-Za-zÁÉÍÓÖŐÚÜŰáéíóöőúüű\s]+$/;
    if (!nameRegex.test(formData.neve)) {
      toast.error("A név csak betűket tartalmazhat.");
      return;
    }

    const phoneRegex = /^[0-9]{11}$/;
    if (!phoneRegex.test(formData.telefonszam)) {
      toast.error("A telefonszám csak számokat tartalmazhat, és 11 számjegyből kell állnia.");
      return;
    }

    const response = await fetch(`${import.meta.env.VITE_API_URI}/profile/register/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.status === 200) {
      navigate("/profile");
    } else if (response.status === 409) {
      toast.error("A felhasználónév már létezik");
    } else {
      toast.error("Hiba történt a regisztráció során");
    }
  };

  return (
    <div className="register-container">
      <h2>Regisztráció</h2>
      <form onSubmit={handleRegister}>
        <p>Név:</p>
        <input type="text" name="neve" placeholder="Név" onChange={handleChange} required />
        <p>E-mail:</p>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <p>Telefonszám:</p>
        <input type="text" name="telefonszam" placeholder="Telefonszám" onChange={handleChange} required />
        <p>Születési dátum:</p>
        <input type="date" name="szuldatum" onChange={handleChange} required />
        <p>Felhasználónév:</p>
        <input type="text" name="user" placeholder="Felhasználónév" onChange={handleChange} required />
        <p>Jelszó:</p>
        <input type="password" name="password" placeholder="Jelszó" onChange={handleChange} required />
        <button type="submit">Regisztráció</button>
      </form>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        pauseOnHover={true}
        pauseOnFocusLoss={true}
        aria-label="toast notifications"
        theme="colored"
      />
    </div>
  );
}

export default Register;
