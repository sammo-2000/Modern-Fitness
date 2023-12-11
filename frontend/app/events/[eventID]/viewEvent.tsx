"use client";
import { useState, useEffect } from "react";

// Components
import Notify from "../../components/Notify";
import Button from "@/app/components/Button";

// Utilites
import Cookie from "../../utils/getCookie";
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
  current_register: number;
  registered: boolean;
}

const ViewEvent = ({ eventID }: { eventID: string }) => {
  const [EventID, setEventID] = useState<string>(eventID);
  const [event, setEvent] = useState<EventPageProps>();
  const [error, setError] = useState<string>("");
  const [count, setCount] = useState<number>(0);
  const [inEvent, setInEvent] = useState<boolean>(false);

  const HandleRegister = async (e: any) => {
    e.preventDefault();
    setError("");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_FULL_DOMAIN}/api/events/register/${eventID}`,
      {
        method: "GET",
        headers: {
          authorization: Token || "",
        },
      },
    );
    const data = await response.json();
    console.log(data);
    if (!response.ok) setError(data.error);

    if (inEvent) {
      setInEvent(false);
      setCount(count - 1);
    } else {
      setInEvent(true);
      setCount(count + 1);
    }
  };

  const HandleDelete = async (e: any) => {
    e.preventDefault();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_FULL_DOMAIN}/api/events/${EventID}`,
      {
        method: "DELETE",
        headers: {
          authorization: Token || "",
        },
      },
    );

    const data = await response.json();
    console.log(data);

    if (!response.ok) setError(data.error);
    else window.location.href = "/events";
  };

  useEffect(() => {
    const GetData = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_FULL_DOMAIN}/api/events/${eventID}`,
        {
          method: "GET",
          headers: {
            authorization: Token || "",
          },
        },
      );
      const data = await response.json();
      setEvent(data.event);
    };

    GetData();
  }, []);
  return (
    <>
      {event ? (
        <div className="relative flex min-h-screen w-full items-center justify-center">
          <img
            src={event.url}
            alt={event.alt}
            className="absolute h-full w-full object-cover brightness-[0.3]"
          />
          <div className="absolute flex items-center justify-center rounded-lg bg-white bg-opacity-10 text-white shadow">
            <div className="flex flex-col p-4">
              <p className="text-2xl font-bold tracking-tight text-white">
                {event.name}
              </p>
              <p className="text-xs font-bold text-gray-300">
                {event.date} - {event.time}
              </p>
              <p className="mt-1 text-xs font-bold text-gray-300">
                Capacity: {count} / {event.capacity}
              </p>
              <p className="mt-3 font-bold">Description</p>
              <p className="mb-3 font-normal text-gray-300">
                {event.description}
              </p>
              <p className="font-bold">Trainers</p>
              {Array.isArray(event.trainers) &&
                event.trainers.map((trainer) => (
                  <ul key={trainer.id} className="ml-10 list-disc">
                    <li>{trainer.name}</li>
                  </ul>
                ))}
              <form className="mt-1 flex flex-col gap-2">
                {error && <Notify message={error} />}
                <button
                  className="block-inline ml-auto w-fit rounded-lg bg-white px-4 py-2 text-black transition-colors hover:bg-gray-300"
                  onClick={(event) => {
                    HandleRegister(event);
                  }}
                >
                  Register {inEvent ? "out" : "in"}
                </button>
                <Button
                  name="Delete"
                  style="red"
                  onClick={(e: any) => {
                    HandleDelete(e);
                  }}
                />
              </form>
            </div>
          </div>
        </div>
      ) : (
        <p>No event found</p>
      )}
    </>
  );
};

export default ViewEvent;
