"use client";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Client from "../../../features/auth/components/Client";
import Vender from "../../../features/auth/components/Vender";
function SignUpPage() {
  return (
    <main className="flex w-full justify-center">
      <div className="w-full max-w-md px-4 py-10">
        <Tabs defaultValue="account" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="account" className="cursor-pointer">
              광고주
            </TabsTrigger>
            <TabsTrigger value="password" className="cursor-pointer">
              업체
            </TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <Client />
          </TabsContent>
          <TabsContent value="password">
            <Vender />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}

export default SignUpPage;
