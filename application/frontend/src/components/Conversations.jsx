import { useContext } from "react";
import circleAdd from "../assets/circle-add.svg";
import DashboardContext from "../context/DashboardContext";

export default function Conversations() {
  const { userConversations, isConversationSelected } =
    useContext(DashboardContext);

  return (
    <section className="side-panel-section">
      <h2>Conversations</h2>
      <ul>
        {userConversations
          ? userConversations.map((conversation, index) => (
              <li key={index} className={index % 2 == 0 ? "light" : "dark"}>
                <div className="conversations-container">
                  <h3>{conversation.name}</h3>
                  <p>{"🤖".repeat(conversation.contributors.length)}</p>
                </div>
              </li>
            ))
          : null}
        <li className="circle-add">
          <img src={circleAdd} height="35px" width="35px" alt="Start a new conversation" />
          <h3>New Conversation</h3>
        </li>
      </ul>
    </section>
  );
}