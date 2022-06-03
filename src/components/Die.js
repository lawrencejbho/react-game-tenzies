import React from "react";

function Die(props) {
  const styles = {
    backgroundColor: "#59E391",
  };

  return (
    <div className="dice" style={props.isHeld === true ? styles : "none"}>
      <h2 className="dice-num">{props.value}</h2>
    </div>
  );
}

export default Die;
