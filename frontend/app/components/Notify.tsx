const Notify = ({
  message,
  type = "error",
}: {
  message: string;
  type?: string;
}) => {
  if (type === "success")
    return <p className="rounded bg-green-100 p-2 text-green-500">{message}</p>;
  else return <p className="rounded bg-red-100 p-2 text-red-500">{message}</p>;
};

export default Notify;
