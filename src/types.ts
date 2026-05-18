export type UserRole = 'client' | 'freelancer' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  university: string;
  rating?: number;
  reviewsCount?: number;
  joinedAt: string;
}

export type TaskStatus = 'open' | 'in-progress' | 'completed' | 'cancelled';

export interface Task {
  id: string;
  title: string;
  description: string;
  category: string;
  budget: number;
  deadline: string;
  postedAt: string;
  status: TaskStatus;
  clientId: string;
  clientName: string;
  bidCount: number;
  skills: string[];
}

export type BidStatus = 'pending' | 'accepted' | 'rejected';

export interface Bid {
  id: string;
  taskId: string;
  freelancerId: string;
  freelancerName: string;
  freelancerRating: number;
  amount: number;
  timeline: string;
  coverLetter: string;
  status: BidStatus;
  createdAt: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  timestamp: string;
  taskId?: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  content: string;
  type: 'bid' | 'message' | 'system' | 'status';
  read: boolean;
  createdAt: string;
}
