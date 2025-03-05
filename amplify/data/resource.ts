import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  // ✅ Define the Tenants model
  Tenants: a
    .model({
      tenant_name: a.string().required(), // Primary Key
      user_pool_id: a.string().required(),
      client_id: a.string().required(),
      admin_email: a.string().required(),
      admin_name: a.string().required(),
      phone_number: a.string().required(),
    })
    .authorization((allow) => [allow.publicApiKey()]),

  Todo: a
    .model({
      content: a.string(),
      isDone: a.boolean(),
    })
    .authorization((allow) => [allow.publicApiKey()]),

  LeaveRequest: a
    .model({
      leaveType: a.string(),
      startDate: a.string(),
      endDate: a.string(),
      reason: a.string(),
    })
    .authorization((allow) => [allow.publicApiKey()]),

  Onboarding: a
    .model({
      email: a.string().required(),
      firstName: a.string().required(),
      lastName: a.string().required(),
      phoneCountryCode: a.string().required(),
      phoneNumber: a.string().required(),
      uanNumber: a.string(),
      officialEmail: a.string(),
      aadharNumber: a.string(),
      panNumber: a.string(),

      // Present Address
      presentAddressLine1: a.string(),
      presentAddressLine2: a.string(),
      presentAddressCity: a.string(),
      presentAddressCountry: a.string(),
      presentAddressState: a.string(),
      presentAddressPostalCode: a.string(),

      // Permanent Address
      permanentAddressSameAsPresent: a.boolean().default(false),
      permanentAddressLine1: a.string(),
      permanentAddressLine2: a.string(),
      permanentAddressCity: a.string(),
      permanentAddressCountry: a.string(),
      permanentAddressState: a.string(),
      permanentAddressPostalCode: a.string(),
    })
    .authorization((allow) => [allow.publicApiKey()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});
