import { AppSidebar } from "@/components/app-sidebar";
import DynamicPage from "@/components/core/dynamic-page";
import { ModalNewFunnel } from "@/components/core/modals/modal-new-funnel";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main> 
      <SidebarProvider defaultOpen={false}>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 border-b bordergray-200">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <DynamicPage/>
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {children}
          </div> 
        </SidebarInset>
      </SidebarProvider>
      <ModalNewFunnel/>
    </main>
  );
}
