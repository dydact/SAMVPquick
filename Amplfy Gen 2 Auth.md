Amplify Gen 2 Auth

Set up Amplify Auth
Amplify Auth is powered by Amazon Cognito. Cognito is a robust user directory service that handles user registration, authentication, account recovery, and other operations. Review the concepts to learn more.
To get started with defining your authentication resource, open or create the auth resource file:
amplify/auth/resource.ts
import { defineAuth } from "@aws-amplify/backend"

/**
 * Define and configure your auth resource
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */
export const auth = defineAuth({
  loginWith: {
    email: true,
  },
})
By default, your auth resource is scaffolded using email as the default login mechanism. You can also configure your auth resource to allow signing in with phone numbers or an external provider such as Google, Facebook, Amazon, or Sign in with Apple.
Note: At a minimum you will need to pass a loginWith value to set up how your users sign in to your app. Signing in with email and password is configured by default if you do not provide any value.
Deploy auth resource
After you have chosen and defined your authentication resource, run the following command to create your resource in your personal cloud sandbox.
Terminal
npx ampx sandbox
After a successful deployment, this command also generates an outputs file (amplify_outputs.json) to enable your frontend app to connect to your backend resources. The values you configure in your backend authentication resource are set in the generated outputs file to automatically configure the frontend Authenticator connected component.
Connect your application code to your auth resource
Creating and correctly implementing the sign-in flow can be challenging and time-consuming. Amplify's Authenticator UI component streamlines this by enabling you to rapidly build the entire authentication flow for your app. The component works seamlessly with configuration in amplify/auth/resource.ts to automatically connect with your backend resources.
Amplify has pre-built UI components for React, Vue, Angular, React Native, Swift, Android, and Flutter. In this guide, we are focusing on those for web applications.
Vue 3
Vue 2
First, install the @aws-amplify/ui-vue library:
Terminal
npm add @aws-amplify/ui-vue
Next, open src/App.vue and add the Authenticator component.
Authenticator
The Authenticator component offers a simple way to add authentication flows into your app. This component encapsulates an authentication workflow in the framework of your choice and is backed by your backend Auth resources. Authenticator passes the user info and signOut function to the inner template.
<script setup>
  import { Authenticator } from "@aws-amplify/ui-vue";
  import "@aws-amplify/ui-vue/styles.css";

  import { Amplify } from 'aws-amplify';
  import outputs from '../amplify_outputs.json';

  Amplify.configure(outputs);
</script>

<template>
  <authenticator>
    <template v-slot="{ user, signOut }">
      <h1>Hello {{ user.username }}!</h1>
      <button @click="signOut">Sign Out</button>
    </template>
  </authenticator>
</template>
Once you add the Authenticator component to your app, you can test the sign-up, sign-in, and sign-out functionality. You can also customize the Authenticator connected component to adjust colors and styling as needed.
Next steps
Now that you have completed setting up authentication in your Amplify app with email and password, you may also want to add some additional features. We recommend you learn more about:


