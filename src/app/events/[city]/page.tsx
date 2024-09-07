import EventsList from "@/components/EventsList";
import H1 from "@/components/H1";
import { Suspense } from "react";
import Loading from "./loading";
import Head from "next/head";
import { Metadata } from "next";
import { z } from "zod";
import { metadata } from "@/app/layout";

type Props = {
  params: {
    city: string;
    searchParams: number;
  };
};

type EventsPageProps = Props & {
  searchParams: { [key: string]: string | string[] | undefined };
};

export type EventInfo = {
  id: number;
  name: string;
  slug: string;
  city: string;
  location: string;
  date: Date;
  organizerName: string;
  imageUrl: string;
  description: string;
};

// export function generateMetaData({ params }: Props) {
//   const city = params.city;
//   return {
//     title: `Events in ${city}`,
//     // description: "Browse more than 10,000 events worldwide",
//   };
// }

// export const metadata: Metadata = {
//   title: "Evento - find event around you",
// };

const EventsPage = async ({ params, searchParams }: EventsPageProps) => {
  // const currentPath = usePathname();
  // console.log(currentPath);
  // const myCity = currentPath.split("/")[2];
  // console.log(myCity);
  const city = params.city;
  // console.log(city);
  // const response = await fetch(
  //   `https://bytegrad.com/course-assets/projects/evento/api/events?city=${city}`
  // );
  // const events: EventInfo[] = await response.json();
  const title = `Events in ${city[0].toUpperCase() + city.slice(1)}`;

  if (city === "all") {
    metadata.title = `All Events`;
  } else {
    metadata.title = title;
  }
  // // console.log(events);

  const pageNumberSchema = z.coerce.number().int().positive().optional();
  const Parsedpage = pageNumberSchema.safeParse(searchParams.page);

  if (!Parsedpage.success) {
    throw new Error("Not a valid page number");
  }

  return (
    <>
      <main className="flex flex-col items-center py-24 px-[20px]  min-h-[110vh]">
        <H1 className={"mb-28"}>
          {city === "all" && "All events"}
          {city !== "all" &&
            `Events in ${city[0].toUpperCase() + city.slice(1)}`}
        </H1>
        <Suspense key={city + Parsedpage.data} fallback={<Loading />}>
          <EventsList city={city} page={Parsedpage.data} />
        </Suspense>
      </main>
    </>
  );
};
export default EventsPage;
