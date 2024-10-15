import Link from 'next/link';
import styles from './productsPage.module.css';

async function getProducts() {
  const res = await fetch(
    'https://api.slingacademy.com/v1/sample-data/products'
  );
  if (!res.ok) throw new Error('Failed to fetch data');
  const data = await res.json();

  return data.products;
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className={styles.productsPage}>
      <h1>Product List</h1>
      <ul className={styles.productList}>
        {products.map((product: { id: number; description: string }) => (
          <li key={product.id}>
            <Link
              href={`/products/${product.id}`}
              className={styles.productLink}
            >
              {product.description}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
