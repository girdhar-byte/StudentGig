import { User, Task, Bid, Message, Notification } from '../types';

export const mockUsers: User[] = [
  {
    id: 'u1',
    name: 'Alex Johnson',
    email: 'alex@uni.edu',
    role: 'client',
    university: 'Stanford University',
    joinedAt: '2023-01-15'
  },
  {
    id: 'u2',
    name: 'Sarah Chen',
    email: 'sarah@uni.edu',
    role: 'freelancer',
    university: 'MIT',
    rating: 4.8,
    reviewsCount: 24,
    joinedAt: '2023-02-10'
  },
  {
    id: 'u3',
    name: 'Admin User',
    email: 'admin@studentgig.com',
    role: 'admin',
    university: 'StudentGig HQ',
    joinedAt: '2022-12-01'
  }
];

export const mockTasks: Task[] = [
  {
    id: 't1',
    title: 'Modern Portfolio Website',
    description: 'I need a sleek, modern portfolio website built using React and Tailwind CSS. Should include an about me section, project gallery, and contact form.',
    category: 'Web Development',
    budget: 250,
    deadline: '2024-06-20',
    postedAt: '2024-05-10',
    status: 'open',
    clientId: 'u1',
    clientName: 'Alex Johnson',
    bidCount: 5,
    skills: ['React', 'Tailwind', 'Motion']
  },
  {
    id: 't2',
    title: 'Brand Logo Design',
    description: 'Looking for a creative logo for my new student-led startup. Need something minimalist yet catchy.',
    category: 'Graphic Design',
    budget: 80,
    deadline: '2024-06-05',
    postedAt: '2024-05-15',
    status: 'in-progress',
    clientId: 'u1',
    clientName: 'Alex Johnson',
    bidCount: 12,
    skills: ['Illustrator', 'Branding']
  },
  {
    id: 't3',
    title: 'Economics Essay Proofreading',
    description: 'Need someone to proofread my 3000-word essay on Macroeconomics. Focus on grammar and citation styles.',
    category: 'Content Writing',
    budget: 45,
    deadline: '2024-05-25',
    postedAt: '2024-05-18',
    status: 'open',
    clientId: 'u1',
    clientName: 'Alex Johnson',
    bidCount: 3,
    skills: ['Proofreading', 'Economics']
  },
  {
    id: 't4',
    title: 'Python Data Scraper',
    description: 'Build a script to scrape product data from various e-commerce sites and export to CSV.',
    category: 'Web Development',
    budget: 150,
    deadline: '2024-06-15',
    postedAt: '2024-05-12',
    status: 'completed',
    clientId: 'u4',
    clientName: 'James Wilson',
    bidCount: 8,
    skills: ['Python', 'BeautifulSoup']
  }
];

export const mockBids: Bid[] = [
  {
    id: 'b1',
    taskId: 't1',
    freelancerId: 'u2',
    freelancerName: 'Sarah Chen',
    freelancerRating: 4.8,
    amount: 220,
    timeline: '10 days',
    coverLetter: "I've built several React portfolios before and can deliver a high-quality, responsive site for you.",
    status: 'pending',
    createdAt: '2024-05-11'
  }
];

export const mockNotifications: Notification[] = [
  {
    id: 'n1',
    userId: 'u1',
    title: 'New Bid Received',
    content: 'Sarah Chen placed a bid on "Modern Portfolio Website"',
    type: 'bid',
    read: false,
    createdAt: '2024-05-11T10:00:00Z'
  }
];
