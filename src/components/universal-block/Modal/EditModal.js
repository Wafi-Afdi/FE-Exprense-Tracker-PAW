"use client";
import React, { forwardRef } from "react";

// ikon
import { IoCloseSharp } from "react-icons/io5";

// komponen eksternal
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// komponen internal
import Dropdown from '@/components/universal-block/Dropdown/Dropdown';
import DropdownTypable from '../Dropdown/DropdownTypable';
import TextInput from '@/components/universal-block/Input/TextInput';
import CalendarContainer from './OverlayPortal';

function EditCreatePopupModal({
  closeModal = () => {},
  onSubmit = () => {},
  onDelete = () => {},
  isEdit = false,
  UbahStateValue,
  formData,
  opsiDropdown=[]
}) {
    
    return (
    
        <div className='fixed inset-0 w-full h-full
            bg-slate-300 z-[120] bg-opacity-25 backdrop-blur-sm
            text-xl
            flex justify-center items-center
        '
        >
            <div className='flex flex-col 
                p-5 bg-white min-w-[600px]
                border-2 border-black rounded-lg
            '>
                <div className='flex flex-row justify-between items-center'>
                    <div className='text-2xl font-bold'>
                        {isEdit ? "Edit" : "Buat"}
                    </div>
                    <button id='close' name='close' 
                    className='aspect-square rounded-full bg-red-500 p-2'
                    type='button'
                    onClick={(e) => closeModal()}
                    >
                        <IoCloseSharp className='w-4 h-4 text-white'/>
                    </button>
                </div>
                <form className='flex flex-col gap-4 mt-3'
                onSubmit={onSubmit}
                >
                    <div>
                        <p className='text-sm'>Nama</p>
                        <div className='mt-1'/>
                        <TextInput 
                            callback={(data) => UbahStateValue(data, 'name')}
                            inputID={"nama"}
                            placeholder='Nama'
                            value={formData.name}
                            className={'w-full max-w-[250px]'}
                        />
                    </div>
                    <div>
                        <p className='text-sm'>Nominal</p>
                        <div className='mt-1'/>
                        <TextInput 
                            callback={(data) => UbahStateValue(data, 'amount')}
                            inputID={"amount"}
                            placeholder='Nominal'
                            value={formData.amount}
                            className={'w-full max-w-[250px]'}
                        />
                    </div>
                    <div>
                        <p className='text-sm'>Deskripsi</p>
                        <div className='mt-1'/>
                        <TextInput 
                            callback={(data) => UbahStateValue(data, 'description')}
                            inputID={"deskripsi"}
                            placeholder='Deskripsi'
                            value={formData.description}
                            className={'w-full max-w-[250px]'}
                            type="textarea"
                        />
                    </div>
                    <div>
                        <p className='text-sm'>Kategori</p>
                        <div className='mt-1'/>
                        <DropdownTypable 
                            callback={(data) => UbahStateValue(data, 'category')}
                            value={formData.category}
                            name='kategori'
                            options={opsiDropdown}
                        />
                    </div>
                    <div>
                        <p className='text-sm'>Tanggal</p>
                        <div className='mt-1'/>
                        <DatePicker 
                            selected={new Date(formData.date)} 
                            onChange={(date) => UbahStateValue(date, 'date')} 
                            className='"bg-white p-2 border-2 border-black text-sm rounded-lg relative"'
                            popperClassName="z-[200]"
                            popperProps={{strategy: 'fixed'}} 
                            placeholderText='pilih tanggal'
                            showTimeSelect
                            dateFormat="MMMM d, yyyy hh:mm a"
                            CalendarContainer={CalendarContainer}
                        />
                    </div>
                    {/* Button */}
                    <div className='w-full flex flex-wrap gap-2 mt-2'>
                        <button className='p-2 rounded-md bg-green-600 text-gray-100 text-md'
                            name='save'
                            id='save'
                            type='submit'
                        >
                            Simpan
                        </button>
                        {
                            isEdit &&
                            <button className='p-2 rounded-md bg-red-600 text-gray-100 text-md'
                                name='delete'
                                id='delete'
                                type='button'
                                onClick={(e) => onDelete()}
                            >
                                Delete
                            </button>
                        }
                        
                    </div>
                </form>
            </div>
        
      </div>
  );
}

export default EditCreatePopupModal;
