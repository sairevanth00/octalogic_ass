import { useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers-pro/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import {
  validateCurrentStep,
  validateTypes,
} from "./utils/validateCurrentStep";
import "./App.css";

const initialFourWheelVehicles = {
  hatchback: ["Tata Altroz", "Maruti Suzuki Swift", "Tata Tiago"],
  suv: ["Mahindra Scorpio N", "Mahindra XUV700", "Maruti Suzuki Fronx"],
  adventure: ["Toyota Fortuner", "Mercedes-AMG G 63", "Jeep Compass"],
  sedan: ["Maruti Dzire", "Honda City", "Hyundai Verna"],
  muv: ["Hyundai Verna", "Toyota Innova Crysta", "Kia Carens"],
};

const initialTwoWheelVehicles = {
  cruiser: [" Royal Enfield Classic 350", "TVS Ronin", "Honda CB350"],
  sports: ["Yamaha R15 V4", "TVS Apache RR 310", "BMW G310 RR"],
  adventure: [
    "Royal Enfield Himalayan 450",
    "Yezdi Adventure",
    "Hero Xpulse 210",
  ],
  "commuter motorcycle": [
    "Yamaha MT 15 V2",
    "Hero Xtreme 125R",
    "TVS Raider 125",
  ],
  "street bikes": ["TVS Apache RTR 160", "Bajaj Pulsar NS200", "Honda Unicorn"],
};

function App() {
  const [name, setName] = useState({ firstName: "", lastName: "" });
  const [vehicleTypes, setVehicleTypes] = useState({
    2: initialTwoWheelVehicles,
    4: initialFourWheelVehicles,
  });
  const [selectedWheelType, setSelectedWheelType] = useState("");
  const [selectedVehicleType, setSelectedVehicleType] = useState("");
  const [selectedVehicleModel, setSelectedVehicleModel] = useState("");
  const [vehicles, setVehicles] = useState();
  const [currentStep, setCurrentStep] = useState("5");
  const [dateRange, setDateRange] = useState([]);

  const handleNameInputs = (type, value) => {
    setName((prev) => {
      return { ...prev, [type]: value };
    });
  };

  const handleNextStep = (nextStepVal, validateType = null) => {
    let noErrFound = false;
    if (validateType == validateTypes.NAME) {
      if (!name.firstName || !name.lastName)
        return validateCurrentStep({ type: validateType });
    } else if (validateType == validateTypes.WHEEL_TYPE) {
      if (!selectedWheelType)
        return validateCurrentStep({ type: validateType });
    } else if (validateType == validateTypes.VEHICLE_TYPE) {
      if (!selectedVehicleType)
        return validateCurrentStep({ type: validateType });
    } else if (validateType == validateTypes.VEHICLE_MODEL) {
      if (!selectedVehicleModel)
        return validateCurrentStep({ type: validateType });
    } else if (validateType == validateTypes.DATE_RANGE) {

      console.log(validateType, !dateRange[0], !dateRange[1])
      // if (dateRange.length < 2)
      noErrFound = validateCurrentStep({ type: validateType, date_range: dateRange });
      console.log('noErrFound: ', noErrFound)
      if(noErrFound) {
        setCurrentStep(nextStepVal);
      } else {
        return;
      }
    }
    setCurrentStep(nextStepVal);

    console.log("nextStepVal: ", nextStepVal);
    // TODO validate the current form inputvalues to proceed next step.
  };

  const handleWheelChange = (e) => {
    setSelectedWheelType(e.target.value);
  };

  const handleVehicleType = (e) => {
    setSelectedVehicleType(e.target.value);
  };

  const handleVehicleModel = (e) => {
    setSelectedVehicleModel(e.target.value);
  };

  const handleDateRangeChange = (newValue) => {
    setDateRange(newValue);
    console.log("Start Date:", newValue[0]?.format("YYYY-MM-DD"));
    console.log("End Date:", newValue[1]?.format("YYYY-MM-DD"));
  };

  return (
    <div className="form-container">
      {currentStep == "1" && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <h2>First, what’s your name?</h2>
          <label>First Name</label>
          <input
            type="text"
            value={name.firstName}
            onChange={(e) => handleNameInputs("firstName", e.target.value)}
          />

          <label>Last Name</label>
          <input
            type="text"
            value={name.lastName}
            onChange={(e) => handleNameInputs("lastName", e.target.value)}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <button
              className="actionBtn"
              onClick={() => handleNextStep("2", validateTypes.NAME)}
            >
              Next
            </button>
          </div>
        </div>
      )}
      {currentStep == "2" && (
        <>
          <FormControl>
            <h2>Select No of Wheels You Want</h2>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
              onChange={handleWheelChange}
            >
              <FormControlLabel
                value="2"
                checked={selectedWheelType === "2"}
                control={<Radio />}
                label="Two"
              />
              <FormControlLabel
                value="4"
                checked={selectedWheelType === "4"}
                control={<Radio />}
                label="Four"
              />
            </RadioGroup>
          </FormControl>
          <h4>Selected Weels: {selectedWheelType}</h4>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button
              style={{ margin: "10px" }}
              onClick={() => handleNextStep("1")}
              className="actionBtn"
            >
              Prev
            </button>
            <button
              style={{ margin: "10px" }}
              onClick={() => handleNextStep("3", validateTypes.WHEEL_TYPE)}
              className="actionBtn"
            >
              Next
            </button>
          </div>
        </>
      )}
      {currentStep === "3" && (
        <>
          <FormControl>
            <h2>Type of Vehicle</h2>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
              onChange={handleVehicleType}
            >
              {Object.keys(vehicleTypes[selectedWheelType]).map((item) => {
                let labelValue = item.toUpperCase();
                return (
                  <FormControlLabel
                    key={item}
                    value={item}
                    control={<Radio />}
                    label={labelValue}
                    checked={selectedVehicleType === item}
                  />
                );
              })}
            </RadioGroup>
          </FormControl>
          <h4>Selected Vehicle Type: {selectedVehicleType}</h4>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button
              style={{ margin: "10px" }}
              onClick={() => handleNextStep("2")}
              className="actionBtn"
            >
              Prev
            </button>
            <button
              style={{ margin: "10px" }}
              onClick={() => handleNextStep("4", validateTypes.VEHICLE_TYPE)}
              className="actionBtn"
            >
              Next
            </button>
          </div>
        </>
      )}

      {currentStep === "4" && (
        <>
          <FormControl>
            <h2>Please Select Specific Vehicle Model</h2>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
              onChange={handleVehicleModel}
            >
              {vehicleTypes[selectedWheelType][selectedVehicleType].map(
                (item) => {
                  let labelValue = item.toUpperCase();
                  return (
                    <FormControlLabel
                      key={item}
                      value={item}
                      control={<Radio />}
                      label={labelValue}
                      checked={selectedVehicleModel === item}
                    />
                  );
                }
              )}
            </RadioGroup>
          </FormControl>
          <h4>Selected Specific Model: {selectedVehicleModel}</h4>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button
              style={{ margin: "10px" }}
              onClick={() => handleNextStep("3")}
              className="actionBtn"
            >
              Prev
            </button>
            <button
              style={{ margin: "10px" }}
              onClick={() => handleNextStep("5", validateTypes.VEHICLE_MODEL)}
              className="actionBtn"
            >
              Next
            </button>
          </div>
        </>
      )}

      {currentStep === "5" && (
        <>
          <h2>Please Select Date Range</h2>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DateRangePicker"]}>
              <DateRangePicker value={dateRange} onChange={handleDateRangeChange} />
            </DemoContainer>
          </LocalizationProvider>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button
              style={{ margin: "10px" }}
              onClick={() => handleNextStep("4")}
              className="actionBtn"
            >
              Prev
            </button>
            <button
              style={{ margin: "10px" }}
              onClick={() => handleNextStep("6", validateTypes.DATE_RANGE)}
              className="actionBtn"
            >
              Submit
            </button>
          </div>
        </>
      )}

      {currentStep === "6" && (
        <>
          <h2> Booking Confirmed</h2>
          <div>
            <h3>Details: </h3>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
