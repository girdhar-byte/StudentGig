import { cn } from '@/lib/utils';
import * as React from 'react';
import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardFooter } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Search, Filter, Clock, DollarSign, Tag, Users, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';

const CATEGORIES = [
  'All Categories',
  'Web Development',
  'Graphic Design',
  'Content Writing',
  'UI/UX Design',
  'Proofreading',
  'Python Scripting'
];

export default function BrowseTasks() {
  const { tasks } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          task.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All Categories' || task.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto px-4 py-8 lg:px-8">
      <div className="flex flex-col gap-8">
        {/* Header & Search */}
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold text-gray-900">Task Marketplace</h1>
          <p className="text-gray-500">Find opportunities to earn and build your student portfolio.</p>
          
          <div className="mt-4 flex flex-col gap-4 lg:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for tasks (e.g. 'React', 'Logo', 'Python')..."
                className="w-full rounded-2xl border border-white/40 bg-white/70 backdrop-blur-xl py-3 pl-11 pr-4 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10 shadow-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-3">
              <select 
                className="h-12 rounded-xl border border-gray-200 bg-white px-4 text-sm focus:border-[#1F4E79] focus:outline-none"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <Button variant="outline" className="h-12 px-4">
                <Filter className="mr-2 h-4 w-4" /> Filters
              </Button>
            </div>
          </div>
        </div>

        {/* Categories Pills */}
        <div className="hide-scrollbar flex items-center gap-2 overflow-x-auto pb-2">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                'whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all',
                selectedCategory === cat 
                  ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-105' 
                  : 'bg-white/50 backdrop-blur-md border border-white/40 text-slate-600 hover:bg-white/80'
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Task Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTasks.map((task, i) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="flex flex-col h-full hover:shadow-md transition-shadow group">
                <CardContent className="p-6 flex-1">
                  <div className="flex justify-between items-start mb-4">
                    <Badge variant="primary" className="rounded-md font-medium">
                      {task.category}
                    </Badge>
                    <div className="flex items-center text-xs text-gray-500 gap-1 font-medium bg-gray-100 px-2 py-1 rounded">
                      <Clock className="h-3 w-3" /> {task.postedAt}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-primary cursor-pointer transition-colors mb-2 line-clamp-1">
                    {task.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-3 mb-6 leading-relaxed">
                    {task.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {task.skills.map(skill => (
                      <span key={skill} className="px-2 py-1 bg-slate-50 text-slate-600 rounded-md text-[10px] font-bold uppercase tracking-wider border border-slate-100">
                        {skill}
                      </span>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="p-6 pt-0 flex items-center justify-between border-t border-gray-50 bg-gray-50/30">
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500 font-medium">Budget</span>
                    <span className="text-lg font-bold text-primary">${task.budget}</span>
                  </div>
                  <div className="flex flex-col text-right">
                    <span className="text-xs text-gray-500 font-medium flex items-center justify-end gap-1">
                      <Users className="h-3 w-3" /> {task.bidCount} bids
                    </span>
                    <Link to={`/tasks/${task.id}`}>
                      <Button variant="secondary" size="sm" className="mt-1 font-bold group/btn h-9">
                        View Details <ArrowUpRight className="ml-1 h-3 w-3 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                      </Button>
                    </Link>
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
          
          {filteredTasks.length === 0 && (
            <div className="col-span-full py-20 flex flex-col items-center justify-center text-center">
              <div className="h-20 w-20 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                <Search className="h-10 w-10 text-slate-300" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">No tasks found</h3>
              <p className="text-gray-500 mt-2">Try adjusting your search or filters.</p>
              <Button variant="outline" className="mt-6" onClick={() => { setSearchTerm(''); setSelectedCategory('All Categories'); }}>
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

