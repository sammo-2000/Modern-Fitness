import Image from "next/image";

const Loading = () => {
  return (
    <div className="flex max-w-[500px] flex-col items-center justify-center gap-5 p-5">
      <h1 className="text-4xl text-blue-600">Loading...</h1>
      <Image src="/loading.png" alt="Image of hour glass for loading screen" />
    </div>
  );
};

export default Loading;
