import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AuthCallback() {
  const { completeGoogleSignIn } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    const token = new URLSearchParams(window.location.hash.slice(1)).get('token');
    if (!token) {
      setError('Google sign-in did not return a valid session. Please try again.');
      return;
    }

    completeGoogleSignIn(token)
      .then(() => navigate('/chat', { replace: true }))
      .catch(() => setError('We could not complete your Google sign-in. Please try again.'));
  }, [completeGoogleSignIn, navigate]);

  return (
    <main className="min-h-screen grid place-items-center bg-slate-50 px-4 dark:bg-[#080d1a]">
      <section className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-7 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
        {error ? (
          <>
            <h1 className="text-lg font-bold text-slate-900 dark:text-white">Sign-in unavailable</h1>
            <p className="mt-2 text-sm text-slate-500">{error}</p>
            <button onClick={() => navigate('/signin', { replace: true })} className="mt-5 rounded-xl bg-teal-500 px-4 py-2 text-sm font-semibold text-white">Back to sign in</button>
          </>
        ) : (
          <>
            <Loader2 className="mx-auto h-6 w-6 animate-spin text-teal-500" />
            <h1 className="mt-3 text-lg font-bold text-slate-900 dark:text-white">Signing you in</h1>
            <p className="mt-1 text-sm text-slate-500">Finishing Google sign-in securely…</p>
          </>
        )}
      </section>
    </main>
  );
}
