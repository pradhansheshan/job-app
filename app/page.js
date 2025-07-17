'use client';

import NoFeesInfo from '@/component/NoFeesInfo';
import WhoCanApply from '@/component/WhoCanApply';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    jobRole: '',
    photo: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, photo: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('name', formData.name);
    data.append('phone', formData.phone);
    data.append('address', formData.address);
    data.append('jobRole', formData.jobRole);
    data.append('photo', formData.photo);

    // Simulate API call
    fetch('/api/submit', {
      method: 'POST',
      body: data,
    })
      .then((res) => res.json())
      .then((res) => alert('Form submitted successfully!'))
      .catch((err) => alert('Error submitting form'));
  };

  return (
    <div className=''>

      

      <div className="min-h-screen flex flex-col items-center justify-center bg-[#5C3B58] p-4">
      <h1 className="text-4xl font-bold text-white mb-8">Job Application</h1>

      <div className="flex flex-col items-center w-full">
        <WhoCanApply />
      </div>

        <Card className="w-1/3 h-full p-8">
          <CardHeader className="px-0 pt-0">
            <CardTitle>
              Job Application Form
            </CardTitle>
          </CardHeader>
          <CardDescription>
            Use your Whatsapp Number for registration.
          </CardDescription>

          <CardContent className="space-y-5 px-0 pb-0">
            <form onSubmit={handleSubmit} className="space-y-2.5">

              <label className="block mb-2 font-medium">Name</label>
              <Input
                type="text"
                name="name"
                className="w-full mb-4 px-3 py-2 border border-gray-300 rounded"
                onChange={handleChange}
                required
              />

              <label className="block mb-2 font-medium ">Whatsapp Number</label>
              <input
                type="tel"
                name="phone"
                className="w-full mb-4 px-3 py-2 border border-gray-300 rounded"
                onChange={handleChange}
                required
              />

              <label className="block mb-2 font-medium">Address</label>
              <input
                name="address"
                className="w-full mb-4 px-3 py-2 border border-gray-300 rounded"
                rows={3}
                onChange={handleChange}
                required
              />

              <label className="block mb-2 font-medium">Job Role</label>
              <div className="mb-4 space-y-4">

                {/* Receptionist - Moderate Paying */}
                <label className="block">
                  <div className="flex items-start">
                    <input
                      type="radio"
                      name="jobRole"
                      value="Receptionist"
                      checked={formData.jobRole === 'Receptionist'}
                      onChange={handleChange}
                      className="mr-2 mt-1"
                    />
                    <div>
                      <span className="font-medium">Receptionist (On Site)</span>
                      <div className="text-sm text-gray-600">
                        Work in hotels or front offices. Good communication skills preferred.
                      </div>
                      <div className="mt-1 text-sm text-yellow-600">
                        ＝ Moderate Paying
                      </div>
                    </div>
                  </div>
                </label>

                {/* Call Center - Low Paying */}
                <label className="block">
                  <div className="flex items-start">
                    <input
                      type="radio"
                      name="jobRole"
                      value="Call Center"
                      checked={formData.jobRole === 'Call Center'}
                      onChange={handleChange}
                      className="mr-2 mt-1"
                    />
                    <div>
                      <span className="font-medium">Call Center (Work From Home)</span>
                      <div className="text-sm text-gray-600">
                        Voice or non-voice process. Basic computer knowledge required.
                      </div>
                      <div className="mt-1 text-sm text-red-600">
                        ▼ Low Paying
                      </div>
                    </div>
                  </div>
                </label>

                {/* Model - High Paying */}
                <label className="block">
                  <div className="flex items-start">
                    <input
                      type="radio"
                      name="jobRole"
                      value="Model"
                      checked={formData.jobRole === 'Model'}
                      onChange={handleChange}
                      className="mr-2 mt-1"
                    />
                    <div>
                      <span className="font-medium">Modeling (On Site)</span>
                      <div className="text-sm text-gray-600">
                        For photo shoots, brand promotions. Must be confident and presentable.
                      </div>
                      <div className="mt-1 text-sm text-green-600">
                        ▲ High Paying
                      </div>
                    </div>
                  </div>
                </label>

                {/* Security - Low Paying */}
                <label className="block">
                  <div className="flex items-start">
                    <input
                      type="radio"
                      name="jobRole"
                      value="Security"
                      checked={formData.jobRole === 'Security'}
                      onChange={handleChange}
                      className="mr-2 mt-1"
                    />
                    <div>
                      <span className="font-medium">Security (On Site)</span>
                      <div className="text-sm text-gray-600">
                        Guard duties at commercial and residential sites. Physical fitness required.
                      </div>
                      <div className="mt-1 text-sm text-red-600">
                        ▼ Low Paying
                      </div>
                    </div>
                  </div>
                </label>

                {/* Photographer - Disabled - High Paying */}
                <label className="block opacity-50 cursor-not-allowed">
                  <div className="flex items-start">
                    <input
                      type="radio"
                      name="jobRole"
                      value="Photographer"
                      checked={formData.jobRole === 'Photographer'}
                      onChange={handleChange}
                      className="mr-2 mt-1"
                      disabled
                    />
                    <div>
                      <span className="font-medium">Photographer</span>
                      <div className="text-sm text-gray-600">
                        Role temporarily closed. Will reopen soon.
                      </div>
                      <div className="mt-1 text-sm text-green-600">
                        ▲ High Paying
                      </div>
                    </div>
                  </div>
                </label>

              </div>

              <label className="block mb-2 font-medium">Upload Photo</label>
              <div className="relative w-full mb-6">
                <label
                  htmlFor="photo-upload"
                  className="flex items-center justify-center px-4 py-2 bg-gray-200 text-gray-800 rounded cursor-pointer hover:bg-gray-300 transition"
                >
                  📸 Choose Photo
                </label>
                <input
                  id="photo-upload"
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  required
                />
                {formData.photo && (
                  <div className="mt-2 text-sm text-white">
                    Selected: <span className="text-green-300">{formData.photo.name}</span>
                  </div>
                )}
              </div>


              <Button
                type="submit"
                className="bg-black text-white px-4 py-2 rounded hover:bg-slate-900 transition w-full cursor-pointer"
              >Submit</Button>
            </form>
          </CardContent>

          
        </Card>

      <div className="flex flex-col items-center w-full pt-6">
        <NoFeesInfo />
      </div>

      </div>
    </div>
  );
}
