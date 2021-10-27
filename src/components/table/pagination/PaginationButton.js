export default function PaginationButton({
  name,
  id,
  className,
  value,
  onClick,
  disabled,
}) {
  return (
    <button
      id={id}
      type="button"
      className={className}
      value={value}
      onClick={onClick}
      disabled={disabled}
    >
      {name}
    </button>
  );
}
