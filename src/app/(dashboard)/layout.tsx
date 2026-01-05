import React from "react";
import { Sidebar } from "@/components/layout/Sidebar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-background">
            <Sidebar />
            <main className="flex-1 ml-64 p-8 lg:p-12 overflow-y-auto">
                <div className="max-w-7xl mx-auto space-y-10">
                    {children}
                </div>
            </main>
        </div>
    );
}
