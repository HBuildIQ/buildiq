export default function BOQPage() {
  const items = [
    {
      item: "Excavation",
      qty: 120,
      unit: "m3",
      rate: 12,
    },
    {
      item: "Concrete C30",
      qty: 85,
      unit: "m3",
      rate: 145,
    },
    {
      item: "Reinforcement Steel",
      qty: 18,
      unit: "ton",
      rate: 950,
    },
  ];

  return (
    <main className="min-h-screen bg-[#0f172a] text-white p-8">
      <h1 className="text-4xl font-bold text-cyan-400 mb-8">
        BOQ Management
      </h1>

      <div className="bg-[#1e293b] rounded-2xl p-6 overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700 text-gray-400">
              <th className="text-left pb-4">Item</th>
              <th className="text-left pb-4">Qty</th>
              <th className="text-left pb-4">Unit</th>
              <th className="text-left pb-4">Rate</th>
              <th className="text-left pb-4">Total</th>
            </tr>
          </thead>

          <tbody>
            {items.map((row, index) => (
              <tr
                key={index}
                className="border-b border-gray-800"
              >
                <td className="py-4">{row.item}</td>
                <td>{row.qty}</td>
                <td>{row.unit}</td>
                <td>${row.rate}</td>
                <td>
                  ${row.qty * row.rate}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}