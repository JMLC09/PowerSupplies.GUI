import { useQuery, useQueryClient } from "react-query";
import { createAuthorizedRequest } from "../../axios.js";
import { toast } from "sonner";
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { FileUpload } from "primereact/fileupload";
import { QRCodeSVG } from "qrcode.react";

import { useState } from "react";

interface Inventory {
  id: number;
  partNumber: string;
  name: string;
  description: string;
  stock: number;
  lastEntryDate: string;
  lastBatch: string;
  lastImage: number[];
}

interface Request {
  id: number;
  partNumber: string;
  name: string;
}

const Inventory = () => {
  const [modal, setModal] = useState(false);
  const initialSelectedMaterial = {
    id: 0,
    partNumber: "",
    name: "",
  };
  const [selectedMaterial, setselectedMaterial] = useState<Request>(
    initialSelectedMaterial
  );
  const [quantity, setQuantity] = useState("");
  const [image, setImage] = useState("");
  const makeRequest = createAuthorizedRequest();
  const queryClient = useQueryClient();

  const {
    isLoading: loadingInventory,
    error: errorInventory,
    data: inventory,
  } = useQuery(["inventory"], () =>
    makeRequest.get("/Materials/GetInventory").then((res) => {
      return res.data;
    })
  );

  const {
    isLoading: loadingMaterials,
    error: errorMaterials,
    data: materials,
  } = useQuery(["materials"], () =>
    makeRequest.get("/Materials").then((res) => {
      return res.data;
    })
  );

  const AddMaterial = async () => {
    const { id } = selectedMaterial;
    const data = {
      materialId: id,
      quantity: parseInt(quantity),
      imageFile: image,
    };

    const addMaterialResponse = async () => {
      const formData = new FormData();
      (Object.keys(data) as (keyof typeof data)[]).forEach((key) => {
        formData.append(key, data[key].toString());
      });
      formData.set("imageFile", data.imageFile);
      const respuesta = await makeRequest
        .post("/MaterialEntries", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          return res.data;
        });
      queryClient.invalidateQueries(["inventory"]);
      return respuesta;
    };
    const callFunction = addMaterialResponse();
    toast.promise(callFunction, {
      loading: "Agregando Materiales....",
      error: (e) => `"Error": ${e}`,
      success: () => {
        setModal(false);
        setselectedMaterial(initialSelectedMaterial);
        setQuantity("");
        return "Se han agregado los materiales.";
      },
    });
  };

  const onUpload = (event: any) => {
    const file = event.files[0];
    setImage(file);
  };

  const qrElement = (material: Inventory) => {
    return <QRCodeSVG value={material.lastBatch} size={75} />;
  };

  const imageElement = (material: Inventory) => {
    const base64String = material.lastImage;
    if (!base64String) {
      return <p>No Image</p>;
    }

    return (
      <div className="flex justify-center text-center">
        {base64String ? (
          <img
            src={`data:image/png;base64,${base64String}`}
            alt="imagen"
            className="w-[50px] h-[50px]"
          />
        ) : (
          <p>No Image</p>
        )}
      </div>
    );
  };

  return (
    <div className="flex justify-center w-full h-full text-center">
      <div className="w-[85vw] h-fit rounded-lg mt-40">
        <div className="flex p-2 justify-between items-center mb-2">
          <h1 className="text-2xl font-bold mb-2">Inventario</h1>
          <Button label="Agregar Material" onClick={() => setModal(true)} />
        </div>
        {errorInventory ? (
          "Error"
        ) : loadingInventory ? (
          "Cargando"
        ) : (
          <div className="rounded-lg shadow-md max-h-[60vh] overflow-auto">
            <DataTable
              value={inventory}
              tableStyle={{
                minWidth: "50rem",
              }}
            >
              <Column field="id" header="ID"></Column>
              <Column field="partNumber" header="Num. de Parte"></Column>
              <Column field="name" header="Nombre"></Column>
              <Column field="description" header="Descripcion"></Column>
              <Column field="stock" header="Stock"></Column>
              <Column field="lastEntryDate" header="Ultima Entrada"></Column>
              <Column
                field="lastBatch"
                header="Ultimo Batch"
                body={qrElement}
              ></Column>
              <Column
                field="lastImage"
                header="Imagen Ultima Entrada"
                body={imageElement}
                alignHeader={"center"}
              ></Column>
            </DataTable>
          </div>
        )}
      </div>
      {errorMaterials ? (
        "Error"
      ) : loadingMaterials ? (
        "Cargando"
      ) : (
        <Dialog
          header="Agregar Material"
          visible={modal}
          style={{ width: "50vw" }}
          onHide={() => setModal(false)}
        >
          <form>
            <label>Selecciona un material:</label>
            <Dropdown
              value={selectedMaterial}
              onChange={(e) => setselectedMaterial(e.value)}
              options={materials}
              optionLabel="name"
              placeholder="Seleciona un Material"
              className="w-full mb-5"
            />
            <label className="mr-2">Cantidad:</label>
            <InputText
              className="w-full mb-2"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
            <div className="flex mb-2 items-center">
              <label className="mr-5">Imagen de Material</label>
              <FileUpload
                mode="basic"
                name="demo[]"
                accept="image/*"
                maxFileSize={1000000}
                customUpload
                uploadHandler={onUpload}
                chooseLabel="Seleccionar Imagen"
              />
            </div>
            <div className="flex justify-end">
              <Button
                label="Agregar Material"
                onClick={(e) => {
                  e.preventDefault();
                  AddMaterial();
                }}
              />
            </div>
          </form>
        </Dialog>
      )}
    </div>
  );
};

export default Inventory;
