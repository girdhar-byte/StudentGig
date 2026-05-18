import { useApp } from '@/context/AppContext';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
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
  AreaChart,
  Area
} from 'recharts';
import { 
  Plus, 
  Layout, 
  ClipboardList, 
  CheckCircle2, 
  Users, 
  ArrowRight,
  TrendingUp,
  CreditCard,
  Target
} from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

const data = [
  { name: 'Mon', spent: 0 },
  { name: 'Tue', spent: 120 },
  { name: 'Wed', spent: 80 },
  { name: 'Thu', spent: 45 },
  { name: 'Fri', spent: 250 },
  { name: 'Sat', spent: 0 },
  { name: 'Sun', spent: 0 },
];

export default function ClientDashboard() {
  const { user } = useAuth();
  const { tasks, bids, updateBidStatus, updateTaskStatus } = useApp();

  const myTasks = tasks.filter(t => t.clientId === user?.id);
  const activeTasks = myTasks.filter(t => t.status !== 'completed');
  const completedTasks = myTasks.filter(t => t.status === 'completed');

  const incomingBids = bids.filter(b => myTasks.some(t => t.id === b.taskId && t.status === 'open'));

  const handleAcceptBid = (bidId: string, taskId: string) => {
    updateBidStatus(bidId, 'accepted');
    updateTaskStatus(taskId, 'in-progress');
  };

  return (
    <div className="container mx-auto px-4 py-8 lg:px-8 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-gray-900">Welcome, {user?.name} 👋</h1>
          <p className="text-gray-500">Manage your active projects and review student proposals.</p>
        </div>
        <Link to="/post-task">
          <Button className="gap-2 shadow-lg shadow-blue-900/10">
            <Plus className="h-5 w-5" /> Post New Task
          </Button>
        </Link>
      </div>

      {/* Stats Widgets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-none shadow-xl shadow-blue-900/5 overflow-visible">
          <CardContent className="p-6 relative">
            <div className="h-12 w-12 rounded-2xl bg-blue-50 flex items-center justify-center text-[#1F4E79] mb-4">
               <ClipboardList className="h-6 w-6" />
            </div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Total Tasks</p>
            <h3 className="text-3xl font-bold text-gray-900">{myTasks.length}</h3>
            <div className="absolute right-6 bottom-6 h-12 w-12 text-blue-100">
               <TrendingUp className="h-full w-full" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-xl shadow-blue-900/5">
          <CardContent className="p-6">
            <div className="h-12 w-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600 mb-4">
               <Target className="h-6 w-6" />
            </div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Active Projects</p>
            <h3 className="text-3xl font-bold text-gray-900">{activeTasks.length}</h3>
          </CardContent>
        </Card>
        <Card className="border-none shadow-xl shadow-blue-900/5">
          <CardContent className="p-6">
            <div className="h-12 w-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-4">
               <CheckCircle2 className="h-6 w-6" />
            </div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Completed</p>
            <h3 className="text-3xl font-bold text-gray-900">{completedTasks.length}</h3>
          </CardContent>
        </Card>
        <Card className="border-none shadow-xl shadow-blue-900/5 bg-[#1F4E79] text-white">
          <CardContent className="p-6">
            <div className="h-12 w-12 rounded-2xl bg-white/10 flex items-center justify-center text-white mb-4">
               <CreditCard className="h-6 w-6" />
            </div>
            <p className="text-xs font-bold text-blue-200 uppercase tracking-widest mb-1">Total Spending</p>
            <h3 className="text-3xl font-bold">$495.00</h3>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart */}
        <Card className="lg:col-span-2 border-none shadow-xl shadow-blue-900/5 overflow-hidden">
          <CardHeader className="bg-white border-b border-gray-50 flex flex-row items-center justify-between pb-4">
            <div>
              <CardTitle>Spending Overview</CardTitle>
              <p className="text-xs text-gray-500 mt-1">Your investment in student talent this week.</p>
            </div>
            <Badge variant="primary">Last 7 Days</Badge>
          </CardHeader>
          <CardContent className="p-8 pt-10">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorSpent" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1F4E79" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#1F4E79" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dx={-10} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                    itemStyle={{ fontWeight: 'bold', color: '#1F4E79' }}
                  />
                  <Area type="monotone" dataKey="spent" stroke="#1F4E79" strokeWidth={3} fillOpacity={1} fill="url(#colorSpent)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Proposals */}
        <Card className="border-none shadow-xl shadow-blue-900/5">
          <CardHeader className="border-b border-gray-50">
            <CardTitle className="text-lg">Recent Proposals</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-gray-50 overflow-hidden">
              {incomingBids.map((bid) => (
                <div key={bid.id} className="p-4 hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-8 w-8 rounded-full bg-[#1F4E79]/10 flex items-center justify-center font-bold text-[#1F4E79] text-xs">
                       {bid.freelancerName.charAt(0)}
                    </div>
                    <div className="flex-1">
                       <p className="text-sm font-bold text-gray-900">{bid.freelancerName}</p>
                       <p className="text-[10px] text-gray-500 line-clamp-1">{tasks.find(t => t.id === bid.taskId)?.title}</p>
                    </div>
                    <span className="text-sm font-bold text-[#1F4E79]">${bid.amount}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1 text-[10px] h-7" onClick={() => handleAcceptBid(bid.id, bid.taskId)}>Accept</Button>
                    <Link to="/messages" className="flex-1">
                      <Button variant="ghost" size="sm" className="w-full text-[10px] h-7">Chat</Button>
                    </Link>
                  </div>
                </div>
              ))}
              {incomingBids.length === 0 && (
                <div className="p-8 text-center text-gray-400 italic text-sm">
                   No new proposals yet.
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Posted Tasks Table */}
      <Card className="border-none shadow-xl shadow-blue-900/5">
        <CardHeader>
           <CardTitle>Your Posted Tasks</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
           <div className="overflow-x-auto">
              <table className="w-full text-left">
                 <thead>
                    <tr className="bg-slate-50 border-y border-gray-100">
                       <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Task Details</th>
                       <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Category</th>
                       <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Budget</th>
                       <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Status</th>
                       <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Bids</th>
                       <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Action</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-50">
                    {myTasks.map((task) => (
                       <tr key={task.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="px-6 py-4">
                             <p className="font-bold text-gray-900 text-sm">{task.title}</p>
                             <p className="text-xs text-gray-500">Posted {task.postedAt}</p>
                          </td>
                          <td className="px-6 py-4">
                             <Badge variant="primary">{task.category}</Badge>
                          </td>
                          <td className="px-6 py-4">
                             <p className="font-bold text-gray-900">${task.budget}</p>
                          </td>
                          <td className="px-6 py-4">
                             <Badge 
                               variant={task.status === 'open' ? 'info' : task.status === 'in-progress' ? 'warning' : 'success'}
                               className="capitalize"
                             >
                               {task.status.replace('-', ' ')}
                             </Badge>
                          </td>
                          <td className="px-6 py-4">
                             <p className="text-sm font-medium text-gray-600 flex items-center gap-1">
                                <Users className="h-3 w-3" /> {task.bidCount}
                             </p>
                          </td>
                          <td className="px-6 py-4">
                             <Link to={`/tasks/${task.id}`}>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                   <ArrowRight className="h-4 w-4 text-gray-400" />
                                </Button>
                             </Link>
                          </td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </CardContent>
      </Card>
    </div>
  );
}
