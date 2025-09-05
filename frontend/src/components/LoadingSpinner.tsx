import { Loader2 } from 'lucide-react';

export const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center py-8">
      <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
    </div>
  );
};