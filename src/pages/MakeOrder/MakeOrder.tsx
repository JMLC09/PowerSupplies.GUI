import { createAuthorizedRequest } from "../../axios.js";
import { useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { useQuery, useQueryClient } from "react-query";
import { Button } from "primereact/button";
import { toast } from "sonner";
import {
  InputNumber,
  InputNumberValueChangeEvent,
} from "primereact/inputnumber";

interface Product {
  id: number;
  name: string;
  description: string;
  price: {
    isNull: boolean;
    value: number;
  };
}

interface OrderProduct {
  productId: number;
  quantity: number;
}

const Order = () => {
  const makeRequest = createAuthorizedRequest();
  const queryClient = useQueryClient();
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(
    undefined
  );
  const [orderProducts, setOrderProducts] = useState<OrderProduct[]>([]);

  function productToOrder() {
    if (selectedProduct) {
      const product = orderProducts.find((product) => {
        return product.productId === selectedProduct.id;
      });
      if (product) {
        toast.error("El producto ya esta en la orden.");
        return;
      }
      const orderProduct = { productId: selectedProduct.id, quantity: 1 };
      setOrderProducts([...orderProducts, orderProduct]);
      setSelectedProduct(undefined);
    } else toast.error("Selecciona un producto");
  }

  async function makeOrder() {
    const requestBody = { products: orderProducts };
    const makeMaterialResponse = async () => {
      const respuesta = await makeRequest
        .post("/Orders", requestBody)
        .then((res) => {
          return res.data;
        });
      queryClient.invalidateQueries(["materials"]);
      return respuesta;
    };
    const callFunction = makeMaterialResponse();
    toast.promise(callFunction, {
      loading: "Realizando Orden....",
      error: (e) => `Error: ${e}`,
      success: (e) => {
        if (e.success === false) {
          toast.dismiss();
          return toast.error(`${e.message}`);
        }
        setOrderProducts([]);
        setSelectedProduct(undefined);
        return "Se ha realizado la orden";
      },
    });
  }

  const handleQuantityEvent = (
    e: InputNumberValueChangeEvent,
    index: number
  ) => {
    const newOrderProducts = [...orderProducts];
    if (typeof e.value === "number") {
      newOrderProducts[index].quantity = e.value;
      setOrderProducts(newOrderProducts);
    } else toast.error("Invalid quantity value!");
  };

  const renderProductOrderCard = (product: OrderProduct, index: number) => {
    const productDetails = Products.find((p: Product) => {
      return p.id === product.productId;
    });
    return (
      <div
        className="p-col-12 p-md-3 flex justify-between items-center rounded-md shadow-lg bg-gray-300"
        key={index}
      >
        <div className="p-2">
          <div className="product-name">Producto: {productDetails?.name}</div>
          <div className="product-description">
            {productDetails?.description}
          </div>
          <div className="product-price">{productDetails?.price.value}$</div>
        </div>
        <div className="px-2">
          <label className="p-2">Cantidad:</label>
          <InputNumber
            value={product.quantity}
            onValueChange={(e: InputNumberValueChangeEvent) => {
              handleQuantityEvent(e, index);
            }}
            showButtons
          />
        </div>
      </div>
    );
  };
  const {
    isLoading: loadingProducts,
    error: errorProducts,
    data: Products,
  } = useQuery(["products"], () =>
    makeRequest.get("/Products").then((res) => {
      return res.data;
    })
  );
  return (
    <div className="flex justify-center w-full h-full text-center">
      <div className="w-[85vw] h-fit rounded-lg mt-10">
        <div className="flex p-2 items-center justify-center mb-2">
          <h1 className="text-2xl font-bold mb-2">Ordenes</h1>
        </div>
        {errorProducts ? (
          "Error"
        ) : loadingProducts ? (
          "Cargando"
        ) : (
          <div className="rounded-lg h-screen max-h-[770px] ">
            <form>
              <div className="w-full">
                <label className="text-xl">Selecciona un Producto:</label>
                <div className="flex items-center justify-between">
                  <Dropdown
                    value={selectedProduct}
                    onChange={(e) => {
                      const product: Product = e.value;
                      setSelectedProduct(product);
                    }}
                    options={Products}
                    optionLabel="name"
                    placeholder="Seleciona un Producto"
                    className="w-full"
                  />
                  <Button
                    label="Agregar Producto a Carrito"
                    onClick={(e) => {
                      e.preventDefault();
                      productToOrder();
                    }}
                    className="ml-2"
                  />
                </div>
              </div>
            </form>
            <div className="mt-10 h-[550px] max-h-[550px]">
              {orderProducts.length > 0 && (
                <>
                  <h3 className="text-lg mb-2">ORDEN ACTUAL</h3>
                  {orderProducts.map((product, index) =>
                    renderProductOrderCard(product, index)
                  )}
                </>
              )}
            </div>
            {orderProducts.length > 0 && (
              <div className="w-full flex items-center justify-end">
                <Button
                  label="Realizar Orden"
                  onClick={makeOrder}
                  className="mt-4 mr-5 bg-red-700"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Order;
