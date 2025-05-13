type Props = React.InputHTMLAttributes<HTMLInputElement>;

const Input = ({ ...props }: Props) => (
  <input className="input" {...props} />
);

export default Input;