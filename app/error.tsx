'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log exception to error monitoring service
    console.error('Unhandled app error:', error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 text-center">
      <div className="max-w-md space-y-6 p-8 rounded-3xl bg-surface-card border border-rose-500/30 shadow-2xl">
        <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 mx-auto">
          <AlertTriangle className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <span className="text-xs font-mono text-rose-400 uppercase tracking-widest">Runtime Boundary</span>
          <h1 className="text-2xl font-extrabold text-white">Something Went Wrong</h1>
          <p className="text-white/60 text-xs leading-relaxed">
            An unexpected error occurred while rendering this page view.
          </p>
        </div>
        <Button
          onClick={() => reset()}
          variant="glow"
          size="md"
          icon={<RefreshCw className="w-4 h-4" />}
        >
          Try Again
        </Button>
      </div>
    </div>
  );
}
