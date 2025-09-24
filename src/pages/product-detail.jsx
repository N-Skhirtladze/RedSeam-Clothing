import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../components/header";
import Images from "../components/image-side";
import { set } from "react-hook-form";
import Description from "../components/description-side";


function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [color, setColor] = useState(0);
    // const [image, setImage] = useState('');

    useEffect(() => {
        const URL = `https://api.redseam.redberryinternship.ge/api/products/${id}`;
        const fetchData = async () => {
            const api = await fetch(URL);
            try {
                if (api.ok) {
                    const data = await api.json();
                    setProduct(data);
                    console.log('product detail', data);
                    setColor(0);
                }
            } catch (error) {

            }
        }
        fetchData();
    }, [id]);


    return (
        <>
            <Header />
            {/* <h1>{color}</h1> */}
            <div className="product-main-div">
                <Images product={product} color={color} setColor={setColor} />
                <Description product={product} color={color} setColor={setColor} />
            </div>
        </>
    )
}

export default ProductDetail;