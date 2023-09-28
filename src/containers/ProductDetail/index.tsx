import { useParams } from 'react-router-dom'

const ProductDetail = () => {
    const params = useParams();

    return (
        <div>
            Ini adalah halaman product detail dengan id: {params?.id}
        </div>
    )
}

export default ProductDetail