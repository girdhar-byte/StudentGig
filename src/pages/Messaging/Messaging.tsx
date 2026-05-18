import { cn } from '@/lib/utils';
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useApp } from '@/context/AppContext';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { 
  Search, 
  Send, 
  MoreVertical, 
  Phone, 
  Video, 
  Paperclip, 
  Smile, 
  Image as ImageIcon,
  CheckCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const MOCK_CHATS = [
  { id: '1', name: 'James Wilson', lastMsg: 'Hey, did you see the proposal?', time: '10:30 AM', unread: 2, online: true, avatar: 'JW' },
  { id: '2', name: 'Alex Johnson', lastMsg: 'The logo looks great, thanks!', time: 'Yesterday', unread: 0, online: true, avatar: 'AJ' },
  { id: '3', name: 'Emily Davis', lastMsg: 'Can we schedule a call?', time: 'Tue', unread: 0, online: false, avatar: 'ED' },
  { id: '4', name: 'Professor Mark', lastMsg: 'The research is interesting.', time: 'Mon', unread: 0, online: false, avatar: 'PM' },
];

const MOCK_MESSAGES = [
  { id: 'm1', sender: 'other', text: 'Hi Sarah! I saw your portfolio and I am really impressed with your React work.', time: '10:00 AM' },
  { id: 'm2', sender: 'me', text: 'Hi James! Thank you so much. I love working on React projects.', time: '10:05 AM' },
  { id: 'm3', sender: 'other', text: 'I have a task for a dashboard prototype. Would you be interested?', time: '10:10 AM' },
  { id: 'm4', sender: 'me', text: 'Absolutely! Could you share more details about the requirements? Are you looking for something similar to the Upwork style?', time: '10:12 AM' },
  { id: 'm5', sender: 'other', text: 'Yes, exactly. Modern SaaS aesthetic, clean dashboards, and interactive charts.', time: '10:15 AM' },
];

export default function Messaging() {
  const { user } = useAuth();
  const [activeChat, setActiveChat] = useState(MOCK_CHATS[0]);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(MOCK_MESSAGES);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage = {
      id: `m${messages.length + 1}`,
      sender: 'me',
      text: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, newMessage]);
    setMessage('');
  };

  return (
    <div className="container mx-auto px-4 py-8 h-[calc(100vh-100px)] lg:px-8">
      <Card className="h-full border-none shadow-2xl flex overflow-hidden rounded-3xl">
        {/* Sidebar */}
        <div className="w-full md:w-80 lg:w-96 border-r border-gray-100 flex flex-col bg-slate-50/50">
          <div className="p-6 border-b border-gray-100 bg-white">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Messages</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search conversations..." 
                className="w-full rounded-xl border border-gray-100 bg-slate-50 py-2.5 pl-10 pr-4 text-xs focus:bg-white focus:border-[#1F4E79] focus:outline-none transition-all"
              />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto divide-y divide-gray-50">
            {MOCK_CHATS.map((chat) => (
              <button
                key={chat.id}
                onClick={() => setActiveChat(chat)}
                className={cn(
                  'w-full p-4 flex items-center gap-3 transition-colors text-left',
                  activeChat.id === chat.id ? 'bg-[#1F4E79]/5 border-l-4 border-[#1F4E79]' : 'hover:bg-white'
                )}
              >
                <div className="relative">
                  <div className="h-12 w-12 rounded-full bg-white border border-gray-100 flex items-center justify-center text-[#1F4E79] font-bold shadow-sm">
                    {chat.avatar}
                  </div>
                  {chat.online && <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-500 border-2 border-white"></div>}
                </div>
                <div className="flex-1 overflow-hidden">
                  <div className="flex justify-between items-center mb-0.5">
                    <span className="font-bold text-sm text-gray-900">{chat.name}</span>
                    <span className="text-[10px] text-gray-400">{chat.time}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-gray-500 truncate pr-2">{chat.lastMsg}</p>
                    {chat.unread > 0 && <span className="h-4 w-4 rounded-full bg-[#1F4E79] text-white text-[10px] flex items-center justify-center shrink-0">{chat.unread}</span>}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="hidden md:flex flex-1 flex-col bg-white">
          {/* Header */}
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-[#1F4E79]/10 flex items-center justify-center text-[#1F4E79] font-bold">
                 {activeChat.avatar}
              </div>
              <div>
                 <h3 className="font-bold text-gray-900 leading-none">{activeChat.name}</h3>
                 <p className="text-[10px] text-emerald-600 font-bold mt-1">● Active now</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
               <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-900"><Phone className="h-5 w-5" /></Button>
               <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-900"><Video className="h-5 w-5" /></Button>
               <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-900"><MoreVertical className="h-5 w-5" /></Button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/30">
            {messages.map((msg, i) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn('flex flex-col', msg.sender === 'me' ? 'items-end' : 'items-start')}
              >
                <div className={cn(
                  'max-w-[70%] p-4 rounded-2xl text-sm shadow-sm',
                  msg.sender === 'me' 
                    ? 'bg-[#1F4E79] text-white rounded-tr-none' 
                    : 'bg-white text-gray-800 rounded-tl-none border border-gray-100'
                )}>
                  {msg.text}
                </div>
                <div className="flex items-center mt-1.5 px-1 gap-1">
                   <span className="text-[10px] text-gray-400 font-bold uppercase">{msg.time}</span>
                   {msg.sender === 'me' && <CheckCheck className="h-3 w-3 text-[#1F4E79]" />}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-gray-100">
            <form onSubmit={handleSend} className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" type="button" className="text-gray-400">
                  <Paperclip className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" type="button" className="text-gray-400">
                  <ImageIcon className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" type="button" className="text-gray-400">
                  <Smile className="h-5 w-5" />
                </Button>
              </div>
              <div className="flex-1 relative">
                <input 
                  type="text" 
                  placeholder="Your student colleague is waiting for your reply..." 
                  className="w-full rounded-2xl border border-gray-100 bg-slate-50 py-3 px-6 text-sm focus:bg-white focus:border-[#1F4E79] focus:outline-none transition-all pr-12"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
              <Button type="submit" size="icon" className="rounded-full h-11 w-11 shadow-lg shadow-blue-900/10 shrink-0">
                <Send className="h-5 w-5" />
              </Button>
            </form>
          </div>
        </div>
      </Card>
    </div>
  );
}

