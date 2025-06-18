import { zoningSummaries } from "./zoningData";

export default function ZoningResult({ zoneCode }) {
  const data = zoningSummaries[zoneCode];

  if (!data) return <p className="text-center text-red-600">Zoning code not found.</p>;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 border rounded shadow text-left">
      <h2 className="text-2xl font-bold mb-2">Zone: {zoneCode}</h2>
      <h3 className="text-lg text-gray-700 font-semibold">{data.title}</h3>

      <p className="mt-4 font-semibold">Permitted Uses:</p>
      <ul className="list-disc list-inside">
        {data.permittedUses.map((use, i) => <li key={i}>{use}</li>)}
      </ul>

      <p className="mt-4 font-semibold">Rules:</p>
      <ul className="list-disc list-inside">
        {data.rules.map((rule, i) => <li key={i}>{rule}</li>)}
      </ul>

      <p className="mt-4 italic text-sm text-gray-600">{data.notes}</p>
    </div>
  );
}
