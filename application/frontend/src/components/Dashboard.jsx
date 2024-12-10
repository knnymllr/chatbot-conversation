import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { HOST_PATH } from "../scripts/constants";
import Personas from "./Personas";
import Persona from "./Persona";
import Conversations from "./Conversations";
import Conversation from "./Conversation";
import NewPersona from "./NewPersona";
import NewConversation from "./NewConversation";
import DashboardContext from "../context/DashboardContext";

export default function Dashboard() {
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(true);
  const {
    setUserPersonas,
    setUserConversations,
    setPatterns,
    isConversationSelected,
    isPersonaSelected,
    isNewPersonaSelected,
  } = useContext(DashboardContext);

  useEffect(() => {
    const fetchData = async () => {
      const store = JSON.parse(sessionStorage.getItem("user-auth-store"));
      const username = store.state.username;

      try {
        const personasResponse = await axios.get(
          `${HOST_PATH}/personas/?username=${username}`
        );

        const conversationsResponse = await axios.get(
          `${HOST_PATH}/conversations/?username=${username}`
        );

        const patternsResponse = await axios.get(`${HOST_PATH}/patterns/`);

        setUserPersonas(personasResponse.data);
        setUserConversations(conversationsResponse.data);
        setPatterns(patternsResponse.data);
      } catch (error) {
        console.error(error);
      }
    };
    
    fetchData();
  }, []);

  return (
    <main className="dashboard">
      <article className={`side-panel ${isSidePanelOpen ? "open" : ""}`}>
        <section className="side-panel-collapse">
          <span onClick={() => setIsSidePanelOpen(!isSidePanelOpen)}>
            {isSidePanelOpen ? "🡨" : "🡪"}
          </span>
        </section>
        {isSidePanelOpen ? (
          <>
            <Personas />
            <Conversations />
          </>
        ) : null}
      </article>
      <article className={`main-display ${isSidePanelOpen ? "" : "open"}`}>
        {isConversationSelected ? (
          <Conversation />
        ) : isPersonaSelected ? (
          <Persona />
        ) : isNewPersonaSelected ? (
          <NewPersona />
        ) : (
          <NewConversation />
        )}
      </article>
    </main>
  );
}
