import { useContext, useState } from "react";
import DashboardContext from "../context/DashboardContext";

export default function NewConversation() {
  const {
    userPersonas,
    patterns,
    newConversationFormData,
    setNewConversationFormData,
  } = useContext(DashboardContext);
  const [isConversationActive, setIsConversationActive] = useState(false);
  
  const handleChange = (event) => {
    setNewConversationFormData({
      ...newConversationFormData,
      [event.target.name]: event.target.value,
    });
  };

  const handleActiveConversation = () => {
    console.log("active!");
    setIsConversationActive(true);
  };

  const handleSubmit = async () => {
    console.log("submit!");
    setIsConversationActive(false);
  };

  return (
    <section>
      <div className="new-conversation-grid">
        <div className="conversation-details-container">
          <div className="form-field">
            <label htmlFor="persona1">Persona 1:</label>
            <select id="persona1">
              <option>-Select Persona-</option>
              {userPersonas
                ? userPersonas.map((persona, index) => (
                    <option key={index}>{persona.name}</option>
                  ))
                : null}
            </select>
          </div>
          <div className="form-field">
            <label htmlFor="persona2">Persona 2:</label>
            <select id="persona2">
              <option>-Select Persona-</option>
              {userPersonas
                ? userPersonas.map((persona, index) => (
                    <option key={index}>{persona.name}</option>
                  ))
                : null}
            </select>
          </div>
          <div className="form-field">
            <label htmlFor="pattern">Pattern:</label>
            <select id="pattern">
              <option value="">-Select Pattern-</option>
              {patterns
                ? patterns.map((pattern, index) => (
                    <option key={index}>{pattern.name}</option>
                  ))
                : null}
            </select>
          </div>
          <div className="form-field">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              className="name"
              id="name"
              placeholder="Enter a name"
            ></input>
          </div>
          <div className="form-field">
            <label htmlFor="topic">Topic:</label>
            <textarea
              name="topic"
              className="topic"
              id="topic"
              placeholder="Enter a topic of conversation"
            ></textarea>
          </div>
          <div className="new-conversation-buttons">
            <button onClick={handleActiveConversation}>Begin</button>
            <button onClick={handleSubmit}>End</button>
          </div>
        </div>
        <div className="conversation-container">
          <label>
            {isConversationActive
              ? "Conversation in Progress..."
              : "New Conversation:"}
          </label>
          <div className="conversation"></div>
        </div>
      </div>
    </section>
  );
}
