import React, { useState } from 'react';
import { signUp } from 'aws-amplify/auth';

const SignUpForm: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    organizationName: '',
    organizationRole: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signUp({
        username: formData.email,
        password: formData.password,
        options: {
          userAttributes: {
            email: formData.email,
            given_name: formData.firstName,
            family_name: formData.lastName,
            'custom:organizationName': formData.organizationName,
            'custom:organizationRole': formData.organizationRole
          }
        }
      });
      // Handle successful sign-up (e.g., show confirmation screen)
    } catch (error) {
      console.error('Error signing up:', error);
      // Handle sign-up error
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
      <input name="firstName" type="text" placeholder="First Name" onChange={handleChange} required />
      <input name="lastName" type="text" placeholder="Last Name" onChange={handleChange} required />
      <input name="organizationName" type="text" placeholder="Organization Name" onChange={handleChange} required />
      <input name="organizationRole" type="text" placeholder="Your Role" onChange={handleChange} required />
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUpForm;