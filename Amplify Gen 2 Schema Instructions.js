Amplify Gen 2 Schema Instructions.text

Following text is instructional:

Customize your data model
Data modeling capabilities
Every data model is defined as part of a data schema (a.schema()). You can enhance your data model with various fields, customize their identifiers, apply authorization rules, or model relationships. Every data model (a.model()) automatically provides create, read, update, and delete API operations as well as real-time subscription events. Below is a quick tour of the many functionalities you can add to your data model:
import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

const schema = a
  .schema({
    Customer: a
      .model({
        customerId: a.id().required(),
        // fields can be of various scalar types,
        // such as string, boolean, float, integers etc.
        name: a.string(),
        // fields can be of custom types
        location: a.customType({
          // fields can be required or optional
          lat: a.float().required(),
          long: a.float().required(),
        }),
        // fields can be enums
        engagementStage: a.enum(["PROSPECT", "INTERESTED", "PURCHASED"]),
        collectionId: a.id(),
        collection: a.belongsTo("Collection", "collectionId")
        // Use custom identifiers. By default, it uses an `id: a.id()` field
      })
      .identifier(["customerId"]),
    Collection: a
      .model({
        customers: a.hasMany("Customer", "collectionId"), // setup relationships between types
        tags: a.string().array(), // fields can be arrays
        representativeId: a.id().required(),
        // customize secondary indexes to optimize your query performance
      })
      .secondaryIndexes((index) => [index("representativeId")]),
  })
  .authorization((allow) => [allow.publicApiKey()]);

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

Add fields to data model
Amplify Data supports all AWS AppSync scalar types as field types. The following scalar types are available:
Field type	Description	TypeScript validation	GraphQL Scalar Type
a.id()	A unique identifier for an object. This scalar is serialized like a String but isn't meant to be human-readable. If not specified on create operations, a UUID will be generated.	string	ID
a.string()	A UTF-8 character sequence.	string	String
a.integer()	An integer value between -(2^31) and 2^31-1.	number but rounded to closest integer value upon query/mutation	Int
a.float()	An IEEE 754 floating point value.	number	Float
a.boolean()	A Boolean value, either true or false.	boolean	Boolean
a.date()	An extended ISO 8601 date string in the format YYYY-MM-DD.	string	AWSDate
a.time()	An extended ISO 8601 time string in the format hh:mm:ss.sss.	string	AWSTime
a.datetime()	An extended ISO 8601 date and time string in the format YYYY-MM-DDThh:mm:ss.sssZ.	string	AWSDateTime
a.timestamp()	An integer value representing the number of seconds before or after 1970-01-01-T00:00Z.	number	AWSTimestamp
a.email()	An email address in the format local-part@domain-part as defined by RFC 822.	string with local-part and domain-part type enforcement	AWSEmail
a.json()	A JSON string. Any valid JSON construct is automatically parsed and loaded in the resolver code as maps, lists, or scalar values, rather than as the literal input strings. Unquoted strings or otherwise invalid JSON result in a validation error.	any	AWSJSON
a.phone()	A phone number. This value is stored as a string. Phone numbers can contain either spaces or hyphens to separate digit groups. Phone numbers without a country code are assumed to be US/North American numbers adhering to the North American Numbering Plan.	string validation only happening service-side	AWSPhone
a.url()	A URL as defined by RFC 1738. For example, https://www.amazon.com/dp/B000NZW3KC/ or mailto:example@example.com. URLs must contain a schema (http, mailto) and can't contain two forward slashes (//) in the path part.	string but with type enforcement on the schema part	AWSURL
a.ipAddress()	A valid IPv4 or IPv6 address. IPv4 addresses are expected in quad-dotted notation (123.12.34.56). IPv6 addresses are expected in non-bracketed, colon-separated format (1a2b:3c4b:1234:4567). You can include an optional CIDR suffix (123.45.67.89/16) to indicate subnet mask.	string with type enforcement for IPv4 and IPv6 pattern	AWSIPAddress
Specify a custom field type
Sometimes, the built-in types do not meet the needs of your application. In those cases, you can specify custom types. You can either define the custom types inline or explicitly define the custom type in the schema.
Inline definition: The "location" field will become a new non-model type that uses PascalCase, a naming convention in which the first letter of each word in a compound word is capitalized. If there are conflicts with another schema-level definition (model, custom type, enum), you will receive a Type error with a warning that you need to sift the value out as a separate item and use a "ref".
a.schema({
  Post: a.model({
    location: a.customType({
      lat: a.float(),
      long: a.float(),
    }),
    content: a.string(),
  }),
}).authorization((allow) => allow.publicApiKey());
Explicit definition: Specify the "Location" as a.customType() in your schema. To use the custom type, reference it through a.ref() in the respective field definitions.
a.schema({
  Location: a.customType({
      lat: a.float(),
      long: a.float(),
  }),

  Post: a.model({
    location: a.ref('Location'),
    content: a.string(),
  }),

  User: a.model({
    lastKnownLocation: a.ref('Location'),
  }),
}).authorization((allow) => allow.publicApiKey());
To set or read the location field on the client side, you can expand a nested object and the type system will auto-infer the allowed values.
const { data: newPost, errors } = await client.models.Post.create({
  location: {
    lat: 48.837006,
    long: 8.28245,
  },
});

