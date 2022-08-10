export const createRecordSchema = {
  type: "object",
  properties: {
    name: { type: "string" },
    address: { type: "string" },
    nit: { type: "string" },
    phone_number: { type: "string" },
  },
  required: ["name", "address", "nit", "phone_number"],
};
