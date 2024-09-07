import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";

type PaginationProps = {
  previousPath: string;
  nextPath: string;
};

const PaginationControls = ({ previousPath, nextPath }: PaginationProps) => {
  return (
    <section className="flex w-full justify-between">
      {previousPath ? (
        <Link
          href={previousPath}
          className="text-white px-5 py-3 bg-white/5  rounded-md opacity-75 flex items-center gap-x-2 hover:opacity-100 transition text-sm"
        >
          <ArrowLeftIcon />
          Previous
        </Link>
      ) : (
        <div />
      )}

      {nextPath ? (
        <Link
          href={nextPath}
          className="text-white px-5 py-3 bg-white/5  rounded-md opacity-75 flex items-center gap-x-2 hover:opacity-100 transition text-sm"
        >
          Next
          <ArrowRightIcon />
        </Link>
      ) : (
        <div />
      )}
    </section>
  );
};
export default PaginationControls;
