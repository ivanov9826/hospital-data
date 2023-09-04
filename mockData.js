import { initialTime, STATUS_TYPES, sensorType } from "./constants.js";

const statuses = [
  STATUS_TYPES.GREEN,
  STATUS_TYPES.ORANGE,
  STATUS_TYPES.PURPLE,
  STATUS_TYPES.RED,
  STATUS_TYPES.RED,
  STATUS_TYPES.GRAY,
];

//Variable for the initial date used in date generation

let startingTime = initialTime;

//Generating random date and increasing the starting time

function generateRandomDate(timespread) {
  const timespreadMili = timespread * 1000;
  const addedTime = Math.floor(Math.random() * (36000000 - 60000) + 60000);

  const timestamp = startingTime + timespreadMili + addedTime;

  const result = new Date(timestamp);

  startingTime = startingTime + timespreadMili + addedTime;

  return result;
}

//Generating random status

function generateRandomTemperature(from, to) {
  return (Math.random() * (to - from) + from).toFixed(1);
}

//Generating random status

function generateRandomStatus() {
  const index = Math.floor(Math.random() * 5);

  let temperatureC = 0;

  switch (index) {
    case 0:
      temperatureC = generateRandomTemperature(36, 36.9);
      break;
    case 1:
      temperatureC = generateRandomTemperature(37, 37.9);
      break;
    case 2:
      temperatureC = generateRandomTemperature(35, 35.9);
      break;
    case 3:
      temperatureC = generateRandomTemperature(38, 43);
      break;
    case 4:
      temperatureC = generateRandomTemperature(33, 35);
      break;
    case 5:
      temperatureC = null;
      break;
  }

  const result = {
    temperatureC,
    status: statuses[index],
  };

  return result;
}

// Generate the final mock data array

export function generateMock(array, readings, timespread) {
  const result = [];
  array.forEach((pacient) => {
    for (let i = 0; i < readings; i++) {
      result.push({
        patientId: pacient,
        time: `${generateRandomDate(timespread)}`,
        type: sensorType,
        value: generateRandomStatus(),
      });
    }
  });
  return result;
}
