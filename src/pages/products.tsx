import { IProducts } from "../interface/products";
import { instance } from "../utils/product";

type Props = {
    products: IProducts[],
    setProducts: (data: IProducts[]) => void
}

const Products = ({ products, setProducts }: Props) => {
    const handleDelete = async (id: string) => {
        const cf = confirm('Bạn muốn xóa không')
        if (cf) {
            await instance.delete(`product/${id}`)
            const newPro = products.filter(p => p.id !== id)
            setProducts(newPro)
            alert('Xoá thành công')
        }
    }

    return (
        <>
            <h1>Product List</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Desc</th>
                        <th>Acction</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((p: IProducts, index: number) => (
                        <tr key={index}>
                            <td>{p.title}</td>
                            <td>{p.price}</td>
                            <td>{p.description}</td>
                            <td>
                                <button className="btn btn-primary mx-3">
                                    <a className="text-white" href={`editpro/${p.id}`} style={{ textDecoration: 'none' }}>
                                        Sửa
                                    </a>
                                </button>
                                    <button onClick={() => handleDelete(p.id as string)} className="btn btn-danger">Xóa</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default Products;