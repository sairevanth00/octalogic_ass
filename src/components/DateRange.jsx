import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { validateTypes } from "../utils/validateCurrentStep";
import { LocalizationProvider } from "@mui/x-date-pickers-pro/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { BOOKING_STEPS } from "../constants";

export default function DateRange({dateRange, handleDateRangeChange, handleNextStep}) {
  return (
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
          onClick={() => handleNextStep(BOOKING_STEPS.STEP_4)}
          className="actionBtn"
        >
          Prev
        </button>
        <button
          style={{ margin: "10px" }}
          onClick={() => handleNextStep(BOOKING_STEPS.STEP_6, validateTypes.DATE_RANGE)}
          className="actionBtn"
        >
          Submit
        </button>
      </div>
    </>
  );
}
