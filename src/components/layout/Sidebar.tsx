"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    BarChart2,
    Table as TableIcon,
    Settings,
    User,
    LogOut,
    ChevronRight,
    Database
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
    {
        group: "Overview",
        items: [
            { label: "Overview", href: "/overview", icon: LayoutDashboard },
            { label: "Analytics", href: "/analytics", icon: BarChart2 },
        ]
    },
    {
        group: "Data Management",
        items: [
            { label: "Operations", href: "/operations", icon: TableIcon },
            { label: "Resources", href: "/resources", icon: Database },
        ]
    }
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="w-64 h-screen border-r border-border bg-background flex flex-col fixed left-0 top-0">
            <div className="p-6 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                    <div className="w-4 h-4 bg-background rounded-sm rotate-45" />
                </div>
                <span className="font-bold text-lg tracking-tight">NovaPro</span>
            </div>

            <nav className="flex-1 px-4 space-y-8 mt-4">
                {NAV_ITEMS.map((group) => (
                    <div key={group.group}>
                        <h3 className="text-[10px] font-bold text-secondary uppercase tracking-widest px-3 mb-3">
                            {group.group}
                        </h3>
                        <div className="space-y-1">
                            {group.items.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={cn(
                                            "flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors",
                                            isActive
                                                ? "bg-muted text-foreground font-semibold"
                                                : "text-secondary hover:text-foreground hover:bg-muted/50"
                                        )}
                                    >
                                        <div className="flex items-center gap-3">
                                            <item.icon size={18} />
                                            <span>{item.label}</span>
                                        </div>
                                        {isActive && <ChevronRight size={14} className="opacity-50" />}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </nav>

            <div className="p-4 border-t border-border space-y-2">
                <Link
                    href="/settings"
                    className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-secondary hover:text-foreground transition-colors"
                >
                    <Settings size={18} />
                    <span>Settings</span>
                </Link>
                <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm text-secondary hover:text-foreground transition-colors">
                    <LogOut size={18} />
                    <span>Sign Out</span>
                </button>
            </div>
        </div>
    );
}
