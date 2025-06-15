import { createContext, useContext, useState, ReactNode } from 'react';

export type Request = {
  id: number;
  tournamentId: number;
  status: 'APPROVAL' | 'ACCEPTED' | 'CANCELLED';
};

type RequestsContextType = {
  requests: Request[];
  addRequest: (tournamentId: number) => void;
  cancelRequest: (id: number) => void;
};

const RequestsContext = createContext<RequestsContextType | undefined>(undefined);



export const RequestsProvider = ({ children }: { children: ReactNode }) => {
  const [requests, setRequests] = useState<Request[]>([]);

  const addRequest = (tournamentId: number) => {
    const newRequest: Request = {
      id: Date.now(),
      tournamentId,
      status: 'APPROVAL',
    };
    setRequests(prev => [...prev, newRequest]);
  };

  const cancelRequest = (id: number) => {
    setRequests(prev => prev.filter(req => req.id !== id));
  };

  return (
    <RequestsContext.Provider value={{ requests, addRequest, cancelRequest }}>
      {children}
    </RequestsContext.Provider>
  );
};

export const useRequests = (): RequestsContextType => {
  const context = useContext(RequestsContext);
  if (!context) {
    throw new Error('useRequests must be used within a RequestsProvider');
  }
  return context;
};