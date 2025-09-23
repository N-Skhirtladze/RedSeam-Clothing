import { useState } from "react"

const Description = ({ product, color, setColor }) => {
    const [size, setSize] = useState(product?.available_sizes[0]);
    const [quantity, setQuantity] = useState(0);

    const handleQuantity = (e) => {
        setQuantity(e.target.value);
    }

    const handleColor = (index) => {
        setColor(index)
    }

    const handleSize = (e) => {
        setSize(e.target.textContent);
    }

    return (
        <div className="description">
            <div className="product-header">
                <h1 className="name">{product?.name}</h1>
                <p className="price">${product?.price}</p>
            </div>
            <div className="color-div">
                <p className="picked-color">Color: {product?.available_colors[color]}</p>
                {product?.available_colors.map((color, index) => {
                    console.log("Color at", index, "=", color); 
                    return(
                        <p style={{ backgroundColor: `${color == "Peach" ? "PeachPuff" : color}`, width: "60px", height: '60px', border: "1px solid black" }} key={"color-" + index} onClick={() => handleColor(index)}></p>
                    )
                })}
            </div>
            <div className="size-div">
                <p className="picked-size">Size: {size}</p>
                {product?.available_sizes.map((size) => (<p key={'size-' + size} onClick={handleSize}>{size}</p>))}
            </div>
            <div className="quantity-div">
                <p>Quantity</p>
                <form>
                    <input type="number" name="quantity" value={quantity} onChange={handleQuantity} />
                </form>
            </div>
            <button type="button"><img src="../images/Vector.png" alt="" /> Add to cart</button>
            <div className="details-div">
                <div className="details-header">
                    <p className="details">Details</p>
                    <img src={product?.brand.image} alt="" />
                </div>
                <p className="brand">Brand: {product?.brand.name}</p>
                <p className="info">{product?.description}</p>
            </div>
        </div>
    )
}

export default Description;