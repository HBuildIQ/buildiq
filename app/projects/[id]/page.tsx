"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/supabase";
import { useParams } from "next/navigation";

export default function ProjectDetails() {
  const params = useParams();

  const projectId = Number(params.id);

  const [boq, setBoq] = useState<any[]>([]);
  const [item, setItem] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unitPrice, setUnitPrice] = useState("");

  const fetchBoq = async () => {
    const { data, error } = await supabase
      .from("boq")
      .select("*")
      .eq("project_id", projectId);

    if (error) {
      console.log(error);
    } else {
      setBoq(data || []);
    }
  };

  useEffect(() => {
    if (projectId) {
      fetchBoq();
    }
  }, [projectId]);

  const addItem = async () => {
    if (!item || !quantity || !unitPrice) return;

    const { error } = await supabase.from("boq").insert([
      {
        project_id: projectId,
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

  const totalCost = boq.reduce(
    (sum, row) => sum + row.quantity * row.unit_price,
    0
  );

  return (
    <div className="min-h-screen bg-[#020c2b] text-white p-10">
      <h1 className="text-4xl font-bold mb-2">Project BOQ</h1>

      <p className="text-gray-400 mb-10">Manage project items</p>

      <div className="grid grid-cols-3 gap-6 mb-10">
        <div className="bg-[#1a2747] p-6 rounded-2xl">
          <p className="text-gray-400">Total Cost</p>
          <h2 className="text-4xl font-bold text-cyan-400">
            ${totalCost}
          </h2>
        </div>

        <div className="bg-[#1a2747] p-6 rounded-2xl">
          <p className="text-gray-400">Total Items</p>
          <h2 className="text-4xl font-bold text-cyan-400">
            {boq.length}
          </h2>
        </div>

        <div className="bg-[#1a2747] p-6 rounded-2xl">
          <p className="text-gray-400">Average Price</p>
          <h2 className="text-4xl font-bold text-cyan-400">
            $
            {boq.length > 0
              ? Math.round(totalCost / boq.length)
              : 0}
          </h2>
        </div>
      </div>

      <div className="bg-[#1a2747] p-6 rounded-2xl mb-10 flex gap-4">
        <input
          type="text"
          placeholder="Item"
          value={item}
          onChange={(e) => setItem(e.target.value)}
          className="bg-[#020c2b] p-3 rounded-lg flex-1"
        />

        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="bg-[#020c2b] p-3 rounded-lg flex-1"
        />

        <input
          type="number"
          placeholder="Unit Price"
          value={unitPrice}
          onChange={(e) => setUnitPrice(e.target.value)}
          className="bg-[#020c2b] p-3 rounded-lg flex-1"
        />

        <button
          onClick={addItem}
          className="bg-cyan-500 hover:bg-cyan-400 px-8 rounded-lg font-bold"
        >
          Add Item
        </button>
      </div>

      <div className="bg-[#1a2747] rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead className="border-b border-gray-700">
            <tr>
              <th className="p-4 text-left">Item</th>
              <th className="p-4 text-left">Quantity</th>
              <th className="p-4 text-left">Unit Price</th>
              <th className="p-4 text-left">Total</th>
            </tr>
          </thead>

          <tbody>
            {boq.map((row) => (
              <tr
                key={row.id}
                className="border-b border-gray-800"
              >
                <td className="p-4">{row.item}</td>
                <td className="p-4">{row.quantity}</td>
                <td className="p-4">{row.unit_price}</td>
                <td className="p-4">
                  {row.quantity * row.unit_price}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}