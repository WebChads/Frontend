type Props = React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({children, ...props} : Props) => (
    <button className="btn" {...props}>
        {children}
        </button>
        
);

export default Button;
