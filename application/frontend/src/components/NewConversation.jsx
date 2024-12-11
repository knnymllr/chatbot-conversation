import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { HOST_PATH } from "../scripts/constants";
import DashboardContext from "../context/DashboardContext";
import Message from "./Message";

export default function NewConversation() {
  const {
    userPersonas,
    patterns,
    newConversationFormData,
    setNewConversationFormData,
  } = useContext(DashboardContext);
  const conversationRef = useRef(null);
  const [newConversation, setNewConversation] = useState(null);
  const [isConversationActive, setIsConversationActive] = useState(false);
  const [conversationMessages, setConversationMessages] = useState([]);
  const [messagesBatch, setMessagesBatch] = useState([]);
  const [currentPattern, setCurrentPattern] = useState();
  const [currentContributors, setCurrentContributors] = useState();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewConversationFormData({
      ...newConversationFormData,
      [name]: value,
    });
  };

  const handleActiveConversation = async () => {
    const formData = {};
    formData["contributors"] = [];

    for (const key in newConversationFormData) {
      if (
        key.includes("persona") &&
        !formData["contributors"].includes(newConversationFormData[key])
      )
        formData["contributors"].push(newConversationFormData[key]);
      else if (key === "pattern")
        formData[key] = parseInt(newConversationFormData[key]);
      else formData[key] = newConversationFormData[key];
    }

    try {
      const response = await axios.post(
        `${HOST_PATH}/conversations/`,
        formData
      );

      setNewConversation(response.data);
      setCurrentContributors(formData["contributors"]);
      setCurrentPattern(patterns[newConversationFormData["pattern"]].pattern);
      setIsConversationActive(true);
    } catch (error) {
      console.error(error);
    }
  };

  // Submit messages to db
  useEffect(() => {
    if (messagesBatch.length) {
      const postMessages = async () => {
        try {
          for (const message in messagesBatch) {
            const response = await axios.post(
              `${HOST_PATH}/messages/`,
              messagesBatch[message]
            );
          }
        } catch (error) {
          console.error(error);
        }
      };

      postMessages();
    }
  }, [messagesBatch]);

  useEffect(() => {
    const patternArray = currentPattern
      ? currentPattern.split(",").map(Number)
      : null;
    let intervalId;
    let index = 0;
    const batch = [];
    let previousMessage = "";

    const checkConversationIsActive = async () => {
      if (isConversationActive) {
        const length = currentContributors.length;
        const patternSelector = (index + 1) % length;
        const selector = patternArray[patternSelector];
        const contributor = currentContributors[selector];

        const response = await axios.post(`${HOST_PATH}/active-conversation/`, {
          prompt: userPersonas[contributor - 1].prompt,
          topic: index === 0 ? newConversationFormData.topic : previousMessage,
        });

        const message = response.data.message ? response.data.message : "...";

        const messageObject = {
          conversation: newConversation.id,
          message_id: index,
          message: message,
        };

        batch.push(messageObject);

        const newMessage = (
          <Message
            key={index}
            index={index}
            sender={userPersonas[contributor - 1].name}
            message={message}
          />
        );

        index += 1;
        previousMessage = message;

        setConversationMessages((prevMessages) => [
          ...prevMessages,
          newMessage,
        ]);
      }
    };

    if (isConversationActive) {
      intervalId = setInterval(checkConversationIsActive, 5000);
    }

    return () => {
      setMessagesBatch(batch);
      clearInterval(intervalId);
    };
  }, [isConversationActive]);

  return (
    <section>
      <div className="new-conversation-grid">
        <div className="conversation-details-container">
          <div className="form-field">
            <label htmlFor="persona1">Persona 1:</label>
            <select onChange={handleChange} name="persona1" id="persona1">
              <option>-Select Persona-</option>
              {userPersonas
                ? userPersonas.map((persona, index) => (
                    <option key={index} value={persona.id}>
                      {persona.name}
                    </option>
                  ))
                : null}
            </select>
          </div>
          <div className="form-field">
            <label htmlFor="persona2">Persona 2:</label>
            <select id="persona2" name="persona2" onChange={handleChange}>
              <option>-Select Persona-</option>
              {userPersonas
                ? userPersonas.map((persona, index) => (
                    <option key={index} value={persona.id}>
                      {persona.name}
                    </option>
                  ))
                : null}
            </select>
          </div>
          <div className="form-field">
            <label htmlFor="pattern">Pattern:</label>
            <select id="pattern" name="pattern" onChange={handleChange}>
              <option>-Select Pattern-</option>
              {patterns
                ? patterns.map((pattern, index) => (
                    <option key={index} value={pattern.id}>
                      {pattern.name}
                    </option>
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
              value={newConversationFormData.name}
              onChange={handleChange}
              placeholder="Enter a name"
            ></input>
          </div>
          <div className="form-field">
            <label htmlFor="topic">Topic:</label>
            <textarea
              name="topic"
              className="topic"
              id="topic"
              value={newConversationFormData.topic}
              onChange={handleChange}
              placeholder="Enter a topic of conversation"
            ></textarea>
          </div>
          <div className="new-conversation-buttons">
            <button onClick={handleActiveConversation}>Begin</button>
            <button onClick={() => setIsConversationActive(false)}>End</button>
          </div>
        </div>
        <div className="conversation-container">
          <ul ref={conversationRef} className="conversation">
            {conversationMessages ? conversationMessages : null}
            {isConversationActive ? (
              <li className="typing-container">
                <div className="typing">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </li>
            ) : null}
          </ul>
        </div>
      </div>
    </section>
  );
}
