import * as React from 'react';
import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { 
  Calendar, 
  DollarSign, 
  Clock, 
  MapPin, 
  Briefcase, 
  User as UserIcon, 
  ChevronLeft,
  ArrowRight,
  ShieldCheck,
  Star,
  CheckCircle2
} from 'lucide-react';
import { motion } from 'motion/react';

export default function TaskDetail() {
  const { id } = useParams();
  const { tasks, bids, addBid } = useApp();
  const { user } = useAuth();
  const navigate = useNavigate();

  const task = tasks.find(t => t.id === id);
  const taskBids = bids.filter(b => b.taskId === id);

  const [bidAmount, setBidAmount] = useState('');
  const [bidTimeline, setBidTimeline] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [showBidForm, setShowBidForm] = useState(false);
  const [bidSuccess, setBidSuccess] = useState(false);

  if (!task) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold">Task not found</h1>
        <Link to="/tasks">
          <Button variant="outline" className="mt-4">Back to Marketplace</Button>
        </Link>
      </div>
    );
  }

  const handlePlaceBid = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }
    
    addBid({
      taskId: task.id,
      freelancerId: user.id,
      freelancerName: user.name,
      freelancerRating: user.rating || 5,
      amount: Number(bidAmount),
      timeline: bidTimeline,
      coverLetter: coverLetter,
    });

    setBidSuccess(true);
    setTimeout(() => {
      setBidSuccess(false);
      setShowBidForm(false);
    }, 2000);
  };

  return (
    <div className="container mx-auto px-4 py-8 lg:px-8">
      <Link to="/tasks" className="inline-flex items-center text-sm text-gray-500 hover:text-[#1F4E79] mb-8 group">
        <ChevronLeft className="h-4 w-4 mr-1 transition-transform group-hover:-translate-x-1" />
        Back to Marketplace
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-8">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="primary">{task.category}</Badge>
              <Badge variant="success" className="bg-emerald-50 text-emerald-600 border- emerald-100">Open for Proposals</Badge>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 leading-tight">{task.title}</h1>
            <div className="flex items-center gap-6 text-sm text-gray-500 font-medium">
              <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> Posted {task.postedAt}</span>
              <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> Remote / Campus</span>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-2">Description</h3>
            <p className="text-gray-600 leading-relaxed whitespace-pre-line">
              {task.description}
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-2">Required Skills</h3>
            <div className="flex flex-wrap gap-2">
              {task.skills.map(skill => (
                <span key={skill} className="px-4 py-2 bg-white border border-gray-100 rounded-xl text-xs font-bold text-gray-700 shadow-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Bid Section */}
          <div className="pt-8 block">
            <div className="flex items-center justify-between mb-6">
               <h3 className="text-xl font-bold text-gray-900">Total Proposals ({taskBids.length})</h3>
               {!showBidForm && user?.role === 'freelancer' && (
                  <Button onClick={() => setShowBidForm(true)}>Submit a Proposal</Button>
               )}
            </div>

            {showBidForm && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mb-8"
              >
                <Card className="border-[#1F4E79]/20 shadow-lg">
                  <CardHeader>
                    <CardTitle>Place Your Bid</CardTitle>
                    <CardDescription>Competitive pricing increases your chances of getting accepted.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {bidSuccess ? (
                      <div className="flex flex-col items-center justify-center py-8 text-center bg-emerald-50 rounded-xl border border-emerald-100">
                        <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
                          <CheckCircle2 className="h-7 w-7 text-emerald-600" />
                        </div>
                        <h4 className="text-lg font-bold text-emerald-900">Proposal Submitted!</h4>
                        <p className="text-sm text-emerald-700">Good luck! You'll be notified if the client accepts.</p>
                      </div>
                    ) : (
                      <form onSubmit={handlePlaceBid} className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                          <Input 
                            type="number" 
                            label="Your Bid ($)" 
                            required 
                            placeholder="Amount"
                            value={bidAmount}
                            onChange={(e) => setBidAmount(e.target.value)}
                          />
                          <Input 
                            type="text" 
                            label="Timeline" 
                            required 
                            placeholder="e.g. 3 days"
                            value={bidTimeline}
                            onChange={(e) => setBidTimeline(e.target.value)}
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-sm font-medium text-gray-700">Cover Letter</label>
                          <textarea 
                            rows={4} 
                            placeholder="Explain why you're the best fit for this task..." 
                            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:border-[#1F4E79] focus:outline-none"
                            required
                            value={coverLetter}
                            onChange={(e) => setCoverLetter(e.target.value)}
                          />
                        </div>
                        <div className="flex justify-end gap-3">
                          <Button type="button" variant="ghost" onClick={() => setShowBidForm(false)}>Cancel</Button>
                          <Button type="submit">Submit Proposal</Button>
                        </div>
                      </form>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            )}

            <div className="space-y-4">
              {taskBids.map((bid, i) => (
                <Card key={bid.id} className="hover:border-gray-200 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                       <div className="flex gap-4">
                          <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center border border-gray-100 text-[#1F4E79] font-bold">
                             {bid.freelancerName.charAt(0)}
                          </div>
                          <div>
                             <h4 className="font-bold text-gray-900">{bid.freelancerName}</h4>
                             <div className="flex items-center gap-1.5 text-xs text-amber-500 font-bold mb-1">
                                <Star className="h-3 w-3 fill-amber-500" /> {bid.freelancerRating} 
                                <span className="text-gray-400 font-normal">| {bid.timeline} delivery</span>
                             </div>
                             <p className="text-sm text-gray-600 line-clamp-2">{bid.coverLetter}</p>
                          </div>
                       </div>
                       <div className="text-right">
                          <p className="text-xl font-bold text-gray-900 text-[#1F4E79]">${bid.amount}</p>
                          <p className="text-[10px] text-gray-400 font-medium">Proposal {bid.createdAt}</p>
                       </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {taskBids.length === 0 && (
                <div className="py-12 border-2 border-dashed border-gray-100 rounded-3xl text-center text-gray-400 italic">
                  No proposals yet. Be the first to bid!
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <Card className="bg-[#1F4E79] text-white border-none shadow-xl shadow-blue-900/20">
            <CardContent className="p-8 space-y-6">
               <div className="flex items-center justify-between">
                  <span className="text-blue-100 text-sm">Budget Range</span>
                  <span className="text-2xl font-bold">${task.budget}</span>
               </div>
               <div className="h-px bg-white/10 w-full" />
               <div className="space-y-4">
                  <div className="flex items-center gap-3">
                     <Calendar className="h-5 w-5 text-blue-200" />
                     <div>
                        <p className="text-[10px] uppercase tracking-wider text-blue-200 font-bold">Deadline</p>
                        <p className="font-semibold">{task.deadline}</p>
                     </div>
                  </div>
                  <div className="flex items-center gap-3">
                     <ShieldCheck className="h-5 w-5 text-blue-200" />
                     <div>
                        <p className="text-[10px] uppercase tracking-wider text-blue-200 font-bold">Payment</p>
                        <p className="font-semibold">Secured by Escrow</p>
                     </div>
                  </div>
                  <div className="flex items-center gap-3">
                     <Star className="h-5 w-5 text-blue-200" />
                     <div>
                        <p className="text-[10px] uppercase tracking-wider text-blue-200 font-bold">Job Type</p>
                        <p className="font-semibold">Fixed Price</p>
                     </div>
                  </div>
               </div>
               {user?.role === 'freelancer' && !showBidForm && (
                  <Button variant="secondary" className="w-full bg-white text-[#1F4E79] shadow-none py-6 font-bold text-base" onClick={() => setShowBidForm(true)}>
                    Apply for this job
                  </Button>
               )}
            </CardContent>
          </Card>

          <Card className="bg-white">
             <CardHeader>
                <CardTitle className="text-base font-bold">About Client</CardTitle>
             </CardHeader>
             <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                   <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-gray-500">
                     {task.clientName.charAt(0)}
                   </div>
                   <div>
                      <p className="font-bold text-gray-900">{task.clientName}</p>
                      <p className="text-xs text-gray-500">Member since 2023</p>
                   </div>
                </div>
                <div className="space-y-2">
                   <div className="flex justify-between text-sm">
                      <span className="text-gray-500 font-medium font-bold uppercase tracking-wider text-[10px]">Total Hires</span>
                      <span className="font-bold px-2 py-0.5 bg-gray-100 rounded">12 Jobs</span>
                   </div>
                   <div className="flex justify-between text-sm">
                      <span className="text-gray-500 font-medium font-bold uppercase tracking-wider text-[10px]">Verification</span>
                      <span className="flex items-center text-emerald-600 font-bold"><ShieldCheck className="h-3 w-3 mr-1" /> Student ID Verified</span>
                   </div>
                </div>
                <Button variant="outline" className="w-full text-xs font-bold gap-2">Contact Client <ArrowRight className="h-3 w-3" /></Button>
             </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