Concepts
Amplify helps you secure your application while providing an easy sign-in experience for your users. This experience is influenced by your security strategy. This security strategy includes the authentication method, security credentials, and enabling additional verification when needed.
Authentication is a process to validate who you are (abbreviated as AuthN). The system that does this validation is referred to as an Identity Provider or IdP. This can be your own self-hosted IdP or a cloud service. Oftentimes, this IdP is an external provider such as Apple, Facebook, Google, or Amazon.
Authorization is the process of validating what you can access (abbreviated as AuthZ). This is sometimes done by looking at tokens with custom logic, predefined rules, or signed requests with policies.
Common authentication methods and associated risks include:
External provider federation which enables easier access for your users but shares data with third parties.
You can improve security credentials and verification for these authentication methods by:
Modifying the default password policy to ensure your users create stronger passwords.
Requiring additional contact information from users before they can reset passwords.
Enabling multi-factor authentication (MFA) which adds a layer of security at sign-in but may also add friction for your users.
What is Amazon Cognito?
Amplify Auth is powered by Amazon Cognito. Amazon Cognito is an identity and access management service, enabling you to secure your web or mobile applications, and is comprised of two services:
Amazon Cognito User Pools is a full-featured user directory service to handle user registration, authentication, and account recovery
Amazon Cognito Federated Identities or Identity Pools is a service used to authorize your users to interact with other AWS services
Amplify interfaces with User Pools to store your user information, including federation with other OpenID providers like Apple, Facebook, Google, or Amazon, and leverages federated identities to manage user access to AWS resources.
Authorization is often done in one of two ways:
Clients pass the tokens to the backend that perform custom logic to allow or deny actions
Clients sign the requests and the backend validates the signature, allowing or denying actions depending on predefined policy. The predefined rules, known as IAM access policies, are automatically configured by Amplify.
The first is a common authorization method for HTTP or GraphQL APIs, while the second is necessary for interfacing with AWS services such as Amazon S3, Amazon Pinpoint, and others.
Before you build
Amazon Cognito can be customized based on your security strategy for authentication. However, some initial configuration options cannot be changed after the backend resources are configured:
User attributes that are used to identify your individual users (such as email and phone) cannot be renamed or deleted.
Sign-in methods (including username, email, and phone) cannot be added or changed after the initial configuration. This includes both defining which attributes are used to sign in and which attributes are required. Required attributes must have a value for all users once set.
Verification methods (including username and email) are the same as required attributes and cannot be removed once configured.
The sub attribute is a unique identifier within each user pool that cannot be modified and can be used to index and search users.
If MFA is set to required with phone number for all users, you will need to include MFA setup (i.e. mandating phone number) when users sign up.


Usernames
Amplify Auth does not support signing in with only username and password, however can be configured to enable usernames for display purposes. Amazon Cognito offers two ways of provisioning login mechanisms:
Username attributes
Alias attributes
Each are described in more detail on the AWS documentation for Cognito user pool settings, however at a high-level can be described as follows:
Username attributes allow you to customize which attribute can be used as the "username", or allowing users to sign in with an email or phone in place of a username
Alias attributes allow you to specify with attribute(s) can be used with sign in in addition to a username
With Amazon Cognito, usernames are immutable, which means after the initial sign-up users are unable to change their username later. In some applications this may be undesirable, which can motivate the use of alias attributes. Alias attributes allow you to define a mutable "preferred username" in addition to an immutable username.
Amplify Auth leverages username attributes to configure Cognito to accept an email or a phone number as the "username". Users will then need to verify their ownership of specified email or phone number to confirm their account.
However, it is common to consider a "username" for display purposes. For example, you can configure your auth resource to accept a "preferred username" to be used as the display name:
amplify/auth/resource.ts
import { defineAuth } from '@aws-amplify/backend';

/**
 * Define and configure your auth resource
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */
export const auth = defineAuth({
  loginWith: {
    email: true,
  },
  userAttributes: {
    preferredUsername: {
      mutable: true,
      required: false
    }
  }
});
This is not a username the user will be able to sign in with, but it can be used to mask their personal information such as their email or phone number when displaying publicly.
If you would like to override the default behavior and allow your users to sign up with an immutable username, you can use CDK to modify your auth resource's usernameAttributes configuration directly:
amplify/backend.ts
import { defineBackend } from "@aws-amplify/backend"
import { auth } from "./auth/resource"
import { data } from "./data/resource"

const backend = defineBackend({
  auth,
  data,
})

const { cfnUserPool } = backend.auth.resources.cfnResources
// an empty array denotes "email" and "phone_number" cannot be used as a username
cfnUserPool.usernameAttributes = []

Email
By default Amplify Auth is scaffolded with email as the default method for user sign-in.
amplify/auth/resource.ts
import { defineAuth } from "@aws-amplify/backend"

export const auth = defineAuth({
  loginWith: {
    email: true,
  },
})
This will configure an email attribute that is required for sign-up and cannot be changed.


