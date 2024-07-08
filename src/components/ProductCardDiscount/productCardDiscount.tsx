/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { themeClass } from '../../utils/themeClass';
import { ThemeContext } from '../ThemeProvider/ThemeProvider';
import './productCardDiscount.scss';
import { Link } from 'react-router-dom';
import LikedLight from '../../images/LikedLight.svg';
import LikedDark from '../../images/LikedDark.svg';
import { Product } from '../../types/Product';
import classNames from 'classnames';
import { LikedContext } from '../LikedProvider/LikedProvider';
import LikedRed from '../../images/LikedRed.svg';
import { CartContext } from '../CartProvider/CartProvider';

type Params = {
  product: Product;
};

export const ProductCardDicount: React.FC<Params> = ({ product }) => {
  const { light } = useContext(ThemeContext);
  const getClassName = themeClass(light);
  const { liked, setLiked } = useContext(LikedContext);
  const [isLiked, setIsLiked] = useState(liked.includes(product));
  const { cart, setCart } = useContext(CartContext);
  const [isInCart, setIsInCart] = useState(cart.includes(product));
  const link = `/${product.category}/${product.itemId}`;

  const handleLikedButtonClick = () => {
    if (liked.includes(product)) {
      setLiked(liked.filter(item => item !== product));
    } else {
      setLiked([...liked, product]);
    }
  };

  const handleAddToCart = () => {
    if (cart.includes(product)) {
      setCart(cart.filter(item => item !== product));
    } else {
      setCart([...cart, product]);
    }
  };

  useEffect(() => {
    setIsLiked(liked.includes(product));
  }, [liked]);

  useEffect(() => {
    setIsInCart(cart.includes(product));
  }, [cart]);

  return (
    <div className={getClassName('product-card')}>
      <img
        src={product.image}
        alt={product.name}
        className={classNames('product-card-pic', {
          'watch-pic': product.category === 'accessories',
        })}
      />

      <Link to={link} className="link">
        <p className={getClassName('product-card-name')}>{product.name}</p>
      </Link>
      <div className={getClassName('product-card-pricebox')}>
        <p className={getClassName('product-card-pricebox-final-price')}>
          {`$${product.price}`}
        </p>

        <p className={getClassName('product-card-pricebox-full-price')}>
          {`$${product.fullPrice}`}
        </p>
      </div>
      <div className="product-card-stats">
        <div className="product-card-stats-box">
          <p className={getClassName('product-card-stats-box-name')}>Screen</p>

          <p className={getClassName('product-card-stats-box-value')}>
            {product.screen}
          </p>
        </div>

        <div className="product-card-stats-box">
          <p className={getClassName('product-card-stats-box-name')}>
            Capacity
          </p>

          <p className={getClassName('product-card-stats-box-value')}>
            {product.capacity}
          </p>
        </div>
        <div className="product-card-stats-box">
          <p className={getClassName('product-card-stats-box-name')}>RAM</p>

          <p className={getClassName('product-card-stats-box-value')}>
            {product.ram}
          </p>
        </div>
      </div>

      <div className="button">
        <button
          className={getClassName(
            classNames('button-add-cart', { added: isInCart }),
          )}
          onClick={handleAddToCart}
        >
          {isInCart ? 'Added to cart' : 'Add to cart'}
        </button>

        <button
          className={getClassName('button-add-liked')}
          onClick={handleLikedButtonClick}
        >
          {isLiked ? (
            <img src={LikedRed} alt="Liked" />
          ) : light ? (
            <img src={LikedLight} alt="Liked" />
          ) : (
            <img src={LikedDark} alt="Liked" />
          )}
        </button>
      </div>
    </div>
  );
};
