import { AlertCircle } from 'lucide-react';

interface ErrorAlertProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorAlert = ({ message, onRetry }: ErrorAlertProps) => {
  return (
    <div className="bg-red-900/50 border border-red-700 rounded-lg p-4">
      <div className="flex items-center gap-2 text-red-200">
        <AlertCircle className="w-5 h-5" />
        <span className="font-medium">Error</span>
      </div>
      <p className="text-red-300 mt-2">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-3 px-4 py-2 bg-red-700 hover:bg-red-600 rounded-md text-sm transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  );
};