Phone
By default Amplify Auth is scaffolded with email as the default method for user sign-in, however this can be changed or extended to also allow your users to sign in using their phone number.
amplify/auth/resource.ts
import { defineAuth } from "@aws-amplify/backend"

export const auth = defineAuth({
  loginWith: {
    phone: true,
  },
})
This will configure the phone_number attribute that is required for sign-up and cannot be changed.

User attributes
Amplify Auth stores user profile information in user attributes. When the default method for user sign-in, Amplify Auth will automatically configure an email or phoneNumber attribute that is required for sign-in.
To extend a user profile beyond the default email or phoneNumber attribute that is automatically configured when specified in your auth resource's loginWith property, you can configure attributes with the userAttributes property:
Warning: After you create your auth resource, you cannot switch an attribute between required and not required.
amplify/auth/resource.ts
import { defineAuth } from "@aws-amplify/backend"

export const auth = defineAuth({
  loginWith: {
    // this configures a required "email" attribute
    email: true,
  },
  userAttributes: {
    // specify a "birthdate" attribute
    birthdate: {
      mutable: true,
      required: false,
    }
  },
})
Standard attributes
User attributes are defined as Cognito Standard Attributes. Attributes can be configured to be required for user sign-up in addition to whether the values are mutable. When configuring your resource to allow your users to login with email, an email must be specified for user sign-up and cannot be changed later. However additional attributes can be configured to be optional, and mutable after sign-up.
Custom attributes
In addition to the provided standard attributes, you can configure Custom Attributes. These are attributes that are typically unique to your use case, such as a tenant ID or a user's display name. Custom attributes are identified by the custom: prefix:
amplify/auth/resource.ts
import { defineAuth } from "@aws-amplify/backend"

export const auth = defineAuth({
  loginWith: {
    // this configures a required "email" attribute
    email: true,
  },
  userAttributes: {
    "custom:display_name": {
      dataType: "String",
      mutable: true,
      maxLen: 16,
      minLen: 1,
    },
    "custom:favorite_number": {
      dataType: "Number",
      mutable: true,
      min: 1,
      max: 100,
    },
    "custom:is_beta_user": {
      dataType: "Boolean",
      mutable: true,
    },
    "custom:started_free_trial": {
      dataType: "DateTime",
      mutable: true,
    },
  },
})
Unlike standard attributes, custom attributes cannot natively be required for sign-up, however can be codified to require some value by validating user attributes upon sign-up with a pre sign-up trigger.
Custom attributes can also be configured with specific data types. The following data types are supported:
String
Number
Boolean
DateTime
Shown in the snippet above, String and Number can be assigned minimum and maximum constraints. This is useful to defer simple validations to the underlying service, although does not extend to complex validations such as matching against a regular expression.

User groups
Amplify Auth provides a mechanism that allows you to group users. Assigning users to groups enable you to customize access for a collection of users, or leverage for auditing purposes. For example, only "ADMINS" users are permitted to delete posts from a bulletin, or only "EDITORS" are permitted to modify posts in a "draft" state. To get started with groups, configure the groups property:
amplify/auth/resource.ts
import { defineAuth } from "@aws-amplify/backend"

export const auth = defineAuth({
  loginWith: {
    email: true,
  },
  groups: ["ADMINS", "EDITORS"],
})
Note: There are a few limitations with groups, including a limit of 10,000 groups per user pool.
Defining access
Amplify resources enable you to define access for groups using common language. For example, you can use allow.groups in data:
amplify/data/resource.ts
import { type ClientSchema, a, defineData } from "@aws-amplify/backend"

const schema = a.schema({
  Article: a.model({}).authorization(allow => [
    allow.groups(["EDITORS"]).to(["read", "update"])
  ])
})

// ...
Or in storage:
amplify/storage/articles/resource.ts
import { defineStorage } from "@aws-amplify/backend"

