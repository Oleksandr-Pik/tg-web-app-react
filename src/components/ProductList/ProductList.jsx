import React, { useCallback, useEffect, useState } from "react";
import ProductItem from "../ProductItem/ProductItem";
import { useTelegram } from "../../hooks/useTelegram";
import "./ProductList.css";

const products = [
  {
    id: "1",
    title: "Джинси",
    price: 5000,
    description: "Синього кольору, прямі",
  },
  {
    id: "2",
    title: "Куртка",
    price: 12000,
    description: "Зеленого кольору, тепла",
  },
  {
    id: "3",
    title: "Джинси 2",
    price: 5000,
    description: "Синього кольору, прямі",
  },
  {
    id: "4",
    title: "Куртка 8",
    price: 122,
    description: "Зеленого кольору, тепла",
  },
  {
    id: "5",
    title: "Джинси 3",
    price: 5000,
    description: "Синього кольору, прямі",
  },
  {
    id: "6",
    title: "Куртка 7",
    price: 600,
    description: "Зеленого кольору, тепла",
  },
  {
    id: "7",
    title: "Джинси 4",
    price: 5500,
    description: "Синього кольору, прямі",
  },
  {
    id: "8",
    title: "Куртка 5",
    price: 12000,
    description: "Зеленого кольору, тепла",
  },
];

const getTotalPrice = (items = []) => {
  return items.reduce((acc, item) => {
    return (acc += item.price);
  }, 0);
};

const ProductList = () => {
  const [addedItems, setAddedItems] = useState([]);
  const { tg, queryId } = useTelegram();

  const onSendData = useCallback(() => {
    const data = {
      products: addedItems,
      totalPrice: getTotalPrice(addedItems),
      queryId,
    };
    fetch("http://85.119.146.179:8000/web-data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }, [addedItems]);

  useEffect(() => {
    tg.onEvent("mainButtonClicked", onSendData);
    return () => {
      tg.offEvent("mainButtonClicked", onSendData);
    };
  }, [onSendData]);

  const onAdd = (product) => {
    const alreadyAdded = addedItems.find((item) => item.id === product.id);
    let newItems = [];

    if (alreadyAdded) {
      newItems = addedItems.filter((item) => item.id !== product.id);
    } else {
      newItems = [...addedItems, product];
    }

    setAddedItems(newItems);

    if (newItems.length === 0) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
      tg.MainButton.setParams({
        text: `Купити ${getTotalPrice(newItems)}`,
      });
    }
  };

  return (
    <div className={"list"}>
      {products.map((item) => (
        <ProductItem product={item} onAdd={onAdd} className={"item"} />
      ))}
    </div>
  );
};

export default ProductList;
