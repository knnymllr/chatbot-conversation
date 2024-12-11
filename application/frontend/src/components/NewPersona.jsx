import axios from "axios";
import { useContext } from "react";
import { HOST_PATH } from "../scripts/constants";
import DashboardContext from "../context/DashboardContext";
import useUserAuthStore from "../stores/userAuthStore";

export default function NewPersona() {
  const { userId } = useUserAuthStore();
  const {
    setIsNewPersonaSelected,
    newPersonaFormData,
    setNewPersonaFormData,
    userPersonas,
    setUserPersonas,
  } = useContext(DashboardContext);

  const handleChange = (event) => {
    setNewPersonaFormData({
      ...newPersonaFormData,
      [event.target.name]: event.target.value,
      creator: userId,
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`${HOST_PATH}/personas/`, newPersonaFormData);
      setUserPersonas([...userPersonas, response.data]);
    } catch (error) {
      console.error(error);
    } finally {
      setNewPersonaFormData({
        name: "",
        prompt: "",
        creator: "",
      });
      setIsNewPersonaSelected(false);
    }
  };

  return (
    <section>
      <div className="default-form">
        <h1>Create Persona</h1>
        <p>
          Give your persona a name and a prompt. Try including different details
          about personality, interests, and background to vary the contents of a
          conversation.
        </p>
        <div className="form-field">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={newPersonaFormData.name}
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
            value={newPersonaFormData.prompt}
            onChange={handleChange}
          ></textarea>
        </div>
        <button onClick={handleSubmit} className="default-button">
          Submit
        </button>
      </div>
    </section>
  );
}
