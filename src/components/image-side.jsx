import { useEffect } from "react";

const Images = ({ product, color, setColor, setImage }) => {

    useEffect(() => {
        setImage(product?.images[color]);
    }, [color])

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