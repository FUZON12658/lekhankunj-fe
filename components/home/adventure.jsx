import BookTypes from "./bookTypes";

const Adventure = () => {
    const bookTypesArray = ["physical", "ebook", "audiobook"];
    return (
        <div className="container flex flex-col justify-center items-center py-24 gap-9">
            <p className="text-header-2 font-recoleta">Choose Your Reading Adventure</p>
            <div className="flex flex-wrap justify-center gap-6">
                {bookTypesArray.map((type, index) => (
                    <BookTypes key={index} type={type} />
                ))}
            </div>
        </div>
    )
}
export default Adventure