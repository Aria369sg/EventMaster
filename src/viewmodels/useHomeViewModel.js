import { useEffect, useState } from "react";
import { getItem, removeItem } from "../helpers/storage";
import { deleteToken } from "../helpers/tokenStorage";
import { STORAGE_KEYS } from "../models/storageKeys";
import { getMockEvents } from "../services/mockEventService";

export default function useHomeViewModel() {
  const [user, setUser] = useState(null);
  const [eventsCount, setEventsCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [storedUser, events] = await Promise.all([
          getItem(STORAGE_KEYS.userProfile),
          getMockEvents(),
        ]);

        setUser(storedUser);
        setEventsCount(events.length);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const logout = async () => {
    await deleteToken();
    await removeItem(STORAGE_KEYS.userProfile);
    await removeItem(STORAGE_KEYS.authMode);
  };

  return {
    user,
    eventsCount,
    loading,
    logout,
  };
}
