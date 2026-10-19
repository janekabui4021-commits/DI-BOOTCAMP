interface GreetingProps {
  name: string;
  messageCount: number;
}

function Greeting({ name, messageCount }: GreetingProps) {
  return (
    <div className="greeting" role="status">
      <span className="greeting-avatar" aria-hidden="true">
        {name.charAt(0).toUpperCase()}
      </span>
      <p>
        Welcome back, <strong>{name}</strong>. You have{' '}
        <strong>{messageCount}</strong> new messages.
      </p>
    </div>
  );
}

export default Greeting;
