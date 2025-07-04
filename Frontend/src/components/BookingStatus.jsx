import React, { useEffect } from "react";
import { BASE_URL, STORAGE_KEY } from "../constants";
import dayjs from "dayjs";

const BookingStatus = ({
  bookingDetails,
  startNewBooking,
  setBookingDetails,
}) => {
  useEffect(() => {
    const bookingId = JSON.parse(localStorage.getItem(STORAGE_KEY)).booking_id;
    const fetchBookingDetails = async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/vehicle/booking_details/${bookingId}`
        );
        const data = await res.json();

        if (res.ok) {
          console.log("data: ", data);
          setBookingDetails(data);
        } else {
          alert(data.message || "Failed to create user");
        }
      } catch (err) {
        console.log(`Something went wrong ${err}`);
      }
    };
    fetchBookingDetails();
  }, []);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
        }}
      >
        <div>
          <svg
            width={100}
            height={100}
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="24"
              cy="24"
              r="22"
              stroke={"#4CAF50"}
              strokeWidth="4"
              fill="none"
            />
            <path
              d="M16 24L22 30L34 18"
              stroke={"#4CAF50"}
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h2>Booking Confirmed</h2>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          alignItems: "start",
        }}
      >
        <p>
          <strong>Booking ID: </strong> {bookingDetails.booking_id}
        </p>
        <p>
          <strong>User Name: </strong>
          {`${bookingDetails.first_name} ${bookingDetails.last_name}`}
        </p>
        <p>
          <strong>Vehicle ID: </strong> {bookingDetails.vehicle_id}
        </p>

        <p>
          <strong>Vehicle Model: </strong> {bookingDetails.vehicle_model}
        </p>
        <p>
          <strong>Vehicle Type: </strong>{" "}
          {bookingDetails.vehicle_type.toUpperCase()}
        </p>
        <p>
          <strong>Number of Wheels: </strong> {bookingDetails.no_of_wheels}
        </p>
        <p>
          <strong>Booked Dates: </strong> From{" "}
          {dayjs(
            (bookingDetails?.date_range && bookingDetails?.date_range[0]) ||
              bookingDetails.booking_from
          ).format("DD/MM/YYYY")}{" "}
          - To{" "}
          {dayjs(
            (bookingDetails?.date_range && bookingDetails?.date_range[1]) ||
              bookingDetails.booking_to
          ).format("DD/MM/YYYY")}
        </p>
        <p>
          Click here to start with new booking{" "}
          <button onClick={startNewBooking}>Click</button>
        </p>
      </div>
    </>
  );
};

export default React.memo(BookingStatus);
