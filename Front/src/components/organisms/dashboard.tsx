import React from "react";
import { useToasts } from "react-toast-notifications";
import { CreateRecord, DeleteRecord, GetRecords, UpdateRecord } from "src/actions/recordActions";
import { Form } from "../molecules/form";
import { Table } from "../molecules/table";

export const Dashboard: React.FC = () => {
  const [records, setRecords] = React.useState<IRecord[] | null>(null);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [selectedRecord, setSelectedRecord] = React.useState<IRecord | null>(null);

  const { addToast } = useToasts();

  React.useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = React.useCallback(() => {
    GetRecords()
      .then((records) => {
        setRecords(records);
      })
      .catch((err) => {
        addToast(err.message, { appearance: "error" });
      });
  }, []);

  const onCloseModal = () => {
    setSelectedRecord(null);
    setIsOpen(false);
  };

  const onOpenModal = () => {
    setSelectedRecord(null);
    setIsOpen(true);
  };

  const onCreateRecord = (data: ICreateRecord) => {
    return CreateRecord(data)
      .then(() => {
        addToast("El registro se ha guardado exitosamente", { appearance: "success" });
        fetchRecords();
        setIsOpen(false);
      })
      .catch((err) => {
        addToast(err.message, { appearance: "error" });
      });
  };

  const onDeleteRecord = (business_id: string) => {
    return DeleteRecord(business_id)
      .then(() => {
        addToast("El registro se ha eliminado exitosamente", { appearance: "success" });
        fetchRecords();
        setIsOpen(false);
      })
      .catch((err) => {
        addToast(err.message, { appearance: "error" });
      });
  };

  const onOpenEditRecord = (record: IRecord) => {
    setSelectedRecord(record);
    setIsOpen(true);
  };

  const onEditRecord = (data: IRecord) => {
    return UpdateRecord(data.business_id, data)
      .then(() => {
        addToast("El registro se ha modificado exitosamente", { appearance: "success" });
        fetchRecords();
        setIsOpen(false);
      })
      .catch((err) => {
        addToast(err.message, { appearance: "error" });
      });
  };

  return records != null ? (
    <div>
      <button onClick={onOpenModal}>Crear registro</button>
      <Form
        open={isOpen}
        selectedRecord={selectedRecord}
        onClose={onCloseModal}
        onCreate={onCreateRecord}
        onEdit={onEditRecord}
      />
      <Table records={records} onDeleteRecord={onDeleteRecord} onEditRecord={onOpenEditRecord} />
    </div>
  ) : (
    <div />
  );
};
