import React from 'react'

// komponen internal
import { useModal } from '@/context/ModalContextMain';

function CardPengeluaran({showModal= ()=>{},judul="Judul", kategori="Kategori", deskripsi="Deskripsi", nominal="10000", id_unik=null}) {
  
  return (
    <div className='flex flex-col gap-2'
        onClick={(e) => showModal(true)}
    >
        <div className='border-2 border-black flex flex-row p-4 justify-between items-center hover:cursor-pointer hover:bg-slate-100 h-[170px]'>
            <div className='flex flex-col justify-start items-start h-full w-full'>
                <p className='font-bold text-black text-xl'>
                  {judul}
                </p> 
                <div className='text-white bg-black px-3 py-1 rounded-full text-md mt-2'>
                    {kategori}
                </div>
                <div className='line-clamp-3 mt-2 basis-1/2 w-full'>
                    {deskripsi}
                </div>
            </div>
            <div>
                <p>{nominal}</p>
            </div>
        </div>
    </div>
  )
}

export default CardPengeluaran