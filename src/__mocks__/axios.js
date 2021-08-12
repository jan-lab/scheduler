//Mock an external library, axios, by making a file with the same name in the __mocks__ directory
//Jest framework will replace any axios import with this mock module instead.

//create fixtures - reusable static data that is imported or embedded into a test file. Make sure the data matches the schema from the server.
const fixtures = {
  days: [
    {
      id: 1,
      name: "Monday",
      appointments: [1, 2],
      interviewers: [1, 2],
      spots: 1
    },
    {
      id: 2,
      name: "Tuesday",
      appointments: [3, 4],
      interviewers: [3, 4],
      spots: 1
    }
  ],
  appointments: {
    "1": { id: 1, time: "12pm", interview: null },
    "2": {
      id: 2,
      time: "1pm",
      interview: { student: "Archie Cohen", interviewer: 2 }
    },
    "3": {
      id: 3,
      time: "2pm",
      interview: { student: "Leopold Silvers", interviewer: 4 }
    },
    "4": { id: 4, time: "3pm", interview: null }
  },
  interviewers: {
    "1": {
      id: 1,
      name: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png"
    },
    "2": {
      id: 2,
      name: "Tori Malcolm",
      avatar: "https://i.imgur.com/Nmx0Qxo.png"
    },
    "3": {
      id: 3,
      name: "Mildred Nazir",
      avatar: "https://i.imgur.com/T2WwVfS.png"
    },
    "4": {
      id: 4,
      name: "Cohana Roy",
      avatar: "https://i.imgur.com/FK8V841.jpg"
    }
  }
};


export default {
  //mock the configuration object
  defaults: { baseURL: "" },

  //create a mock for the get function
  //the url argument is accepted to replace the actual axios implementation
  //use the url to route the request to our fixture data
  get: jest.fn(url => {

    if (url === "/api/days") {
      //Resolve days data by returning a resolved promise to match the interface used by axios. This skips the whole sequence of http operations and resolves a hardcoded version of the response data
      return Promise.resolve({
        status: 200,
        statusText: "OK",
        data: fixtures.days
      });
    }

    if (url === "/api/appointments") {
      // Resolve appointments data
      return Promise.resolve({
        status: 200,
        statusText: "OK",
        data: fixtures.appointments
      });
    }

    if (url === "/api/interviewers") {
      // Resolve interviewers data
      return Promise.resolve({
        status: 200,
        statusText: "OK",
        data: fixtures.interviewers
      });
    }
  }),

 //Create a mock for the put function. Endpoints are already passed in so no need to create separate endpoints
  put: jest.fn(() => {
      return Promise.resolve({
        status: 204,
        statusText: "No Content"
      });
  }),

  //Create a mock for the delete function
  delete: jest.fn(() => {
      return Promise.resolve({
        status: 204,
        statusText: "No Content"
      });
  })
}