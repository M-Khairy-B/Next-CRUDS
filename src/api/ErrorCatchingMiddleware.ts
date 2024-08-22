import { isRejectedWithValue } from '@reduxjs/toolkit';
import type { MiddlewareAPI, Middleware } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

export const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    if (isRejectedWithValue(action)) {
      console.warn('RTK Query encountered an error:', action.error);
      toast.error(
        'data' in action.error
          ? (action.error.data as { message: string }).message
          : action.error.message as string ,
        {
          duration: 5000,
          position: 'top-center',
        }
      );
    }

    return next(action);
  };
