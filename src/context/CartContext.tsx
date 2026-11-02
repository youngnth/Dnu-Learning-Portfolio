'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, ProductColor, CartItem } from '@/lib/products';

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, color?: ProductColor, quantity?: number) => void;
  removeItem: (productId: string, colorName: string) => void;
  updateQuantity: (productId: string, colorName: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  couponCode: string;
  discountAmount: number;
  finalTotal: number;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
  toastMessage: string | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = 'perfa_hanoi_cart_v1';

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [couponCode, setCouponCode] = useState<string>('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setItems(parsed);
        }
      }
    } catch {
      // Ignore storage error
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Ignore storage error
    }
  }, [items, isLoaded]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3200);
  };

  const addItem = (product: Product, color?: ProductColor, quantity = 1) => {
    const chosenColor = color || product.colors[0];
    setItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedColor.name === chosenColor.name
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return updated;
      }
      return [...prev, { product, selectedColor: chosenColor, quantity }];
    });
    showToast(`Đã thêm "${product.name}" (${chosenColor.name}) vào giỏ hàng`);
  };

  const removeItem = (productId: string, colorName: string) => {
    setItems((prev) =>
      prev.filter(
        (item) =>
          !(item.product.id === productId && item.selectedColor.name === colorName)
      )
    );
  };

  const updateQuantity = (productId: string, colorName: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId, colorName);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId && item.selectedColor.name === colorName
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    setCouponCode('');
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  let discountAmount = 0;
  if (couponCode === 'PERFAHANOI' && subtotal >= 10000000) {
    discountAmount = 1000000;
  } else if (couponCode === 'GIADINH' && subtotal > 0) {
    discountAmount = Math.round(subtotal * 0.05);
  }

  const finalTotal = Math.max(0, subtotal - discountAmount);

  const applyCoupon = (rawCode: string): { success: boolean; message: string } => {
    const code = rawCode.trim().toUpperCase();
    if (code === 'PERFAHANOI') {
      if (subtotal < 10000000) {
        return {
          success: false,
          message: 'Mã PERFAHANOI áp dụng cho đơn hàng từ 10.000.000₫ trở lên.',
        };
      }
      setCouponCode('PERFAHANOI');
      return {
        success: true,
        message: 'Áp dụng thành công mã PERFAHANOI: Giảm ngay 1.000.000₫ ưu đãi khách hàng Hà Nội!',
      };
    }
    if (code === 'GIADINH') {
      setCouponCode('GIADINH');
      return {
        success: true,
        message: 'Áp dụng thành công mã GIADINH: Giảm 5% tổng giá trị đơn hàng!',
      };
    }
    return {
      success: false,
      message: 'Mã ưu đãi không hợp lệ. Hãy thử mã PERFAHANOI hoặc GIADINH.',
    };
  };

  const removeCoupon = () => {
    setCouponCode('');
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        couponCode,
        discountAmount,
        finalTotal,
        applyCoupon,
        removeCoupon,
        isDrawerOpen,
        setIsDrawerOpen,
        toastMessage,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
