import React, { useEffect, useState } from "react";

interface OrderDetails {
  id: number;
  orderId: number;
  product: Product | null;
  productId: number;
  quantity: number;
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

interface OrderDetailsContentProps {
  orderDetails: OrderDetails[];
}

const OrderDetailsContent: React.FC<OrderDetailsContentProps> = ({
  orderDetails,
}) => {
  const initialOrderDetails = [
    {
      id: 0,
      orderId: 0,
      product: null,
      productId: 0,
      quantity: 0,
    },
  ];
  const [details, setDetails] = useState<OrderDetails[]>(initialOrderDetails);

  useEffect(() => {
    setDetails(orderDetails);
    console.log(orderDetails);
  }, [details]);

  return (
    <div>
      {details.map((orderDetail, index) => (
        <div
          className="text-center w-full rounded-md bg-stone-200"
          key={orderDetail.id}
        >
          <h1 className="font-bold">{`Producto #${index + 1}`}</h1>
          {orderDetail.product && (
            <div>
              <span>Producto: {orderDetail.product.name}</span>
              <br />
              <span>Descripcion: {orderDetail.product.description}</span>
              <br />
              <span>Precio: {orderDetail.product.price}</span>
              <br />
            </div>
          )}
          <span>Cantidad: {orderDetail.quantity}</span>
          <br />
          <hr />
        </div>
      ))}
    </div>
  );
};

export default OrderDetailsContent;
