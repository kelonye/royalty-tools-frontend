import React from 'react';
import moment from 'moment';
import * as qs from 'query-string';
import { useLocation, useNavigate } from 'react-router';

import { useRequest, DEFAULT_QUERY } from '@app/hooks/useRequest';

const CoralCubeContext = React.createContext<{
  collections: string[] | null;
  collection: string | null;
  setCollection: (collection: string) => void;
  date: moment.Moment | null;
  setDate: (moment: moment.Moment | null) => void;
  page: number;
  setPage: (page: number) => void;
} | null>(null);

export const CoralCubeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { search } = useLocation();
  const navigate = useNavigate();

  const [date, setDate] = React.useState<moment.Moment | null>(null);

  const { result: collections } = useRequest<string[]>(
    '/collections',
    DEFAULT_QUERY
  );

  const { collection, page } = React.useMemo(() => {
    const params = qs.parse(search) as { collection: string; page: string };
    params.page = params.page || '1';
    return params;
  }, [search]);

  const updateUrl = React.useCallback(
    (params: { [key: string]: string }) => {
      const search = qs.parse(window.location.search);
      navigate('?' + qs.stringify({ ...search, ...params }));
    },
    [navigate]
  );

  const setCollection = React.useCallback(
    (collection: string) => {
      updateUrl({ collection });
    },
    [updateUrl]
  );

  const setPage = React.useCallback(
    (page: number) => {
      updateUrl({ page: page.toString() });
    },
    [updateUrl]
  );

  React.useEffect(() => {
    if (!collection && collections) {
      setCollection(collections[0]);
    }
  }, [collections, setCollection, collection]);

  return (
    <CoralCubeContext.Provider
      value={{
        collections,
        collection,
        setCollection,
        date,
        setDate,
        page: parseInt(page),
        setPage,
      }}
    >
      {children}
    </CoralCubeContext.Provider>
  );
};

export function useCoralCube() {
  const context = React.useContext(CoralCubeContext);
  if (!context) {
    throw new Error('Missing CoralCube context');
  }
  return context;
}
