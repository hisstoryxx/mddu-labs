import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-7xl font-bold text-yonsei-blue font-heading">
          404
        </h1>
        <p className="mt-4 text-xl text-text-secondary">
          페이지를 찾을 수 없습니다
        </p>
        <Link
          href="/"
          className="inline-block mt-8 px-6 py-3 bg-yonsei-blue text-white rounded-xl hover:bg-yonsei-dark transition-colors font-medium"
        >
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  );
}
