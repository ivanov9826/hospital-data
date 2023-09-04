import { generateMock } from "./mockData.js";

// Generate the mock data from the generator function

const latest_health_readings = generateMock([1, 2, 3, 4, 5, 6, 7], 10, 3600);

function sortAndReshapeInput(data) {
  const patientData = {};

  data.forEach((entry) => {
    const patientId = entry.patientId;
    if (!patientData[patientId]) {
      patientData[patientId] = [];
    }
    patientData[patientId].push(entry);
  });

  const result = Object.values(patientData).map((entries) => {
    return entries.sort((a, b) => new Date(a.time) - new Date(b.time));
  });

  return result;
}

export const changedInput = sortAndReshapeInput(latest_health_readings);
