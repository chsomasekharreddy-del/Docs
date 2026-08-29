import React from 'react';
import AuthLayout from '../components/auth/AuthLayout';
import SignUpForm from '../components/auth/SignUpForm';

export default function SignUp() {
  return (
    <AuthLayout
      title="Create an account"
      subtitle="Start triaging symptoms and generating structured medical cards"
    >
      <SignUpForm />
    </AuthLayout>
  );
}
