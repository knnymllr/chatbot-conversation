export default function Message({ index, sender, message }) {
  return (
    <li key={index} className={`li-msg ${index % 2 == 0 ? "start" : "end"}`}>
      <div className={`msg-container ${index % 2 == 0 ? "first" : "second"}`}>
        <h4>{sender}</h4>
        <p>{message}</p>
      </div>
    </li>
  );
}
