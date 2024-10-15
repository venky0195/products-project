import { notFound } from 'next/navigation';
import Image from 'next/image';
import styles from './page.module.css'; // Adjust the path if necessary

type Product = {
  id: number;
  product: {
    id: number;
    price: number;
    category: string;
    updated_at: string;
    photo_url: string;
    name: string;
    description: string;
    created_at: string;
  };
};

async function getProduct(id: string) {
  const res = await fetch(`https://api.slingacademy.com/v1/sample-data/products/${id}`);
  if (!res.ok) return undefined;
  const product = await res.json();
  return product as Product;
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);

  if (!product) {
    notFound();
  }

  const { name, description, price, category, photo_url, created_at, updated_at } = product.product;

  return (
    <div className={styles.productPage}>
      <div className={styles.productContainer}>
        {/* Product Image */}
        <Image
          src={photo_url}
          alt={name}
          width={800}
          height={600}
          className={styles.productImage}
        />
        {/* Product Details */}
        <div className={styles.productDetails}>
          <h1 className={styles.productName}>{name}</h1>
          <p className={styles.productDescription}>{description}</p>
          <p className={styles.productPrice}>Price: ${price}</p>
          <p className={styles.productCategory}>Category: {category}</p>
          <p className={styles.productDates}>
            <span>Created on: {new Date(created_at).toLocaleDateString()}</span>
            <span> | Updated on: {new Date(updated_at).toLocaleDateString()}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
