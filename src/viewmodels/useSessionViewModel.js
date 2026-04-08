import { useEffect, useState } from "react";
import { getItem, removeItem } from "../helpers/storage";
import { deleteToken } from "../helpers/tokenStorage";
import { STORAGE_KEYS } from "../models/storageKeys";

export default function useSessionViewModel() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        setLoading(true);
        const storedUser = await getItem(STORAGE_KEYS.userProfile);
        setUser(storedUser);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const logout = async () => {
    await deleteToken();
    await removeItem(STORAGE_KEYS.userProfile);
  };

  return {
    user,
    loading,
    logout,
  };
}
