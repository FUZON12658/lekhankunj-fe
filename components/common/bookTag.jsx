import Image from "next/image";

const BookTag = ({ tag }) => {
  const metadata =
    tag === "physical"
      ? {
          title: "Physical Book",
          icon: "/placeholder.png",
          text: "text-[#418295]",
          background: "bg-[#DAF6FF]",
          iconBackground: "bg-[#418295]",
        }
      : tag === "ebook"
      ? {
          title: "eBooks",
          icon: "/placeholder.png",
          text: "text-[#41957F]",
          background: "bg-[#D0FFF3]",
          iconBackground: "bg-[#41957F]",
        }
      : tag === "audiobook"
      ? {
          title: "Audio Book",
          icon: "/placeholder.png",
          text: "text-[#4A4195]",
          background: "bg-[#CFE5FF]",
          iconBackground: "bg-[#4A4195]",
        }
      : null;

  return (
    <div
      className={`rounded-2xl flex items-center gap-1  px-2 py-1 whitespace-nowrap ${metadata.background}`}
    >
      {/* <div
        className={`w-5 h-5 grid place-items-center rounded-full relative ${metadata.iconBackground}`}
      >
        <Image src={metadata.icon} alt="Icon" width={12} height={12} />
      </div> */}
      <h3 className={`font-poppins text-xs font-medium ${metadata.text}`}>
        {metadata.title}
      </h3>
    </div>
  );
};
export default BookTag;
