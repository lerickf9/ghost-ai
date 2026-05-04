import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen bg-base">
      <div className="hidden lg:flex flex-col justify-end w-1/2 bg-surface border-r border-surface-border pb-20 px-16">
        <p className="text-copy-primary font-semibold text-2xl tracking-tight mb-2">Ghost AI</p>
        <p className="text-copy-muted text-sm mb-10">Design systems, in seconds.</p>
        <ul className="space-y-3 text-copy-secondary text-sm">
          <li className="flex items-start gap-3">
            <span className="text-copy-faint select-none">—</span>
            AI-generated system designs from plain language
          </li>
          <li className="flex items-start gap-3">
            <span className="text-copy-faint select-none">—</span>
            Real-time collaborative canvas with live cursors
          </li>
          <li className="flex items-start gap-3">
            <span className="text-copy-faint select-none">—</span>
            One-click technical spec export
          </li>
        </ul>
      </div>

      <div className="flex items-center justify-center w-full lg:w-1/2 min-h-screen p-8">
        <SignUp />
      </div>
    </div>
  );
}
