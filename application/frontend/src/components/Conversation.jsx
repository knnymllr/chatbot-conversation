export default function Conversation() {
  return (
    <section>
      <div className="new-conversation-grid">
        <div
          className="conversation-details-container"
        >
          <div className="form-field">
            <label for="persona1">Persona 1:</label>
            <p id="persona1"></p>
          </div>
          <div className="form-field">
            <label for="persona2">Persona 2:</label>
            <p id="persona2"></p>
          </div>
          <div className="form-field">
            <label for="pattern">Pattern:</label>
            <p id="pattern"></p>
          </div>
          <div className="form-field">
            <label for="topic">Topic:</label>
            <p name="topic" className="topic" id="topic"></p>
          </div>
        </div>
        <div className="conversation-container">
          <label>Conversation:</label>
          <div className="conversation"></div>
        </div>
      </div>
    </section>
  );
}
