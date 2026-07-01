// import { createContext , useState } from "react";
// import {useEffect} from "react";

// export const CartContext = createContext();

// export function CartProvider({ children }) {
//   const [cart, setCart] = useState(()=>{
//     const savedCart = localStorage.getItem("cart");
//     return savedCart ? JSON.parse(savedCart) : [];
//   });

//   useEffect(()=>{
//     localStorage.setItem("cart", JSON.stringify(cart));
//   }, [cart])

//   const addToCart = (product) => {
//     const existingItem = cart.find((item) => item.id === product.id );
//     if(existingItem){
//       const updatedCart = cart.map((item)=> 
//         item.id === product.id 
//           ? {...item, quantity: item.quantity + 1}
//           : item
//       );
//       setCart(updatedCart);
//     }else{
//       setCart([...cart, {...product,  quantity: 1 }]);
//     }
    
//   };

//   const removeFromCart = (index)=>{
//     const updatedCart = cart.filter((_, i) => i !== index)
//     setCart(updatedCart);
//   }

//   const decreaseQuantity = (index) => {
//     const updatedCart = cart.map((item, i) => {
//       if (i === index) {
//         if (item.quantity === 1) return null;
//         return { ...item, quantity: item.quantity - 1 };
//       }
//       return item;
//     }).filter(Boolean);

//     setCart(updatedCart);
//   };

//   return (
//     <CartContext.Provider value={{ cart, addToCart , removeFromCart , decreaseQuantity }}>
//       {children}
//     </CartContext.Provider>
//   );
// }