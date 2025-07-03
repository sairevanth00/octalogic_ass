import { validateTypes } from "../utils/validateCurrentStep";
import { BOOKING_STEPS } from "../constants";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

export default function VehicleWheels({handleWheelChange, selectedWheelType, wheelTypes, handleNextStep}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <FormControl>
        <h2>Select No of Wheels You Want</h2>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="female"
          name="radio-buttons-group"
          onChange={handleWheelChange}
        >
          {wheelTypes.map((item) => {
            return (
              <FormControlLabel
                key={item.id}
                value={item.no_of_wheels_in_int}
                checked={selectedWheelType === String(item.no_of_wheels_in_int)}
                control={<Radio />}
                label={item.no_of_wheels_in_text}
              />
            );
          })}
        </RadioGroup>
      </FormControl>
      <h4>Selected Weels: {selectedWheelType}</h4>
      <div>
        <button
          onClick={() => handleNextStep(BOOKING_STEPS.STEP_3, validateTypes.WHEEL_TYPE)}
          className="actionBtn"
        >
          Next
        </button>
      </div>
    </div>
  );
}