export const storage = defineStorage({
  name: "articles",
  access: (allow) => ({
    "drafts/*": [allow.groups(["EDITORS"]).to(["read", "write"])],
  }),
})
By defining access with groups, Amplify configures authorization rules to read from the current user's groups. User pool groups are available as a claim in the user's ID token and access token as cognito:groups. Requests can be made to secure resources using the access token and validated against this claim to permit action on the resource.
Group roles
Each Cognito user pool group is assigned an IAM role. IAM roles can be modified to extend access to other AWS resources. Roles can be accessed from your backend on the role property of your group:
amplify/backend.ts
import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';

/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 */
const backend = defineBackend({
  auth,
  data,
});

const { groups } = backend.auth.resources

// https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_iam.IRole.html
groups["ADMINS"].role


Multi-factor authentication
Amplify Auth supports Multi-factor Authentication (MFA) for user sign-in flows. MFA is an extra layer of security used to make sure that users trying to gain access to an account are who they say they are. It requires users to provide additional information to verify their identity. Amplify Auth supports the MFA methods with Time-based-One-Time Passwords (TOTP) as well as text messages (SMS). In this guide we will review how you can set up MFA using TOTP and SMS and the tradeoffs between these methods to help you choose the right set up for your application. We will also review how to set up MFA to remember a device and reduce sign-in friction for your users.
Configure multi-factor authentication
Use defineAuth to enable MFA for your app. The example below is setting up MFA with TOTP but not SMS as you can see that the phone number is not a required attribute. If you are using SMS, then the PhoneNumber attribute must be true.
amplify/auth/resource.ts
import { defineAuth } from '@aws-amplify/backend';

export const auth = defineAuth({
  loginWith: {
    email: true
  },
  multifactor: {
    mode: 'OPTIONAL',
    totp: true
  }
});
When multi-factor authentication (MFA) is REQUIRED with SMS in your backend auth resource, you will need to pass the phone number during sign-up API call. If you are using the email or username as the primary sign-in mechanism, you will need to pass the phone_number attribute as a user attribute. This will change depending on if you enable SMS, TOTP, or both. Visit the multi-factor authentication documentation to learn more about enabling MFA on your backend auth resource.
Understand your MFA options
When enabling MFA you will have two key decisions to make:
MFA enforcement: As part of this setup you will determine how MFA is enforced. If you require MFA by setting MFA login to "ON", all your users will need to complete MFA to sign in. If you keep it "Optional", your users will have the choice whether to enable MFA or not for their account.
MFA methods: You will also specify which MFA method you are using - TOTP (Time-based One-time Password), SMS (text message), or both. We recommend that you use TOTP-based MFA as it is more secure and you can reserve SMS for account recovery.
Learn more
Compare TOTP and SMS MFA methods
Multi-factor authentication with SMS
Once you have setup SMS as your second layer of authentication with MFA as shown above, your users will get an authentication code via a text message to complete sign-in after they sign in with their username and password.
Warning: In order to send SMS authentication codes, you must request an origination number. Learn more about configuring your auth resource for production workloads.
Enable SMS MFA during sign-up
You will need to pass phone_number as a user attribute to enable SMS MFA for your users during sign-up. However, if the primary sign-in mechanism for your Cognito resource is phone_number (without enabling username), then you do not need to pass it as an attribute.
import { signUp } from 'aws-amplify/auth';

await signUp({
  username: "hello@mycompany.com",
  password: "hunter2",
  options: {
    userAttributes: {
      phone_number: "+15555555555",
      email: "hello@mycompany.com",
    },
  },
});
By default, you have to verify a user account after they sign up using the confirmSignUp API, which will send a one-time password to the user's phone number or email, depending on your Amazon Cognito configuration.
import { confirmSignUp } from 'aws-amplify/auth';

await confirmSignUp({
  username: "hello@mycompany.com",
  confirmationCode: "123456",
})
Manage SMS MFA during sign-in
After a user signs in, if they have MFA enabled for their account, a challenge will be returned that you would need to call the confirmSignIn API where the user provides their confirmation code sent to their phone number.
If MFA is ON or enabled for the user, you must call confirmSignIn with the OTP sent to their phone.
import { confirmSignIn } from 'aws-amplify/auth';

