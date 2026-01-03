import { SignUp } from '@clerk/nextjs'

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[--bg]">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <a href="https://autonops.io" className="logo text-3xl inline-block">
            auton<span className="logo-accent">ops</span>
          </a>
          <p className="text-[--text-light] mt-2">Create your account</p>
        </div>
        
        {/* Clerk Sign Up */}
        <SignUp 
          appearance={{
            elements: {
              rootBox: 'w-full',
              card: 'bg-[--card-bg] border border-[--border] shadow-none',
              headerTitle: 'text-[--text]',
              headerSubtitle: 'text-[--text-light]',
              socialButtonsBlockButton: 'bg-[--bg-alt] border-[--border] text-[--text] hover:bg-[--border]',
              formFieldLabel: 'text-[--text]',
              formFieldInput: 'bg-[--bg] border-[--border] text-[--text]',
              formButtonPrimary: 'bg-[--primary] hover:bg-[--primary-dark]',
              footerActionLink: 'text-[--primary] hover:text-[--primary-dark]',
              identityPreviewText: 'text-[--text]',
              identityPreviewEditButton: 'text-[--primary]',
            },
          }}
        />
        
        {/* Back to home link */}
        <div className="text-center mt-6">
          <a 
            href="https://autonops.io" 
            className="text-sm text-[--text-light] hover:text-[--primary]"
          >
            ← Back to autonops.io
          </a>
        </div>
      </div>
    </div>
  )
}
