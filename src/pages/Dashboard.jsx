import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Dashboard.css";

const Dashboard = () => {
  const [subjects, setSubjects] = useState([]);
  const [subject, setSubject] = useState("");
  const [teacher, setTeacher] = useState("");
  const [hours, setHours] = useState(1);
  const [periodsPerDay, setPeriodsPerDay] = useState(7); // 🔥 NEW

  const navigate = useNavigate();

  const handleAdd = (e) => {
    e.preventDefault();
    if (!subject || !teacher || hours < 1) return;

    const newEntry = {
      subject,
      teacher,
      hours: parseInt(hours),
    };

    setSubjects([...subjects, newEntry]);
    setSubject("");
    setTeacher("");
    setHours(1);
  };

  
  const handleGenerate = () => {
    if (subjects.length === 0) {
      alert("Add at least one subject first!");
      return;
    }
    if (periodsPerDay < 1) {
      alert("Enter valid number of periods per day.");
      return;
    }const totalHours = subjects.reduce((sum, s) => sum + parseInt(s.hours), 0);
  const requiredHours = periodsPerDay * 5;

  if (totalHours !== requiredHours) {
    alert(
      `Total subject hours (${totalHours}) must equal ${requiredHours} (periodsPerDay × 5).`
    );
    return;
  }
    navigate("/generate", { state: { subjects, periodsPerDay } }); // 🔥 Pass it
  };

  return (
    <div className="container">
      <h1 className="heading"> Timetable Generator - Dashboard</h1>

      <form onSubmit={handleAdd} className="form">
        <input
          type="text"
          placeholder="Subject Name"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Teacher Name"
          value={teacher}
          onChange={(e) => setTeacher(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Hours per Week"
          value={hours}
          min="1"
          onChange={(e) => setHours(e.target.value)}
          required
        />
        <button type="submit" className="button">
          Add Subject
        </button>
      </form>

      <div className="form">
        <input
          type="number"
          placeholder="Periods per Day (e.g. 7)"
          value={periodsPerDay}
          min="1"
          onChange={(e) => setPeriodsPerDay(parseInt(e.target.value))}
          required
        />
      </div>

      <div className="subject-list">
        <h2 className="subheading"> Subjects Entered:</h2>
        <ul>
          {subjects.map((item, index) => (
            <li key={index}>
              {item.subject} - {item.teacher} ({item.hours} hrs)
            </li>
          ))}
        </ul>
      </div>

      <button className="button generate-btn" onClick={handleGenerate}>
         Generate Timetable →
      </button>
    </div>
  );
};

export default Dashboard;
