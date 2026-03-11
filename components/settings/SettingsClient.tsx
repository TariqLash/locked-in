"use client";
import React, { useState } from 'react';
import { updateProfile, changePassword, deleteAccount } from '@/action/user';

type Props = {
  firstName: string;
  lastName: string;
  email: string;
  hasPassword: boolean;
};

export default function SettingsClient({ firstName, lastName, email, hasPassword }: Props) {
  const [editFirst, setEditFirst] = useState(firstName);
  const [editLast, setEditLast] = useState(lastName);
  const [displayName, setDisplayName] = useState({ first: firstName, last: lastName });
  const [profileMsg, setProfileMsg] = useState('');

  const [currentPw, setCurrentPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [pwMsg, setPwMsg] = useState('');
  const [pwError, setPwError] = useState(false);

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    setDisplayName({ first: editFirst, last: editLast });
    setProfileMsg('Saved!');
    updateProfile(editFirst, editLast);
    setTimeout(() => setProfileMsg(''), 2000);
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwError(false);
    if (newPw !== confirmPw) { setPwError(true); setPwMsg("Passwords don't match"); return; }
    if (newPw.length < 6) { setPwError(true); setPwMsg("Must be at least 6 characters"); return; }
    setPwMsg('Saving...');
    try {
      await changePassword(currentPw, newPw);
      setPwMsg('Password updated!');
      setCurrentPw(''); setNewPw(''); setConfirmPw('');
      setTimeout(() => setPwMsg(''), 3000);
    } catch (err: any) {
      setPwError(true);
      setPwMsg(err.message || 'Failed to update password');
    }
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm('This will permanently delete your account and all habit data. Continue?')) return;
    if (!window.confirm('Last chance — this cannot be undone. Delete account?')) return;
    await deleteAccount();
  };

  return (
    <div className='flex flex-col gap-6 max-w-lg mx-auto px-4 pt-6 pb-20'>

      {/* Profile */}
      <section className='bg-gray-950 border border-gray-800 rounded-xl p-6'>
        <h2 className='text-base font-semibold mb-1'>Profile</h2>
        <p className='text-xs text-gray-500 mb-4'>Your display name shown across the app</p>
        <form onSubmit={handleProfileSave} className='flex flex-col gap-3'>
          <div className='flex gap-3'>
            <div className='flex flex-col gap-1 flex-1'>
              <label className='text-xs text-gray-400'>First name</label>
              <input
                className='bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-gray-500'
                value={editFirst}
                onChange={e => setEditFirst(e.target.value)}
              />
            </div>
            <div className='flex flex-col gap-1 flex-1'>
              <label className='text-xs text-gray-400'>Last name</label>
              <input
                className='bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-gray-500'
                value={editLast}
                onChange={e => setEditLast(e.target.value)}
              />
            </div>
          </div>
          <div className='flex flex-col gap-1'>
            <label className='text-xs text-gray-400'>Email</label>
            <input
              className='bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-500 cursor-not-allowed'
              value={email}
              disabled
            />
          </div>
          <div className='flex items-center gap-3 mt-1'>
            <button type='submit' className='bg-white text-black text-sm font-medium rounded-lg px-4 py-2 hover:bg-gray-200 transition-colors'>
              Save changes
            </button>
            {profileMsg && <span className='text-xs text-green-400'>{profileMsg}</span>}
          </div>
        </form>
      </section>

      {/* Security */}
      {hasPassword && (
        <section className='bg-gray-950 border border-gray-800 rounded-xl p-6'>
          <h2 className='text-base font-semibold mb-1'>Security</h2>
          <p className='text-xs text-gray-500 mb-4'>Update your password</p>
          <form onSubmit={handlePasswordChange} className='flex flex-col gap-3'>
            <div className='flex flex-col gap-1'>
              <label className='text-xs text-gray-400'>Current password</label>
              <input
                type='password'
                className='bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-gray-500'
                value={currentPw}
                onChange={e => setCurrentPw(e.target.value)}
              />
            </div>
            <div className='flex flex-col gap-1'>
              <label className='text-xs text-gray-400'>New password</label>
              <input
                type='password'
                className='bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-gray-500'
                value={newPw}
                onChange={e => setNewPw(e.target.value)}
              />
            </div>
            <div className='flex flex-col gap-1'>
              <label className='text-xs text-gray-400'>Confirm new password</label>
              <input
                type='password'
                className='bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-gray-500'
                value={confirmPw}
                onChange={e => setConfirmPw(e.target.value)}
              />
            </div>
            <div className='flex items-center gap-3 mt-1'>
              <button type='submit' className='bg-white text-black text-sm font-medium rounded-lg px-4 py-2 hover:bg-gray-200 transition-colors'>
                Update password
              </button>
              {pwMsg && <span className={`text-xs ${pwError ? 'text-red-400' : 'text-green-400'}`}>{pwMsg}</span>}
            </div>
          </form>
        </section>
      )}

      {/* Danger Zone */}
      <section className='bg-gray-950 border border-red-900/50 rounded-xl p-6'>
        <h2 className='text-base font-semibold mb-1 text-red-400'>Danger Zone</h2>
        <p className='text-xs text-gray-500 mb-4'>Permanently delete your account and all associated habit data. This cannot be undone.</p>
        <button
          onClick={handleDeleteAccount}
          className='bg-red-950 text-red-300 border border-red-800 text-sm font-medium rounded-lg px-4 py-2 hover:bg-red-900 transition-colors'
        >
          Delete account
        </button>
      </section>

    </div>
  );
}
