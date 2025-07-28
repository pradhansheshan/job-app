'use client';

import NoFeesInfo from '@/component/NoFeesInfo';
import WhoCanApply from '@/component/WhoCanApply';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    jobRole: '',
    photo: null,
  });

  const [formErrors, setFormErrors] = useState({
    name: '',
    phone: '',
    address: '',
    jobRole: '',
    photo: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === 'name') {
      setFormErrors((prev) => ({
        ...prev,
        name: value.trim().length < 3 ? 'Name must be at least 3 characters' : '',
      }));
    } else if (name === 'phone') {
      setFormErrors((prev) => ({
        ...prev,
        phone: /^\d{10}$/.test(value) ? '' : 'Phone number must be 10 digits',
      }));
    } else if (name === 'address') {
      setFormErrors((prev) => ({
        ...prev,
        address: value.trim() === '' ? 'Address cannot be empty' : '',
      }));
    } else if (name === 'jobRole') {
      setFormErrors((prev) => ({
        ...prev,
        jobRole: value ? '' : 'Please select a job role',
      }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, photo: file }));
    setFormErrors((prev) => ({
      ...prev,
      photo: file ? '' : 'Please upload a photo',
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, phone, address, photo, jobRole } = formData;

    const newErrors = {
      name: name.trim().length < 3 ? 'Name must be at least 3 characters' : '',
      phone: /^\d{10}$/.test(phone) ? '' : 'Phone number must be 10 digits',
      address: address.trim() === '' ? 'Address cannot be empty' : '',
      jobRole: jobRole ? '' : 'Please select a job role',
      photo: photo ? '' : 'Please upload a photo',
    };

    setFormErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((error) => error);
    if (hasErrors) {
      return;
    }

    setLoading(true);

    const data = new FormData();
    data.append('file', photo);
    data.append('username', name);
    data.append('mobileNumber', phone);
    data.append('address', address);
    data.append('jobRole', jobRole);

    fetch('https://job-back-acdsgdcfhmcfauh8.centralindia-01.azurewebsites.net/submit', {
      method: 'POST',
      body: data,
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to submit');
        return res.text();
      })
      .then((text) => {
        if (text === 'Success') {
          router.push('/success');
        } else {
          alert('Something went wrong: ' + text);
        }
      })
      .catch((err) => {
        console.error(err);
        alert('Error submitting form');
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="">
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#5C3B58] p-4">
        <h1 className="text-4xl font-bold text-white mb-8">Job Application</h1>

        <div className="flex flex-col items-center w-full">
          <WhoCanApply />
        </div>

        <Card className="w-full md:w-1/3 h-full p-8">
          <CardHeader className="px-0 pt-0">
            <CardTitle>Job Application Form</CardTitle>
          </CardHeader>
          <CardDescription>Use your Whatsapp Number for registration.</CardDescription>

          <CardContent className="space-y-5 px-0 pb-0">
            <form onSubmit={handleSubmit} className="space-y-2.5">
              <label className="block mb-2 font-medium">Name</label>
              <Input
                type="text"
                name="name"
                className="w-full mb-1 px-3 py-2 border border-gray-300 rounded"
                onChange={handleChange}
              />
              {formErrors.name && <p className="text-sm font-bold text-red-500 mb-2">{formErrors.name}</p>}

              <label className="block mb-2 font-medium">Whatsapp Number</label>
              <input
                type="tel"
                name="phone"
                className="w-full mb-1 px-3 py-2 border border-gray-300 rounded"
                onChange={handleChange}
              />
              {formErrors.phone && <p className="text-sm font-bold text-red-500 mb-2">{formErrors.phone}</p>}

              <label className="block mb-2 font-medium">Address</label>
              <input
                name="address"
                className="w-full mb-1 px-3 py-2 border border-gray-300 rounded"
                onChange={handleChange}
              />
              {formErrors.address && (
                <p className="text-sm font-bold text-red-500 mb-2">{formErrors.address}</p>
              )}

              <label className="block mb-2 font-medium">Job Role</label>
              <div className="mb-4 space-y-4">
                {[
                  {
                    value: 'Receptionist',
                    title: 'Receptionist (On Site)',
                    desc: 'Work in hotels or front offices. Good communication skills preferred.',
                    pay: '＝ Moderate Paying',
                    color: 'text-yellow-600',
                  },
                  {
                    value: 'Call Center',
                    title: 'Call Center (Work From Home)',
                    desc: 'Voice or non-voice process. Basic computer knowledge required.',
                    pay: '▼ Low Paying',
                    color: 'text-red-600',
                  },
                  {
                    value: 'Model',
                    title: 'Modeling (On Site)',
                    desc: 'For photo shoots, brand promotions. Must be confident and presentable.',
                    pay: '▲ High Paying',
                    color: 'text-green-600',
                  },
                  {
                    value: 'Security',
                    title: 'Security (On Site)',
                    desc: 'Guard duties at commercial and residential sites. Physical fitness required.',
                    pay: '▼ Low Paying',
                    color: 'text-red-600',
                  },
                ].map((role) => (
                  <label className="block" key={role.value}>
                    <div className="flex items-start">
                      <input
                        type="radio"
                        name="jobRole"
                        value={role.value}
                        checked={formData.jobRole === role.value}
                        onChange={handleChange}
                        className="mr-2 mt-1"
                      />
                      <div>
                        <span className="font-medium">{role.title}</span>
                        <div className="text-sm text-gray-600">{role.desc}</div>
                        <div className={`mt-1 text-sm ${role.color}`}>{role.pay}</div>
                      </div>
                    </div>
                  </label>
                ))}

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
                      <div className="mt-1 text-sm text-green-600">▲ High Paying</div>
                    </div>
                  </div>
                </label>
              </div>
              {formErrors.jobRole && (
                <p className="text-sm font-bold text-red-500 mb-2">{formErrors.jobRole}</p>
              )}

              <label className="block mb-2 font-medium">Upload Photo</label>
              <div className="relative w-full mb-2">
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
                />
                {formData.photo && (
                  <div className="mt-2 text-sm text-white">
                    Selected: <span className="text-green-300">{formData.photo.name}</span>
                  </div>
                )}
                {formErrors.photo && (
                  <p className="text-sm font-bold text-red-500 mt-1">{formErrors.photo}</p>
                )}
              </div>

              <Button
                type="submit"
                className={`w-full cursor-pointer px-4 py-2 rounded transition ${
                  loading
                    ? 'bg-gray-700 text-white hover:bg-gray-700'
                    : 'bg-black text-white hover:bg-slate-900'
                }`}
                disabled={loading}
              >
                {loading ? 'Submitting...' : 'Submit'}
              </Button>
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
