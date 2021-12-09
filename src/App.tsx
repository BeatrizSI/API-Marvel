import React from 'react';
import './App.css';
import { CartProvider } from './hooks/CartContext';
import Routes from './routes';


export default function App() {
  return (
    <CartProvider>
      <Routes />
    </CartProvider>
  )
};