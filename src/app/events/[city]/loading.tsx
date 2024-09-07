import Skeleton from "@/components/skeleton";

const Loading = () => {
  return (
    <div className="flex flex-col items-center pt-20  gap-y-4">
      <Skeleton className="h-4 w-[550px]" />
      <Skeleton className="h-4 w-[450px]" />
      <Skeleton className="h-4 w-[480px]" />
      <Skeleton className="h-4 w-[550px]" />
    </div>
  );
};
export default Loading;
