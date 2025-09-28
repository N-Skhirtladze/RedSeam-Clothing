import { useParams } from "react-router-dom";
import { useState, useEffect } from "react"

const Description = ({ product, color, setColor, isOpen, setIsOpen, setProductList, image, setImage }) => {
    const [size, setSize] = useState(product?.available_sizes[0]);
    const [quantity, setQuantity] = useState(1);
    const { id } = useParams();

    useEffect(() => {
        setSize(product?.available_sizes[0]);
        setImage(product?.cover_image);
    }, [product]);

    const handleQuantity = (e) => {
        const value = Math.max(1, Number(e.target.value));
        setQuantity(value);
    }

    const handleColor = (index) => {
        setColor(index)
    }

    const handleSize = (e) => {
        setSize(e.target.textContent);
    }

    const handleAddToCart = () => {
        setIsOpen(true);
        const token = localStorage.getItem('token');
        const colorIndex = color ?? 0;
        const sizeIndex = product?.available_sizes.indexOf(size);
        const variationId = Number(`${product.id}${colorIndex}${sizeIndex}`);
        const productInfo = {
            variationId: variationId,
            name: product.name,
            color: product?.available_colors[color],
            image: image,
            size: size,
            quantity: quantity,
            price: product.price
        };

        setProductList((prev) => {
            const index = prev.findIndex((p) => p.name == productInfo.name && p.color == productInfo.color && p.size == productInfo.size && p.price == productInfo.price);

            if (index == -1) return [...prev, productInfo]

            return [...prev];
        });
        const handlePost = async () => {
            const response = await fetch(`https://api.redseam.redberryinternship.ge/api/cart/products/${id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    quantity: productInfo.quantity,
                    color: productInfo.color,
                    size: productInfo.size
                })
            });
            const result = await response.json();
            console.log(result);
        }
        handlePost();
    }
    return (
        <div className="description">
            <div className="product-header">
                <h1 className="name">{product?.name}</h1>
                <p className="price">${product?.price}</p>
            </div>
            <div className="color-div">
                <p className="picked-color">Color: {product?.available_colors[color]}</p>
                <div className="available-colors">
                    {product?.available_colors.map((c, index) => {
                        return (
                            <p style={
                                {
                                    backgroundColor: `${c}`,
                                    width: "60px",
                                    height: '60px',
                                    border: color == index ? "1px solid #E1DFE1" : "1px solid rgba(0, 0, 0, 0.342)",
                                    boxShadow: color == index ? "inset 0 0 0 4px white" : ""
                                }
                            } key={"color-" + index} onClick={() => handleColor(index)} className="colors"></p> //!some color is not available in css
                        )
                    })}
                </div>
            </div>
            <div className="size-div">
                <p className="picked-size">Size: {size}</p>
                <div className="sizes">
                    {product?.available_sizes.map((s) => (<p key={'size-' + s} onClick={handleSize} className="size" style={
                        {
                            backgroundColor: s == size ? "#F8F6F7" : "",
                            border: s == size ? "1px solid #10151F" : ""
                        }
                    }>{s}</p>))}
                </div>
            </div>
            <div className="quantity-div">
                <p className="quantity">Quantity</p>
                <form>
                    <input type="number" name="quantity" value={quantity} min={1} onChange={handleQuantity} />
                </form>
            </div>
            <button type="button" className="add-to-cart" onClick={handleAddToCart}><img src="../images/Vector.png" alt="" /> Add to cart</button>
            <div className="details-div">
                <div className="details-header">
                    <p>Details</p>
                    <img src={product?.brand.image} alt="" />
                </div>
                <p className="brand">Brand: {product?.brand.name}</p>
                <p className="info">{product?.description}</p>
            </div>
        </div>
    )
}

export default Description;