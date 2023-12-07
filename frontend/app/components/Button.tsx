interface ButtonProps {
  name: string;
  onClick?: any;
  style?: string;
  className?: string;
}

const Button = (props: ButtonProps) => {
  if (props.style === "outline")
    return (
      <button
        className={`block-inline ml-auto w-fit rounded-lg border border-blue-500 bg-white px-4 py-2 text-blue-500 hover:border-blue-700 hover:text-blue-700 ${props.className}`}
        onClick={props.onClick}
      >
        {props.name}
      </button>
    );
  else
    return (
      <button
        className={`block-inline ml-auto w-fit rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 ${props.className}`}
        onClick={props.onClick}
      >
        {props.name}
      </button>
    );
};

export default Button;
