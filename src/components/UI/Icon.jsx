import { useIcon } from '../../hooks/useIcon';

export function Icon({ name, className }) {
  const { icon } = useIcon({ name });

  return (
    <div className={`${className}`}>
      <img
        src={icon}
        alt={name}
      />
    </div>
  );
}
