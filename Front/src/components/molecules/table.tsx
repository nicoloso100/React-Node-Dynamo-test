import React, { useState } from "react";
import { DefaultButton } from "../atoms/defaultButton";

interface ITableProps {
  records: IRecord[];
  onDeleteRecord: (business_id: string) => Promise<void>;
  onEditRecord: (record: IRecord) => void;
}

export const Table: React.FC<ITableProps> = ({ records, onDeleteRecord, onEditRecord }) => {
  const deleteRecord = (id: string) => {
    return onDeleteRecord(id);
  };

  const editRecord = (record: IRecord) => {
    onEditRecord(record);
  };

  return records.length > 0 ? (
    <table>
      <thead>
        <tr>
          <th>Nombre de la empresa</th>
          <th>Dirección</th>
          <th>NIT</th>
          <th>Teléfono</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {records.map((record) => {
          return (
            <tr key={record.business_id}>
              <td>{record.name}</td>
              <td>{record.address}</td>
              <td>{record.nit}</td>
              <td>{record.phone_number}</td>
              <td>
                <DefaultButton text="Eliminar" onClickLoading={() => deleteRecord(record.business_id)} />
                <DefaultButton text="Editar" onClick={() => editRecord(record)} />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  ) : (
    <div>No hay registros</div>
  );
};