await confirmSignIn({
  challengeResponse: "123456"
});
After a user has been signed in, call updateMFAPreference to record the MFA type as enabled for the user and optionally set it as preferred so that subsequent logins default to using this MFA type.
import { updateMFAPreference } from 'aws-amplify/auth';

await updateMFAPreference({ sms: 'PREFERRED' });
Multi-factor authentication with TOTP
You can use Time-based One-Time Password (TOTP) for multi-factor authentication (MFA) in your web or mobile applications. The Amplify Auth category includes support for TOTP setup and verification using authenticator apps, offering an integrated solution and enhanced security for your users. These apps, such as Google Authenticator, Microsoft Authenticator, have the TOTP algorithm built-in and work by using a shared secret key and the current time to generate short-lived, six digit passwords.
Set up TOTP for a user
After you initiate a user sign in with the signIn API where a user is required to set up TOTP as an MFA method, the API call will return CONTINUE_SIGN_IN_WITH_TOTP_SETUP as a challenge and next step to handle in your app. You will get that challenge if the following conditions are met:
MFA is marked as Required in your user pool.
TOTP is enabled in your user pool.
User does not have TOTP MFA set up already.
The CONTINUE_SIGN_IN_WITH_TOTP_SETUP step signifies that the user must set up TOTP before they can sign in. The step returns an associated value of type TOTPSetupDetails which must be used to configure an authenticator app like Microsoft Authenticator or Google Authenticator. TOTPSetupDetails provides a helper method called getSetupURI which generates a URI that can be used, for example, in a button to open the user's installed authenticator app. For more advanced use cases, TOTPSetupDetails also contains a sharedSecret which can be used to either generate a QR code or be manually entered into an authenticator app.
Once the authenticator app is set up, the user can generate a TOTP code and provide it to the library to complete the sign in process.
import { signIn, SignInOutput } from 'aws-amplify/auth';

const output = await signIn({
  username: "hello@mycompany.com",
  password: "hunter2"
});

const { nextStep } = output;
switch (nextStep.signInStep) {
  // ...
  case 'CONTINUE_SIGN_IN_WITH_TOTP_SETUP':
    const totpSetupDetails = nextStep.totpSetupDetails;
    const appName = 'my_app_name';
    const setupUri = totpSetupDetails.getSetupUri(appName);
    // Open setupUri with an authenticator APP to retrieve an OTP code
    break;
  // ...
}
The TOTP code can be obtained from the user via a text field or any other means. Once the user provides the TOTP code, call confirmSignIn with the TOTP code as the challengeResponse parameter.
import { confirmSignIn } from 'aws-amplify/auth';

await confirmSignIn({
  challengeResponse: "123456"
});
After a user has been signed in, call updateMFAPreference to record the MFA type as enabled for the user and optionally set it as preferred so that subsequent logins default to using this MFA type.
import { updateMFAPreference } from 'aws-amplify/auth';

await updateMFAPreference({ totp: 'PREFERRED' });
Enable TOTP after a user is signed in
TOTP MFA can be set up after a user has signed in. This can be done when the following conditions are met:
MFA is marked as Optional or Required in your user pool.
TOTP is marked as an enabled MFA method in your user pool.
TOTP can be set up by calling the setUpTOTP and verifyTOTPSetup APIs in the Auth category.
Invoke the setUpTOTP API to generate a TOTPSetupDetails object which should be used to configure an Authenticator app like Microsoft Authenticator or Google Authenticator. TOTPSetupDetails provides a helper method called getSetupURI which generates a URI that can be used, for example, in a button to open the user's installed Authenticator app. For more advanced use cases, TOTPSetupDetails also contains a sharedSecret which can be used to either generate a QR code or be manually entered into an Authenticator app.
that contains the sharedSecret which will be used to either to generate a QR code or can be manually entered into an Authenticator app.
import { setUpTOTP } from 'aws-amplify/auth';

