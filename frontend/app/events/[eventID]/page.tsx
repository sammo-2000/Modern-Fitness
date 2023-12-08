// View single event
interface Params {
  eventID: string;
}

const Events = ({ params }: { params: Params }) => {
  const eventID = params.eventID;
  return (
    <>
      <h1>View single event</h1>
      <p>{eventID}</p>
    </>
  );
};

export default Events;
