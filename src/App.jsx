import { useState } from "react";
import moment from "moment";

function App() {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [age, setAge] = useState({
    years: 0,
    months: 0,
    days: 0,
  });

  const [error, setError] = useState({
    day: "",
    month: "",
    year: "",
  });

  const handleDayChange = (e) => {
    const value = e.target.value;
    setDay(value);
    if (error.day && value) {
      setError(prevError => ({ ...prevError, day: "" }));
    }
  };

  const handleMonthChange = (e) => {
    const value = e.target.value;
    setMonth(value);
    if (error.month && value) {
      setError(prevError => ({ ...prevError, month: "" }));
    }
  };

  const handleYearChange = (e) => {
    const value = e.target.value;
    setYear(value);
    if (error.year && value) {
      setError(prevError => ({ ...prevError, year: "" }));
    }
  };

  const calculateAge = () => {
    let newError = { day: "", month: "", year: "" };

    // Verifică dacă toate câmpurile sunt completate
    if (!day || !month || !year) {
      newError = {
        ...newError,
        day: !day ? "required" : "",
        month: !month ? "required" : "",
        year: !year ? "required" : "",
      };
    } else {
      // Verifică dacă data introdusă este validă
      const inputDate = moment(`${year}-${month}-${day}`, "YYYY-MM-DD");
      if (!inputDate.isValid()) {
        newError.day = "invalid";
      }

      // Verifică dacă luna are maximum 31 de zile
      const daysInMonth = moment(`${year}-${month}`, "YYYY-MM").daysInMonth();
      if (parseInt(day, 10) > daysInMonth) {
        newError.day = "invalid";
      }
    }

    // Verifică dacă anul este în trecut
    const currentYear = moment().year();
    if (parseInt(year, 10) >= currentYear) {
      newError.year = "future";
    }

    // Verifică dacă luna este între 1 și 12
    if (parseInt(month, 10) < 1 || parseInt(month, 10) > 12) {
      newError.month = "invalid";
    }

    setError(newError);

    if (!newError.day && !newError.month && !newError.year) {
      // Calcularea vârstei
      const birthDate = moment(`${year}-${month}-${day}`, "YYYY-MM-DD");
      const currentDate = moment();
      const diff = moment.duration(currentDate.diff(birthDate));
      const years = diff.years();
      const months = diff.months();
      const days = diff.days();
      setAge({ years, months, days });
    }
  };

  return (
    <main className="w-full min-w-[350px] md:w-[450px] bg-white rounded-t-3xl rounded-bl-3xl rounded-br-[100px] font-poppins flex flex-col items-center px-5">
      <div className="flex py-10 gap-x-2 w-full">
        <div className="flex flex-col sm:w-[7rem] w-[6rem]">
          <label className={`uppercase flex text-smokey text-sm font-semibold tracking-widest ${error.day === "required" && "text-lightr"}`}>
            day
          </label>
          <input
            type="number"
            value={day}
            onChange={handleDayChange}
            placeholder="DD"
            className={`text-[1.75rem] border-[1px] rounded-xl font-semibold ${error.day && "border-lightr"}`}
          />
          {error.day === "required" && (
            <div className="text-lightr mt-1 text-[10px]">
              This field is required
            </div>
          )}
          {error.day === "invalid" && (
            <div className="text-lightr mt-1 text-[10px]">
              Must be a valid day
            </div>
          )}
        </div>
        <div className="flex flex-col sm:w-[7rem] w-[6rem]">
          <label className={`uppercase flex text-smokey text-sm font-semibold tracking-widest ${error.month === "required" && "text-lightr"}`}>
            month
          </label>
          <input
            type="number"
            value={month}
            onChange={handleMonthChange}
            placeholder="MM"
            className={`text-[1.75rem] font-semibold border-[1px] rounded-xl ${error.month && "border-lightr"}`}
          />
          {error.month === "required" && (
            <div className="text-lightr mt-1 text-[10px]">
              This field is required
            </div>
          )}
          {error.month === "invalid" && (
            <div className="text-lightr mt-1 text-[10px]">
              Must be a valid month
            </div>
          )}
        </div>
        <div className="flex flex-col sm:w-[7rem] w-[6rem]">
          <label className={`uppercase flex text-smokey text-sm font-semibold tracking-widest ${error.year === "required" && "text-lightr"}`}>
            year
          </label>
          <input
            type="number"
            value={year}
            onChange={handleYearChange}
            placeholder="YYYY"
            className={`text-[1.75rem] font-semibold border-[1px] rounded-xl ${error.year && "border-lightr"}`}
          />
          {error.year === "required" && (
            <div className="text-lightr mt-1 text-[10px]">
              This field is required
            </div>
          )}
          {error.year === "future" && (
            <div className="text-lightr mt-1 text-[10px]">
              Year must be in the past
            </div>
          )}
        </div>
      </div>

      <button
        onClick={calculateAge}
        className="relative w-full flex flex-col items-center md:items-end group"
      >
        <img
          src="icon-arrow.svg"
          alt=""
          width={60}
          className="bg-purple relative p-4 rounded-full z-10 group-hover:bg-offb transition-colors duration-300"
        />
      </button>

      <div className="w-full font-bold italic text-[3rem] leading-tight mt-6 pb-12">
        <p>
          {age.years > 0 ? (
            <span className='text-purple font-extrabold'>{age.years}</span>
          ) : (
            <span className="text-purple">--</span>
          )}{" "}
          years
        </p>
        <p>
          {age.months > 0 ? (
            <span className='text-purple font-extrabold'>{age.months}</span>
          ) : (
            <span className="text-purple">--</span>
          )}{" "}
          months
        </p>
        <p>
          {age.days > 0 ? (
            <span className='text-purple font-extrabold'>{age.days}</span>
          ) : (
            <span className="text-purple">--</span>
          )}{" "}
          days
        </p>
      </div>
    </main>
  );
}

export default App;