const totpSetupDetails = await setUpTOTP();
const appName = 'my_app_name';
const setupUri = totpSetupDetails.getSetupUri(appName);
// Open setupUri with an authenticator APP to retrieve an OTP code
Once the Authenticator app is set up, the user must generate a TOTP code and provide it to the library. Pass the code to verifyTOTPSetup to complete the TOTP setup process.
import { verifyTOTPSetup } from 'aws-amplify/auth';

await verifyTOTPSetup({ code: "123456" });
After TOTP setup is complete, call updateMFAPreference to record the MFA type as enabled for the user and optionally set it as preferred so that subsequent logins default to using this MFA type.
import { updateMFAPreference } from 'aws-amplify/auth';

await updateMFAPreference({ sms: 'ENABLED', totp: 'PREFERRED' });
Recover from a lost TOTP device
If a user loses access to their TOTP device, they will need to contact an administrator to get help accessing their account. Based on the Cognito user pool configuration, the administrator can use the AdminSetUserMFAPreference to either change the MFA preference to a different MFA method or to disable MFA for the user.
In a scenario where MFA is marked as "Required" in the Cognito User Pool and another MFA method is not set up, the administrator would need to first initiate an AdminUpdateUserAttributes call and update the user's phone number attribute. Once this is complete, the administrator can continue changing the MFA preference to SMS as suggested above.
Set up a user's preferred MFA method
Fetch the current user's MFA preferences
Invoke the following API to get the current MFA preference and enabled MFA types, if any, for the current user.
import { fetchMFAPreference } from 'aws-amplify/auth';

const { enabled, preferred } = await fetchMFAPreference();
Update the current user's MFA preferences
Invoke the following API to update the MFA preference for the current user.
Only one MFA method can be marked as preferred at a time. If the user has multiple MFA methods enabled and tries to mark more than one MFA method as preferred, the API will throw an error.
import { updateMFAPreference } from 'aws-amplify/auth';

await updateMFAPreference({ sms: 'ENABLED', totp: 'PREFERRED' });
If multiple MFA methods are enabled for the user, the signIn API will return CONTINUE_SIGN_IN_WITH_MFA_SELECTION as the next step in the auth flow. During this scenario, the user should be prompted to select the MFA method they want to use to sign in and their preference should be passed to confirmSignIn.
import { confirmSignIn, SignInOutput } from 'aws-amplify/auth';

function handleSignInNextSteps(output: SignInOutput) {
  const { nextStep } = output;
  switch (nextStep.signInStep) {
    // ...
    case 'CONTINUE_SIGN_IN_WITH_MFA_SELECTION':
      const allowedMFATypes = nextStep.allowedMFATypes;
      const mfaType = promptUserForMFAType(allowedMFATypes);
    case 'CONFIRM_SIGN_IN_WITH_SMS_CODE':
      // display user to enter otp code;
      break;
    case 'CONFIRM_SIGN_IN_WITH_TOTP_CODE':
      // display user to enter otp code;
      break;
    // ...
  }
}

function promptUserForMFAType(
  allowedMFATypes?: ('SMS' | 'TOTP')[]
): 'SMS' | 'TOTP' {
  // Prompt user to select MFA type
}

async function handleMFASelection(mfaType: 'SMS' | 'TOTP') {
  try {
    const output = await confirmSignIn({
      challengeResponse: mfaType
    });
    handleSignInNextSteps(output);
  } catch (error) {
    console.log(error);
  }
}
Remember a device
Remembering a device is useful in conjunction with MFA because it allows the second factor requirement to be automatically met when your user signs in on that device and reduces friction in their sign-in experience. By default, this feature is turned off.
Note: The device tracking and remembering features are not available if any of the following conditions are met:

the federated OAuth flow with Cognito User Pools or Hosted UI is used, or
when the signIn API uses the USER_PASSWORD_AUTH as the authFlowType.
Configure device tracking
You can configure device tracking with deviceTracking construct.
amplify/backend.ts
import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';

const backend = defineBackend({
  auth,
  data
});

const { cfnUserPool } = backend.auth.resources.cfnResources;

