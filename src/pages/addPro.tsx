import { useState, useEffect } from "react";
import { instance } from "../utils/product";
import { IProducts } from "../interface/products";
import { z } from "zod";
const productSchema = z.object({
    title: z.string().nonempty("Title is required"),
    price: z.preprocess(
        (val) => parseFloat(z.string().parse(val)),
        z.number().positive("Price must be a positive number")
    ),
    description: z.string().nonempty("Description is required"),
});

const AddPro = () => {
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
            await instance.post('/product', { title, price: parseFloat(price), description } as IProducts);
            alert('Add product successful');
        } catch (error) {
            alert('Failed to add product');
        }
    };

    return (
        <>
            <h1>Add Product</h1>
            <form className="container pt-3" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title</label>
                    <input
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setTitle(e.target.value); }}
                        value={title}
                        className="form-control"
                        type="text"
                        id="title"
                    />
                    {errors.title && <div className="text-danger">{errors.title}</div>}
                </div>
                <div>
                    <label htmlFor="price">Price</label>
                    <input
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setPrice(e.target.value); }}
                        value={price}
                        className="form-control"
                        type="text"
                        id="price"
                    />
                    {errors.price && <div className="text-danger">{errors.price}</div>}
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <input
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setDescription(e.target.value); }}
                        value={description}
                        className="form-control"
                        type="text"
                        id="description"
                    />
                    {errors.description && <div className="text-danger">{errors.description}</div>}
                </div>
                <button className="btn btn-primary mt-3" type="submit">Add Product</button>
            </form>
        </>
    );
}

export default AddPro;
