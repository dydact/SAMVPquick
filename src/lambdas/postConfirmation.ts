import { PostConfirmationTriggerEvent } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';

const dynamoDB = new DynamoDB.DocumentClient();

export const handler = async (event: PostConfirmationTriggerEvent) => {
  const { email, firstName, lastName, organizationName, organizationRole } = event.request.userAttributes;

  const params = {
    TableName: process.env.USER_TABLE_NAME,
    Item: {
      id: event.userName,
      email,
      firstName,
      lastName,
      organizationName,
      organizationRole,
      subscriptionTier: 'free',
      subscriptionStatus: 'active'
    }
  };

  try {
    await dynamoDB.put(params).promise();
    console.log('User record created successfully');
  } catch (error) {
    console.error('Error creating user record:', error);
    throw error;
  }

  return event;
};