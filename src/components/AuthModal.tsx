import React, { useState } from 'react';
import { 
  X, 
  Key, 
  ShieldCheck, 
  User, 
  Mail, 
  Lock, 
  CheckCircle2, 
  LogOut, 
  Sparkles,
  Code
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { DEMO_USERS } from '../data/mockData';

export const AuthModal: React.FC = () => {
  const { 
    isAuthModalOpen, 
    setIsAuthModalOpen, 
    currentUser, 
    loginUser, 
    registerUser, 
    logoutUser,
    switchUser
  } = useShop();

  const [tab, setTab] = useState<'signin' | 'register'>('signin');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('••••••••');
  const [showTokenDetails, setShowTokenDetails] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tab === 'signin') {
      loginUser(email || 'alice.smith@example.com');
    } else {
      registerUser(name || 'New Customer', email || 'customer@example.com');
    }
  };

  const isGuest = currentUser.id === 'guest';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-stone-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-2">
            <Key className="w-4 h-4 text-amber-600" />
            <h3 className="text-base font-bold text-stone-900 font-display">
              JWT Authentication Portal
            </h3>
          </div>

          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-900 hover:bg-stone-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {/* Current Profile Summary */}
          {!isGuest && (
            <div className="mb-6 p-3.5 bg-stone-50 border border-stone-200 rounded-xl flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-amber-500 text-stone-950 font-bold flex items-center justify-center text-sm shadow-xs font-mono">
                  {currentUser.name.charAt(0)}
                </div>
                <div>
                  <span className="font-bold text-stone-900 block">{currentUser.name}</span>
                  <span className="text-stone-500 text-[11px] font-mono">{currentUser.email}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-stone-900 text-white">
                  {currentUser.role}
                </span>
                <button
                  onClick={logoutUser}
                  className="p-1.5 text-stone-400 hover:text-rose-600 rounded cursor-pointer"
                  title="Sign out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Quick 1-Click Role Switcher */}
          <div className="mb-6">
            <span className="text-[11px] font-mono uppercase text-stone-500 font-semibold block mb-2">
              Quick 1-Click Demo Accounts (Pre-authorized JWT):
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => {
                  switchUser('customer');
                  setIsAuthModalOpen(false);
                }}
                className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                  currentUser.role === 'customer'
                    ? 'border-amber-500 bg-amber-50/60 ring-2 ring-amber-500/20'
                    : 'border-stone-200 hover:bg-stone-50'
                }`}
              >
                <div className="font-bold text-stone-900 flex items-center justify-between">
                  <span>Alice Smith</span>
                  <span className="text-[10px] font-mono text-emerald-700 bg-emerald-100 px-1 rounded">Customer</span>
                </div>
                <div className="text-[10px] text-stone-500 font-mono mt-0.5">alice.smith@example.com</div>
              </button>

              <button
                type="button"
                onClick={() => {
                  switchUser('admin');
                  setIsAuthModalOpen(false);
                }}
                className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                  currentUser.role === 'admin'
                    ? 'border-amber-500 bg-amber-50/60 ring-2 ring-amber-500/20'
                    : 'border-stone-200 hover:bg-stone-50'
                }`}
              >
                <div className="font-bold text-stone-900 flex items-center justify-between">
                  <span>Marc Vance</span>
                  <span className="text-[10px] font-mono text-amber-800 bg-amber-100 px-1 rounded">Admin</span>
                </div>
                <div className="text-[10px] text-stone-500 font-mono mt-0.5">admin.marc@shopsphere.io</div>
              </button>
            </div>
          </div>

          {/* Form Tabs */}
          <div className="flex border-b border-stone-200 text-xs mb-4">
            <button
              onClick={() => setTab('signin')}
              className={`py-2 px-4 font-semibold transition-colors cursor-pointer ${
                tab === 'signin' ? 'border-b-2 border-stone-900 text-stone-900' : 'text-stone-400 hover:text-stone-700'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setTab('register')}
              className={`py-2 px-4 font-semibold transition-colors cursor-pointer ${
                tab === 'register' ? 'border-b-2 border-stone-900 text-stone-900' : 'text-stone-400 hover:text-stone-700'
              }`}
            >
              Register New Account
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3 text-xs">
            {tab === 'register' && (
              <div>
                <label className="block text-stone-700 font-medium mb-1">Full Name</label>
                <div className="relative">
                  <User className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Jordan Lee"
                    className="w-full pl-9 pr-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-stone-700 font-medium mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full pl-9 pr-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-stone-700 font-medium mb-1">Password</label>
              <div className="relative">
                <Lock className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 border border-stone-300 rounded-lg font-mono focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-2 py-2.5 bg-stone-900 hover:bg-stone-800 text-white font-bold rounded-lg transition-colors shadow-xs cursor-pointer"
            >
              {tab === 'signin' ? 'Sign In with JWT' : 'Create Customer Account'}
            </button>
          </form>

          {/* JWT Claims Inspector Toggle */}
          <div className="mt-5 pt-4 border-t border-stone-200">
            <button
              onClick={() => setShowTokenDetails(!showTokenDetails)}
              className="text-[11px] text-stone-500 hover:text-stone-800 flex items-center justify-between w-full cursor-pointer"
            >
              <span className="flex items-center gap-1 font-mono">
                <Code className="w-3.5 h-3.5 text-amber-600" />
                <span>Inspect Decoded JWT Claims Token</span>
              </span>
              <span>{showTokenDetails ? 'Hide' : 'View'}</span>
            </button>

            {showTokenDetails && (
              <div className="mt-2 p-3 bg-stone-900 text-stone-200 rounded-lg font-mono text-[10px] space-y-1 overflow-x-auto">
                <div className="text-amber-400">// Header: HS256 algorithm</div>
                <div>{`{ "alg": "HS256", "typ": "JWT" }`}</div>
                <div className="text-amber-400 mt-2">// Payload Claims (ASP.NET Core ClaimsPrincipal)</div>
                <div>{`{`}</div>
                <div className="pl-3">{`"sub": "${currentUser.id}",`}</div>
                <div className="pl-3">{`"email": "${currentUser.email}",`}</div>
                <div className="pl-3">{`"name": "${currentUser.name}",`}</div>
                <div className="pl-3 text-emerald-400">{`"http://schemas.microsoft.com/ws/2008/06/identity/claims/role": "${currentUser.role}",`}</div>
                <div className="pl-3">{`"iss": "https://api.shopsphere.azurewebsites.net",`}</div>
                <div className="pl-3">{`"exp": 1794312274`}</div>
                <div>{`}`}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
