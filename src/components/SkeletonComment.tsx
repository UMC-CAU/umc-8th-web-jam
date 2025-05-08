export default function SkeletonComment() {
    return (
      <div className="flex gap-3 items-start animate-pulse">
        <div className="w-8 h-8 rounded-full bg-gray-500" />
        <div className="flex-1 space-y-2">
          <div className="w-32 h-3 bg-gray-500 rounded" />
          <div className="w-3/4 h-3 bg-gray-600 rounded" />
        </div>
      </div>
    );
  }