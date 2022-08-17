const error = {
  type: "object",
  properties: {
    status: {
      type: "string",
      description: "Error status",
    },
    title: {
      type: "string",
      description: "Error message",
    },
  },
  required: ["status", "title"],
};

const weatherSchema = {
  title: "Weather comparision",
  querystring: {
    type: "object",
    properties: {
      lat: { type: "string" },
      lon: { type: "string" },
      tempToCompare: { type: "number" },
    },
    required: ["lat", "lon"],
  },
  response: {
    200: {
      type: "boolean",
    },
    "4xx": error,
    "5xx": error,
  },
};

export default weatherSchema;