console.log(newPost?.location?.lat, newPost?.location?.long);
Specify an enum field type
Enum has a similar developer experience as custom types: short-hand and long-form approaches.
Short-hand approach
a.schema({
  Post: a.model({
    privacySetting: a.enum(['PRIVATE', 'FRIENDS_ONLY', 'PUBLIC']),
    content: a.string(),
  }),
}).authorization((allow) => allow.publicApiKey());
Long-form approach
a.schema({
  PrivacySetting: a.enum([
    'PRIVATE',
    'FRIENDS_ONLY',
    'PUBLIC'
  ]),

  Post: a.model({
    content: a.string(),
    privacySetting: a.ref('PrivacySetting'),
  }),

  Video: a.model({
    privacySetting: a.ref('PrivacySetting'),
  }),
}).authorization((allow) => allow.publicApiKey());
When creating a new item client-side, the enums are also type-enforced:
client.models.Post.create({
  content: 'hello',
  // WORKS - value auto-completed
  privacySetting: 'PRIVATE',

  // DOES NOT WORK - TYPE ERROR
  privacySetting: 'NOT_PUBLIC',
});
List enum values client-side
You can list available enum values client-side using the client.enums.<ENUM_NAME>.values() API. For example, this allows you to display the available enum values within a dropdown UI.
const availableSettings = client.enums.PrivacySetting.values()
// availableSettings returns ["PRIVATE", "FRIENDS_ONLY", "PUBLIC"]
Mark fields as required
By default, fields are optional. To mark a field as required, use the .required() modifier.
const schema = a.schema({
  Todo: a.model({
    content: a.string().required(),
  }),
}).authorization((allow) => allow.publicApiKey());
Mark fields as arrays
Any field can be modified to be an array using the .array() modifier.
const schema = a.schema({
  Todo: a.model({
    content: a.string().required(),
    notes: a.string().array(),
  }),
}).authorization((allow) => allow.publicApiKey());
Assign default values for fields
You can use the .default(...) modifier to specify a default value for optional scalar type fields and enums. The .default(...) modifier is not available for custom types, arrays, or relationships.
const schema = a.schema({
  Todo: a.model({
    content: a.string().default('My new Todo'),
  }),
}).authorization((allow) => allow.publicApiKey());
Note: The .default(...) modifier can't be applied to required fields.


Customize secondary indexes
You can optimize your list queries based on "secondary indexes". For example, if you have a Customer model, you can query based on the customer's id identifier field by default but you can add a secondary index based on the accountRepresentativeId to get list customers for a given account representative.
A secondary index consists of a "hash key" and, optionally, a "sort key". Use the "hash key" to perform strict equality and the "sort key" for greater than (gt), greater than or equal to (ge), less than (lt), less than or equal to (le), equals (eq), begins with, and between operations.
amplify/data/resource.ts
export const schema = a.schema({
  Customer: a
    .model({
      name: a.string(),
      phoneNumber: a.phone(),
      accountRepresentativeId: a.id().required(),
    })
    .secondaryIndexes((index) => [index("accountRepresentativeId")])
    .authorization(allow => [allow.publicApiKey()]),
});
The example client query below allows you to query for "Customer" records based on their accountRepresentativeId:
src/App.tsx
import { type Schema } from '../amplify/data/resource';
import { generateClient } from 'aws-amplify/data';

