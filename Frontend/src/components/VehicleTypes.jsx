import { validateTypes } from "../utils/validateCurrentStep";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { BOOKING_STEPS } from "../constants";
import React from "react";

const VehicleTypes = ({
  handleVehicleType,
  vehicles,
  selectedVehicleType,
  handleNextStep,
})=> {
  return (
    <>
      <FormControl>
        <h2>Please select Type of Vehicle</h2>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="female"
          name="radio-buttons-group"
          onChange={handleVehicleType}
        >
          {[...new Set(vehicles.map((item) => item.vehicle_type))].map(
            (item) => {
              return (
                <FormControlLabel
                  key={item}
                  value={item}
                  control={<Radio />}
                  label={item.toUpperCase()}
                  checked={selectedVehicleType === item}
                />
              );
            }
          )}
        </RadioGroup>
      </FormControl>
      <h4>Selected Vehicle Type: {selectedVehicleType}</h4>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <button
          style={{ margin: "10px" }}
          onClick={() => handleNextStep(BOOKING_STEPS.STEP_2)}
          className="actionBtn"
        >
          Prev
        </button>
        <button
          style={{ margin: "10px" }}
          onClick={() => handleNextStep(BOOKING_STEPS.STEP_4, validateTypes.VEHICLE_TYPE)}
          className="actionBtn"
        >
          Next
        </button>
      </div>
    </>
  );
}

export default React.memo(VehicleTypes)