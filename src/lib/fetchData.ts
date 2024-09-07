import NotFound from "@/app/not-found";
import { capitalize } from "./Capitalise";
import prisma from "./db";
import { unstable_cache } from "next/cache";

export const getEvents = unstable_cache(
  async (city: string, page: number = 1) => {
    try {
      const events = await prisma.eventoEvent.findMany({
        where: {
          city: city === "all" ? undefined : capitalize(city),
        },
        orderBy: {
          date: "asc",
        },
        take: 6,
        skip: (page - 1) * 6,
      });

      let totalCount;

      if (city === "all") {
        totalCount = await prisma.eventoEvent.count();
      } else {
        totalCount = await prisma.eventoEvent.count({
          where: {
            city: capitalize(city),
          },
        });
      }

      return { events, totalCount };
    } catch (error) {
      console.error("Error fetching events:", error);
      throw error;
    } finally {
      await prisma.$disconnect();
    }
  }
);

export const getEvent = unstable_cache(async (slug: string) => {
  try {
    const event = await prisma.eventoEvent.findUnique({
      where: {
        slug: slug,
      },
    });
    if (!event) {
      return null;
    }
    return event;
  } catch (error) {
  } finally {
    await prisma.$disconnect();
  }
});
