import '../modules/auth/styles/style.css';

interface ToggleSelectorProps<T extends string> {
    options: { value: T; label: string }[];
    selected: T;
    onSelect: (value: T) => void;
  }
  
  export const ToggleSelector = <T extends string>({
    options,
    selected,
    onSelect,
  }: ToggleSelectorProps<T>) => {
    return (
      <div className="toggle-selector">
        {options.map((option) => (
          <button
            key={option.value}
            className={`toggle-option ${selected === option.value ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              onSelect(option.value);
            }}
          >
            {option.label}
          </button>
        ))}
      </div>
    );
  };