const client = generateClient<Schema>();

const { data, errors } =
  await client.models.Customer.listCustomerByAccountRepresentativeId({
    accountRepresentativeId: "YOUR_REP_ID",
  });
Review how this works under the hood with Amazon DynamoDB
Add sort keys to secondary indexes
You can define "sort keys" to add a set of flexible filters to your query, such as "greater than" (gt), "greater than or equal to" (ge), "less than" (lt), "less than or equal to" (le), "equals" (eq), "begins with" (beginsWith), and "between" operations.
amplify/data/resource.ts
export const schema = a.schema({
  Customer: a
    .model({
      name: a.string(),
      phoneNumber: a.phone(),
      accountRepresentativeId: a.id().required(),
    })
    .secondaryIndexes((index) => [
      index("accountRepresentativeId")
        .sortKeys(["name"]),
    ])
    .authorization(allow => [allow.owner()]),
});
On the client side, you should find a new listBy... query that's named after hash key and sort keys. For example, in this case: listByAccountRepresentativeIdAndName. You can supply the filter as part of this new list query:
src/App.tsx
const { data, errors } =
  await client.models.Customer.listCustomerByAccountRepresentativeIdAndName({
    accountRepresentativeId: "YOUR_REP_ID",
    name: {
      beginsWith: "Rene",
    },
  });
Customize the query field for secondary indexes
You can also customize the auto-generated query name under client.models.<MODEL_NAME>.listBy... by setting the queryField() modifier.
amplify/data/resource.ts
const schema = a.schema({
  Customer: a
    .model({
      name: a.string(),
      phoneNumber: a.phone(),
      accountRepresentativeId: a.id().required(),
    })
    .secondaryIndexes((index) => [
      index("accountRepresentativeId")
        .queryField("listByRep"),
    ])
    .authorization(allow => [allow.owner()]),
});
In your client app code, you'll see query updated under the Data client:
src/App.tsx
const {
  data,
  errors
} = await client.models.Customer.listByRep({
  accountRepresentativeId: 'YOUR_REP_ID',
})
Customize the name of secondary indexes
To customize the underlying DynamoDB's index name, you can optionally provide the name() modifier.
amplify/data/resource.ts
const schema = a.schema({
  Customer: a
    .model({
      name: a.string(),
      phoneNumber: a.phone(),
      accountRepresentativeId: a.id().required(),
    })
    .secondaryIndexes((index) => [
      index("accountRepresentativeId")
        .name("MyCustomIndexName"),
    ])
    .authorization(allow => [allow.owner()]),
});

Modeling relationships
When modeling application data, you often need to establish relationships between different data models. In Amplify Data, you can create one-to-many, one-to-one, and many-to-many relationships in your Data schema. On the client-side, Amplify Data allows you to lazy or eager load of related data.
With Amplify Data Construct @aws-amplify/data-construct@1.8.4, an improvement was made to how relational field data is handled in subscriptions when different authorization rules apply to related models in a schema. The improvement redacts the values for the relational fields, displaying them as null or empty, to prevent unauthorized access to relational data.

This redaction occurs whenever it cannot be determined that the child model will be protected by the same permissions as the parent model.

Because subscriptions are tied to mutations and the selection set provided in the result of a mutation is then passed through to the subscription, relational fields in the result of mutations must be redacted.

If an authorized end-user needs access to the redacted relational fields, they should perform a query to read the relational data.

