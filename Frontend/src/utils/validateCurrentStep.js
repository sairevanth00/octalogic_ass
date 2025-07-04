import dayjs from "dayjs";

export const validateTypes = {
  NAME: "name",
  WHEEL_TYPE: "wheel_type",
  VEHICLE_TYPE: "vehicle_type",
  VEHICLE_MODEL: "vehicle_model",
  DATE_RANGE: "date_range",
};

export function validateCurrentStep(validate) {
  let { type, date_range } = validate;
  switch (type) {
    case validateTypes.NAME:
      alert("Please enter all fields to proceed further!");
      break;
    case validateTypes.WHEEL_TYPE:
      alert("Please select no of wheel required to proceed further!");
      break;
    case validateTypes.VEHICLE_TYPE:
      alert("Please select type of vehicle to proceed further!");
      break;
    case validateTypes.VEHICLE_MODEL:
      alert("Please select vehicle model to proceed further!");
      break;
    case validateTypes.DATE_RANGE:
      {
        const [start, end] = date_range;
        const startYear = new Date(start).getFullYear();
        const endYear = new Date(end).getFullYear();

        const today = dayjs().startOf("day");

        if (!date_range.length) {
          alert("Please select date range to proceed further!");
          return;
        } else if(startYear > 2050 || endYear > 2050) { // Custom error to avoid unwanted errors/behaviour
          alert("Selected years must me under 2051");
        } else if (start && start.isBefore(today)) {
          alert("Start date cannot be before today");
        } else if (start && end && end.isBefore(start)) {
          alert("End date must be after start date");
        } else if ((start && !start.isValid()) || (end && !end.isValid())) {
          alert("Both dates must be valid");
        } else {
          return true;
        }
      }
      break;
    default:
      break;
  }
}

