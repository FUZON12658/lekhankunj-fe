import CardHallmark from "./cardHallmark"

const Hallmark = () => {
    const hallmarkArray = ["delivery", "collection", "prices"]

    return (
        <div className="container py-60 flex gap-11">
            <div className="max-w-md">
                <h2 className="text-header-2 text-primary-800 font-recoleta">Why Choose Lekhan Kunja?</h2>
                <p className="text-body-1 text-primary-600 pt-7">We're more than just a bookstore - We're a community of passionate readers, dreamers, and storytellers. Founded with the belief that every great story deserves to find its perfect reader.</p>
            </div>
            <div className="flex gap-5">
                {hallmarkArray.map((hallmark) => (
                    <CardHallmark key={hallmark} type={hallmark} />
                ))}
            </div>
        </div>
    )
}
export default Hallmark