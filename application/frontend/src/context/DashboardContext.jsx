import { createContext, useState } from "react";

const DashboardContext = createContext({});

export const DashboardProvider = ({ children }) => {
  const [userPersonas, setUserPersonas] = useState(null);
  const [userConversations, setUserConversations] = useState(null);
  const [patterns, setPatterns] = useState(null);
  const [isPersonaSelected, setIsPersonaSelected] = useState(false);
  const [isConversationSelected, setIsConversationSelected] = useState(false);
  const [isNewPersonaSelected, setIsNewPersonaSelected] = useState(false);
  const [newConversationFormData, setNewConversationFormData] = useState({
    persona1: "",
    persona2: "",
    pattern: "",
    topic: "",
  });
  const [newPersonaFormData, setNewPersonaFormData] = useState({
    name: "",
    prompt: "",
    creator: "",
  });
  return (
    <DashboardContext.Provider
      value={{
        patterns,
        setPatterns,
        userPersonas,
        setUserPersonas,
        userConversations,
        setUserConversations,
        isPersonaSelected,
        setIsPersonaSelected,
        isConversationSelected,
        setIsConversationSelected,
        isNewPersonaSelected,
        setIsNewPersonaSelected,
        newConversationFormData,
        setNewConversationFormData,
        newPersonaFormData,
        setNewPersonaFormData,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export default DashboardContext;
