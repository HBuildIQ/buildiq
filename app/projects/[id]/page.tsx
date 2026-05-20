"use client";

import { useEffect, useState } from "react";

import { supabase } from "../../supabase";

export default function ProjectDetails({
  params,
}: any) {

  const id = params.id;

  const [boq, setBoq] =
    useState<any[]>([]);

  const [item, setItem] =
    useState("");

  const [quantity, setQuantity] =
    useState("");

  const [unitPrice, setUnitPrice] =
    useState("");

  useEffect(() => {

    fetchBoq();

  }, []);

  // FETCH BOQ
  const fetchBoq = async () => {

    const { data, error } =
      await supabase
        .from("boq")
        .select("*")
        .eq("project_id", id);

    if (error) {

      console.log(error);

    } else {

      setBoq(data || []);
    }
  };

  // ADD ITEM
  const addItem = async () => {

    if (
      !item ||
      !quantity ||
      !unitPrice
    )
      return;

    const { error } =
      await supabase
        .from("boq")
        .insert([
          {
            project_id: id,
            item,
            quantity:
              Number(quantity),
            unit_price:
              Number(unitPrice),
          },
        ]);

    if (error) {

      console.log(error);

    } else {

      setItem("");
      setQuantity("");
      setUnitPrice("");

      fetchBoq();
    }
  };

  // DELETE ITEM
  const deleteItem = async (
    boqId: number
  ) => {

    await supabase
      .from("boq")
      .delete()
      .eq("id", boqId);

    fetchBoq();
  };

  return (

    <div>

      {/* HEADER */}
      <div className="flex justify-between items-center mb-10">

        <div>

          <h1 className="text-4xl font-bold">
            Project BOQ
          </h1>

          <p className="text-gray-400 mt-2">
            Manage project items
          </p>

        </div>

      </div>

      {/* ADD ITEM */}
      <div className="bg-[#1e293b] p-6 rounded-2xl mb-10">

        <div className="grid grid-cols-4 gap-4">

          <input
            type="text"
            placeholder="Item"
            value={item}
            onChange={(e) =>
              setItem(e.target.value)
            }
            className="bg-[#0f172a] p-3 rounded-xl"
          />

          <input
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) =>
              setQuantity(
                e.target.value
              )
            }
            className="bg-[#0f172a] p-3 rounded-xl"
          />

          <input
            type="number"
            placeholder="Unit Price"
            value={unitPrice}
            onChange={(e) =>
              setUnitPrice(
                e.target.value
              )
            }
            className="bg-[#0f172a] p-3 rounded-xl"
          />

          <button
            onClick={addItem}
            className="bg-cyan-500 hover:bg-cyan-400 text-black font-semibold rounded-xl"
          >
            Add Item
          </button>

        </div>

      </div>

      {/* TABLE */}
      <div className="bg-[#1e293b] p-8 rounded-2xl">

        <table className="w-full">

          <thead>

            <tr className="border-b border-gray-700 text-gray-400">

              <th className="text-left pb-4">
                Item
              </th>

              <th className="text-left pb-4">
                Quantity
              </th>

              <th className="text-left pb-4">
                Unit Price
              </th>

              <th className="text-left pb-4">
                Total
              </th>

              <th className="text-left pb-4">
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

                {/* ITEM */}
                <td className="py-4">
                  {row.item}
                </td>

                {/* QUANTITY */}
                <td>

                  <input
                    type="number"
                    value={row.quantity}
                    onChange={async (
                      e
                    ) => {

                      const value =
                        Number(
                          e.target.value
                        );

                      const updated =
                        boq.map(
                          (item) =>
                            item.id ===
                            row.id
                              ? {
                                  ...item,
                                  quantity:
                                    value,
                                }
                              : item
                        );

                      setBoq(updated);

                      await supabase
                        .from("boq")
                        .update({
                          quantity:
                            value,
                        })
                        .eq(
                          "id",
                          row.id
                        );

                    }}
                    className="bg-[#0f172a] p-2 rounded-lg w-24"
                  />

                </td>

                {/* UNIT PRICE */}
                <td>

                  <input
                    type="number"
                    value={row.unit_price}
                    onChange={async (
                      e
                    ) => {

                      const value =
                        Number(
                          e.target.value
                        );

                      const updated =
                        boq.map(
                          (item) =>
                            item.id ===
                            row.id
                              ? {
                                  ...item,
                                  unit_price:
                                    value,
                                }
                              : item
                        );

                      setBoq(updated);

                      await supabase
                        .from("boq")
                        .update({
                          unit_price:
                            value,
                        })
                        .eq(
                          "id",
                          row.id
                        );

                    }}
                    className="bg-[#0f172a] p-2 rounded-lg w-28"
                  />

                </td>

                {/* TOTAL */}
                <td className="text-cyan-400 font-semibold">

                  $
                  {(
                    row.quantity *
                    row.unit_price
                  ).toLocaleString()}

                </td>

                {/* DELETE */}
                <td>

                  <button
                    onClick={() =>
                      deleteItem(
                        row.id
                      )
                    }
                    className="bg-red-500 hover:bg-red-400 px-4 py-2 rounded-lg"
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
  );
}