export default function SuccessPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-100 p-6">
      <h1 className="text-4xl font-bold text-green-700 mb-4">🎉 Application Submitted!</h1>
      <p className="text-lg text-gray-700 mb-2">We’ve received your application.</p>
      <p className="text-sm text-gray-600">We’ll contact you shortly on your WhatsApp number.</p>
    </div>
  );
}