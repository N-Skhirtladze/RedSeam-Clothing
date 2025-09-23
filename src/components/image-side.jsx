const Images = ({ product, color, setColor }) => {

    const handleImage = (index) => {
        setColor(index);
    }

    return (
        <div className="images-div">
            <p>Listing / Product</p>
            <div className="image-flex">
                <div className="image-column">
                    {product?.images.map((src, index) => (<img src={src} key={src} onClick={() => handleImage(index)} />))}
                </div>
                <div className="cover">
                    <img src={product?.images[color]} alt="" />
                </div>
            </div>
        </div>
    )
}

export default Images;