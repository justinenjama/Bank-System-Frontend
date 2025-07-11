import React, { useEffect, useState } from 'react';
import { Dialog } from '@headlessui/react';
import { XMarkIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { fetchUserProfile, updateUserProfile } from '../../service/Service';
import { toast } from 'react-toastify';
import Spinner from '../Spinner';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileDrawer: React.FC<Props> = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadProfile();
    }
  }, [isOpen]);

  const loadProfile = async () => {
    setFetching(true);
    try {
      const data = await fetchUserProfile();
      setProfile(data);
    } catch (error) {
      toast.error('Failed to load profile.');
    } finally {
      setFetching(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateUserProfile({
        phoneNumber: profile.phoneNumber,
        alternativePhoneNumber: profile.alternativePhoneNumber,
        address: profile.address,
        city: profile.city,
        country: profile.country,
        job: profile.job,
        nextOfKin: profile.nextOfKin,
        nextOfKinRelationship: profile.nextOfKinRelationship,
      });
      toast.success('Profile updated successfully!');
      onClose();
    } catch (error) {
      toast.error('Failed to update profile.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/10 backdrop-blur-sm" />
      <div className="fixed inset-y-0 right-0 max-w-md w-full bg-white dark:bg-gray-900 shadow-xl overflow-y-auto max-h-screen">
        <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
          <h2 className="text-lg font-semibold">Your Profile</h2>
          <button onClick={onClose}>
            <XMarkIcon className="h-6 w-6 text-gray-600 hover:text-red-600" />
          </button>
        </div>

          {fetching ? (
            <div className="flex justify-center items-center h-full">
              <Spinner />
            </div>
          ) : (
            profile && (
              <div className="p-4 space-y-4">
                <div className="text-center">
                  <UserCircleIcon className="h-20 w-20 text-blue-500 mx-auto" />
                  <h3 className="text-xl font-semibold mt-2 dark:text-white">
                    {profile.firstName} {profile.otherName || ''} {profile.lastName}
                  </h3>
                  <p className="text-sm text-gray-500">{profile.email}</p>
                </div>

                <form className="space-y-4" onSubmit={handleSubmit}>
                  {/* Read-Only Fields */}
                  <div>
                    <label className="block text-sm text-gray-600 dark:text-gray-300">Email</label>
                    <input
                      type="email"
                      value={profile.email}
                      disabled
                      className="w-full p-2 mt-1 bg-gray-100 dark:bg-gray-800 border rounded"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-600 dark:text-gray-300">Account Number</label>
                    <input
                      type="text"
                      value={profile.accountNumber || ''}
                      disabled
                      className="w-full p-2 mt-1 bg-gray-100 dark:bg-gray-800 border rounded"
                    />
                  </div>

                  {/* Editable Fields */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Phone Number</label>
                    <input
                      name="phoneNumber"
                      value={profile.phoneNumber || ''}
                      onChange={handleChange}
                      className="w-full p-2 mt-1 border rounded dark:bg-gray-800 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Alternative Phone</label>
                    <input
                      name="alternativePhoneNumber"
                      value={profile.alternativePhoneNumber || ''}
                      onChange={handleChange}
                      className="w-full p-2 mt-1 border rounded dark:bg-gray-800 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Address</label>
                    <input
                      name="address"
                      value={profile.address || ''}
                      onChange={handleChange}
                      className="w-full p-2 mt-1 border rounded dark:bg-gray-800 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">City</label>
                    <input
                      name="city"
                      value={profile.city || ''}
                      onChange={handleChange}
                      className="w-full p-2 mt-1 border rounded dark:bg-gray-800 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Country</label>
                    <input
                      name="country"
                      value={profile.country || ''}
                      onChange={handleChange}
                      className="w-full p-2 mt-1 border rounded dark:bg-gray-800 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Job</label>
                    <input
                      name="job"
                      value={profile.job || ''}
                      onChange={handleChange}
                      className="w-full p-2 mt-1 border rounded dark:bg-gray-800 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Next of Kin</label>
                    <input
                      name="nextOfKin"
                      value={profile.nextOfKin || ''}
                      onChange={handleChange}
                      className="w-full p-2 mt-1 border rounded dark:bg-gray-800 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Next of Kin Relationship</label>
                    <input
                      name="nextOfKinRelationship"
                      value={profile.nextOfKinRelationship || ''}
                      onChange={handleChange}
                      className="w-full p-2 mt-1 border rounded dark:bg-gray-800 dark:text-white"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
                  >
                    {loading ? 'Saving...' : 'Update Profile'}
                  </button>
                </form>
              </div>
            )
          )}
        </div>
      </div>
    </Dialog>
  );
};

export default ProfileDrawer;
