interface UserCardProps {
  name?: string;
  age?: number;
  role?: string;
}

function UserCard({
  name = 'Guest user',
  age = 0,
  role = 'Role not specified',
}: UserCardProps) {
  return (
    <article className="profile-card">
      <span className="profile-avatar" aria-hidden="true">
        {name.charAt(0).toUpperCase()}
      </span>
      <div className="profile-details">
        <h3>{name}</h3>
        <p>{age > 0 ? `${age} years old` : 'Age not specified'}</p>
      </div>
      <span className="profile-role">{role}</span>
    </article>
  );
}

export default UserCard;
