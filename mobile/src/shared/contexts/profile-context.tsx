import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react';
import { useAuth } from './auth-context';
import type { UserProfile, OnboardingFormData, ProfileContextValue } from '../types/profile';
import {
  getUserProfile,
  saveOnboardingProfile,
  updateUserProfile,
} from '../services/profile-service';

const ProfileContext = createContext<ProfileContextValue | null>(null);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);

  const fetchProfile = useCallback(async (uid: string) => {
    setIsLoadingProfile(true);
    try {
      const data = await getUserProfile(uid);
      setProfile(data);
    } finally {
      setIsLoadingProfile(false);
    }
  }, []);

  useEffect(() => {
    if (user) {
      fetchProfile(user.uid);
    } else {
      setProfile(null);
      setIsLoadingProfile(false);
    }
  }, [user, fetchProfile]);

  async function saveOnboarding(data: OnboardingFormData) {
    if (!user) return;
    await saveOnboardingProfile(user.uid, user.email, data);
    await fetchProfile(user.uid);
  }

  async function updateProfile(data: Partial<UserProfile>) {
    if (!user) return;
    await updateUserProfile(user.uid, data);
    await fetchProfile(user.uid);
  }

  async function refreshProfile() {
    if (!user) return;
    await fetchProfile(user.uid);
  }

  return (
    <ProfileContext.Provider
      value={{ profile, isLoadingProfile, saveOnboarding, updateProfile, refreshProfile }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile(): ProfileContextValue {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
}