Additionally, subscriptions will inherit related authorization when relational fields are set as required. To better protect relational data, consider modifying the schema to use optional relational fields.
Types of relationships
Relationship	Code	Description	Example
one to many	a.hasMany(...) & a.belongsTo(...)	Creates a one-to-many relationship between two models.	A Team has many Members. A Member belongs to a Team.
one to one	a.hasOne(...) & a.belongsTo(...)	Creates a one-to-one relationship between two models.	A Customer has one Cart. A Cart belongs to one Customer.
many to many	Two a.hasMany(...) & a.belongsTo(...) on join tables	Create two one-to-many relationships between the related models in a join table.	A Post has many Tags. A Tag has many Posts.
Model one-to-many relationships
Create a one-to-many relationship between two models using the hasMany() and belongsTo() method. In the example below, a Team has many Members and a Member belongs to exactly one Team.
Create a reference field called teamId on the Member model. This reference field's type MUST match the type of Team's identifier. In this case, it's an auto-generated id: a.id().required() field.
Add a relationship field called team that references the teamId field. This allows you to query for the team information from the Member model.
Add a relationship field called members that references the teamId field on the Member model.
const schema = a.schema({
  Member: a.model({
    name: a.string().required(),
    // 1. Create a reference field
    teamId: a.id(),
    // 2. Create a belongsTo relationship with the reference field
    team: a.belongsTo('Team', 'teamId'),
  }),

  Team: a.model({
    mantra: a.string().required(),
    // 3. Create a hasMany relationship with the reference field
    //    from the `Member`s model.
    members: a.hasMany('Member', 'teamId'),
  }),
}).authorization((allow) => allow.publicApiKey());
Create a "Has Many" relationship between records
const { data: team } = await client.models.Team.create({
  mantra: 'Go Frontend!',
});

const { data: member } = await client.models.Member.create({
  name: "Tim",
  teamId: team.id,
});
Update a "Has Many" relationship between records
const { data: newTeam } = await client.models.Team.create({
  mantra: 'Go Fullstack',
});

await client.models.Member.update({
  id: "MY_MEMBER_ID",
  teamId: newTeam.id,
});
Delete a "Has Many" relationship between records
If your reference field is not required, then you can "delete" a one-to-many relationship by setting the relationship value to null.
await client.models.Member.update({
  id: "MY_MEMBER_ID",
  teamId: null,
});
Lazy load a "Has Many" relationship
const { data: team } = await client.models.Team.get({ id: "MY_TEAM_ID"});

const { data: members } = await team.members();

members.forEach(member => console.log(member.id));
Eagerly load a "Has Many" relationship
const { data: teamWithMembers } = await client.models.Team.get(
  { id: "MY_TEAM_ID" },
  { selectionSet: ["id", "members.*"] },
);

teamWithMembers.members.forEach(member => console.log(member.id));
Model a "one-to-one" relationship
Create a one-to-one relationship between two models using the hasOne() and belongsTo() methods. In the example below, a Customer has a Cart and a Cart belongs to a Customer.
Create a reference field called customerId on the Cart model. This reference field's type MUST match the type of Customer's identifier. In this case, it's an auto-generated id: a.id().required() field.
Add a relationship field called customer that references the customerId field. This allows you to query for the customer information from the Cart model.
Add a relationship field called activeCart that references the customerId field on the Cart model.
const schema = a.schema({
  Cart: a.model({
    items: a.string().required().array(),
    // 1. Create reference field
    customerId: a.id(),
    // 2. Create relationship field with the reference field
    customer: a.belongsTo('Customer', 'customerId'),
  }),
  Customer: a.model({
    name: a.string(),
    // 3. Create relationship field with the reference field
    //    from the Cart model
    activeCart: a.hasOne('Cart', 'customerId')
  }),
}).authorization((allow) => allow.publicApiKey());
Create a "Has One" relationship between records
To create a "has one" relationship between records, first create the parent item and then create the child item and assign the parent.
const { data: customer, errors } = await client.models.Customer.create({
  name: "Rene",
});


const { data: cart } = await client.models.Cart.create({
  items: ["Tomato", "Ice", "Mint"],
  customerId: customer?.id,
});
Update a "Has One" relationship between records
To update a "Has One" relationship between records, you first retrieve the child item and then update the reference to the parent to another parent. For example, to reassign a Cart to another Customer:
const { data: newCustomer } = await client.models.Customer.create({
  name: 'Ian',
});

