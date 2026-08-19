import Logo from "../logo";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="bg-muted flex-center min-h-dvh flex-col gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className="mx-auto">
          <Logo />
        </div>
        {children}
      </div>
    </div>
  );
}
