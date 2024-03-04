import { FunctionComponent } from "react";
import classes from "./Button.module.scss";

type ButtonType = {
  text: string;
  onClick: () => void;
};

const Button: FunctionComponent<ButtonType> = ({ text, onClick }) => {
  return (
    <button className={classes.button} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
