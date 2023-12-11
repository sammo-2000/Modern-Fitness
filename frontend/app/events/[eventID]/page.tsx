// View single event
interface Params {
  eventID: string;
}

import ViewEvent from "./viewEvent";

const Events = ({ params }: { params: Params }) => {
  const eventID = params.eventID;
  return <ViewEvent eventID={eventID} />;
};

export default Events;
