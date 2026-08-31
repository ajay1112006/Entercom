import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, FileQuestion } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 text-center">
      <div className="max-w-md space-y-6 p-8 rounded-3xl bg-surface-card border border-surface-border shadow-2xl">
        <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mx-auto">
          <FileQuestion className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <span className="text-xs font-mono text-indigo-400 uppercase tracking-widest">404 Error</span>
          <h1 className="text-3xl font-extrabold text-white">Page Not Found</h1>
          <p className="text-white/60 text-xs leading-relaxed">
            The page or project case study you are looking for does not exist or has been moved.
          </p>
        </div>
        <Link href="/" className="inline-block pt-2">
          <Button variant="glow" size="md" icon={<ArrowLeft className="w-4 h-4" />}>
            Return to Homepage
          </Button>
        </Link>
      </div>
    </div>
  );
}
