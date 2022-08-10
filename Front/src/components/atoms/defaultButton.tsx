import React, { useState } from "react";
import { DefaultButtonContainer } from "./styles";

interface IDefaultButtonProps {
  text: string;
  onClickLoading?: () => Promise<void>;
  onClick?: () => void;
}

export const DefaultButton: React.FC<IDefaultButtonProps> = ({ text, onClick, onClickLoading }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const setOnClick = () => {
    if (onClickLoading) {
      setIsLoading(true);
      onClickLoading().finally(() => {
        setIsLoading(false);
      });
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <DefaultButtonContainer>
      {isLoading ? <div>Cargando...</div> : <button onClick={() => setOnClick()}>{text}</button>}
    </DefaultButtonContainer>
  );
};
