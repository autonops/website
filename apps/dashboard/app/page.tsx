import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

export default async function RootPage() {
  const { userId } = auth()
  
  if (userId) {
    // User is logged in, redirect to dashboard
    redirect('/dashboard')
  } else {
    // User is not logged in, redirect to marketing site
    redirect('https://autonops.io')
  }
}
