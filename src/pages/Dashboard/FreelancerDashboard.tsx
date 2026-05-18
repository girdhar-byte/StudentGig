import { useApp } from '@/context/AppContext';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';
import { 
  Trophy, 
  Star, 
  Zap, 
  DollarSign, 
  Clock, 
  Search, 
  ArrowRight,
  TrendingUp,
  Wallet,
  Briefcase
} from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

const earningsData = [
  { name: 'Jan', amount: 150 },
  { name: 'Feb', amount: 320 },
  { name: 'Mar', amount: 280 },
  { name: 'Apr', amount: 640 },
  { name: 'May', amount: 490 },
];

export default function FreelancerDashboard() {
  const { user } = useAuth();
  const { bids, tasks } = useApp();

  const myBids = bids.filter(b => b.freelancerId === user?.id);
  const activeProjects = tasks.filter(t => t.status === 'in-progress' && bids.some(b => b.taskId === t.id && b.freelancerId === user?.id && b.status === 'accepted'));
  const completedProjects = tasks.filter(t => t.status === 'completed' && bids.some(b => b.taskId === t.id && b.freelancerId === user?.id && b.status === 'accepted'));

  const pendingBidsCount = myBids.filter(b => b.status === 'pending').length;

  return (
    <div className="container mx-auto px-4 py-8 lg:px-8 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-gray-900">Freelancer Studio</h1>
          <p className="text-gray-500">Track your student earnings and manage active project timelines.</p>
        </div>
        <Link to="/tasks">
          <Button variant="secondary" className="gap-2">
            <Search className="h-4 w-4" /> Find New Tasks
          </Button>
        </Link>
      </div>

      {/* Stats Area */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-none shadow-xl shadow-primary/20 bg-primary text-white">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center">
                <Wallet className="h-5 w-5" />
              </div>
              <Badge className="bg-white/10 text-white/80 border-none">+12.5%</Badge>
            </div>
            <p className="text-xs font-bold text-white/60 uppercase tracking-widest mb-1">Total Earnings</p>
            <h3 className="text-3xl font-bold">$1,880.00</h3>
          </CardContent>
        </Card>
        <Card className="border-none shadow-xl shadow-slate-200">
          <CardContent className="p-6">
            <div className="h-10 w-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 mb-4">
              <Star className="h-5 w-5 fill-amber-600" />
            </div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Success Rating</p>
            <h3 className="text-3xl font-bold">4.9/5.0</h3>
            <p className="text-[10px] text-gray-400 mt-1 font-medium">Based on 24 reviews</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-xl shadow-blue-900/5">
          <CardContent className="p-6">
            <div className="h-10 w-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 mb-4">
              <Zap className="h-5 w-5" />
            </div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Active Bids</p>
            <h3 className="text-3xl font-bold">{pendingBidsCount}</h3>
          </CardContent>
        </Card>
        <Card className="border-none shadow-xl shadow-blue-900/5">
          <CardContent className="p-6">
            <div className="h-10 w-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-4">
              <Trophy className="h-5 w-5" />
            </div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Tasks Won</p>
            <h3 className="text-3xl font-bold">{activeProjects.length + completedProjects.length}</h3>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Earnings Chart */}
        <Card className="lg:col-span-2 border-none shadow-xl shadow-blue-900/5">
          <CardHeader>
            <CardTitle>Earnings History</CardTitle>
            <CardDescription>Monthly breakdown of your student freelancing income.</CardDescription>
          </CardHeader>
          <CardContent className="p-8 pt-0">
             <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={earningsData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dx={-10} />
                    <Tooltip 
                      cursor={{fill: '#f8fafc'}}
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                    />
                    <Bar dataKey="amount" fill="#1f4e79" radius={[6, 6, 0, 0]} barSize={40} />
                  </BarChart>
                </ResponsiveContainer>
             </div>
          </CardContent>
        </Card>

        {/* Active Projects List */}
        <Card className="border-none shadow-xl shadow-blue-900/5">
          <CardHeader>
            <CardTitle className="text-lg">Current Milestones</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
             <div className="divide-y divide-gray-50">
               {activeProjects.map((project) => (
                 <div key={project.id} className="p-6 space-y-4">
                    <div className="flex justify-between items-start">
                       <div>
                          <h4 className="font-bold text-gray-900 leading-none">{project.title}</h4>
                          <p className="text-xs text-gray-500 mt-1">Due {project.deadline}</p>
                       </div>
                       <Badge variant="warning" className="capitalize">In Progress</Badge>
                    </div>
                    <div className="space-y-2">
                       <div className="flex justify-between text-xs font-medium">
                          <span className="text-gray-400">Progress</span>
                          <span className="text-gray-900">65%</span>
                       </div>
                       <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-amber-400 rounded-full" style={{ width: '65%' }} />
                       </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full h-8 text-[10px]">Submit Milestone</Button>
                 </div>
               ))}
               {activeProjects.length === 0 && (
                 <div className="p-12 text-center text-gray-400 italic text-sm">
                   No ongoing projects. Go find a task!
                 </div>
               )}
             </div>
          </CardContent>
        </Card>
      </div>

      {/* Bid History */}
      <Card className="border-none shadow-xl shadow-blue-900/5">
         <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Bid History</CardTitle>
            <Button variant="ghost" size="sm" className="text-xs font-bold text-[#1F4E79]">View All</Button>
         </CardHeader>
         <CardContent className="p-0">
            <div className="overflow-x-auto">
               <table className="w-full text-left">
                  <thead>
                     <tr className="bg-slate-50 border-y border-gray-100">
                        <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Job Details</th>
                        <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Category</th>
                        <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">My Bid</th>
                        <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Status</th>
                        <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Applied</th>
                        <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Action</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                     {myBids.map((bid) => {
                       const task = tasks.find(t => t.id === bid.taskId);
                       return (
                         <tr key={bid.id} className="hover:bg-slate-50/50 transition-colors">
                            <td className="px-6 py-4">
                               <p className="font-bold text-gray-900 text-sm whitespace-nowrap">{task?.title || 'Unknown Task'}</p>
                               <p className="text-xs text-gray-500">by {task?.clientName}</p>
                            </td>
                            <td className="px-6 py-4">
                               <Badge variant="primary">{task?.category}</Badge>
                            </td>
                            <td className="px-6 py-4">
                               <p className="font-bold text-gray-900">${bid.amount}</p>
                               <p className="text-[10px] text-gray-400">{bid.timeline} delivery</p>
                            </td>
                            <td className="px-6 py-4">
                               <Badge 
                                 variant={bid.status === 'pending' ? 'info' : bid.status === 'accepted' ? 'success' : 'danger'}
                                 className="capitalize"
                               >
                                 {bid.status}
                               </Badge>
                            </td>
                            <td className="px-6 py-4">
                               <p className="text-xs text-gray-500">{bid.createdAt}</p>
                            </td>
                            <td className="px-6 py-4">
                               <Link to={`/tasks/${bid.taskId}`}>
                                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                     <ArrowRight className="h-4 w-4 text-gray-400" />
                                  </Button>
                               </Link>
                            </td>
                         </tr>
                       );
                     })}
                  </tbody>
               </table>
            </div>
         </CardContent>
      </Card>
    </div>
  );
}
