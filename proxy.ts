import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const signInPath = process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL ?? '/sign-in';
const signUpPath = process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL ?? '/sign-up';

const isPublicRoute = createRouteMatcher([
  `${signInPath}(.*)`,
  `${signUpPath}(.*)`,
]);

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)', '/'],
};
