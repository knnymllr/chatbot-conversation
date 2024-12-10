import { useState } from "react";
import useUserAuthStore from "../stores/userAuthStore";

export default function LoginForm() {
  const { login } = useUserAuthStore();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      login(formData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="default-form">
      <h1>Chatbot Panel</h1>
      <p>To get started, login with existing credentials or enter a username and password below.</p>
      <div className="form-field">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
        ></input>
      </div>
      <div className="form-field">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        ></input>
      </div>
      <button className="default-button">Submit</button>
    </form>
  );
}
