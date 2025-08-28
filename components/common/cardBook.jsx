import BookTag from "./bookTag";
import { CartIcon } from "./icons";
import Tag from "./tag";

const CardBook = ({
  tag,
  image,
  bookTags,
  title,
  writer,
  price,
  discountedPrice,
}) => {
  return (
    <div className="bg-white flex flex-col justify-between rounded-2xl w-[18.75rem] h-[30rem] p-5">
      <div className="relative wrapper">
        <div className="absolute top-0 left-3 z-10">
          <Tag tag={tag} />
        </div>
        <div className="book">
          <div className="inner-book">
            <div className="img" style={{ paddingTop: "calc(1.07 * 100%)" }}>
              <img src={image} alt={title} />
            </div>
            <div className="page"></div>
            <div className="page page-2"></div>
            <div className="page page-3"></div>
            <div className="page page-4"></div>
            <div className="page page-5"></div>
            <div
              className="img final-page"
              style={{ paddingTop: "calc(1.07 * 100%)" }}
            >
              <img src={image} alt={title} />
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="flex flex-wrap gap-2 items-center">
          {bookTags.map((tag) => (
            <BookTag key={tag} tag={tag} />
          ))}
        </div>
        <h3 className="text-subtitle-2 text-primary-700 pt-4 truncate">
          {title}
        </h3>
        <div className="text-subtitle-4 whitespace-nowrap text-primary-400 mt-2">
          {writer}
        </div>
        <hr className="border-t-2 border-primary-200 my-2" />
        <div className="flex justify-between items-center">
          {/* <div className="flex flex-col gap-2 min-w-0 flex-1 mr-4"></div> */}
          <div className="flex flex-col gap-2 items-start flex-shrink-0">
            <div className="text-subtitle-4 text-primary-400">Buy Now</div>
            <div className="text-subtitle-2">
              <span className="text-info-red-400 line-through pr-2">
                ${discountedPrice.toFixed(1)}
              </span>
              <span className="text-info-green-600">${price.toFixed(1)}</span>
            </div>
          </div>
          <CartIcon className={`w-6 h-6`} />
        </div>
      </div>
    </div>
  );
};
export default CardBook;
