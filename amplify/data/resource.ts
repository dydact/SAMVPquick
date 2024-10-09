import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  Organization: a
    .model({
      name: a.string().required(),
      type: a.string().required(), // 'PRIMARY' or 'CUSTOMER'
      staff: a.hasMany('User'),
      clients: a.hasMany('Client'),
      customFields: a.string(), // For extensibility
      createdAt: a.datetime().required(),
      updatedAt: a.datetime().required(),
    })
    .authorization([a.allow.public().read(), a.allow.private().create().update().delete()]),

  User: a
    .model({
      email: a.string().required(),
      firstName: a.string().required(),
      lastName: a.string().required(),
      organizationID: a.string().required(),
      organization: a.belongsTo('Organization'),
      role: a.string().required(),
      permissions: a.string(),
      status: a.string().required(), // 'ACTIVE', 'INACTIVE', 'PENDING'
      lastLogin: a.datetime(),
      profilePicture: a.string(),
      profilePictureHash: a.string(),
      createdAt: a.datetime().required(),
      updatedAt: a.datetime().required(),
    })
    .authorization([a.allow.owner(), a.allow.private().read()]),

  Client: a
    .model({
      firstName: a.string().required(),
      lastName: a.string().required(),
      birthday: a.date().required(),
      socialSecurity: a.string().required(),
      address: a.string().required(),
      medicaidNumber: a.string().required(),
      parentGuardian: a.string(),
      school: a.string(),
      serviceCoordinator: a.string(),
      serviceRegion: a.string().required(),
      organizationID: a.string().required(),
      organization: a.belongsTo('Organization'),
      assignedStaff: a.hasMany('User'),
      treatmentPlans: a.hasMany('TreatmentPlan'),
      clientType: a.string().required(), // 'AUTISM_WAIVER' or 'DDA'
      status: a.string().required(), // 'ACTIVE', 'INACTIVE'
      createdAt: a.datetime().required(),
      updatedAt: a.datetime().required(),
    })
    .authorization([a.allow.private().read().create().update().delete()]),

  TreatmentPlan: a
    .model({
      clientID: a.string().required(),
      client: a.belongsTo('Client'),
      tasks: a.hasMany('Task'),
      services: a.hasMany('Service'),
      startDate: a.date().required(),
      endDate: a.date().required(),
      status: a.string().required(), // 'DRAFT', 'ACTIVE', 'COMPLETED'
      createdAt: a.datetime().required(),
      updatedAt: a.datetime().required(),
    })
    .authorization([a.allow.private().read().create().update().delete()]),

  Task: a
    .model({
      description: a.string().required(),
      treatmentPlanID: a.string().required(),
      treatmentPlan: a.belongsTo('TreatmentPlan'),
      status: a.string().required(), // 'PENDING', 'IN_PROGRESS', 'COMPLETED'
      createdAt: a.datetime().required(),
      updatedAt: a.datetime().required(),
    })
    .authorization([a.allow.private().read().create().update().delete()]),

  Service: a
    .model({
      name: a.string().required(),
      description: a.string(),
      treatmentPlanID: a.string().required(),
      treatmentPlan: a.belongsTo('TreatmentPlan'),
      renderedBy: a.string().required(),
      staff: a.belongsTo('User'),
      startTime: a.datetime().required(),
      endTime: a.datetime().required(),
      duration: a.integer().required(), // Duration in minutes
      status: a.string().required(), // 'SCHEDULED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'
      documentation: a.hasOne('Documentation'),
      createdAt: a.datetime().required(),
      updatedAt: a.datetime().required(),
    })
    .authorization([a.allow.private().read().create().update().delete()]),

  Documentation: a
    .model({
      serviceID: a.string().required(),
      service: a.belongsTo('Service'),
      progressNotes: a.hasMany('ProgressNote'),
      status: a.string().required(), // 'DRAFT', 'SUBMITTED', 'APPROVED'
      submittedAt: a.datetime(),
      approvedAt: a.datetime(),
      createdAt: a.datetime().required(),
      updatedAt: a.datetime().required(),
    })
    .authorization([a.allow.private().read().create().update().delete()]),

  ProgressNote: a
    .model({
      documentationID: a.string().required(),
      documentation: a.belongsTo('Documentation'),
      content: a.string().required(),
      timestamp: a.datetime().required(),
      createdBy: a.string().required(),
      createdAt: a.datetime().required(),
      updatedAt: a.datetime().required(),
    })
    .authorization([a.allow.private().read().create().update().delete()]),
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

/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server 
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>