cfnUserPool.addPropertyOverride('DeviceConfiguration', {
  ChallengeRequiredOnNewDevice: true,
  DeviceOnlyRememberedOnUserPrompt: false
});
Learn more
Understand key terms used for tracking devices

Guest access
Amplify Auth can be configured to automatically obtain guest credentials once the device is online so that you are able to use other categories "anonymously" without the need to sign in. You will not be able to perform user specific methods while in this state such as updating attributes, changing your password, or getting the current user. However, you can obtain the unique Identity ID which is assigned to the device through the fetchAuthSession method described here.
Amplify Gen 2 enables guest access by default. To disable it, you can update the backend.ts file with the following changes:
amplify/backend.ts
import { defineBackend } from '@aws-amplify/backend'
import { auth } from './auth/resource'
import { data } from './data/resource'

const backend = defineBackend({
  auth,
  data,
});

const { cfnIdentityPool } = backend.auth.resources.cfnResources;
cfnIdentityPool.allowUnauthenticatedIdentities = false;


Tokens and credentials
Amplify Auth interacts with its underlying Amazon Cognito user pool as an OpenID Connect (OIDC) provider. When users successfully authenticate you receive OIDC-compliant JSON web tokens (JWT). These tokens are used to identity your user, and access resources.
Access tokens are used to verify the bearer of the token (i.e. the Cognito user) is authorized to perform an action against a resource. Below is an example payload of an access token vended by Cognito:
{
  "sub": "54288468-e051-706d-a73f-03892273d7e9",
  "iss": "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_yoKn9s4Tq",
  "client_id": "1sg675g08g6g0e9f64grv9n5sk",
  "origin_jti": "0eadb994-a6e0-419e-b309-a7a0d522d72f",
  "event_id": "b180897a-181c-4f73-94bb-a2946e8b4ef1",
  "token_use": "access",
  "scope": "aws.cognito.signin.user.admin",
  "auth_time": 1714241873,
  "exp": 1714245473,
  "iat": 1714241873,
  "jti": "57f10a4d-a1f2-453b-8672-d1cfa8187047",
  "username": "54288468-e051-706d-a73f-03892273d7e9"
}
ID tokens are intended to be used within your frontend application only. This token contains personally identifiable information (PII) and should not be used to authorize access against a resource. Below is an example of an ID token with the default Amplify Auth configuration of email and password auth.
{
  "sub": "54288468-e051-706d-a73f-03892273d7e9",
  "email_verified": true,
  "iss": "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_yoKn9s4Tq",
  "cognito:username": "54288468-e051-706d-a73f-03892273d7e9",
  "origin_jti": "0eadb994-a6e0-419e-b309-a7a0d522d72f",
  "aud": "1sg675g08g6g0e9f64grv9n5sk",
  "event_id": "b180897a-181c-4f73-94bb-a2946e8b4ef1",
  "token_use": "id",
  "auth_time": 1714241873,
  "exp": 1714245473,
  "iat": 1714241873,
  "jti": "bb69af10-3ce0-47c2-8d8d-5bdc8630ab58",
  "email": "hello@mycompany.com"
}
When additional user attributes are specified for Amplify Auth, their values will be found in the ID token. For example, if a nickname attribute is requested it will be available on the ID token with the nickname claim:
{
  "sub": "54288468-e051-706d-a73f-03892273d7e9",
  "email_verified": true,
  "iss": "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_yoKn9s4Tq",
  "cognito:username": "54288468-e051-706d-a73f-03892273d7e9",
  "origin_jti": "0eadb994-a6e0-419e-b309-a7a0d522d72f",
  "aud": "1sg675g08g6g0e9f64grv9n5sk",
  "event_id": "b180897a-181c-4f73-94bb-a2946e8b4ef1",
  "token_use": "id",
  "auth_time": 1714241873,
+ "nickname": "hello",
  "exp": 1714245473,
  "iat": 1714241873,
  "jti": "bb69af10-3ce0-47c2-8d8d-5bdc8630ab58",
  "email": "hello@mycompany.com"
}
Conversely, user pool group claims are found in both the access token and ID token on the cognito:groups claim:
{
  "sub": "54288468-e051-706d-a73f-03892273d7e9",
  "email_verified": true,
  "iss": "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_yoKn9s4Tq",
  "cognito:username": "54288468-e051-706d-a73f-03892273d7e9",
  "cognito:groups": ["ADMINS"],
  "origin_jti": "0eadb994-a6e0-419e-b309-a7a0d522d72f",
  "aud": "1sg675g08g6g0e9f64grv9n5sk",
  "event_id": "b180897a-181c-4f73-94bb-a2946e8b4ef1",
  "token_use": "id",
  "auth_time": 1714241873,
  "nickname": "hello",
  "exp": 1714245473,
  "iat": 1714241873,
  "jti": "bb69af10-3ce0-47c2-8d8d-5bdc8630ab58",
  "email": "hello@mycompany.com"
}
Visit the AWS documentation for using tokens with Cognito user pools to learn more about tokens, how they're used with Cognito, and their intended usage.
Understand token management options
Token keys are automatically rotated for you for added security but you can update how they are stored, customize the refresh rate and expiration times, and revoke tokens on sign-out.
Update your token-saving mechanism
You can update the storage mechanism to choose where and how tokens are persisted in your application. The default option is localStorage. Additionally, you can import the sessionStorage, sharedInMemoryStorage or CookieStorage options as well.
If you want to customize your own mechanism, you can import the KeyValueStorageInterface interface and implement it in your own class.
Browser Local Storage
In Amplify the localStorage is the default storage mechanism. It saves the tokens in the browser's localStorage. This local storage will persist across browser sessions and tabs. You can explicitly set to this storage by calling:
import { cognitoUserPoolsTokenProvider } from 'aws-amplify/auth/cognito';
import { defaultStorage } from 'aws-amplify/utils';

