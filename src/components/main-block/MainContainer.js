"use client";
import React, { useState, useMemo, useEffect } from "react";

// ikon
import { IoIosSearch } from "react-icons/io";
import { IoIosAddCircleOutline } from "react-icons/io";

import DatePicker from "react-datepicker";
import moment from "moment-timezone";

// komponen internal
import { useModal } from "@/context/ModalContextMain";
import CardPengeluaran from "../universal-block/Card/CardPengeluaran";
import Dropdown from "../universal-block/Dropdown/Dropdown";
import axios from "axios";
import DropdownTypable from "../universal-block/Dropdown/DropdownTypable";
import TextInput from '@/components/universal-block/Input/TextInput';


function MainContainer() {
  const [searchQuery, SetSearchQuery] = useState("");
  const [fetched, setFetched] = useState(false);
  const [dataPengeluaran, SetDataPengeluaran] = useState([]);
  const modalContext = useModal();

  useEffect(() => {
    if (fetched) return;
    const update = () => {
      axios
        .get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/transactions`)
        .then((res) => {
          SetDataPengeluaran(res.data.data);
          setFetched(true);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    update();
    modalContext.setOnUpdate(update);
  });

  // filter
  const [filter, SetFilter] = useState({
    category: "",
    startDate : null,
    endDate : null,
    minAmount : null,
    maxAmount : null,
  });


  useEffect(() => {
    // Kalo mau update fetch filter disini
  }, [filter])
  const UbahFilterValue = (value, key) =>
    SetFilter((filter) => ({ ...filter, [key]: value }));

  const UbahTanggal = (value) =>
    SetFilter((filter) => ({ ...filter, 
        ['startDate']: moment(value).startOf('month').toDate(),
        ['endDate']: moment(value).endOf('month').toDate()
      })
    );

  // Kalkulasi total semua pengeluaran
  const totalPengeluaran = useMemo(
    () => dataPengeluaran.reduce((sum, item) => sum + item.amount, 0),
    [dataPengeluaran]
  );

  // Filter data berdasarkan search & filter
  const filteredData = useMemo(
    () =>
      dataPengeluaran
        // search filter
        .filter((data) =>
          searchQuery
            .split(/\s+/)
            .every((searchWord) =>
              `${data.name} ${data.description}`
                .toLowerCase()
                .includes(searchWord.toLowerCase())
            )
        )
        // date filter
        .filter(
          (data) =>
            !filter.startDate ||
            (new Date(data.date).getFullYear() === filter.startDate.getFullYear() &&
              new Date(data.date).getMonth() === filter.startDate.getMonth())
        )
        // category filter
        .filter(
          (data) => !filter.category || data.category === filter.category
        ),
    [dataPengeluaran, searchQuery, filter]
  );
  const totalPengeluaranFiltered = useMemo(
    () => filteredData.reduce((sum, item) => sum + item.amount, 0),
    [filteredData]
  );

  // Grup data pengeluaran berdasarkan harinya
  const groupedData = useMemo(
    () =>
      filteredData
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .reduce((groups, current) => {
          const date = moment.tz(current.date, "Asia/Jakarta");
          const formattedDate = date.format("MMMM D, YYYY");
          if (!groups[formattedDate]) {
            groups[formattedDate] = { items: [], total: 0 };
          }
          groups[formattedDate].items.push(current);
          groups[formattedDate].total += current.amount;
          return groups;
        }, {}),
    [filteredData]
  );

  function SubmitSearch(e) {
    e.preventDefault();
    const searchQuery = Object.fromEntries(new FormData(e.target)).search;
    SetSearchQuery(searchQuery);

    // Seharusnya disini filter juga 
  }

  return (
    <main className="flex flex-col gap-8  items-center sm:items-start w-full mt-10 z-[1] relative">
      {/* Title */}
      <div className="w-full grid grid-cols-6 grid-rows-2">
        <h1 className="col-start-1 col-end-3 row-span-1">
          Halo, Selamat Datang Pengguna
        </h1>
        <div className="col-start-1 col-end-3 row-start-2">
          <h2>Total Pengeluaran : {totalPengeluaran}</h2>
        </div>
        <div className="col-start-3 col-end-5 row-span-2">
          <h2>Hari ini</h2>
          <p>{moment().format("DD MMMM YYYY")}</p>
        </div>
      </div>
      {/* Search */}
      <div className="w-full">
        <div className="w-full">
          <div className="relative border-2 border-gray-300 rounded-lg">
            <form onSubmit={SubmitSearch}>
              <button type="submit" id="search_submit" name="search_submit">
                <IoIosSearch className="absolute top-[20%] left-[1%] w-8 h-8" />
              </button>
              <input
                type="text"
                className="bg-white h-14 w-full px-12 rounded-lg focus:outline-none hover:cursor-text"
                name="search"
                placeholder="Search"
              />
            </form>
          </div>
        </div>
        <div className="w-full flex flex-row gap-3 flex-wrap mt-2">
          <DropdownTypable 
            callback={(data) => UbahFilterValue(data, 'category')}
            value={filter.category}
            name='kategori'
            className={'w-[200px]'}
            
          />
          <DatePicker
            className="bg-white p-2 border-2 border-black text-sm rounded-lg relative"
            popperClassName="z-[200]"
            popperProps={{ strategy: "fixed" }}
            placeholderText="pilih bulan"
            showMonthYearPicker
            dateFormat="MMMM yyyy"
            selected={filter.startDate}
            onChange={(date) => UbahTanggal(date)}
          />
          <TextInput 
            callback={(data) => UbahFilterValue(data, 'maxAmount')}
            inputID={"nominal_maksimum"}
            placeholder='Nominal Maksimum'
            value={filter.maxAmount}
            className={'w-full max-w-[250px]'}
            type="number"
          />
        </div>
      </div>
      {/* Cards */}
      <div className="w-full flex flex-col gap-5">
        <div className="w-full flex flex-col gap-5">
          <h2 className="text-xl">
            <span className="font-bold">Total</span> :{" "}
            {totalPengeluaranFiltered}
          </h2>
          <button
            className="bg-slate-400 bg-opacity-20 h-[100px] w-full flex justify-center items-center 
                    rounded-lg
                    hover:bg-opacity-40
                "
            type="button"
            onClick={(e) => modalContext.showModal(false)}
            id="add"
            name="add"
          >
            <IoIosAddCircleOutline className="text-black w-8 h-8" />
          </button>
          {/* Display Cards */}
          <div className="flex flex-col gap-4">
            {Object.keys(groupedData).map((dateKey) => {
              const items = groupedData[dateKey].items;
              const total_harian = groupedData[dateKey].total;

              // Get the day of the week in WIB timezone from the first item in the group
              const dayOfWeek = moment
                .tz(items[0].date, "Asia/Jakarta")
                .format("dddd");
              //totalPengeluaran =

              return (
                <div key={dateKey} className="mb-6">
                  <div className="flex flex-row justify-between items-center">
                    <div className="font-bold">
                      <p>{dateKey}</p>
                      <p>{dayOfWeek}</p>
                    </div>
                    <div>
                      <p>-{total_harian} IDR</p>
                    </div>
                  </div>
                  {/* Show card */}
                  {items.map((data, idx) => {
                    //console.log(data)
                    return (
                      <div className="mb-2 w-full" key={data.name}>
                        <CardPengeluaran
                          key={idx}
                          onClick={() =>
                            modalContext.showModal(true, { ...data })
                          }
                          deskripsi={data.description}
                          nominal={data.amount}
                          judul={data.name}
                          kategori={data.category}
                        />
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}

export default MainContainer;
