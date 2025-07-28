export default function NoFeesInfo() {
  return (
    <div className="w-full md:w-1/3 bg-white text-black rounded-2xl p-8 mb-6 shadow-md">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-red-600 mb-4">
        📝 100% FREE Registration, No Advance Fees.
      </h2>

      <p className="text-center font-medium mb-6 text-black">
        ⚠️ We never ask for money. Just fill the form and get connected to employers.
      </p>

      <ul className="space-y-2 text-base list-disc list-inside">
        <li>✅ No registration fee</li>
        <li>✅ No training charge</li>
        <li>✅ No advance payments asked</li>
      </ul>

      <p className="mt-6 text-center font-semibold">
        Your job should earn you money — not the other way around.
      </p>
    </div>
  );
}
