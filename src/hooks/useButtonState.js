import { useState } from 'react';

function useButtonState(initialState = false) {
  const [isButtonDisabled, setIsButtonDisabled] = useState(initialState);

  const disableButton = () => {
    setIsButtonDisabled(true);
  };

  const enableButton = () => {
    setIsButtonDisabled(false);
  };

  return {
    isButtonDisabled,
    disableButton,
    enableButton,
  };
}

export default useButtonState;
