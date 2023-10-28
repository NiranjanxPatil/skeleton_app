import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
  //Middleware are use to restrict the unloged user to get access from entering by url paths
  // in config part it takes as string that which pages are restricted
  //it request for path and then chech path with given string, also check for usr is log or not.
  //after checking logic it redirect ot login page or according to logic
  
  export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname
  
    const isPublicPath = path === '/login' || path === '/signup' || path === '/verifyemail'
  
    const token = request.cookies.get('token')?.value || ''
  
    if(isPublicPath && token) {
      return NextResponse.redirect(new URL('/', request.nextUrl))
    }
  
    if (!isPublicPath && !token) {
      return NextResponse.redirect(new URL('/login', request.nextUrl))
    }
      
  }
  
   
  // See "Matching Paths" below to learn more
  export const config = {
    matcher: [
      '/',
      '/profile',
      '/login',
      '/signup',
      '/verifyemail'
    ]
  }