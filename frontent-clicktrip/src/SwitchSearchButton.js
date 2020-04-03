import React from 'react';

function SwitchSearchContainer(props) {
  return (
    <button onClick={props.onClick}>
        {props.buttonText}
    </button>
  );
}

export default SwitchSearchContainer;