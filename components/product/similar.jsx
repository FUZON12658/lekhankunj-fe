import Button from "../common/button";
import CardBook from "../common/cardBook";

const Similar = () => {
  const metadata = [
    {
      tag: "New Release",
      image: "/book.jpg",
      bookTags: ["physical", "ebook", "audiobook"],
      title: "Stormlight Archive: The Way of Kings",
      writer: "Brandon Sanderson",
      price: 19.0,
      discountedPrice: 23.5,
    },
    {
      tag: "Best Seller",
      image: "/book.jpg",
      bookTags: ["physical", "ebook", "audiobook"],
      title: "The Island of Doctor Morea",
      writer: "H.G. Wells",
      price: 19.0,
      discountedPrice: 23.5,
    },
    {
      tag: "Editors Pick",
      image: "/book.jpg",
      bookTags: ["physical", "audiobook"],
      title: "The Island of Doctor Morea",
      writer: "H.G. Wells",
      price: 19.0,
      discountedPrice: 23.5,
    },
    {
      tag: "Popular",
      image: "/book.jpg",
      bookTags: ["audiobook"],
      title: "The Island of Doctor Morea",
      writer: "H.G. Wells",
      price: 19.0,
      discountedPrice: 23.5,
    },
  ];
  return (
    <div className="flex flex-col gap-12 bg-[#EBF8F7] items-center py-24">
      <div className="text-header-2 font-recoleta">
        Similar books our Readers liked
      </div>
      <div className="container flex gap-6">
        {metadata.map((item, index) => (
          <CardBook key={index} {...item} />
        ))}
      </div>
      <Button
        text="Start Shopping"
        style="fill"
        color="info-green"
        iconRight="placeholder"
        size="small"
      />
    </div>
  );
};
export default Similar;
