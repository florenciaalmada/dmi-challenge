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
  },
};

export default weatherSchema;
