// Edit event
interface Params {
  eventID: string;
}

import EditEvent from "./editEvent";

const Events = ({ params }: { params: Params }) => {
  const eventID = params.eventID;
  return <EditEvent eventID={eventID} />;
};

export default Events;
