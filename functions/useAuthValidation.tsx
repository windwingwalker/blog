import { useEffect } from 'react';
import { useAppDispatch } from '../shared/hooks';
import { updatePath } from '../shared/pathSlice';
import { login, logout } from '../shared/userSlice';
import { isGuest } from './auth';

/**
 * Custom hook to validate user authentication and update current path
 * @param path - The path constant for the current page (e.g., HOME_PATH, ABOUT_PATH)
 */
export const useAuthValidation = (path: string): void => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const validateRole = async () => {
      dispatch(updatePath(path));
      dispatch(await isGuest() ? logout() : login("admin"));
    };
    validateRole();
  }, [path, dispatch]);
};
