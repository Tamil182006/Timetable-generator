import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { generateTimetable } from '../utils/Scheduler.js';
import "../Styles/Generator.css";

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

const Generate = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const subjects = location.state?.subjects || [];

  const [timetable, setTimetable] = useState([]);

  useEffect(() => {
    if (!subjects.length) {
      alert("No subjects found. Redirecting...");
      navigate('/');
    } else {
      const table = generateTimetable(subjects);
      setTimetable(table);
    }
  }, []);

  return (
    <div className="container">
      <h1 className="heading"> Generated Timetable</h1>
      <table className="timetable">
        <thead>
          <tr>
            <th>Day / Period</th>
            {[...Array(6)].map((_, i) => (
              <th key={i}>Period {i + 1}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {timetable.map((dayRow, dayIndex) => (
            <tr key={dayIndex}>
              <td><strong>{days[dayIndex]}</strong></td>
              {dayRow.map((slot, hourIndex) => (
                <td key={hourIndex}>
                  {slot
                    ? <>
                        <div>{slot.subject}</div>
                        <small> {slot.teacher}</small>
                      </>
                    : '-'}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button className="button" onClick={() => navigate('/')}>
          Back to Dashboard
      </button>
    </div>
  );
};

export default Generate;
