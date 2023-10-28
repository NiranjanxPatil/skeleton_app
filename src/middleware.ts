import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 

export function middleware(request: NextRequest) {

  //Middleware are use to restrict the unloged user to get access from entering by url paths
  // in config part it takes as string that which pages are restricted
  //it request for path and then chech path with given string, also check for usr is log or not.
  //after checking logic it redirect ot login page or according to logic
    const path = request.nextUrl.pathname

    const isPublicPath = path === '/login' || path === '/signup'

    const token = request.cookies.get('token')?.value || ''

  if(isPublicPath && token) {
    return NextResponse.redirect(new URL('/', request.nextUrl))
  }

  if (!isPublicPath && !token) {
    //if path and token both is not equal then it not allows
    return NextResponse.redirect(new URL('/login', request.nextUrl))
  }
    
}

export const config = {
    matcher: [
      '/',
      '/profile',
      '/login',
      '/signup',
  ]
}  