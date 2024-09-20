"use client"
import React, { createContext, useContext, useState } from 'react';

// ikon 
import { IoCloseSharp } from "react-icons/io5";

// komponen internal
import Dropdown from '@/components/universal-block/Dropdown/Dropdown';
import TextInput from '@/components/universal-block/Input/TextInput';
import EditCreatePopupModal from '@/components/universal-block/Modal/EditModal';

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(true);

    // untuk data
    const [idTerpilih, SetIDTerpilih] = useState(null)

    // untuk form
    const [nama, SetNama] = useState("")
    const [nominal, SetNominal] = useState("")
    const [kategori, SetKategori] = useState("")
    const [tanggal, SetTanggal] = useState("")
    const [jenisPengeluaran, SetJenisPengeluaran] = useState("")

    const showModal = (content) => {
        setIsOpen(true);
    };
    
    const hideModal = () => {
        setIsOpen(false);
    };

    return (
        <ModalContext.Provider value={{ showModal, hideModal, isOpen }}>
            {
                isOpen 
                &&
                <EditCreatePopupModal 
                    SetNama={SetNama}
                    nama={nama}
                    nominal={nominal}
                    isEdit={true}
                    SetNominal={SetNominal}
                    onSubmit={(e) => {
                        e.preventDefault()
                    }}
                    closeModal={hideModal}
                    onDelete={() => {setIsOpen(false)}}
                    isOpen={isOpen}
                />
            }
            {children}
        </ModalContext.Provider>
    );
};

export const useModal = () => {
    return useContext(ModalContext);
};