cognitoUserPoolsTokenProvider.setKeyValueStorage(defaultStorage);
Cookie Storage
CookieStorage saves the tokens in the browser's Cookies. The cookies will persist across browser sessions and tabs. You can explicitly set to this storage by calling:
import { cognitoUserPoolsTokenProvider } from 'aws-amplify/auth/cognito';
import { CookieStorage } from 'aws-amplify/utils';

cognitoUserPoolsTokenProvider.setKeyValueStorage(new CookieStorage());
Browser Session Storage
sessionStorage saves the tokens in the browser's sessionStorage and these tokens will clear when a tab is closed. The benefit to this storage mechanism is that the session only lasts as long as the browser is open and you can sign out users when they close the tab. You can update to this storage by calling:
import { cognitoUserPoolsTokenProvider } from 'aws-amplify/auth/cognito';
import { sessionStorage } from 'aws-amplify/utils';

cognitoUserPoolsTokenProvider.setKeyValueStorage(sessionStorage);
Custom Storage
You can implement your own custom storage mechanism by creating a class that implements the storage interface. Here is an example that uses memory storage:
import { cognitoUserPoolsTokenProvider } from 'aws-amplify/auth/cognito';
import { KeyValueStorageInterface } from 'aws-amplify/utils';

class MyCustomStorage implements KeyValueStorageInterface {
  storageObject: Record<string, string> = {};
  async setItem(key: string, value: string): Promise<void> {
    this.storageObject[key] = value;
  }
  async getItem(key: string): Promise<string | null> {
    return this.storageObject[key];
  }
  async removeItem(key: string): Promise<void> {
    delete this.storageObject[key];
  }
  async clear(): Promise<void> {
    this.storageObject = {};
  }
}

cognitoUserPoolsTokenProvider.setKeyValueStorage(new MyCustomStorage());
When you get the current user session, the tokens will be saved in your custom location.
Token Revocation
Token revocation is enabled automatically in Amplify Auth. To revoke tokens you can set up global sign-out with signOut({ global: true }) to globally sign out your user from all of their devices.


