import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styles from "./CalendarContainer.module.css";

const CalendarContainer = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  // Function to get the current month's name and year
  const getMonthAndYear = (date) => {
    const options = { month: "short", year: "numeric" };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  // Function to get the weekdays with the current day highlighted
  const getWeekdays = (date) => {
    const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];
    const currentDayIndex = date.getDay();
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - currentDayIndex);

    return Array.from({ length: 7 }, (_, i) => {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      return {
        name: daysOfWeek[day.getDay()],
        date: day.getDate(),
        fullDate: day,
        isToday: day.toDateString() === new Date().toDateString(),
        isSelected: day.toDateString() === selectedDate.toDateString(),
      };
    });
  };

  // Handle date selection from the calendar
  const handleDateChange = (date) => {
    setSelectedDate(date);
    setIsCalendarOpen(false);
  };

  // Handle moving to the next or previous week
  const handleWeekChange = (direction) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() + direction * 7);
    setSelectedDate(newDate);
  };

  // Handle day click in the week view
  const handleDayClick = (day) => {
    setSelectedDate(day.fullDate);
  };

  return (
    <div
      className="bg-white"
      style={{
        textAlign: "center",
        position: "relative",
        width: "100%",
        borderRadius: "20px",
      }}
    >
      {/* Header */}
      <div className="d-flex justify-content-around py-3 fw-bold">
        <button
          onClick={() => handleWeekChange(-1)} // Move to the previous week
          style={{ background: "none", border: "none", cursor: "pointer" }}
        >
          <img src="/icons/arrow-left.png" alt="Previous" />
        </button>
        <span
          onClick={() => setIsCalendarOpen(true)}
          style={{ cursor: "pointer" }}
        >
          {getMonthAndYear(selectedDate)}
        </span>
        <button
          onClick={() => handleWeekChange(1)} // Move to the next week
          style={{ background: "none", border: "none", cursor: "pointer" }}
        >
          <img src="/icons/arrow-right.png" alt="Next" />
        </button>
      </div>

      {/* Calendar */}
      {isCalendarOpen && (
        <div
          style={{
            position: "absolute",
            top: "50px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 1000,
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Calendar
            onChange={handleDateChange}
            value={selectedDate}
            showNavigation={true}
            showNeighboringMonth={false}
            showYearPicker={true}
          />
        </div>
      )}

      {/* Week */}
      <div className="d-flex justify-content-around px-1 py-3">
        {getWeekdays(selectedDate).map((day, index) => (
          <div
            key={index}
            className={`d-flex flex-column gap-2 ${day.isSelected?styles.selectedBorder:styles.otherBorder}`}
            onClick={() => handleDayClick(day)}
            style={{ cursor: "pointer"}}
          >
            <div >{day.name}</div>
            <div
              className={`${styles.date} ${day.isSelected ? styles.selectedDateHighlight : ""}`}
              
            >
              <span>{day.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarContainer;
