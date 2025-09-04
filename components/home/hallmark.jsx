import CardHallmark from "./cardHallmark"

const Hallmark = () => {
    const hallmarkArray = ["delivery", "collection", "prices"]

    return (
        <div className="container py-60 flex gap-11">
            <div className="max-w-md">
                <h2 className="text-header-2 text-primary-800 font-recoleta">Why Choose <span className="text-info-green-600">Lekhan Kunja?</span></h2>
                <p className="text-body-1 text-primary-600 pt-7">We’re more than just a writing space — we’re a creative hub for readers, writers, and dreamers. From writing, editing and publishing to curated collections and community events, our mission is to nurture voices and connect stories with their perfect audience.</p>
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