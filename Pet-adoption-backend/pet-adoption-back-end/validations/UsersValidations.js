const Ajv = require("ajv");
const ajv = new Ajv();

module.exports.RegisterValidation = ajv.compile({
  type: "object",
  properties: {
    firstName: { type: "string", minLength: 2, maxLength: 24 },
    lastName: { type: "string", minLength: 2, maxLength: 24 },
    email: { type: "string", minLength: 5, maxLength: 24 },
    phoneNumber: { type: "string", minLength: 9, maxLength: 24 },
    password: { type: "string", minLength: 8, maxLength: 24 },
  },
  required: ["firstName", "lastName", "email", "phoneNumber", "password"],
  additionalProperties: false,
});

module.exports.LoginValidation = ajv.compile({
  type: "object",
  properties: {
    email: { type: "string" },
    password: { type: "string" },
  },
  required: ["email", "password"],
  additionalProperties: false,
});
