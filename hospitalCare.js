import { changedInput } from "./reformInput.js";
import { HEALTH_READING_INTERVAL, STATUS_TYPES } from "./constants.js";

// Setting hard-coded interval for testing purposes

// Array with valid changes

const validChanges = [
  {
    from: STATUS_TYPES.GREEN,
    to: STATUS_TYPES.ORANGE,
  },
  {
    from: STATUS_TYPES.GREEN,
    to: STATUS_TYPES.RED,
  },
  {
    from: STATUS_TYPES.GREEN,
    to: STATUS_TYPES.GRAY,
  },
  {
    from: STATUS_TYPES.GRAY,
    to: STATUS_TYPES.ORANGE,
  },
  {
    from: STATUS_TYPES.GRAY,
    to: STATUS_TYPES.RED,
  },
  {
    from: STATUS_TYPES.ORANGE,
    to: STATUS_TYPES.RED,
  },
];

// Convert Date objects into miliseconds

function getDateInMiliSeconds(date) {
  return new Date(date).getTime();
}

// Creating the output array

function statusChange(input, timeInterval) {
  const timeIntervalInMiliseconds = timeInterval * 1000;

  const output = [];

  input.forEach((patient) => {
    const latestEntry = patient[patient.length - 1].time;
    const latestEntryTime = getDateInMiliSeconds(latestEntry);
    const timeIntervalStart = latestEntryTime - timeIntervalInMiliseconds;

    const filteredEntries = patient.filter((entry) => {
      const entryTime = getDateInMiliSeconds(entry.time);

      if (entryTime >= timeIntervalStart && entryTime <= latestEntryTime) {
        return entry;
      }
    });

    let isStatusChanged = false;

    for (let i = filteredEntries.length - 1; i >= 0; i--) {
      const to = filteredEntries[i].value.status;

      if (i === 0) {
        break;
      }

      const from = filteredEntries[i - 1].value.status;

      isStatusChanged = validChanges.some((change) => {
        return change.from == from && change.to == to;
      });

      if (isStatusChanged) {
        output.push({
          patientId: filteredEntries[i].patientId,
          healthChanged: isStatusChanged,
          change: {
            from,
            to,
            value: filteredEntries[i].value.temperatureC,
            changedOn: filteredEntries[i].time,
          },
        });
        break;
      }
    }
    if (!isStatusChanged) {
      const lastPatientEntry = patient[patient.length - 1];
      output.push({
        patientId: lastPatientEntry.patientId,
        healtChanged: false,
        last: {
          status: lastPatientEntry.value.status,
          value: lastPatientEntry.value.temperatureC,
          time: lastPatientEntry.time,
        },
      });
    }
  });

  return output;
}

console.log(statusChange(changedInput, HEALTH_READING_INTERVAL));
