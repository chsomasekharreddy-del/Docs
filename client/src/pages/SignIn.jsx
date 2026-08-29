import React from 'react';
import AuthLayout from '../components/auth/AuthLayout';
import SignInForm from '../components/auth/SignInForm';

export default function SignIn() {
  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to your Doc.ai Medical Command Center account"
    >
      <SignInForm />
    </AuthLayout>
  );
}
