import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../components/header";
import Images from "../components/image-side";
import { set } from "react-hook-form";
import Description from "../components/description-side";
import Sidebar from "../components/sidebar";


function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [color, setColor] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [image, setImage] = useState("");
    const [productList, setProductList] = useState(JSON.parse(localStorage.getItem("product-list")) || []);
    const [finalCost, setFinalCost] = useState(0);


    useEffect(() => {
        localStorage.setItem("product-list", JSON.stringify(productList));
        setFinalCost(productList.reduce((acc, p) => acc + p.price * p.quantity, 0))
    }, [productList])

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
            <div className="product-main-div">
                <Images product={product} color={color} setColor={setColor} setImage={setImage} />
                <Description product={product} color={color} setColor={setColor} isOpen={isOpen} setIsOpen={setIsOpen} setProductList={setProductList} image={image} setImage={setImage}/>
            </div>
            <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} productList={productList} setProductList={setProductList} finalCost={finalCost} setFinalCost={setFinalCost} />
        </>
    )
}

export default ProductDetail;