await client.models.Cart.update({
  id: cart.id,
  customerId: newCustomer?.id,
});
Delete a "Has One" relationship between records
You can set the relationship field to null to delete a "Has One" relationship between records.
await client.models.Cart.update({
  id: project.id,
  customerId: null,
});
Lazy load a "Has One" relationship
const { data: cart } = await client.models.Cart.get({ id: "MY_CART_ID"});
const { data: customer } = await cart.customer();
Eagerly load a "Has One" relationship
const { data: cart } = await client.models.Cart.get(
  { id: "MY_CART_ID" },
  { selectionSet: ['id', 'customer.*'] },
);

console.log(cart.customer.id)
Model a "many-to-many" relationship
In order to create a many-to-many relationship between two models, you have to create a model that serves as a "join table". This "join table" should contain two one-to-many relationships between the two related entities. For example, to model a Post that has many Tags and a Tag has many Posts, you'll need to create a new PostTag model that represents the relationship between these two entities.
const schema = a.schema({
  PostTag: a.model({
    // 1. Create reference fields to both ends of
    //    the many-to-many relationship
    postId: a.id().required(),
    tagId: a.id().required(),
    // 2. Create relationship fields to both ends of
    //    the many-to-many relationship using their
    //    respective reference fields
    post: a.belongsTo('Post', 'postId'),
    tag: a.belongsTo('Tag', 'tagId'),
  }),
  Post: a.model({
    title: a.string(),
    content: a.string(),
    // 3. Add relationship field to the join model
    //    with the reference of `postId`
    tags: a.hasMany('PostTag', 'postId'),
  }),
  Tag: a.model({
    name: a.string(),
    // 4. Add relationship field to the join model
    //    with the reference of `tagId`
    posts: a.hasMany('PostTag', 'tagId'),
  }),
}).authorization((allow) => allow.publicApiKey());
Model multiple relationships between two models
Relationships are defined uniquely by their reference fields. For example, a Post can have separate relationships with a Person model for author and editor.
const schema = a.schema({
  Post: a.model({
    title: a.string().required(),
    content: a.string().required(),
    authorId: a.id(),
    author: a.belongsTo('Person', 'authorId'),
    editorId: a.id(),
    editor: a.belongsTo('Person', 'editorId'),
  }),
  Person: a.model({
    name: a.string(),
    editedPosts: a.hasMany('Post', 'editorId'),
    authoredPosts: a.hasMany('Post', 'authorId'),
  }),
}).authorization((allow) => allow.publicApiKey());
On the client-side, you can fetch the related data with the following code:
const client = generateClient<Schema>();

const { data: post } = await client.models.Post.get({ id: "SOME_POST_ID" });

const { data: author } = await post?.author();
const { data: editor } = await post?.editor();
Model relationships for models with sort keys in their identifier
In cases where your data model uses sort keys in the identifier, you need to also add reference fields and store the sort key fields in the related data model:
const schema = a.schema({
  Post: a.model({
    title: a.string().required(),
    content: a.string().required(),
    // Reference fields must correspond to identifier fields.
    authorName: a.string(),
    authorDoB: a.date(),
    // Must pass references in the same order as identifiers.
    author: a.belongsTo('Person', ['authorName', 'authorDoB']),
  }),
  Person: a.model({
    name: a.string().required(),
    dateOfBirth: a.date().required(),
    // Must reference all reference fields corresponding to the
    // identifier of this model.
    authoredPosts: a.hasMany('Post', ['authorName', 'authorDoB']),
  }).identifier(['name', 'dateOfBirth']),
}).authorization((allow) => allow.publicApiKey());
Make relationships required or optional
Amplify Data's relationships use reference fields to determine if a relationship is required or not. If you mark a reference field as required, then you can't "delete" a relationship between two models. You'd have to delete the related record as a whole.
const schema = a.schema({
  Post: a.model({
    title: a.string().required(),
    content: a.string().required(),
    // You must supply an author when creating the post
    // Author can't be set to `null`.
    authorId: a.id().required(),
    author: a.belongsTo('Person', 'authorId'),
    // You can optionally supply an editor when creating the post.
    // Editor can also be set to `null`.
    editorId: a.id(),
    editor: a.belongsTo('Person', 'editorId'),
  }),
  Person: a.model({
    name: a.string(),
    editedPosts: a.hasMany('Post', 'editorId'),
    authoredPosts: a.hasMany('Post', 'authorId'),
  }),
}).authorization((allow) => allow.publicApiKey());


