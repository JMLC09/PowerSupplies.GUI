import { useState } from "react";
import { DataTable } from "primereact/datatable";
import { createAuthorizedRequest } from "../../axios.js";
import { useQuery, useQueryClient } from "react-query";
import { Link } from "react-router-dom";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import OrderDetailsContent from "../../components/OrderDetailsContent/OrderDetailsContent.js";
import { toast } from "sonner";

interface Order {
  id: number;
  orderDate: string;
  total: number;
  orderStatus: OrderStatus | null;
  orderStatusId: number;
}

interface OrderStatus {
  id: number;
  name: string;
  nextStatusId: number;
  action: string;
  actionGifLink: string;
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
  price: Price | null;
}

interface Price {
  isnull: boolean;
  value: number;
}

interface ChangeOrderStatusResponse {
  id: number;
  message: string;
  success: boolean;
  errors: string[];
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
  const queryClient = useQueryClient();
  const makeRequest = createAuthorizedRequest();
  const [showDetails, setshowDetails] = useState(false);
  const [showOrderAnimation, setshowOrderAnimation] = useState(false);
  const [animation, setAnimation] = useState("");
  const [selectedOrder, setSelectedOrder] =
    useState<OrderDetails[]>(initialOrderDetails);

  const {
    isLoading: loadingOrders,
    error: errorOrders,
    data: Orders,
  } = useQuery(["orders"], () =>
    makeRequest.get("/Orders").then((res) => {
      return res.data;
    })
  );

  const renderStatusOrder = (order: Order) => {
    return <span>{order.orderStatus?.name}</span>;
  };

  const handleOrderStatusChange = async (order: Order) => {
    const requestBody = {
      orderId: order.id,
      orderStatusId: order.orderStatus?.nextStatusId,
    };

    try {
      const response: ChangeOrderStatusResponse = await makeRequest
        .post("Orders/ChangeStatus", requestBody)
        .then((res) => res.data);
      console.log(response);
      if (response.success === true) {
        setAnimation(order.orderStatus?.actionGifLink!);
        setshowOrderAnimation(true);
        setTimeout(() => {
          setshowOrderAnimation(false);
          queryClient.invalidateQueries("orders");
          toast.success("Status de Orden Cambiado");
        }, 12000);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error al cambiar el status de la orden");
    }
  };

  const renderAcciones = (order: Order) => {
    const { action } = order.orderStatus!;
    return (
      <div className="flex items-center justify-center space-x-5">
        {action !== null && (
          <Button
            label={action}
            className="bg-green-300 text-black border-none"
            onClick={() => handleOrderStatusChange(order)}
          />
        )}
        <Button label="Ver Detalles" onClick={() => buttonEvent(order)} />
      </div>
    );
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
                minWidth: "70rem",
                minHeight: "30rem",
              }}
              paginator
              rows={5}
            >
              <Column field="id" header="ID"></Column>
              <Column field="orderDate" header="Fecha de Orden"></Column>
              <Column field="total" header="Total $"></Column>
              <Column
                field="status"
                header="Status"
                body={renderStatusOrder}
              ></Column>
              <Column
                header="Acciones"
                body={renderAcciones}
                alignHeader={"center"}
              ></Column>
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
      {showOrderAnimation && (
        <Dialog
          header="Cambiando Status.."
          headerStyle={{ textAlign: "center" }}
          visible={showOrderAnimation}
          style={{ width: "40vw" }}
          onHide={() => setshowOrderAnimation(false)}
          closable={false}
        >
          <div className="w-full h-full flex items-center justify-center">
            <img src={animation} />
          </div>
        </Dialog>
      )}
    </>
  );
};

export default Order;
