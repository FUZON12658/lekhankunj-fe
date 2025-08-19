const Tag = ({ tag, color }) => {
    const getTagStyles = () => {
        switch (tag) {
            case "New Release":
                return { backgroundColor: 'var(--primary-800)' };
            case "Best Seller":
                return { backgroundColor: '#346C7E' };
            case "Editors Pick":
                return { backgroundColor: 'var(--terser-700)' };
            case "Popular":
                return { backgroundColor: 'var(--info-green-700)' };
            default:
                return { backgroundColor: color || 'var(--primary-500)' };
        }
    };
    return (
        <div className={`text-btn uppercase px-3 py-1.5 rounded-3xl text-white whitespace-nowrap`} style={getTagStyles()}>{tag}</div>
    )
}
export default Tag