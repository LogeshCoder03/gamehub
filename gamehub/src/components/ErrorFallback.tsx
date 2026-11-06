import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { Link } from "react-router";
import { Button } from "./ui/button";

type ErrorFallbackProps = {
  message?: string;
  onRetry?: () => void;
};

export default function ErrorFallback({
  message = "Something went wrong",
  onRetry,
}: ErrorFallbackProps) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border bg-white p-6 text-center shadow-sm">

        {/* Icon */}
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-600">
          <AlertTriangle size={28} />
        </div>

        {/* Title */}
        <h2 className="mb-2 text-lg font-semibold text-gray-900">
          Oops! Error
        </h2>

        {/* Message */}
        <p className="mb-5 text-sm text-gray-600">
          {message}
        </p>

        {/* Actions */}
        <div className="flex justify-center gap-3">
          {onRetry && (
            <Button
              onClick={onRetry}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <RefreshCw size={14} />
              Retry
            </Button>
          )}

          <Link
            to="/"
            className="flex items-center gap-1 rounded-lg border px-4 py-2 text-sm hover:bg-gray-50"
          >
            <Home size={14} />
            Home
          </Link>
        </div>

      </div>
    </div>
  );
}