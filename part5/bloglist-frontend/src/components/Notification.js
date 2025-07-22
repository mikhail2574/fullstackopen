const Notification = ({ message }) => {
  if (!message) return null;

  const style = {
    color: message.type === "error" ? "red" : "green",
    background: "#ddd",
    border: `2px solid ${message.type === "error" ? "red" : "green"}`,
    padding: 10,
    marginBottom: 10,
  };

  return <div style={style}>{message.text}</div>;
};

export default Notification;
