import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { 
  Rocket, 
  Search, 
  ShieldCheck, 
  Star, 
  Users, 
  Zap, 
  ArrowRight,
  Monitor,
  Layout,
  PenTool,
  Code
} from 'lucide-react';
import { motion } from 'motion/react';

const CATEGORIES = [
  { name: 'Web Development', icon: Code, color: 'bg-blue-50 text-blue-600' },
  { name: 'Graphic Design', icon: PenTool, color: 'bg-purple-50 text-purple-600' },
  { name: 'Content Writing', icon: Layout, color: 'bg-emerald-50 text-emerald-600' },
  { name: 'UI/UX Design', icon: Monitor, color: 'bg-orange-50 text-orange-600' },
];

const FEATURES = [
  {
    title: 'Verified Students Only',
    desc: 'Every user is verified via their university email to ensure a safe student community.',
    icon: ShieldCheck
  },
  {
    title: 'Quick Payments',
    desc: 'Secure escrow system that holds funds until tasks are completed and approved.',
    icon: Zap
  },
  {
    title: 'Peer Reviews',
    desc: 'Build your reputation through feedback from your fellow university peers.',
    icon: Star
  }
];

export default function Landing() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-50 pt-16 pb-24 md:pt-24 md:pb-32">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col items-center gap-12 text-center lg:flex-row lg:text-left">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex-1 space-y-8"
            >
              <Badge variant="primary" className="py-1.5 px-4 text-sm font-medium">
                The #1 Student Freelance Hub
              </Badge>
              <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 md:text-7xl">
                Find Student Talent. <br />
                <span className="text-primary">Earn While You Learn.</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0">
                A simple marketplace for university students to post tasks, build portfolios, and earn money flexibly on campus.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row justify-center lg:justify-start">
                <Link to="/post-task">
                  <Button size="lg" className="w-full gap-2 px-10 sm:w-auto shadow-xl shadow-primary/20">
                    Post a Task <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/tasks">
                  <Button variant="secondary" size="lg" className="w-full px-10 sm:w-auto">
                    Browse Tasks
                  </Button>
                </Link>
              </div>
              <div className="flex items-center gap-8 pt-4 justify-center lg:justify-start">
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-gray-900">5k+</span>
                  <span className="text-sm text-gray-500 font-medium">Active Students</span>
                </div>
                <div className="h-10 w-px bg-gray-200" />
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-gray-900">12k+</span>
                  <span className="text-sm text-gray-500 font-medium">Tasks Completed</span>
                </div>
                <div className="h-10 w-px bg-gray-200" />
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-gray-900">50+</span>
                  <span className="text-sm text-gray-500 font-medium">Universities</span>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex-1 relative"
            >
              <div className="relative z-10 rounded-2xl border border-white/50 bg-white/30 backdrop-blur-sm p-4 shadow-2xl shadow-blue-900/10">
                <div className="rounded-xl overflow-hidden bg-white shadow-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1200" 
                    alt="Students working"
                    className="h-[400px] w-full object-cover"
                  />
                  <div className="p-6 bg-white flex items-center justify-between">
                     <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center">
                          <Rocket className="h-5 w-5 text-[#1F4E79]" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">New Task Posted</p>
                          <p className="text-xs text-gray-500">React Dashboard Design - $120</p>
                        </div>
                     </div>
                     <Badge variant="success">Just now</Badge>
                  </div>
                </div>
              </div>
              {/* Abstract decorative shapes */}
              <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-blue-100/50 mix-blend-multiply filter blur-xl animate-pulse" />
              <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-purple-100/50 mix-blend-multiply filter blur-xl animate-pulse delay-700" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">Popular Task Categories</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Explore different skills and tasks being posted right now by students like you.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CATEGORIES.map((cat, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="group cursor-pointer"
              >
                <Card className="h-full border-gray-100 transition-all group-hover:border-[#1F4E79]/20 group-hover:shadow-md">
                  <CardContent className="p-8 flex flex-col items-center text-center">
                    <div className={cn('h-14 w-14 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110', cat.color)}>
                      <cat.icon className="h-7 w-7" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#1F4E79] transition-colors">{cat.name}</h3>
                    <p className="text-sm text-gray-500 mt-2">120+ tasks open</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
             <div className="space-y-8">
                <Badge variant="primary">Why StudentGig?</Badge>
                <h2 className="text-4xl font-bold text-gray-900 leading-tight">Built by students, for the modern campus experience.</h2>
                <div className="space-y-6">
                  {FEATURES.map((feature, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="mt-1 h-10 w-10 shrink-0 rounded-full bg-white flex items-center justify-center shadow-sm text-[#1F4E79]">
                        <feature.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">{feature.title}</h4>
                        <p className="text-gray-500 text-sm">{feature.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="primary" className="mt-4">Learn More About Safety</Button>
             </div>
             <div className="relative">
                <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-4 pt-12">
                      <Card className="p-4 shadow-xl shadow-blue-900/5"><img src="https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=600" className="rounded-lg h-40 w-full object-cover" /></Card>
                      <Card className="p-4 shadow-xl shadow-blue-900/5 bg-[#1F4E79] text-white">
                        <p className="text-sm font-medium">Average student earnings</p>
                        <p className="text-3xl font-bold">$450 <span className="text-xs font-normal text-blue-200">/ mo</span></p>
                      </Card>
                   </div>
                   <div className="space-y-4">
                      <Card className="p-4 shadow-xl shadow-blue-900/5">
                        <div className="flex items-center gap-2 mb-2">
                           {[1,2,3,4,5].map(s => <Star key={s} className="h-3 w-3 fill-amber-400 text-amber-400" />)}
                        </div>
                        <p className="text-xs text-gray-600 italic">"StudentGig helped me pay my tuition while doing what I love!"</p>
                        <p className="text-xs font-bold mt-2">- Emily, MIT</p>
                      </Card>
                      <Card className="p-4 shadow-xl shadow-blue-900/5"><img src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=600" className="rounded-lg h-60 w-full object-cover" /></Card>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Stats Call to Action */}
      <section className="py-24 bg-[#1F4E79] text-white">
        <div className="container mx-auto px-4 lg:px-8 text-center text-white">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl font-bold">Ready to jumpstart your student career?</h2>
            <p className="text-lg text-blue-100">Join thousands of students who are already finding work and building their portfolios.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto font-bold bg-white text-[#1F4E79] shadow-none">Join StudentGig Now</Button>
              </Link>
              <Link to="/tasks">
                <Button size="lg" variant="ghost" className="w-full sm:w-auto text-white hover:bg-white/10">Browse Market</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
