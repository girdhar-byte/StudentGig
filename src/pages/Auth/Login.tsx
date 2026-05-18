import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { GraduationCap, Mail, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { UserRole } from '@/types';
import { motion } from 'motion/react';

export default function Login() {
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<UserRole>('freelancer');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, role);
    navigate(`/dashboard/${role}`);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4 bg-slate-50">
      <div className="w-full max-w-[1000px] grid grid-cols-1 md:grid-cols-2 rounded-3xl overflow-hidden shadow-2xl bg-white">
        
        {/* Left Side: Illustration & Text */}
        <div className="hidden md:flex flex-col justify-between p-12 bg-[#1F4E79] text-white">
          <div className="space-y-4">
             <Link to="/" className="flex items-center gap-2 mb-12">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-[#1F4E79]">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <span className="text-xl font-bold tracking-tight">StudentGig</span>
             </Link>
             <h2 className="text-4xl font-bold leading-tight">Welcome back to the campus marketplace.</h2>
             <p className="text-blue-100 text-lg">Sign in to manage your tasks, track earnings and connect with student peers.</p>
          </div>
          
          <div className="space-y-6">
            <Card className="bg-white/10 border-white/20 text-white backdrop-blur-sm">
              <CardContent className="p-4 flex gap-3">
                <div className="h-10 w-10 shrink-0 rounded-full border border-white/30 bg-white/10"></div>
                <div>
                  <p className="text-sm font-semibold">Sarah C. just won a task!</p>
                  <p className="text-xs text-blue-100">Economics Review - $45</p>
                </div>
              </CardContent>
            </Card>
            <div className="flex items-center gap-4 text-xs text-blue-200">
               <span>Trust.</span>
               <span>Safety.</span>
               <span>Community.</span>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Sign In</h1>
              <p className="text-gray-500 mt-2">Enter your university credentials to continue</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-3 mb-6">
                 <button
                    type="button"
                    onClick={() => setRole('freelancer')}
                    className={cn(
                      'flex flex-col items-center gap-1 p-3 rounded-xl border text-sm font-medium transition-all',
                      role === 'freelancer' ? 'border-[#1F4E79] bg-[#1F4E79]/5 text-[#1F4E79]' : 'border-gray-100 hover:border-gray-200 text-gray-600'
                    )}
                 >
                    <span>Freelancer</span>
                    <span className="text-[10px] opacity-70">Want to earn</span>
                 </button>
                 <button
                    type="button"
                    onClick={() => setRole('client')}
                    className={cn(
                      'flex flex-col items-center gap-1 p-3 rounded-xl border text-sm font-medium transition-all',
                      role === 'client' ? 'border-[#1F4E79] bg-[#1F4E79]/5 text-[#1F4E79]' : 'border-gray-100 hover:border-gray-200 text-gray-600'
                    )}
                 >
                    <span>Client</span>
                    <span className="text-[10px] opacity-70">Want to hire</span>
                 </button>
              </div>

              <div className="space-y-4">
                <Input 
                  type="email" 
                  label="University Email" 
                  placeholder="name@uni.edu" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div className="relative">
                  <Input 
                    type={showPassword ? 'text' : 'password'} 
                    label="Password" 
                    placeholder="••••••••" 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-8.5 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer text-gray-600">
                  <input type="checkbox" className="rounded border-gray-300 text-[#1F4E79] focus:ring-[#1F4E79]" />
                  Remember me
                </label>
                <Link to="#" className="text-[#1F4E79] font-medium hover:underline">Forgot password?</Link>
              </div>

              <Button type="submit" size="lg" className="w-full" isLoading={isLoading}>
                Sign In <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              <p className="text-center text-sm text-gray-500 mt-8">
                Don't have an account? {' '}
                <Link to="/register" className="text-[#1F4E79] font-bold hover:underline">Create an account</Link>
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

import { cn } from '@/lib/utils';
