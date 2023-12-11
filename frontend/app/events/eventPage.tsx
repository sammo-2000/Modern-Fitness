"use client";
import { useEffect, useState } from "react";

// Components
import Button from "../components/Button";

// Utilites
import Cookie from "../utils/getCookie";
const Token = Cookie("token");

// Interface
interface Trainer {
  id: string;
  name: string;
}

interface EventPageProps {
  _id: string;
  name: string;
  description: string;
  time: string;
  capacity: number;
  date: string;
  trainers: Trainer[];
  alt: string;
  url: string;
}

const Events = () => {
  const [events, setEvents] = useState<EventPageProps[]>([]);

  useEffect(() => {
    const GetData = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_FULL_DOMAIN}/api/events`,
        {
          method: "GET",
          headers: {
            authorization: Token || "",
          },
        },
      );
      const data = await response.json();
      setEvents(data.events);
    };

    GetData();
  }, []);

  return (
    <div className="flex w-full flex-wrap justify-center gap-5 p-5">
      {Array.isArray(events) && events.length > 0 ? (
        events.map((event) => CustomCard({ event }))
      ) : (
        <p>No events available</p>
      )}
    </div>
  );
};

export default Events;

const CustomCard = ({ event }: { event: EventPageProps }) => {
  return (
    <div className="flex w-full max-w-sm flex-grow flex-col overflow-hidden rounded-lg shadow-lg">
      <img src={event.url} alt={event.alt} className="h-60 object-cover" />
      <div className="flex flex-col p-4">
        <p className="text-2xl font-bold tracking-tight text-gray-900">
          {event.name}
        </p>
        <p className="text-xs font-bold text-gray-700">
          {event.date} - {event.time}
        </p>
        <p className="mt-1 text-xs font-bold text-gray-700">
          max capacity: {event.capacity}
        </p>
        <p className="mt-3 font-bold">Description</p>
        <p className="mb-3 font-normal text-gray-700">{event.description}</p>
        <p className="font-bold">Trainers</p>
        {Array.isArray(event.trainers) &&
          event.trainers.map((trainer) => (
            <ul key={trainer.id} className="ml-10 list-disc">
              <li>{trainer.name}</li>
            </ul>
          ))}
      </div>
      <div className="mt-auto flex flex-col gap-2 p-4">
        <Button name="View" isLink={true} linkTo={`/events/${event._id}`} />
        <Button
          name="Edit Event"
          style="outline"
          isLink={true}
          linkTo={`/events/edit/${event._id}`}
        />
      </div>
    </div>
  );
};
