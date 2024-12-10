import { useState } from "react";

export default function Persona() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    prompt: "",
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async () => {
    console.log("submit!");
    setIsEditing(false);
  };

  return (
    <section>
      {isEditing ? (
        <div className="default-form">
          <h1>Edit Persona</h1>
          <div className="form-field">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            ></input>
          </div>
          <div className="form-field">
            <label htmlFor="prompt">Prompt:</label>
            <textarea
              type="text"
              id="prompt"
              className="prompt"
              name="prompt"
              value={formData.prompt}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="button-container">
            <div className="checkbox-form-field">
              <label htmlFor="public">Public:</label>
              <input type="checkbox"></input>
            </div>
            <button onClick={handleSubmit} className="default-button">Save</button>
          </div>
        </div>
      ) : (
        <div>
          <p>Name</p>
          <p>Prompt</p>
          <p>Conversations</p>
          <p>Public: Yes No</p>
          <ul>
            <li>One</li>
          </ul>
          <button className="default-button" onClick={() => setIsEditing(true)}>
            Edit
          </button>
        </div>
      )}
    </section>
  );
}
