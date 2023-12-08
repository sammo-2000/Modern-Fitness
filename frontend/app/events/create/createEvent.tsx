"use client";
import { useState, useEffect, use } from "react";

// FlowBites
import { Datepicker } from "flowbite-react";

// Components
import Button from "../../components/Button";
import Notify from "../../components/Notify";

// Utilites
import Cookie from "../../utils/getCookie";
const Token = Cookie("token");

// Interfaces
interface Trainer {
  _id: number;
  first_name: string;
  last_name: string;
}

const CreateEvent = () => {
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [trainers, setTrainers] = useState<Trainer[]>([]);

  // Data to send
  const [name, setName] = useState("the event");
  const [time, setTime] = useState(null);
  const [capacity, setCapacity] = useState(null);
  const [date, setDate] = useState(null);
  const [selectedTrainers, setSelectedTrainers] = useState<Trainer[]>([]);

  useEffect(() => {
    const getAllTrainers = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_FULL_DOMAIN}/api/get-all-trainers`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: Token || "",
          },
        },
      );
      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        return setError(data.error);
      }
      setTrainers(data.trainers);
    };

    getAllTrainers();
  }, []);

  const AddTrainer = ({ _id, action }: { _id: number; action: string }) => {
    if (action === "add") {
      const selectedTrainer = trainers.find((trainer) => trainer._id === _id);

      if (selectedTrainer) {
        const updatedTrainers = trainers.filter(
          (trainer) => trainer._id !== selectedTrainer._id,
        );
        setTrainers(updatedTrainers);
      }
      setSelectedTrainers((prevSelectedTrainers) => [
        ...prevSelectedTrainers,
        selectedTrainer as Trainer,
      ]);
    }
    if (action === "remove") {
      const selectedTrainer = selectedTrainers.find(
        (trainer) => trainer._id === _id,
      );

      if (selectedTrainer) {
        const updatedTrainers = selectedTrainers.filter(
          (trainer) => trainer._id !== selectedTrainer._id,
        );
        setSelectedTrainers(updatedTrainers);
      }
      setTrainers((prevSelectedTrainers) => [
        ...prevSelectedTrainers,
        selectedTrainer as Trainer,
      ]);
    }
  };

  const HandleChange = (event: any) => {
    if (event.target.name === "event") {
      setName(event.target.value);
    }
    if (event.target.name === "time") {
      setTime(event.target.value);
    }
    if (event.target.name === "capacity") {
      setCapacity(event.target.value);
    }
  };

  const HandleSubmit = async (event: any) => {
    event.preventDefault();

    const body = {
      name,
      time,
      capacity,
      date,
      trainers: selectedTrainers.map((trainer) => trainer._id),
    };

    console.log(body);
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-slate-100 p-5">
      <form
        className="m-auto my-10 flex w-full max-w-md flex-col gap-5 rounded-lg bg-white p-6 shadow-lg"
        onSubmit={HandleSubmit}
      >
        <h1 className="text-center text-3xl text-blue-700">Create Event</h1>

        <div>
          <label className="mb-1 block" htmlFor="event">
            Event Name
          </label>
          <input
            minLength={5}
            maxLength={20}
            type="text"
            name="event"
            id="event"
            onChange={HandleChange}
            className="block w-full rounded-lg border-2 border-red-400 bg-red-100 valid:border-black valid:bg-white hover:border-blue-500"
          />
        </div>

        <div>
          <label className="mb-1 block" htmlFor="time">
            Event Time
          </label>
          <input
            type="time"
            name="time"
            id="time"
            min={"07:00"}
            max={"17:00"}
            onChange={HandleChange}
            className="block w-full rounded-lg border-2 border-red-400 bg-red-100 valid:border-black valid:bg-white hover:border-blue-500"
          />
        </div>

        <div>
          <label className="mb-1 block" htmlFor="time">
            Event Capacity
          </label>
          <input
            type="number"
            max={50}
            min={5}
            name="capacity"
            id="capacity"
            onChange={HandleChange}
            className="block w-full rounded-lg border-2 border-red-400 bg-red-100 valid:border-black valid:bg-white hover:border-blue-500"
          />
        </div>

        <div>
          <label className="mb-1 block">Trainers</label>
          <p className="font-bold">Selected</p>
          <div className="my-2 min-h-[40px]">
            <div className="flex flex-wrap gap-1">
              {selectedTrainers.map((trainer) => {
                return (
                  <p
                    key={trainer._id}
                    className="w-fit cursor-pointer rounded-lg bg-blue-500 px-3 py-2 text-white hover:bg-blue-600"
                    onClick={() =>
                      AddTrainer({ _id: trainer._id, action: "remove" })
                    }
                  >
                    {trainer.first_name} {trainer.last_name}
                  </p>
                );
              })}
            </div>
          </div>
          <p className="font-bold">Not Selected</p>
          <div className="my-2 flex flex-wrap gap-1">
            {trainers.map((trainer) => {
              return (
                <p
                  key={trainer._id}
                  className="w-fit cursor-pointer rounded-lg bg-blue-500 px-3 py-2 text-white hover:bg-blue-600"
                  onClick={() =>
                    AddTrainer({ _id: trainer._id, action: "add" })
                  }
                >
                  {trainer.first_name} {trainer.last_name}
                </p>
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-center">
          <Datepicker
            inline={true}
            weekStart={2}
            title={`Pick a date for ${name}`}
            minDate={new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)}
            onChange={HandleChange}
            showTodayButton={false}
            showClearButton={false}
            defaultDate={new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)}
            onSelectedDateChanged={(date: any) => {
              setDate(date.toLocaleDateString());
            }}
          />
        </div>

        {success ? <Notify message={success} type={"success"} /> : null}
        {error ? <Notify message={error} /> : null}
        <Button name={"Create Event"} disabled={fetching} />
      </form>
    </div>
  );
};

export default CreateEvent;
