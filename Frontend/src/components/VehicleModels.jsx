import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { validateTypes } from "../utils/validateCurrentStep";
import { BOOKING_STEPS } from "../constants";
import React from "react";

const VehicleModels = ({
  handleVehicleModel,
  vehicles,
  selectedWheelType,
  selectedVehicleType,
  selectedVehicleModel,
  handleNextStep,
})=> {
  return (
    <>
      <FormControl>
        <h2>Please Select Specific Vehicle Model</h2>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="female"
          name="radio-buttons-group"
          onChange={(e) => handleVehicleModel(e)}
        >
          {vehicles
            .filter((item) => item.no_of_wheels === Number(selectedWheelType))
            .filter((item) => item.vehicle_type === selectedVehicleType)
            .map((item) => {
              return (
                <FormControlLabel
                  key={item.id}
                  value={item.id}
                  control={<Radio />}
                  label={item.vehicle_model.toUpperCase()}
                  id={item.id}
                  checked={selectedVehicleModel.name === item.vehicle_model}
                />
              );
            })}
        </RadioGroup>
      </FormControl>
      <h4>Selected Specific Model: {selectedVehicleModel.name}</h4>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button
          style={{ margin: "10px" }}
          onClick={() => handleNextStep(BOOKING_STEPS.STEP_3)}
          className="actionBtn"
        >
          Prev
        </button>
        <button
          style={{ margin: "10px" }}
          onClick={() => handleNextStep(BOOKING_STEPS.STEP_5, validateTypes.VEHICLE_MODEL)}
          className="actionBtn"
        >
          Next
        </button>
      </div>
    </>
  );
}

export default React.memo(VehicleModels);