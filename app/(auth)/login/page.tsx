// app/(auth)/login/page.tsx
'use client';

import { useState } from 'react';
import { Shield, GraduationCap, Users } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

type Role = 'admin' | 'teacher' | 'student';

const roles: { role: Role; label: string; icon: React.ReactNode; description: string }[] = [
  { role: 'admin', label: 'Admin', icon: <Shield className="h-10 w-10" />, description: 'Manage users, courses & settings' },
  { role: 'teacher', label: 'Teacher', icon: <Users className="h-10 w-10" />, description: 'Create & review assignments' },
  { role: 'student', label: 'Student', icon: <GraduationCap className="h-10 w-10" />, description: 'Submit work & track grades' },
];

export default function LoginPage() {
  const [selected, setSelected] = useState<Role>('student');
  const { demoLogin } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-background to-primary/10">
      <div className="w-full max-w-lg">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            AssignBridge
          </h1>
          <p className="text-muted-foreground mt-3 text-lg">Choose your role to continue</p>
        </div>

        <div className="glass-card rounded-2xl p-8 shadow-2xl">
          <div className="grid grid-cols-3 gap-4 mb-8">
            {roles.map(({ role, label, icon, description }) => (
              <button
                key={role}
                type="button"
                onClick={() => setSelected(role)}
                className={`flex flex-col items-center gap-2 p-5 rounded-xl border-2 transition-all duration-200 ${
                  selected === role
                    ? 'border-primary bg-primary/15 text-primary shadow-xl scale-105 ring-2 ring-primary/20'
                    : 'border-border bg-white/5 text-muted-foreground hover:border-primary/40 hover:bg-white/10'
                }`}
                title={description}
              >
                {icon}
                <span className="text-sm font-bold">{label}</span>
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => demoLogin(selected)}
            className="w-full py-4 text-lg font-bold rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-[1.02]"
          >
            Continue as {roles.find((r) => r.role === selected)?.label}
          </button>
        </div>
      </div>
    </div>
  );
}
