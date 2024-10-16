import { notFound } from 'next/navigation';
import Image from 'next/image';
import styles from './page.module.css';
import productData from '../../../products.json';

function getProduct(id: string) {
  const product = productData.find((p) => p.id === parseInt(id, 10));
  return product ? { product } : undefined;
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const productWrapper = getProduct(params.id);

  if (!productWrapper) {
    notFound();
  }

  const {
    name,
    image: photo_url,
    discount_price: price,
    link,
  } = productWrapper.product;

  return (
    <div className={styles.productPage}>
      <div className={styles.productContainer}>
        <div className={styles.imageContainer}>
          <Image
            src={photo_url}
            alt={name}
            width={600}
            height={400}
            className={styles.productImage}
          />
        </div>
        <div className={styles.productDetails}>
          <h1 className={styles.productName}>{name}</h1>
          <p className={styles.productPrice}>Price: {price}</p>
          <a
            href={link}
            target='_blank'
            rel='noreferrer'
            className={styles.buyButton}
          >
            Buy Now
          </a>
        </div>
      </div>
    </div>
  );
}
