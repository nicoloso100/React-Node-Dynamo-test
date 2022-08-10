import React from "react";
import { useForm } from "react-hook-form";
import HyperModal from "react-hyper-modal";
import { DefaultButton } from "../atoms/defaultButton";
import { FormContainer, FormStyles } from "./styles";

interface IFormProps {
  open: boolean;
  selectedRecord: IRecord | null;
  onClose: () => void;
  onCreate: (data: ICreateRecord) => Promise<void>;
  onEdit: (data: IRecord) => Promise<void>;
}

type FormData = {
  name: string;
  address: string;
  nit: string;
  phone_number: string;
};

export const Form: React.FC<IFormProps> = ({ open, selectedRecord, onClose, onCreate, onEdit }) => {
  console.log(selectedRecord);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  React.useEffect(() => {
    if (selectedRecord != null) {
      setValue("name", selectedRecord.name);
      setValue("address", selectedRecord.address);
      setValue("nit", selectedRecord.nit);
      setValue("phone_number", selectedRecord.phone_number);
    }
  }, [selectedRecord]);

  const onSubmit = handleSubmit((data: FormData) => {
    const params: ICreateRecord = {
      name: data.name,
      address: data.address,
      nit: data.nit,
      phone_number: data.phone_number,
    };
    if (selectedRecord != null) {
      const editedRecord: IRecord = { ...params, business_id: selectedRecord.business_id };
      return onEdit(editedRecord);
    } else {
      return onCreate(params);
    }
  });

  const getButtonText = React.useMemo(() => {
    return selectedRecord != null ? "Editar" : "Guardar";
  }, [selectedRecord]);

  return (
    <HyperModal
      isOpen={open}
      requestClose={onClose}
      children={
        <FormContainer>
          <FormStyles>
            <input placeholder="Nombre" {...register("name", { required: true })} />
            {errors.name && <span>This field is required</span>}
            <br />
            <input placeholder="Dirección" {...register("address", { required: true })} />
            {errors.address && <span>This field is required</span>}
            <br />
            <input placeholder="NIT" {...register("nit", { required: true })} />
            {errors.nit && <span>This field is required</span>}
            <br />
            <input placeholder="Teléfono" {...register("phone_number", { required: true })} />
            {errors.phone_number && <span>This field is required</span>}
            <br />
            <DefaultButton text={getButtonText} onClickLoading={onSubmit} />
          </FormStyles>
        </FormContainer>
      }
    />
  );
};
