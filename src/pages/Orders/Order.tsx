import { useState } from "react";
import { DataTable } from "primereact/datatable";
import { createAuthorizedRequest } from "../../axios.js";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import OrderDetailsContent from "../../components/OrderDetailsContent/OrderDetailsContent.js";

interface Order {
  id: number;
  orderDate: string;
  total: number;
}

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

const Order = () => {
  const initialOrderDetails = [
    {
      id: 0,
      orderId: 0,
      product: null,
      productId: 0,
      quantity: 0,
    },
  ];
  const makeRequest = createAuthorizedRequest();
  const [showDetails, setshowDetails] = useState(false);
  const [selectedOrder, setSelectedOrder] =
    useState<OrderDetails[]>(initialOrderDetails);

  const {
    isLoading: loadingOrders,
    error: errorOrders,
    data: Orders,
  } = useQuery(["materials"], () =>
    makeRequest.get("/Orders").then((res) => {
      return res.data;
    })
  );

  const renderViewDetails = (order: Order) => {
    return <Button label="Ver Detalles" onClick={() => buttonEvent(order)} />;
  };

  async function buttonEvent(order: Order) {
    const result = await makeRequest.get(`/OrderDetails/${order.id}`);
    const orderDetails: OrderDetails[] = result.data;
    setshowDetails(true);
    setSelectedOrder(orderDetails);
  }
  return (
    <>
      <div className="w-full s-full flex justify-center items-center mt-16 flex-col text-center">
        <h1 className="text-6xl font-bold mb-5">ORDENES</h1>
        {errorOrders ? (
          "Error en Ordenes"
        ) : loadingOrders ? (
          "Cargando"
        ) : (
          <div className="rounded-lg overflow-auto">
            <DataTable
              value={Orders}
              tableStyle={{
                minWidth: "50rem",
                minHeight: "30rem",
              }}
              paginator
              rows={5}
            >
              <Column field="id" header="ID"></Column>
              <Column field="orderDate" header="Fecha de Orden"></Column>
              <Column field="total" header="Total $"></Column>
              <Column header="Ver detalles" body={renderViewDetails}></Column>
            </DataTable>
          </div>
        )}
        <div className="mt-2 flex justify-center">
          <Button className="bg-green-300 text-black border-none">
            <Link className="" to="/makeOrder">
              Realizar Orden
            </Link>
          </Button>
        </div>
      </div>
      {showDetails && (
        <Dialog
          header="Detalles de Orden"
          headerStyle={{ textAlign: "center" }}
          visible={showDetails}
          style={{ width: "40vw" }}
          onHide={() => setshowDetails(false)}
        >
          <OrderDetailsContent orderDetails={selectedOrder} />
        </Dialog>
      )}
    </>
  );
};

export default Order;
