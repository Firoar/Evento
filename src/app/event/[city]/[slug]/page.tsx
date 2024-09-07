import { EventInfo } from "@/app/events/[city]/page";
import { getEvent, getEvents } from "@/lib/fetchData";
import H1 from "@/components/H1";
import { EventoEvent } from "@prisma/client";
import Image from "next/image";
import NotFound from "@/app/not-found";

// Define a type for params
interface EventPageParams {
  city: string;
  slug: string;
}

export async function generateStaticParams() {
  // top 100 most popular events
  return [
    {
      city: "Austin",
      slug: "comedy-extravaganza",
    },
    {
      city: "Austin",
      slug: "dj-practice-session",
    },
  ];
}

const EventPage = async ({ params }: { params: EventPageParams }) => {
  // console.log(params);

  const city = params.city;
  const slug = params.slug;

  // Fetch all events based on city
  // const events: EventoEvent[] = await getEvents(city);
  // console.log(events);
  const fetchEvent = async () => {
    try {
      const event = await getEvent(slug);
      return event;
    } catch (error) {
      console.error("Error fetching event:", error);
      return null;
    }
  };

  // Call the fetchEvent function
  const event: EventoEvent | null = (await fetchEvent()) as EventoEvent;

  // console.log(event);

  if (event === null) {
    throw new Error(`No event named "${slug}" found`);
  }

  // Once you have verified event is not undefined, you can safely access its properties
  return (
    <main className="">
      <section className=" relative  overflow-hidden flex  justify-center items-center  py-14 md:py-20  ">
        <Image
          src={event.imageUrl}
          className="object-cover blur-3xl z-0 "
          alt={event.name + " background "}
          fill
          quality={50}
          sizes="(maz-width:1280px) 100vw,1280px"
        />
        <div className="relative z-1 flex   flex-col lg:flex-row gap-x-6 lg:gap-x-16 py-14 md:py-20 ">
          <Image
            src={event.imageUrl}
            alt={event.name}
            width={300}
            height={201}
            className="rounded-xl border-2 border-white/50 object-cover "
          />
          <div className="flex flex-col">
            <p className="text-white/75">
              {new Date(event.date).toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </p>
            <H1 className="mb-2 mt-1 whitespace-nowrap lg:text-5xl ">
              {event.name}
            </H1>
            <p className="whitespace-nowrap text-xl text-white/75 ">
              Organised by <span className="italic">{event.organizerName}</span>{" "}
            </p>
            <button className="bg-white/20 text-lg capitalize mt-5 lg:mt-auto w-[95vw] sm:w-full rounded-md border-white/10 border-2 bg-blur hover:scale-105  focus:scale-105 active:scale-[1.02] transition">
              Get tickets
            </button>
          </div>
        </div>
      </section>
      <div className="text-center px-5 py-16  min-h-[50vh]">
        <section className="mb-10">
          <h2 className="text-2xl mb-8">About this event</h2>
          <p className="text-lg leading-8 text-white/75 max-w-4xl mx-auto ">
            {event.description}
          </p>
        </section>
        <section className="">
          <h2 className="text-2xl mb-8">Location</h2>
          <p className="text-lg leading-8 text-white/75 max-w-4xl mx-auto">
            {event.location}
          </p>
        </section>
      </div>
    </main>
  );
};

export default EventPage;
