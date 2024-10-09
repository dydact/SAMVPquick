import { defineAuth } from '@aws-amplify/backend';
import { a } from '@aws-amplify/backend';

/**
 * Define and configure your auth resource
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */
export const auth = defineAuth({
  loginWith: {
    email: true,
    phone: false,
    username: false
  },
  signUpAttributes: ['email', 'firstName', 'lastName'],
  passwordPolicy: {
    minLength: 8,
    requireLowercase: true,
    requireUppercase: true,
    requireNumbers: true,
    requireSpecialCharacters: true
  },
  mfa: {
    enabled: false
  },
  verificationMechanisms: ['email']
});

// Define the Message model
const messageSchema = a.schema({
  Message: a
    .model({
      content: a.string().required(),
      sender: a.string().required(),
      timestamp: a.datetime().required(),
      recipientId: a.string(),
      recipient: a.belongsTo('User', 'recipientId'),
    })
    .authorization([a.allow.owner(), a.allow.private().read()])
});

// Export the updated schema
export const schema = a.schema({
  ...messageSchema,
  // Include your existing models here
  // For example:
  // User: existingUserSchema,
  // Task: existingTaskSchema,
  // ... other existing models
});
