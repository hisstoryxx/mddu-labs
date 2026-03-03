"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-text-primary font-heading">
          오류가 발생했습니다
        </h1>
        <p className="mt-4 text-text-secondary">
          잠시 후 다시 시도해주세요.
        </p>
        <button
          onClick={reset}
          className="mt-8 px-6 py-3 bg-yonsei-blue text-white rounded-xl hover:bg-yonsei-dark transition-colors font-medium"
        >
          다시 시도
        </button>
      </div>
    </div>
  );
}
