import { CartProvider } from '../contexts/cart-context'; // Adjust the import path as necessary

function MyApp({ Component, pageProps }) {
    return (
      <CartProvider>
        <Component {...pageProps} />
      </CartProvider>
    );
  }
  
  export default MyApp;