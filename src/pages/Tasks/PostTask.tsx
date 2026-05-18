import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { 
  ChevronLeft, 
  Send, 
  FileText, 
  DollarSign, 
  Calendar, 
  Layers, 
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge, badgeVariants } from '@/components/ui/Badge';
import { ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

export default function PostTask() {
  const { addTask } = useApp();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Web Development');
  const [budget, setBudget] = useState('');
  const [deadline, setDeadline] = useState('');
  const [skills, setSkills] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return navigate('/login');
    
    setIsSubmitting(true);
    // Simulate API delay
    setTimeout(() => {
      addTask({
        title,
        description,
        category,
        budget: Number(budget),
        deadline,
        clientId: user.id,
        clientName: user.name,
        skills: skills.split(',').map(s => s.trim()),
      });
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => navigate('/dashboard/client'), 2000);
    }, 1500);
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  if (isSuccess) {
    return (
      <div className="container mx-auto px-4 py-32 flex flex-col items-center justify-center text-center">
        <motion.div
           initial={{ scale: 0.8, opacity: 0 }}
           animate={{ scale: 1, opacity: 1 }}
           className="space-y-6"
        >
           <div className="h-24 w-24 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-8 shadow-xl shadow-emerald-500/10">
              <CheckCircle2 className="h-14 w-14 text-emerald-600" />
           </div>
           <h1 className="text-4xl font-bold text-gray-900 leading-tight">Your Task is Live!</h1>
           <p className="text-gray-500 text-lg max-w-sm mx-auto">University freelancers have been notified. Redirecting you to your dashboard...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 lg:px-8 max-w-3xl">
      <div className="flex items-center justify-between mb-12">
         <div className="space-y-2">
            <h1 className="text-4xl font-bold text-gray-900">Post a Task</h1>
            <p className="text-gray-500">Reach the best student talent on campus in minutes.</p>
         </div>
         <div className="flex gap-1">
            {[1, 2, 3].map(i => (
               <div key={i} className={cn('h-1.5 w-8 rounded-full transition-all duration-300', step >= i ? 'bg-[#1F4E79]' : 'bg-gray-200')} />
            ))}
         </div>
      </div>

      <Card className="shadow-2xl shadow-blue-900/5 border-gray-100 rounded-3xl overflow-hidden">
        <form onSubmit={handleSubmit}>
          <CardContent className="p-8 md:p-12">
            {step === 1 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                <div className="flex items-center gap-3 text-[#1F4E79]">
                   <FileText className="h-6 w-6" />
                   <h3 className="text-xl font-bold">Broad Details</h3>
                </div>
                <Input 
                  label="Task Title" 
                  placeholder="e.g. Help me design a modern Figma landing page" 
                  required 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700 ml-1">Task Category</label>
                  <select 
                    className="w-full h-11 rounded-lg border border-gray-200 bg-white px-3 text-sm focus:border-[#1F4E79] focus:outline-none"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option>Web Development</option>
                    <option>Graphic Design</option>
                    <option>UI/UX Design</option>
                    <option>Content Writing</option>
                    <option>Presentation Help</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700 ml-1">Describe the Deliverable</label>
                  <textarea 
                    rows={6}
                    placeholder="Be specific about what you need. Mention any specific requirements..."
                    className="w-full rounded-lg border border-gray-200 bg-white px-3 py-3 text-sm focus:border-[#1F4E79] focus:outline-none min-h-[150px]"
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="pt-4">
                  <Button type="button" size="lg" className="w-full sm:w-auto px-12" onClick={nextStep}>
                    Next Step: Logistics
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                <div className="flex items-center gap-3 text-[#1F4E79]">
                   <DollarSign className="h-6 w-6" />
                   <h3 className="text-xl font-bold">Logistics & Budget</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input 
                    type="number" 
                    label="Project Budget ($)" 
                    placeholder="e.g. 150" 
                    required 
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                  />
                  <Input 
                    type="date" 
                    label="Deadline" 
                    required 
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                  />
                </div>
                <Input 
                  label="Required Skills (comma separated)" 
                  placeholder="e.g. React, UI Design, Figma" 
                  required 
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                />
                
                <Card className="bg-slate-50 border-slate-200 shadow-none border-dashed border-2">
                   <CardContent className="p-8 text-center space-y-3">
                      <div className="h-10 w-10 bg-white rounded-xl shadow-sm flex items-center justify-center mx-auto">
                        <Sparkles className="h-5 w-5 text-gray-400" />
                      </div>
                      <p className="text-xs text-gray-500 font-medium">Drag and drop attachments here or browse. <br /> Max file size: 10MB.</p>
                      <Button variant="outline" size="sm" type="button" className="bg-white">Browse Files</Button>
                   </CardContent>
                </Card>

                <div className="flex gap-3 pt-4">
                  <Button type="button" variant="ghost" onClick={prevStep}>Go Back</Button>
                  <Button type="button" size="lg" className="w-full sm:w-auto px-12" onClick={nextStep}>Finalize & Review</Button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                <div className="flex items-center gap-3 text-[#1F4E79]">
                   <Layers className="h-6 w-6" />
                   <h3 className="text-xl font-bold">Review Your Task</h3>
                </div>
                
                <div className="space-y-6">
                   <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-4">
                      <div>
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Title</h4>
                        <p className="text-lg font-bold text-gray-900">{title || 'Untitled Project'}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                         <div>
                            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Budget</h4>
                            <p className="font-bold text-[#1F4E79]">${budget || '0'}</p>
                         </div>
                         <div>
                            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Deadline</h4>
                            <p className="font-bold text-gray-900">{deadline || 'Not set'}</p>
                         </div>
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Skills</h4>
                        <div className="flex flex-wrap gap-2 mt-2">
                           {skills.split(',').map(s => s.trim()).filter(Boolean).map(s => (
                             <Badge key={s} variant="primary" className="bg-white">{s}</Badge>
                           ))}
                        </div>
                      </div>
                   </div>
                   
                   <Card className="bg-blue-50 border-blue-100 shadow-none text-sm text-[#1F4E79] flex items-center gap-4">
                      <ShieldCheck className="h-10 w-10 shrink-0 opacity-20" />
                      <p>By posting this task, you agree that funds will be held in our secure escrow system until you approve the student's work.</p>
                   </Card>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button type="button" variant="ghost" onClick={prevStep}>Go Back</Button>
                  <Button type="submit" size="lg" className="w-full sm:w-auto px-12 gap-2" isLoading={isSubmitting}>
                    Post Task Now <Send className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            )}
          </CardContent>
        </form>
      </Card>
    </div>
  );
}

