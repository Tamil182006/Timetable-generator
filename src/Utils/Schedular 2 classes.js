export function generateTimetable(subjects, periodsPerDay = 7) {
  const days = 5;
  const totalSlots = days * periodsPerDay;

  const subjectPool = [];
  const teacherMap = {};

  for (const { subject, teacher, hours } of subjects) {
    for (let i = 0; i < hours; i++) {
      subjectPool.push({ subject, teacher });
    }
    teacherMap[subject] = teacher;
  }

  if (subjectPool.length !== totalSlots) {
    throw new Error(
      ` Subject hours (${subjectPool.length}) must exactly equal days × periods (${totalSlots}).`
    );
  }

  // Shuffle pool
  function shuffle(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  let shuffledPool = shuffle(subjectPool);
  const timetable = [];

  // Place subjects into [days][periods] grid
  for (let d = 0; d < days; d++) {
    const row = [];
    const usedSubjects = new Set();

    for (let p = 0; p < periodsPerDay; p++) {
      let index = shuffledPool.findIndex(
        (entry) => !usedSubjects.has(entry.subject)
      );

      // If all subjects already used in this row, allow reuse
      if (index === -1) index = 0;

      const selected = shuffledPool.splice(index, 1)[0];
      row.push(selected);
      usedSubjects.add(selected.subject);
    }

    timetable.push(row);
  }

  return timetable;
}
