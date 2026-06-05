import type { ReactNode } from 'react';
import { Building2 } from 'lucide-react';

export interface AuthCardProps {
  title?:        string;
  description?: string;
  children:     ReactNode;
  footer?:      ReactNode;
}

export function AuthCard({ title, description, children, footer }: AuthCardProps) {
  return (
    <div className="flex min-h-screen">
      {/* Left Panel - Brand & Branding */}
      <div className="hidden lg:flex lg:w-[55%] relative flex-col justify-center items-center bg-gradient-to-br from-blue-800 via-blue-600 to-cyan-500 p-12">
        {/* Decorative circles */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        
        {/* Brand Logo */}
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-8">
            <Building2 className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-4xl font-bold text-white mb-4">
            AMS
          </h1>
          <p className="text-lg text-white/90 mb-2">
            Apartment Management System
          </p>
          <p className="text-white/70 max-w-md text-center">
            Manage societies, residents, finance & security from one place
          </p>
          
          {/* Feature Pills */}
          <div className="flex flex-wrap gap-3 mt-12 justify-center">
            <div className="px-4 py-2 bg-white/15 backdrop-blur-sm rounded-full text-white text-sm">
              🏢 Society Management
            </div>
            <div className="px-4 py-2 bg-white/15 backdrop-blur-sm rounded-full text-white text-sm">
              💰 Finance & Billing
            </div>
            <div className="px-4 py-2 bg-white/15 backdrop-blur-sm rounded-full text-white text-sm">
              🔒 Security & Visitors
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="absolute bottom-8 text-white/50 text-sm">
          AMS v2.0 · Powered by PropertyStack
        </div>
      </div>
      
      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-[45%] flex items-center justify-center bg-gray-50 p-8">
        <div className="w-full max-w-sm space-y-8">
          {/* Mobile Logo (visible only on small screens) */}
          <div className="lg:hidden flex flex-col items-center">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-3">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <p className="text-sm font-medium text-muted-foreground">
              Apartment Management System
            </p>
          </div>
          
          {/* Title & Description */}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">
              {title || 'Welcome back'}
            </h2>
            {description && (
              <p className="mt-2 text-sm text-gray-500">
                {description}
              </p>
            )}
          </div>
          
          {/* Form Content */}
          <div>{children}</div>
          
          {/* Footer */}
          {footer && (
            <div className="text-center text-xs text-gray-400">
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}