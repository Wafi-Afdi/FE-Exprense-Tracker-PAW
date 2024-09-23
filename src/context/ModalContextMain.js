"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

// komponen internal
import EditCreatePopupModal from "@/components/universal-block/Modal/EditModal";
import axios, { formToJSON } from "axios";

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  // untuk data
  const [isEdit, SetIsEdit] = useState(true);

  // Untuk update setelah create/edit/delete
  const onUpdate = useRef();
  const setOnUpdate = (func) => {
    onUpdate.current = func;
  };

  // untuk form
  const defaultFormData = {
    name: "",
    description: "",
    category: "",
    amount: "",
    date: new Date(),
  };
  const [formModal, SetFormModal] = useState(defaultFormData);

  function UbahStateValue(value, key) {
    const copyForm = formModal;
    copyForm[key] = value;
    SetFormModal({ ...copyForm });
  }

  const showModal = (is_edit, form_data = defaultFormData) => {
    //console.log(form_data)
    SetIsEdit(is_edit);
    SetFormModal({
      name: form_data.name,
      description: form_data.description,
      category: form_data.category,
      amount: form_data.amount,
      date: form_data.date,
      _id: form_data._id,
    });
    setIsOpen(true);
  };

  const hideModal = () => {
    setIsOpen(false);
  };

  // integrasi buat delete
  function OnDeleteAPI() {
    axios
      .delete(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/transactions/${formModal._id}`
      )
      .then(() => {
        hideModal();
        onUpdate.current();
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    console.log(formModal);
  }, [formModal]);

  // integrasi buat edit atau buat baru
  function OnSubmitAPI(e) {
    e.preventDefault();
    if (!isEdit) {
      axios
        .post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/transactions`,
          formModal
        )
        .then(() => {
          hideModal();
          onUpdate.current();
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .put(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/transactions/${formModal._id}`,
          formModal
        )
        .then(() => {
          hideModal();
          onUpdate.current();
        })
        .catch((err) => console.log(err));
    }
  }

  return (
    <ModalContext.Provider
      value={{ showModal, hideModal, setOnUpdate, SetFormModal }}
    >
      {isOpen && (
        <EditCreatePopupModal
          isEdit={isEdit}
          onSubmit={OnSubmitAPI}
          closeModal={hideModal}
          onDelete={() => OnDeleteAPI()}
          isOpen={isOpen}
          UbahStateValue={UbahStateValue}
          formData={formModal}
        />
      )}
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  return useContext(ModalContext);
};
