import { useEffect, useRef, useState } from "react";
import { BASE_URL, BOOKING_STEPS, STORAGE_KEY } from "./constants";
import {
  validateCurrentStep,
  validateTypes,
} from "./utils/validateCurrentStep";
import "./App.css";
import dayjs from "dayjs";
import UserDetails from "./components/UserDetails";
import VehicleWheels from "./components/VehicleWheels";
import VehicleTypes from "./components/VehicleTypes";
import VehicleModels from "./components/VehicleModels";
import DateRange from "./components/DateRange";
import BookingStatus from "./components/BookingStatus";

function App() {
  const [name, setName] = useState({ firstName: "", lastName: "" });
  const [selectedWheelType, setSelectedWheelType] = useState("");
  const [selectedVehicleType, setSelectedVehicleType] = useState("");
  const [selectedVehicleModel, setSelectedVehicleModel] = useState({});
  const [wheelTypes, setWheelTypes] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [currentStep, setCurrentStep] = useState(null);
  const [dateRange, setDateRange] = useState([]);
  const [bookingDetails, setBookingDetails] = useState({});
  const wheelsApiFetchedRef = useRef(false);

  useEffect(() => {
    let currentStepsFound = localStorage.getItem(STORAGE_KEY);
    if (currentStepsFound) {
      const {
        current_step,
        no_of_wheels,
        vehicle_model,
        vehicle_type,
        date_range,
        vehicle_id,
      } = JSON.parse(currentStepsFound);
      setBookingDetails(JSON.parse(currentStepsFound));
      if (current_step) setCurrentStep(String(current_step));
      if (no_of_wheels) setSelectedWheelType(no_of_wheels);
      if (vehicle_type) setSelectedVehicleType(vehicle_type);
      if (vehicle_model)
        setSelectedVehicleModel({ name: vehicle_model, vehicle_id });
      if (date_range)
        setDateRange([
          dayjs(dayjs(date_range[0]).format("YYYY-MM-DD")),
          dayjs(dayjs(date_range[1]).format("YYYY-MM-DD")),
        ]);
      if (!vehicles.length) getVehilesByWheelType(no_of_wheels);
    } else {
      setCurrentStep(BOOKING_STEPS.STEP_1);
    }

    // To avoid duplicate call in DEV mode.
    if (wheelsApiFetchedRef.current) return;
    wheelsApiFetchedRef.current = true;
    getVehicleWheelTypes();
  }, []);

  const handleNameInputs = (type, value) => {
    setName((prev) => {
      return { ...prev, [type]: value };
    });
  };

  const addUserDetails = async (nextStepVal) => {
    try {
      const res = await fetch(`${BASE_URL}/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(name),
      });

      const data = await res.json();

      if (res.ok) {
        setCurrentStep(String(nextStepVal));
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            ...JSON.parse(localStorage.getItem(STORAGE_KEY)),
            current_step: nextStepVal,
            user_id: data.id,
          })
        );
      } else {
        alert(data.message || "Failed to create user");
      }
    } catch (err) {
      alert(`Something went wrong ${err}`);
    }
  };

  const getVehicleWheelTypes = async () => {
    try {
      const res = await fetch(`${BASE_URL}/vehicle/wheels`);
      const data = await res.json();

      if (res.ok) {
        setWheelTypes(data);
      } else {
        alert(data.message || "Failed to create user");
      }
    } catch (err) {
      alert(`Something went wrong ${err}`);
    }
  };

  const bookVehicle = async (nextStepVal) => {
    try {
      const res = await fetch(`${BASE_URL}/vehicle/booking_confirm`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          vehicle_id: selectedVehicleModel.vehicle_id,
          user_id: JSON.parse(localStorage.getItem(STORAGE_KEY)).user_id,
          booking_from: dateRange[0].toISOString().split("T")[0],
          booking_to: dateRange[1].toISOString().split("T")[0],
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setCurrentStep(String(nextStepVal));
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            ...JSON.parse(localStorage.getItem(STORAGE_KEY)),
            current_step: String(nextStepVal),
            booking_id: data.booking_id,
          })
        );
        setBookingDetails(JSON.parse(localStorage.getItem(STORAGE_KEY)));
        alert(data.message || "Booking confirmed successfully!");
      } else {
        alert(data.message || "Failed to confirm booking!");
      }
    } catch (err) {
      alert(`Something went wrong ${err}`);
      setCurrentStep(String(nextStepVal - 1));
      return;
    }
  };

  const handleNextStep = (nextStepVal, validateType = null) => {
    let noErrFound = false;
    if (validateType) {
      if (validateType === validateTypes.NAME) {
        if (!name.firstName || !name.lastName)
          return validateCurrentStep({ type: validateType });
      } else if (validateType === validateTypes.WHEEL_TYPE) {
        if (!selectedWheelType)
          return validateCurrentStep({ type: validateType });
      } else if (validateType === validateTypes.VEHICLE_TYPE) {
        if (!selectedVehicleType)
          return validateCurrentStep({ type: validateType });
      } else if (validateType === validateTypes.VEHICLE_MODEL) {
        if (!selectedVehicleModel)
          return validateCurrentStep({ type: validateType });
      } else if (validateType === validateTypes.DATE_RANGE) {
        noErrFound = validateCurrentStep({
          type: validateType,
          date_range: dateRange,
        });
        if (
          noErrFound &&
          currentStep !== BOOKING_STEPS.STEP_2 &&
          currentStep !== BOOKING_STEPS.STEP_6
        ) {
          setCurrentStep(String(currentStep));
        } else {
          return;
        }
      } else {
        setCurrentStep(String(currentStep));
      }
    }
    if (nextStepVal === BOOKING_STEPS.STEP_2) {
      addUserDetails(nextStepVal);
    } else if (nextStepVal === BOOKING_STEPS.STEP_5) {
      let isVehicleAlreadyBooked = vehicles.find(
        (item) =>
          item.id === selectedVehicleModel.vehicle_id &&
          item.booking_status === 1
      );
      if (isVehicleAlreadyBooked) {
        setCurrentStep(String(nextStepVal - 1));
        alert(
          "Selected vehicle already booked by other user please select another vehicle"
        );
        return;
      } else {
        setCurrentStep(String(nextStepVal));
      }
    } else if (nextStepVal === BOOKING_STEPS.STEP_6) {
      bookVehicle(nextStepVal);
    } else {
      setCurrentStep(String(nextStepVal));
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          ...JSON.parse(localStorage.getItem(STORAGE_KEY)),
          current_step: String(nextStepVal),
        })
      );
    }
  };

  const getVehilesByWheelType = async (wheelsVal) => {
    try {
      const res = await fetch(`${BASE_URL}/vehicle/?no_of_wheels=${wheelsVal}`);
      const data = await res.json();

      if (res.ok) {
        setVehicles(data);
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            ...JSON.parse(localStorage.getItem(STORAGE_KEY)),
            no_of_wheels: wheelsVal,
          })
        );
      } else {
        alert(data.message || "Failed to fetch vehicles by wheels type");
      }
    } catch (err) {
      alert(`Something went wrong ${err}`);
    }
  };

  const handleWheelChange = (e) => {
    setSelectedWheelType(e.target.value);
    getVehilesByWheelType(e.target.value);
  };

  const handleVehicleType = (e) => {
    setSelectedVehicleType(e.target.value);
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        ...JSON.parse(localStorage.getItem(STORAGE_KEY)),
        vehicle_type: e.target.value,
        current_step: String(currentStep),
      })
    );
  };

  const handleVehicleModel = (e) => {
    let vehiclesByType = vehicles
      .filter((item) => item.no_of_wheels === Number(selectedWheelType))
      .filter((item) => item.vehicle_type === selectedVehicleType);

    let isFound = vehiclesByType.find(
      (ite) => ite.id === Number(e.target.value)
    );

    if (isFound) {
      setSelectedVehicleModel({
        name: isFound.vehicle_model,
        vehicle_id: isFound.id,
      });
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          ...JSON.parse(localStorage.getItem(STORAGE_KEY)),
          vehicle_model: isFound.vehicle_model,
          vehicle_id: isFound.id,
          current_step: String(currentStep),
        })
      );
    }
  };

  const handleDateRangeChange = (newValue) => {
    setDateRange(newValue);
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        ...JSON.parse(localStorage.getItem(STORAGE_KEY)),
        date_range: newValue,
        current_step: String(currentStep),
      })
    );
  };

  const startNewBooking = () => {
    console.log('startNewBooking: ')
    localStorage.removeItem(STORAGE_KEY);
    setCurrentStep(BOOKING_STEPS.STEP_1);
    setName({ firstName: "", lastName: "" });
    setVehicles([])
  };

  return (
    <div className="form-container">
      {currentStep == BOOKING_STEPS.STEP_1 && (
        <UserDetails
          name={name}
          handleNextStep={handleNextStep}
          handleNameInputs={handleNameInputs}
        />
      )}
      {currentStep === BOOKING_STEPS.STEP_2 && (
        <VehicleWheels
          handleWheelChange={handleWheelChange}
          selectedWheelType={selectedWheelType}
          wheelTypes={wheelTypes}
          handleNextStep={handleNextStep}
        />
      )}
      {currentStep === BOOKING_STEPS.STEP_3 && (
        <VehicleTypes
          handleVehicleType={handleVehicleType}
          vehicles={vehicles}
          selectedVehicleType={selectedVehicleType}
          handleNextStep={handleNextStep}
        />
      )}

      {currentStep === BOOKING_STEPS.STEP_4 && (
        <VehicleModels
          handleVehicleModel={handleVehicleModel}
          vehicles={vehicles}
          selectedWheelType={selectedWheelType}
          selectedVehicleType={selectedVehicleType}
          selectedVehicleModel={selectedVehicleModel}
          handleNextStep={handleNextStep}
        />
      )}

      {currentStep === BOOKING_STEPS.STEP_5 && (
        <DateRange
          dateRange={dateRange}
          handleDateRangeChange={handleDateRangeChange}
          handleNextStep={handleNextStep}
        />
      )}

      {currentStep === BOOKING_STEPS.STEP_6 && (
        <BookingStatus
          bookingDetails={bookingDetails}
          startNewBooking={startNewBooking}
          setBookingDetails={setBookingDetails}
        />
      )}
    </div>
  );
}

export default App;
