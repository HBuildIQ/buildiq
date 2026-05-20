"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/app/supabase";

export default function ProjectDetails() {

  const params = useParams();

  const id = Array.isArray(params.id)
    ? params.id[0]
    : params.id;

  const [boq, setBoq] = useState<any[]>([]);
  const [item, setItem] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unitPrice, setUnitPrice] = useState("");

  // FETCH DATA
  const fetchBoq = async () => {

    const { data, error } = await supabase
      .from("boq")
      .select("*")
      .eq("project_id", Number(id));

    if (error) {
      console.log(error);
    } else {
      setBoq(data || []);
    }
  };

  useEffect(() => {
    if (id) {
      fetchBoq();
    }
  }, [id]);

  // ADD ITEM
  const addItem = async () => {

    if (!item || !quantity || !unitPrice) {
      return;
    }

    const { error } = await supabase
      .from("boq")
      .insert([
        {
          project_id: Number(id),
          item: item,
          quantity: Number(quantity),
          unit_price: Number(unitPrice),
        },
      ]);

    if (error) {
      console.log(error);
      alert("Error adding item");
    } else {

      setItem("");
      setQuantity("");
      setUnitPrice("");

      fetchBoq();
    }
  };

  // DELETE
  const deleteItem = async (rowId: number) => {

    await supabase
      .from("boq")
      .delete()
      .eq("id", rowId);

    fetchBoq();
  };

  // TOTAL
  const totalCost = boq.reduce(
    (sum, row) =>
      sum + row.quantity * row.unit_price,
    0
  );

  return (

    <div className="min-h-screen bg-[#020f2b] text-white flex">

      {/* SIDEBAR */}
      <div className="w-56 bg-[#06142f] p-6">

        <h1 className="text-4xl font-bold text-cyan-400 mb-1">
          BuildIQ
        </h1>

        <p className="text-gray-400 mb-10">
          Construction ERP
        </p>

        <div className="space-y-4">

          <button className="w-full bg-[#1c2945] p-4 rounded-xl text-left">
            Dashboard
          </button>

          <button className="w-full bg-[#1c2945] p-4 rounded-xl text-left">
            Projects
          </button>

          <button className="w-full bg-[#1c2945] p-4 rounded-xl text-left">
            Login
          </button>

        </div>
      </div>

      {/* CONTENT */}
      <div className="flex-1 p-10">

        <h1 className="text-5xl font-bold mb-2">
          Project BOQ
        </h1>

        <p className="text-gray-400 mb-10">
          Manage project items
        </p>

        {/* STATS */}
        <div className="grid grid-cols-3 gap-6 mb-10">

          <div className="bg-[#1b2944] p-8 rounded-3xl">

            <p className="text-gray-400 mb-2">
              Total Cost
            </p>

            <h2 className="text-5xl text-cyan-400 font-bold">
              ${totalCost}
            </h2>

          </div>

          <div className="bg-[#1b2944] p-8 rounded-3xl">

            <p className="text-gray-400 mb-2">
              Total Items
            </p>

            <h2 className="text-5xl text-cyan-400 font-bold">
              {boq.length}
            </h2>

          </div>

          <div className="bg-[#1b2944] p-8 rounded-3xl">

            <p className="text-gray-400 mb-2">
              Average Price
            </p>

            <h2 className="text-5xl text-cyan-400 font-bold">

              $
              {
                boq.length > 0
                  ? (totalCost / boq.length).toFixed(0)
                  : 0
              }

            </h2>

          </div>

        </div>

        {/* ADD ITEM */}
        <div className="bg-[#1b2944] p-6 rounded-3xl mb-10">

          <div className="grid grid-cols-4 gap-4">

            <input
              type="text"
              placeholder="Item"
              value={item}
              onChange={(e) =>
                setItem(e.target.value)
              }
              className="bg-[#020f2b] p-4 rounded-xl"
            />

            <input
              type="number"
              placeholder="Quantity"
              value={quantity}
              onChange={(e) =>
                setQuantity(e.target.value)
              }
              className="bg-[#020f2b] p-4 rounded-xl"
            />

            <input
              type="number"
              placeholder="Unit Price"
              value={unitPrice}
              onChange={(e) =>
                setUnitPrice(e.target.value)
              }
              className="bg-[#020f2b] p-4 rounded-xl"
            />

            <button
              onClick={addItem}
              className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-xl"
            >
              Add Item
            </button>

          </div>

        </div>

        {/* TABLE */}
        <div className="bg-[#1b2944] p-6 rounded-3xl">

          <table className="w-full">

            <thead>

              <tr className="text-left text-gray-400 border-b border-gray-700">

                <th className="pb-4">
                  Item
                </th>

                <th className="pb-4">
                  Quantity
                </th>

                <th className="pb-4">
                  Unit Price
                </th>

                <th className="pb-4">
                  Total
                </th>

                <th className="pb-4">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {boq.map((row) => (

                <tr
                  key={row.id}
                  className="border-b border-gray-800"
                >

                  <td className="py-4">
                    {row.item}
                  </td>

                  <td>
                    {row.quantity}
                  </td>

                  <td>
                    ${row.unit_price}
                  </td>

                  <td>
                    $
                    {row.quantity * row.unit_price}
                  </td>

                  <td>

                    <button
                      onClick={() =>
                        deleteItem(row.id)
                      }
                      className="bg-red-500 px-4 py-2 rounded-lg"
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}