address this issue. ik had provdied the amplify gen 2 instructions, however i do not see them implemented in the src/amplify/data/resource.ts which is where new schema instructions are implemented.

this is the schema below:

import { Schema } from '@aws-amplify/datastore-types';

export const schema: Schema = {
  models: {
    Organization: {
      name: 'Organization',
      fields: {
        id: { type: 'ID', isRequired: true, isReadOnly: true },
        name: { type: 'String', isRequired: true },
        type: { type: 'AWSJSON', isRequired: true }, // 'PRIMARY' or 'CUSTOMER'
        staff: { type: 'HasMany', model: 'User' },
        clients: { type: 'HasMany', model: 'Client' },
        customFields: { type: 'AWSJSON' }, // For extensibility
        createdAt: { type: 'AWSDateTime', isRequired: true },
        updatedAt: { type: 'AWSDateTime', isRequired: true },
      },
      auth: {
        rules: [
          { allow: 'public', operations: ['read'] },
          { allow: 'private', operations: ['create', 'update', 'delete'] },
        ],
      },
    },
    User: {
      name: 'User',
      fields: {
        id: { type: 'ID', isRequired: true, isReadOnly: true },
        email: { type: 'AWSEmail', isRequired: true },
        firstName: { type: 'String', isRequired: true },
        lastName: { type: 'String', isRequired: true },
        organizationID: { type: 'ID', isRequired: true },
        organization: { type: 'Belongs', model: 'Organization' },
        role: { type: 'AWSJSON', isRequired: true },
        permissions: { type: 'AWSJSON' },
        status: { type: 'String', isRequired: true }, // 'ACTIVE', 'INACTIVE', 'PENDING'
        lastLogin: { type: 'AWSDateTime' },
        profilePicture: { type: 'String' }, // S3 key for the profile picture
        profilePictureHash: { type: 'String' }, // Hash of the profile picture
        createdAt: { type: 'AWSDateTime', isRequired: true },
        updatedAt: { type: 'AWSDateTime', isRequired: true },
      },
      auth: {
        rules: [
          { allow: 'owner' },
          { allow: 'private', operations: ['read'], provider: 'iam' },
        ],
      },
    },
    Client: {
      name: 'Client',
      fields: {
        id: { type: 'ID', isRequired: true, isReadOnly: true },
        firstName: { type: 'String', isRequired: true },
        lastName: { type: 'String', isRequired: true },
        birthday: { type: 'AWSDate', isRequired: true },
        socialSecurity: { type: 'String', isRequired: true },
        address: { type: 'String', isRequired: true },
        medicaidNumber: { type: 'String', isRequired: true },
        parentGuardian: { type: 'String' },
        school: { type: 'String' },
        serviceCoordinator: { type: 'String' },
        serviceRegion: { type: 'String', isRequired: true },
        organizationID: { type: 'ID', isRequired: true },
        organization: { type: 'Belongs', model: 'Organization' },
        assignedStaff: { type: 'HasMany', model: 'User' },
        treatmentPlans: { type: 'HasMany', model: 'TreatmentPlan' },
        clientType: { type: 'AWSJSON', isRequired: true }, // 'AUTISM_WAIVER' or 'DDA'
        status: { type: 'String', isRequired: true }, // 'ACTIVE', 'INACTIVE'
        createdAt: { type: 'AWSDateTime', isRequired: true },
        updatedAt: { type: 'AWSDateTime', isRequired: true },
      },
      auth: {
        rules: [
          { allow: 'private', operations: ['read', 'create', 'update', 'delete'] },
        ],
      },
    },
    TreatmentPlan: {
      name: 'TreatmentPlan',
      fields: {
        id: { type: 'ID', isRequired: true, isReadOnly: true },
        clientID: { type: 'ID', isRequired: true },
        client: { type: 'Belongs', model: 'Client' },
        tasks: { type: 'HasMany', model: 'Task' },
        services: { type: 'HasMany', model: 'Service' },
        startDate: { type: 'AWSDate', isRequired: true },
        endDate: { type: 'AWSDate', isRequired: true },
        status: { type: 'String', isRequired: true }, // 'DRAFT', 'ACTIVE', 'COMPLETED'
        createdAt: { type: 'AWSDateTime', isRequired: true },
        updatedAt: { type: 'AWSDateTime', isRequired: true },
      },
      auth: {
        rules: [
          { allow: 'private', operations: ['read', 'create', 'update', 'delete'] },
        ],
      },
    },
    Task: {
      name: 'Task',
      fields: {
        id: { type: 'ID', isRequired: true, isReadOnly: true },
        description: { type: 'String', isRequired: true },
        treatmentPlanID: { type: 'ID', isRequired: true },
        treatmentPlan: { type: 'Belongs', model: 'TreatmentPlan' },
        status: { type: 'String', isRequired: true }, // 'PENDING', 'IN_PROGRESS', 'COMPLETED'
        createdAt: { type: 'AWSDateTime', isRequired: true },
        updatedAt: { type: 'AWSDateTime', isRequired: true },
      },
      auth: {
        rules: [
          { allow: 'private', operations: ['read', 'create', 'update', 'delete'] },
        ],
      },
    },
    Service: {
      name: 'Service',
      fields: {
        id: { type: 'ID', isRequired: true, isReadOnly: true },
        name: { type: 'String', isRequired: true },
        description: { type: 'String' },
        treatmentPlanID: { type: 'ID', isRequired: true },
        treatmentPlan: { type: 'Belongs', model: 'TreatmentPlan' },
        renderedBy: { type: 'ID', isRequired: true },
        staff: { type: 'Belongs', model: 'User' },
        startTime: { type: 'AWSDateTime', isRequired: true },
        endTime: { type: 'AWSDateTime', isRequired: true },
        duration: { type: 'Int', isRequired: true }, // Duration in minutes
        status: { type: 'String', isRequired: true }, // 'SCHEDULED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'
        documentation: { type: 'HasOne', model: 'Documentation' },
        createdAt: { type: 'AWSDateTime', isRequired: true },
        updatedAt: { type: 'AWSDateTime', isRequired: true },
      },
      auth: {
        rules: [
          { allow: 'private', operations: ['read', 'create', 'update', 'delete'] },
        ],
      },
    },
    Documentation: {
      name: 'Documentation',
      fields: {
        id: { type: 'ID', isRequired: true, isReadOnly: true },
        serviceID: { type: 'ID', isRequired: true },
        service: { type: 'Belongs', model: 'Service' },
        progressNotes: { type: 'HasMany', model: 'ProgressNote' },
        status: { type: 'String', isRequired: true }, // 'DRAFT', 'SUBMITTED', 'APPROVED'
        submittedAt: { type: 'AWSDateTime' },
        approvedAt: { type: 'AWSDateTime' },
        createdAt: { type: 'AWSDateTime', isRequired: true },
        updatedAt: { type: 'AWSDateTime', isRequired: true },
      },
      auth: {
        rules: [
          { allow: 'private', operations: ['read', 'create', 'update', 'delete'] },
        ],
      },
    },
    ProgressNote: {
      name: 'ProgressNote',
      fields: {
        id: { type: 'ID', isRequired: true, isReadOnly: true },
        documentationID: { type: 'ID', isRequired: true },
        documentation: { type: 'Belongs', model: 'Documentation' },
        content: { type: 'String', isRequired: true },
        timestamp: { type: 'AWSDateTime', isRequired: true },
        createdBy: { type: 'ID', isRequired: true },
        createdAt: { type: 'AWSDateTime', isRequired: true },
        updatedAt: { type: 'AWSDateTime', isRequired: true },
      },
      auth: {
        rules: [
          { allow: 'private', operations: ['read', 'create', 'update', 'delete'] },
        ],
      },
    },
  },
  enums: {},
  nonModels: {},
  version: '1',
};

