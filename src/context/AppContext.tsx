import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User, UserRole, Task, Bid, Notification } from '../types';
import { mockUsers, mockTasks, mockBids, mockNotifications } from '../data/mockData';

interface AppContextType {
  tasks: Task[];
  bids: Bid[];
  notifications: Notification[];
  addTask: (task: Omit<Task, 'id' | 'postedAt' | 'status' | 'bidCount'>) => void;
  addBid: (bid: Omit<Bid, 'id' | 'createdAt' | 'status'>) => void;
  updateTaskStatus: (taskId: string, status: Task['status']) => void;
  updateBidStatus: (bidId: string, status: Bid['status']) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [bids, setBids] = useState<Bid[]>(mockBids);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

  const addTask = (taskInput: Omit<Task, 'id' | 'postedAt' | 'status' | 'bidCount'>) => {
    const newTask: Task = {
      ...taskInput,
      id: `t${tasks.length + 1}`,
      postedAt: new Date().toISOString().split('T')[0],
      status: 'open',
      bidCount: 0
    };
    setTasks([newTask, ...tasks]);
  };

  const addBid = (bidInput: Omit<Bid, 'id' | 'createdAt' | 'status'>) => {
    const newBid: Bid = {
      ...bidInput,
      id: `b${bids.length + 1}`,
      createdAt: new Date().toISOString().split('T')[0],
      status: 'pending'
    };
    setBids([newBid, ...bids]);
    
    // Update task bid count
    setTasks(prev => prev.map(t => t.id === bidInput.taskId ? { ...t, bidCount: t.bidCount + 1 } : t));
  };

  const updateTaskStatus = (taskId: string, status: Task['status']) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status } : t));
  };

  const updateBidStatus = (bidId: string, status: Bid['status']) => {
    setBids(prev => prev.map(b => b.id === bidId ? { ...b, status } : b));
  };

  return (
    <AppContext.Provider value={{ tasks, bids, notifications, addTask, addBid, updateTaskStatus, updateBidStatus }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
