import { Navbar } from "@/components/admin-panel/navbar";

import { Separator } from "../ui/separator";

interface ContentLayoutProps {
  title: string;
  children: React.ReactNode;
}

export function ContentLayout({ title, children }: ContentLayoutProps) {
  return (
    <div>
      <Navbar title={title} />
      <div className="w-full px-4 pb-8 sm:px-8">
        <Separator className="mb-8" />
        {children}
      </div>
    </div>
  );
}
