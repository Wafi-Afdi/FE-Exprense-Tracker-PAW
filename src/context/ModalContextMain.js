"use client"
import React, { createContext, useContext, useEffect, useState } from 'react';

// ikon 
import { IoCloseSharp } from "react-icons/io5";

// komponen internal
import Dropdown from '@/components/universal-block/Dropdown/Dropdown';
import TextInput from '@/components/universal-block/Input/TextInput';
import EditCreatePopupModal from '@/components/universal-block/Modal/EditModal';

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    // untuk data
    const [idTerpilih, SetIDTerpilih] = useState(null) // id mongo
    const [isEdit, SetIsEdit] = useState(true)

    // untuk form
    const [formModal, SetFormModal] = useState({
        nama : "",
        nominal : "",
        kategori : "",
        tanggal : new Date(),
        jenisPengeluaran : "Income"
    })

    function UbahStateValue (value, key) {
        const copyForm = formModal
        copyForm[key] = value
        SetFormModal({...copyForm})
    }

    const showModal = (is_edit, id_unik=null) => {
        SetIsEdit(is_edit)
        if(id_unik) {
            SetIDTerpilih(id_unik)
            // baru fetch disini form nya
        }
        
        setIsOpen(true);
    };
    
    const hideModal = () => {
        setIsOpen(false);
    };

    // integrasi buat delete
    function OnDeleteAPI() {
        // TODO Ananta untuk delete berdasarkan id 
        setIsOpen(false)
    }

    // integrasi buat edit atau buat baru
    function OnSubmitAPI(e) {
        // TODO Ananta untuk save / submit baru di cek dulu
        e.preventDefault()
    }

    return (
        <ModalContext.Provider value={{ showModal, hideModal, SetIDTerpilih, showModal }}>
            {
                isOpen 
                &&
                <EditCreatePopupModal 
                    isEdit={isEdit}
                    onSubmit={OnSubmitAPI}
                    closeModal={hideModal}
                    onDelete={() => OnDeleteAPI()}
                    isOpen={isOpen}
                    UbahStateValue={UbahStateValue}
                    formData={formModal}
                />
            }
            {children}
        </ModalContext.Provider>
    );
};

export const useModal = () => {
    return useContext(ModalContext);
};
