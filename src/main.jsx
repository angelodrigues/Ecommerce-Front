import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import './index.css';
import Main from "./layout/main";
import { AuthProvider } from "./authCheck/AuthContext";
import { CartProvider } from "./service/CartContext";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <CartProvider>
        <Main />
      </CartProvider>
    </AuthProvider>
  </StrictMode>
);