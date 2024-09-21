"use client";
import React, { useCallback, useState, useMemo, useEffect } from "react";

// ikon
import { IoIosSearch } from "react-icons/io";
import { IoIosAddCircleOutline } from "react-icons/io";

import DatePicker from "react-datepicker";
import moment from "moment-timezone";

// komponen internal
import { useModal } from "@/context/ModalContextMain";
import CardPengeluaran from "../universal-block/Card/CardPengeluaran";
import Dropdown from "../universal-block/Dropdown/Dropdown";
import pengeluaran from "@/utils/MockData/pengeluaran.json";

function MainContainer() {
  const [searchQuery, SetSearchQuery] = useState("");
  const [dataPengeluaran, SetDataPengeluaran] = useState([...pengeluaran]);
  const modalContext = useModal();
  //console.log(dataPengeluaran)

  // filter
  const [filter, SetFilter] = useState({
    date: "",
    kategori: "",
    jenisPengeluaran: "",
  });

  // ubah filter
  function UbahFilterValue(value, key) {
    const copyFilter = filter;
    copyFilter[key] = value;
    SetFilter({ ...copyFilter });
  }

  // Kalkulasi total semua
  const totalPengeluaran = useMemo(() => {
    return dataPengeluaran.reduce((sum, item) => sum + item.nominal, 0);
  }, [dataPengeluaran]);

  // grup data pengeluaran dengan harinya
  const groupByDay = (data) => {
    // Sort by newest date first
    const sortedData = [...data].sort((a, b) => {
      const dateA = moment.tz(a.datetime, "Asia/Jakarta");
      const dateB = moment.tz(b.datetime, "Asia/Jakarta");
      return dateB - dateA; // Sort by descending order (newest first)
    });
    return sortedData.reduce((acc, current) => {
      // Convert datetime to WIB timezone
      const date = moment.tz(current.tanggal, "Asia/Jakarta");

      // Format the date to "Month Day, Year"
      const formattedDate = date.format("MMMM D, YYYY");

      // Check if the group for this date already exists
      if (!acc[formattedDate]) {
        acc[formattedDate] = [];
        acc[formattedDate].items = [];
        acc[formattedDate].total = 0;
      }

      // Add the current item to the respective group
      acc[formattedDate].items.push(current);
      acc[formattedDate].total += current.nominal;

      return acc;
    }, {});
  };

  const FormatDisplayCard = useCallback(() => {
    if (!dataPengeluaran || dataPengeluaran.length === 0) return null;

    // hasil grouping
    const groupedData = useMemo(
      () => groupByDay(dataPengeluaran),
      [dataPengeluaran]
    );
    return (
      <div>
        {Object.keys(groupedData).map((dateKey) => {
          const items = groupedData[dateKey].items;
          const total_harian = groupedData[dateKey].total;

          // Get the day of the week in WIB timezone from the first item in the group
          const dayOfWeek = moment
            .tz(items[0].tanggal, "Asia/Jakarta")
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
                return (
                  <div className="mb-2 w-full">
                    <CardPengeluaran
                      key={idx}
                      showModal={modalContext.showModal}
                      deskripsi={data.deskripsi}
                      nominal={data.nominal}
                      judul={data.nama}
                      kategori={data.kategori}
                    />
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  }, [dataPengeluaran]);

  function SubmitSearch(e) {
    // TODO Ananta untuk fetch setelah search
    e.preventDefault();
  }

  useEffect(() => {
    // TODO Ananta untuk fetch setelah beda filter
  }, [filter]);

  return (
    <main
      className="flex flex-col gap-8  items-center sm:items-start w-full 
        mt-10 z-[1] relative
    "
    >
      {/* Title */}
      <div className="w-full grid grid-cols-6 grid-rows-2">
        <h1 className="col-start-1 col-end-3 row-span-1">
          Halo, Selamat Datang Pengguna
        </h1>
        <div className="col-start-1 col-end-3 row-start-2">
          <h2>Total Pengeluaran : {"INI SEHARUSNYA DIFETCH"}</h2>
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
                value={searchQuery}
                onChange={(e) => SetSearchQuery(e.target.value)}
              />
            </form>
          </div>
        </div>
        <div className="w-full flex flex-row gap-3 flex-wrap mt-2">
          <Dropdown
            name="jenis pengeluaran"
            options={["income", "expense"]}
            callback={(data) => UbahFilterValue(data, "jenisPengeluaran")}
            value={filter.jenisPengeluaran}
          />
          <Dropdown
            name="kategori"
            options={["income", "expense"]}
            callback={(data) => UbahFilterValue(data, "kategori")}
            value={filter.kategori}
          />
          <DatePicker
            className="bg-white p-2 border-2 border-black text-sm rounded-lg relative"
            popperClassName="z-[200]"
            popperProps={{ strategy: "fixed" }}
            placeholderText="pilih bulan"
            showMonthYearPicker
            dateFormat="MMMM yyyy"
            selected={filter.tanggal}
            onChange={(date) => UbahFilterValue(date, "tanggal")}
          />
        </div>
      </div>
      {/* Cards */}
      <div className="w-full flex flex-col gap-5">
        <div className="w-full flex flex-col gap-5">
          <h2 className="text-xl">
            <span className="font-bold">Total</span> : {totalPengeluaran}
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
          <div className="flex flex-col gap-4">{FormatDisplayCard()}</div>
        </div>
      </div>
    </main>
  );
}

export default MainContainer;
