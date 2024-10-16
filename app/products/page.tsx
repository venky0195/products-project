import Link from 'next/link';
import styles from './productsPage.module.css';
import productData from '../../products.json';

function getProducts() {
  return productData.slice(0, 10);
}

export default function ProductsPage() {
  const products = getProducts();

  return (
    <div className={styles.productsPage}>
      <h1>Product List</h1>
      <ul className={styles.productList}>
        {products.map((product) => (
          <li key={product.id}>
            <Link
              href={`/products/${product.id}`}
              className={styles.productLink}
            >
              {product.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
