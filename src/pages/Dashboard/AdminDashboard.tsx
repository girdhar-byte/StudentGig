import { useApp } from '@/context/AppContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { 
  Users, 
  ClipboardList, 
  AlertTriangle, 
  ShieldAlert, 
  BarChart3, 
  Trash2, 
  Search,
  Activity,
  FileText
} from 'lucide-react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Legend,
  Tooltip as ReTooltip
} from 'recharts';

const platformData = [
  { name: 'Web Dev', value: 400 },
  { name: 'Graphic', value: 300 },
  { name: 'Writing', value: 300 },
  { name: 'Design', value: 200 },
];

const COLORS = ['#1F4E79', '#3b82f6', '#10b981', '#f59e0b'];

export default function AdminDashboard() {
  const { tasks } = useApp();

  return (
    <div className="container mx-auto px-4 py-8 lg:px-8 space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-gray-900">Admin Control Panel</h1>
          <p className="text-gray-500">Monitor platform health and moderate student interactions.</p>
        </div>
        <Button variant="danger" className="gap-2">
           <ShieldAlert className="h-4 w-4" /> Security Log
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-none shadow-lg">
           <CardContent className="p-6">
              <div className="flex items-center gap-4">
                 <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center text-[#1F4E79]">
                   <Users className="h-5 w-5" />
                 </div>
                 <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Users</p>
                    <h3 className="text-2xl font-bold">5,241</h3>
                 </div>
              </div>
           </CardContent>
        </Card>
        <Card className="border-none shadow-lg">
           <CardContent className="p-6">
              <div className="flex items-center gap-4">
                 <div className="h-10 w-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                   <Activity className="h-5 w-5" />
                 </div>
                 <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Live Tasks</p>
                    <h3 className="text-2xl font-bold">{tasks.length}</h3>
                 </div>
              </div>
           </CardContent>
        </Card>
        <Card className="border-none shadow-lg">
           <CardContent className="p-6">
              <div className="flex items-center gap-4">
                 <div className="h-10 w-10 rounded-full bg-red-50 flex items-center justify-center text-red-600">
                   <AlertTriangle className="h-5 w-5" />
                 </div>
                 <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Reported</p>
                    <h3 className="text-2xl font-bold">3</h3>
                 </div>
              </div>
           </CardContent>
        </Card>
        <Card className="border-none shadow-lg">
           <CardContent className="p-6">
              <div className="flex items-center gap-4">
                 <div className="h-10 w-10 rounded-full bg-slate-50 flex items-center justify-center text-gray-600">
                   <BarChart3 className="h-5 w-5" />
                 </div>
                 <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Fees Earned</p>
                    <h3 className="text-2xl font-bold">$1,240</h3>
                 </div>
              </div>
           </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         <Card className="border-none shadow-lg">
            <CardHeader>
               <CardTitle>Category Distribution</CardTitle>
            </CardHeader>
            <CardContent>
               <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={platformData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {platformData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <ReTooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
               </div>
            </CardContent>
         </Card>

         <Card className="border-none shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between bg-white border-b border-gray-50 pb-4">
               <div>
                  <CardTitle>Moderation Queue</CardTitle>
                  <p className="text-xs text-gray-500 mt-1">Pending approval or reported tasks.</p>
               </div>
               <Badge variant="danger">High Priority</Badge>
            </CardHeader>
            <CardContent className="p-0">
               <div className="divide-y divide-gray-50">
                  <div className="p-6 flex items-center justify-between">
                     <div className="flex gap-4">
                        <div className="h-10 w-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600">
                          <FileText className="h-5 w-5" />
                        </div>
                        <div>
                           <h4 className="text-sm font-bold text-gray-900 leading-none">Suspicious Task Posted</h4>
                           <p className="text-xs text-gray-500 mt-2">Title: "Quick cash for CC numbers" - Reported by 4 users</p>
                        </div>
                     </div>
                     <div className="flex gap-2">
                        <Button variant="danger" size="sm" className="h-8">Delete</Button>
                        <Button variant="outline" size="sm" className="h-8">Dismiss</Button>
                     </div>
                  </div>
                  <div className="p-6 flex items-center justify-between">
                     <div className="flex gap-4">
                        <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                          <Users className="h-5 w-5" />
                        </div>
                        <div>
                           <h4 className="text-sm font-bold text-gray-900 leading-none">Identity Verification</h4>
                           <p className="text-xs text-gray-500 mt-2">Alex J. uploaded student card - Needs manual review</p>
                        </div>
                     </div>
                     <div className="flex gap-2">
                        <Button size="sm" className="h-8">Verify</Button>
                        <Button variant="outline" size="sm" className="h-8">Reject</Button>
                     </div>
                  </div>
               </div>
            </CardContent>
         </Card>
      </div>
    </div>
  );
}
