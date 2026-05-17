"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/supabase";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function ProjectDetails(props: any) {

  // DYNAMIC PROJECT ID
  const projectId = Number(
    props.params.id
  );

  const [project, setProject] = useState<any>(null);

  const [boq, setBoq] = useState<any[]>([]);

  const [item, setItem] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unitPrice, setUnitPrice] = useState("");

  // Tender Inputs
  const [overhead, setOverhead] = useState(10);
  const [profit, setProfit] = useState(15);
  const [vat, setVat] = useState(5);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {

    // PROJECT
    const { data: projectData } = await supabase
      .from("projects")
      .select("*")
      .eq("id", projectId)
      .single();

    setProject(projectData);

    // BOQ
    const { data: boqData } = await supabase
      .from("boq")
      .select("*")
      .eq("project_id", projectId);

    setBoq(boqData || []);
  };

  // ADD ITEM
  const addBOQ = async () => {

    if (!item || !quantity || !unitPrice)
      return;

    await supabase
      .from("boq")
      .insert([
        {
          project_id: projectId,
          item: item,
          quantity: Number(quantity),
          unit_price: Number(unitPrice),
        },
      ]);

    setItem("");
    setQuantity("");
    setUnitPrice("");

    fetchData();
  };

  // DELETE ITEM
  const deleteItem = async (id: number) => {

    await supabase
      .from("boq")
      .delete()
      .eq("id", id);

    fetchData();
  };

  // UPDATE ITEM
  const updateItem = async (
    id: number,
    quantity: number,
    unit_price: number
  ) => {

    await supabase
      .from("boq")
      .update({
        quantity,
        unit_price,
      })
      .eq("id", id);

    fetchData();
  };

  // DIRECT COST
  const directCost = boq.reduce(
    (sum, row) =>
      sum + row.quantity * row.unit_price,
    0
  );

  // OVERHEAD
  const overheadCost =
    (directCost * overhead) / 100;

  // PROFIT
  const profitCost =
    (directCost * profit) / 100;

  // SUBTOTAL
  const subtotal =
    directCost +
    overheadCost +
    profitCost;

  // VAT
  const vatCost =
    (subtotal * vat) / 100;

  // FINAL TOTAL
  const finalTotal =
    subtotal + vatCost;

  // EXPORT PDF
  const exportPDF = async () => {

    const input =
      document.getElementById("tender-report");

    if (!input) return;

    const canvas =
      await html2canvas(input);

    const imgData =
      canvas.toDataURL("image/png");

    const pdf = new jsPDF(
      "p",
      "mm",
      "a4"
    );

    const pdfWidth =
      pdf.internal.pageSize.getWidth();

    const pdfHeight =
      (canvas.height * pdfWidth) /
      canvas.width;

    pdf.addImage(
      imgData,
      "PNG",
      0,
      0,
      pdfWidth,
      pdfHeight
    );

    pdf.save(
      `${project?.name || "Tender"}.pdf`
    );
  };

  return (

    <div id="tender-report">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-4xl font-bold">
            {project?.name}
          </h1>

          <p className="text-gray-400 mt-2">
            Tender Estimation Dashboard
          </p>

        </div>

        <button
          onClick={exportPDF}
          className="bg-green-500 hover:bg-green-400 text-black px-6 py-3 rounded-xl font-semibold"
        >
          Export PDF
        </button>

      </div>

      {/* PROJECT INFO */}
      <div className="bg-[#1e293b] p-8 rounded-2xl space-y-4 mb-10">

        <p>
          <span className="font-bold">
            Client:
          </span>{" "}
          {project?.client}
        </p>

        <p>
          <span className="font-bold">
            Status:
          </span>{" "}
          <span className="text-cyan-400">
            {project?.status}
          </span>
        </p>

      </div>

      {/* ADD BOQ */}
      <div className="bg-[#1e293b] p-6 rounded-2xl mb-10">

        <h2 className="text-2xl font-bold mb-6">
          Add BOQ Item
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

          <input
            type="text"
            placeholder="Item"
            value={item}
            onChange={(e) =>
              setItem(e.target.value)
            }
            className="bg-[#0f172a] p-3 rounded-xl outline-none"
          />

          <input
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) =>
              setQuantity(e.target.value)
            }
            className="bg-[#0f172a] p-3 rounded-xl outline-none"
          />

          <input
            type="number"
            placeholder="Unit Price"
            value={unitPrice}
            onChange={(e) =>
              setUnitPrice(e.target.value)
            }
            className="bg-[#0f172a] p-3 rounded-xl outline-none"
          />

          <button
            onClick={addBOQ}
            className="bg-cyan-500 hover:bg-cyan-400 text-black rounded-xl font-semibold"
          >
            Add Item
          </button>

        </div>

      </div>

      {/* BOQ TABLE */}
      <div className="bg-[#1e293b] p-8 rounded-2xl mb-10">

        <h2 className="text-2xl font-bold mb-6">
          BOQ Items
        </h2>

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

                <td className="py-4">
                  {row.item}
                </td>

                <td>

                  <input
                    type="number"
                    defaultValue={row.quantity}
                    onBlur={(e) =>
                      updateItem(
                        row.id,
                        Number(e.target.value),
                        row.unit_price
                      )
                    }
                    className="bg-[#0f172a] p-2 rounded-lg w-24"
                  />

                </td>

                <td>

                  <input
                    type="number"
                    defaultValue={row.unit_price}
                    onBlur={(e) =>
                      updateItem(
                        row.id,
                        row.quantity,
                        Number(e.target.value)
                      )
                    }
                    className="bg-[#0f172a] p-2 rounded-lg w-28"
                  />

                </td>

                <td className="text-cyan-400 font-semibold">

                  $
                  {(
                    row.quantity *
                    row.unit_price
                  ).toLocaleString()}

                </td>

                <td>

                  <button
                    onClick={() =>
                      deleteItem(row.id)
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

      {/* TENDER SUMMARY */}
      <div className="bg-[#1e293b] p-8 rounded-2xl">

        <h2 className="text-2xl font-bold mb-6">
          Tender Summary
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* INPUTS */}
          <div className="space-y-4">

            <div>

              <label className="block mb-2">
                Overhead %
              </label>

              <input
                type="number"
                value={overhead}
                onChange={(e) =>
                  setOverhead(Number(e.target.value))
                }
                className="bg-[#0f172a] p-3 rounded-xl w-full"
              />

            </div>

            <div>

              <label className="block mb-2">
                Profit %
              </label>

              <input
                type="number"
                value={profit}
                onChange={(e) =>
                  setProfit(Number(e.target.value))
                }
                className="bg-[#0f172a] p-3 rounded-xl w-full"
              />

            </div>

            <div>

              <label className="block mb-2">
                VAT %
              </label>

              <input
                type="number"
                value={vat}
                onChange={(e) =>
                  setVat(Number(e.target.value))
                }
                className="bg-[#0f172a] p-3 rounded-xl w-full"
              />

            </div>

          </div>

          {/* RESULTS */}
          <div className="space-y-4 text-xl">

            <p>
              Direct Cost:
              <span className="text-cyan-400 ml-2">
                ${directCost.toLocaleString()}
              </span>
            </p>

            <p>
              Overhead:
              <span className="text-cyan-400 ml-2">
                ${overheadCost.toLocaleString()}
              </span>
            </p>

            <p>
              Profit:
              <span className="text-cyan-400 ml-2">
                ${profitCost.toLocaleString()}
              </span>
            </p>

            <p>
              VAT:
              <span className="text-cyan-400 ml-2">
                ${vatCost.toLocaleString()}
              </span>
            </p>

            <hr className="border-gray-700" />

            <p className="text-3xl font-bold">

              Final Tender Price:
              <span className="text-green-400 ml-2">

                $
                {finalTotal.toLocaleString()}

              </span>

            </p>

          </div>

        </div>

      </div>

    </div>
  );
}