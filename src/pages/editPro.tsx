import { useState, useEffect } from "react";
import { instance } from "../utils/product";
import { IProducts } from "../interface/products";
import { useParams } from "react-router-dom";
import { z } from "zod";

const productSchema = z.object({
    title: z.string().nonempty("Title is required"),
    price: z.preprocess(
        (val) => parseFloat(z.string().parse(val)),
        z.number().positive("Price must be a positive number")
    ),
    description: z.string().nonempty("Description is required"),
});

const EditPro = () => {
    const { id } = useParams();
    const [title, setTitle] = useState<string>('');
    const [price, setPrice] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const validate = () => {
        const result = productSchema.safeParse({ title, price, description });

        if (!result.success) {
            const errorMessages: { [key: string]: string } = {};
            result.error.errors.forEach((error) => {
                if (error.path[0]) {
                    errorMessages[error.path[0] as string] = error.message;
                }
            });
            setErrors(errorMessages);
        } else {
            setErrors({});
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await instance.get(`/product/${id}`);
                setTitle(data.title);
                setPrice(data.price.toString());
                setDescription(data.description);
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };
        fetchData();
    }, [id]);
    useEffect(() => {
        validate();
    }, [title, price, description]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const result = productSchema.safeParse({ title, price, description });

        if (!result.success) {
            const errorMessages: { [key: string]: string } = {};
            result.error.errors.forEach((error) => {
                if (error.path[0]) {
                    errorMessages[error.path[0] as string] = error.message;
                }
            });
            setErrors(errorMessages);
            return;
        }

        try {
            await instance.patch(`/product/${id}`, { title, price: parseFloat(price), description } as IProducts);
            alert('Update successful');
        } catch (error) {
            console.error('Failed to update product:', error);
            alert('Failed to update product');
        }
    };

    return (
        <>
            <h1>Update Product</h1>
            <form className="container pt-3" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    {errors.title && <div className="text-danger">{errors.title}</div>}
                </div>

                <div className="form-group">
                    <label htmlFor="price">Price</label>
                    <input
                        type="number"
                        className="form-control"
                        id="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    {errors.price && <div className="text-danger">{errors.price}</div>}
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input
                        type="text"
                        className="form-control"
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    {errors.description && <div className="text-danger">{errors.description}</div>}
                </div>

                <button type="submit" className="btn btn-primary mt-3">Update Product</button>
            </form>
        </>
    );
};

export default EditPro;
