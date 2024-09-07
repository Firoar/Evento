import { EventInfo } from "@/app/events/[city]/page";
import EventCard from "./EventCard";
import { getEvents } from "@/lib/fetchData";
// import { capitalize } from "@/app/utilities/Capitalise";
import { EventoEvent } from "@prisma/client";
import PaginationControls from "./paginationControls";

type EventsListProps = {
  city: string;
  page?: number;
};

const EventsList = async ({ city, page = 1 }: EventsListProps) => {
  // const city = params.city;
  // console.log(city);
  // const response = await fetch(
  //   `https://bytegrad.com/course-assets/projects/evento/api/events?city=${city}`,
  //   {
  //     next: {
  //       revalidate: 60, // refect every 60 seconds
  //     },
  //   }
  // );
  // console.log(city);
  // city = capitalize(city);
  // console.log(city);
  const { events, totalCount } = await getEvents(city, page);
  // console.log(events, city);

  if (events.length === 0) {
    throw new Error(`No ongoing Events found in ${city}`);
  }

  const previousPath = page > 1 ? `/events/${city}?page=${page - 1}` : ``;
  const nextPath =
    totalCount > 6 * page ? `/events/${city}?page=${page + 1}` : ``;

  return (
    <section className=" max-w-[1100px] flex  flex-wrap gap-10 justify-center px-[20px]">
      {events.map((event: EventInfo) => (
        <EventCard key={event.id} event={event} />
      ))}
      <PaginationControls previousPath={previousPath} nextPath={nextPath} />
    </section>
  );
};

export default EventsList;
