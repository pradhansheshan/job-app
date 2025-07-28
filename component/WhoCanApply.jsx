export default function WhoCanApply() {
  return (
    <div className="w-full md:w-1/3 bg-white text-black rounded-2xl p-8 mb-6 shadow-md">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">🌟 Who Can Apply?</h2>
      <p className="text-base text-center mb-4">
        We’re always looking for smart, sincere, and presentable candidates, especially:
      </p>
      <ul className="list-disc list-inside space-y-2 text-base">
        <li><strong>Girls</strong> looking for reception, BPO, or modeling jobs</li>
        <li><strong>Boys</strong> seeking security or event staff roles</li>
        <li><strong>Freshers</strong> or 12th pass candidates</li>
        <li><strong>College students</strong> or <strong>housewives</strong> wanting part-time work</li>
        <li><strong>Anyone</strong> looking for WFH jobs with income</li>
      </ul>
      <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 mt-6 rounded">
        <p className="font-medium">💡 No experience? No problem!</p>
        <p>We also offer training and job preparation support.</p>
      </div>
    </div>
  );
}
