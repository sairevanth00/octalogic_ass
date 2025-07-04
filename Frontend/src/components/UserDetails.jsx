import React from "react";
import { BOOKING_STEPS, USER_LABELS } from "../constants";
import { validateTypes } from "../utils/validateCurrentStep";

const UserDetails = ({name, handleNextStep, handleNameInputs})=> {
  return (
    <>
      <h2>First, what’s your name?</h2>
      <label>First Name</label>
      <input
        type="text"
        value={name.firstName}
        onChange={(e) => handleNameInputs(USER_LABELS.FIRST_NAME, e.target.value)}
      />

      <label>Last Name</label>
      <input
        type="text"
        value={name.lastName}
        onChange={(e) => handleNameInputs(USER_LABELS.LAST_NAME, e.target.value)}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <button
          className="actionBtn"
          onClick={() => handleNextStep(BOOKING_STEPS.STEP_2, validateTypes.NAME)}
        >
          Next
        </button>
      </div>
    </>
  );
}

export default React.memo(UserDetails);