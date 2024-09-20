"use client"
import React, { useState} from 'react'

// ikon
import { IoIosSearch } from "react-icons/io";


import Dropdown from '../universal-block/Dropdown/Dropdown'

function MainContainer() {
    const [searchQuery, SetSearchQuery] = useState("")
    const [dataPengeluaran, SetDataPengeluaran] = useState([])

    return (
    <main className="flex flex-col gap-8  items-center sm:items-start w-full 
        mt-10
    ">
        {/* Title */}
        <div className='w-full grid grid-cols-6 grid-rows-2'>
            <h1 className='col-start-1 col-end-3 row-span-1'>
                Halo, Selamat Datang Pengguna
            </h1>
            <div className='col-start-1 col-end-3 row-start-2'>
                <h2>
                    Total Pengeluaran : 
                </h2>
            </div>
            <div className='col-start-3 col-end-5 row-span-2'>
                <h2>Hari ini</h2>
                <p>{Date.now()}</p>
            </div>
        </div>
        {/* Search */}
        <div className='w-full'>
            <div class="w-full">
                <div class="relative border-2 border-gray-300 rounded-lg">
                    <IoIosSearch className='absolute top-[20%] left-[1%] w-8 h-8'/>
                    <input 
                        type="text" 
                        class="bg-white h-14 w-full px-12 rounded-lg focus:outline-none hover:cursor-text" 
                        name="search" 
                        placeholder='Search'
                        value={searchQuery}
                        onChange={(e) => SetSearchQuery(e.target.value)}
                    />
                </div>
            </div>
            <div className='w-full flex flex-row gap-3 flex-wrap mt-2'>
                <Dropdown />
            </div>
        </div>
        {/* Cards */}
        <div className='w-full flex flex-col gap-5'>
            <div className='w-full flex flex-col gap-10'>
                <div className='flex flex-col gap-4'>
                    <div className='flex flex-row justify-between items-center'>
                        <div>
                            <p>September 12, 2023</p>
                            <p>Monday</p>
                        </div>
                        <div>
                            <p>-12,000.00 IDR</p>
                        </div>
                    </div>
                    {/* Show card */}
                    <div className='flex flex-col gap-2'>
                        <div className='border-2 border-black flex flex-row p-4 justify-between items-center hover:cursor-pointer hover:bg-slate-300'>
                            <div className='flex flex-col'>
                                <p>Judul</p> 
                                <div>
                                    kategori
                                </div>
                                <div className=''>
                                    Deskripsi
                                </div>
                            </div>
                            <div>
                                <p>Nominal</p>
                            </div>
                        </div>
                    </div>
                    <div className='border-2 border-black flex flex-row p-4 justify-between items-center hover:cursor-pointer hover:bg-slate-300'>
                        <div className='flex flex-col'>
                            <p>Judul</p> 
                            <div>
                                kategori
                            </div>
                            <div className=''>
                                Deskripsi
                            </div>
                        </div>
                        <div>
                            <p>Nominal</p>
                        </div>
                    </div>
                </div>
                
                <div className='flex flex-col gap-4'>
                    <div className='flex flex-row justify-between items-center'>
                        <div>
                            <p>September 12, 2023</p>
                            <p>Monday</p>
                        </div>
                        <div>
                            <p>-12,000.00 IDR</p>
                        </div>
                    </div>
                    {/* Show card */}
                    <div className='flex flex-col gap-2'>
                        <div className='border-2 border-black flex flex-row p-4 justify-between items-center hover:cursor-pointer hover:bg-slate-300'>
                            <div className='flex flex-col'>
                                <p>Judul</p> 
                                <div>
                                    kategori
                                </div>
                                <div className=''>
                                    Deskripsi
                                </div>
                            </div>
                            <div>
                                <p>Nominal</p>
                            </div>
                        </div>
                        <div className='border-2 border-black flex flex-row p-4 justify-between items-center hover:cursor-pointer hover:bg-slate-300'>
                            <div className='flex flex-col'>
                                <p>Judul</p> 
                                <div>
                                    kategori
                                </div>
                                <div className=''>
                                    Deskripsi
                                </div>
                            </div>
                            <div>
                                <p>Nominal</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
    )
}

export default MainContainer