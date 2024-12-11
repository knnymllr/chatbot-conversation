import { useContext } from "react";
import circleAdd from "../assets/circle-add.svg";
import DashboardContext from "../context/DashboardContext";

export default function Personas() {
  const {
    userPersonas,
    setIsPersonaSelected,
    setIsConversationSelected,
    setIsNewPersonaSelected,
  } = useContext(DashboardContext);

  const handlePersona = () => {
    setIsConversationSelected(false);
    setIsNewPersonaSelected(false);
    setIsPersonaSelected(true)
  }

  const handleNewPersona = () => {
    setIsPersonaSelected(false);
    setIsConversationSelected(false);
    setIsNewPersonaSelected(true);
  };

  return (
    <section className="side-panel-section">
      <h2>Personas</h2>
      <ul>
        {userPersonas
          ? userPersonas.map((persona, index) => (
              <li key={index} className={index % 2 == 0 ? "light" : "dark"}>
                <div
                  className="personas-container"
                  onClick={handlePersona}
                >
                  <h3>{persona.name}</h3>
                  <p className="ellipsis-overflow">{persona.prompt}</p>
                </div>
              </li>
            ))
          : null}
      </ul>
      <li className="circle-add" onClick={handleNewPersona}>
        <img
          src={circleAdd}
          height="35px"
          width="35px"
          alt="Create a new persona"
        />
        <h3>New Persona</h3>
      </li>
    </section>
  );
}
