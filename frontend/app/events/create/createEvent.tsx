"use client";
import { useState, useEffect, use } from "react";

// FlowBites
import { Datepicker } from "flowbite-react";
import { datePickerTheme } from "../../flowbite/themes";

// Components
import Button from "../../components/Button";
import Notify from "../../components/Notify";
import LoadingPage from "../../components/LoadingPage";

// Utilites
import { validateEventData } from "../validation";
import Cookie from "../../utils/getCookie";
const Token = Cookie("token");

// Interfaces
interface Trainer {
  _id: string;
  first_name: string;
  last_name: string;
}

const CreateEvent = () => {
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [loading, setLoading] = useState(true);

  // Data to send
  const [name, setName] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [capacity, setCapacity] = useState(null);
  const [date, setDate] = useState(null);
  const [selectedTrainers, setSelectedTrainers] = useState<Trainer[]>([]);
  const [description, setDescription] = useState<string | null>(null);
  const [url, setUrl] = useState(null);
  const [alt, setAlt] = useState<string | null>(null);

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
      if (!response.ok) {
        return setError(data.error);
      }
      setTrainers(data.trainers);
      setLoading(false);
    };
    getAllTrainers();
  }, [Token]);

  const AddTrainer = ({ _id, action }: { _id: string; action: string }) => {
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
    if (event.target.name === "description") {
      setDescription(event.target.value);
    }
    if (event.target.name === "url") {
      setUrl(event.target.value);
    }
    if (event.target.name === "alt") {
      setAlt(event.target.value);
    }
  };

  const HandleSubmit = async (event: any) => {
    event.preventDefault();

    setError("");
    setSuccess("");
    setFetching(true);

    const body = {
      name,
      time,
      capacity,
      date,
      description,
      alt,
      url,
      trainers: selectedTrainers.map((trainer) => ({
        _id: trainer._id,
        name: trainer.first_name + " " + trainer.last_name,
      })),
    };

    const validated = validateEventData(body);
    if (!validated.valid) {
      setError(validated.error);
      return setFetching(false);
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_FULL_DOMAIN}/api/events`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: Token || "",
        },
        body: JSON.stringify(body),
      },
    );
    const data = await response.json();
    if (!response.ok) {
      setFetching(false);
      return setError(data.error);
    }

    setSuccess(data.message);
    setFetching(false);
    document.location.href = "/events";
  };

  const validateData = (): boolean => {
    // Some Frontend validation to reduce load on backend
    if (!name) {
      setError("Name is required");
      return false;
    }
    if (!description) {
      setError("Description is required");
      return false;
    }
    if (!time) {
      setError("Time is required");
      return false;
    }
    if (!capacity) {
      setError("Capacity is required");
      return false;
    }
    if (!date) {
      setError("Date is required");
      return false;
    }
    if (!trainers) {
      setError("Trainers are required");
      return false;
    }
    if (!url) {
      setError("Image URL is required");
      return false;
    }
    if (!alt) {
      setError("Image description is required");
      return false;
    }

    // Name
    if (name.length < 5 || name.length > 20) {
      setError("Name must be between 5 and 20 characters");
      return false;
    }
    if (!/^[a-zA-Z0-9\s]*$/.test(name)) {
      setError("Name must only contain letters and numbers");
      return false;
    }

    // description
    if (description.length < 10 || description.length > 200) {
      setError("Description must be between 10 and 200 characters");
      return false;
    }
    if (!/^[a-zA-Z0-9\s]*$/.test(description)) {
      setError("Description must only contain letters and numbers");
      return false;
    }

    // // Trainers
    if (selectedTrainers.length === 0) {
      setError("No trainers have been selected");
      return false;
    }

    // // Alt
    if (alt.length < 2 || alt.length > 40) {
      setError("Image description must be between 2 and 40 characters");
      return false;
    }

    return true;
  };

  if (loading) return <LoadingPage />;
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
            placeholder="Give me nice name :D"
            className="block w-full rounded-lg border-2 border-red-400 bg-red-100 valid:border-black valid:bg-white hover:border-blue-500"
          />
        </div>

        <div>
          <label className="mb-1 block" htmlFor="event">
            Image Link
          </label>
          <input
            type="url"
            name="url"
            id="url"
            onChange={HandleChange}
            placeholder="https://example.com/image.png"
            className="block w-full rounded-lg border-2 border-red-400 bg-red-100 valid:border-black valid:bg-white hover:border-blue-500"
          />
        </div>

        <div>
          <label className="mb-1 block" htmlFor="event">
            Image Description
          </label>
          <input
            type="text"
            name="alt"
            id="alt"
            onChange={HandleChange}
            placeholder="Describe of the image"
            className="block w-full rounded-lg border-2 border-red-400 bg-red-100 valid:border-black valid:bg-white hover:border-blue-500"
          />
        </div>

        <div>
          <label className="mb-1 block" htmlFor="event">
            Event Description
          </label>
          <textarea
            name="description"
            id="description"
            rows={10}
            className="block w-full rounded-lg border-2 border-red-400 bg-red-100 valid:border-black valid:bg-white hover:border-blue-500"
            onChange={HandleChange}
          ></textarea>
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
            placeholder="5 - 50"
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
            theme={datePickerTheme}
            weekStart={2}
            title={
              name ? `Pick a date for ${name}` : "Pick a date for the event"
            }
            minDate={new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)}
            onChange={HandleChange}
            showTodayButton={false}
            showClearButton={false}
            defaultDate={new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)}
            onSelectedDateChanged={(date: any) => {
              const options = {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              };
              const formattedDate = date
                .toLocaleDateString("en-CA", options)
                .replace(/\//g, "-");
              setDate(formattedDate);
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
