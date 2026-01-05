"use client";

import React, { useState } from "react";
import {
    TrendingUp,
    TrendingDown,
    Users,
    DollarSign,
    Activity,
    ArrowUpRight,
    Filter,
    Plus,
    MoreHorizontal,
    Search
} from "lucide-react";
import { Card, Heading, Subtext } from "@/components/ui/base";
import { cn } from "@/lib/utils";
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    createColumnHelper,
    getPaginationRowModel,
} from "@tanstack/react-table";

// --- Mock Data ---
const KPIS = [
    { label: "Active Revenue", value: "$432,900", change: "+12%", trend: "up", icon: DollarSign },
    { label: "Total Projects", value: "24", change: "+2", trend: "up", icon: Activity },
    { label: "Client Satisfaction", value: "98.2%", change: "+0.4%", trend: "up", icon: Users },
    { label: "Avg. Response Time", value: "2.4h", change: "-10%", trend: "up", icon: ArrowUpRight },
];

const PROJECTS = [
    { id: "1", name: "Project Nova", status: "Active", budget: "$12,000", lead: "Alex R." },
    { id: "2", name: "Horizon UI", status: "In Review", budget: "$8,500", lead: "Sarah C." },
    { id: "3", name: "Quant Stack", status: "Active", budget: "$45,000", lead: "Marcus W." },
    { id: "4", name: "Delta API", status: "Paused", budget: "$3,200", lead: "Elena G." },
    { id: "5", name: "Echo Core", status: "Completed", budget: "$22,000", lead: "John D." },
];

const columnHelper = createColumnHelper<typeof PROJECTS[0]>();

const columns = [
    columnHelper.accessor("name", {
        header: "Project Name",
        cell: (info) => <span className="font-semibold">{info.getValue()}</span>,
    }),
    columnHelper.accessor("status", {
        header: "Status",
        cell: (info) => (
            <span className={cn(
                "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider",
                info.getValue() === "Active" ? "bg-emerald-100 text-emerald-700" :
                    info.getValue() === "In Review" ? "bg-blue-100 text-blue-700" :
                        info.getValue() === "Paused" ? "bg-amber-100 text-amber-700" :
                            "bg-slate-100 text-slate-700"
            )}>
                {info.getValue()}
            </span>
        ),
    }),
    columnHelper.accessor("budget", {
        header: "Budget",
        cell: (info) => <span className="text-foreground/80 font-mono">{info.getValue()}</span>,
    }),
    columnHelper.accessor("lead", {
        header: "Project Lead",
    }),
    columnHelper.display({
        id: "actions",
        cell: () => <button className="p-1 hover:bg-muted rounded"><MoreHorizontal size={16} /></button>,
    })
];

// --- Components ---

const StatCard = ({ item }: { item: typeof KPIS[0] }) => (
    <Card className="flex flex-col gap-4">
        <div className="flex justify-between items-start">
            <div className="p-2 bg-muted rounded-lg text-primary">
                <item.icon size={20} />
            </div>
            <div className={cn(
                "flex items-center gap-1 text-xs font-bold",
                item.trend === "up" ? "text-emerald-600" : "text-rose-600"
            )}>
                {item.trend === "up" ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                {item.change}
            </div>
        </div>
        <div>
            <Subtext className="mb-1">{item.label}</Subtext>
            <div className="text-2xl font-bold tracking-tight">{item.value}</div>
        </div>
    </Card>
);

export default function OverviewPage() {
    const table = useReactTable({
        data: PROJECTS,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    return (
        <div className="space-y-10">
            {/* Header Section */}
            <section className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight">Overview</h1>
                    <Subtext className="mt-1">Operational status and performance metrics for all active projects.</Subtext>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 border rounded-lg text-sm font-medium hover:bg-muted transition-all">
                        <Filter size={16} />
                        <span>Filters</span>
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-primary text-background rounded-lg text-sm font-semibold hover:opacity-90 transition-all">
                        <Plus size={16} />
                        <span>New Project</span>
                    </button>
                </div>
            </section>

            {/* KPI Grid */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {KPIS.map((kpi, i) => (
                    <StatCard key={i} item={kpi} />
                ))}
            </section>

            {/* Main Content Area */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Project Table */}
                <Card className="lg:col-span-2 overflow-hidden px-0">
                    <div className="px-6 mb-6 flex items-center justify-between">
                        <Heading>Recent Projects</Heading>
                        <div className="relative">
                            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-secondary" size={14} />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="pl-8 pr-4 py-1.5 bg-muted/50 border border-transparent focus:border-border rounded-lg text-xs outline-none transition-all w-48"
                            />
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead>
                                {table.getHeaderGroups().map(headerGroup => (
                                    <tr key={headerGroup.id} className="border-y bg-muted/30">
                                        {headerGroup.headers.map(header => (
                                            <th key={header.id} className="py-3 px-6 font-bold text-secondary text-[10px] uppercase tracking-widest">
                                                {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                            </th>
                                        ))}
                                    </tr>
                                ))}
                            </thead>
                            <tbody>
                                {table.getRowModel().rows.map(row => (
                                    <tr key={row.id} className="border-b hover:bg-muted/20 transition-all">
                                        {row.getVisibleCells().map(cell => (
                                            <td key={cell.id} className="py-4 px-6">
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>

                {/* Quiet Charts Section */}
                <div className="space-y-8">
                    <Card>
                        <Heading className="mb-6">System Health</Heading>
                        <div className="space-y-6">
                            {[
                                { label: "CPU Usage", value: 24, color: "bg-blue-500" },
                                { label: "Memory", value: 68, color: "bg-purple-500" },
                                { label: "Storage", value: 12, color: "bg-emerald-500" },
                            ].map(sys => (
                                <div key={sys.label} className="space-y-2">
                                    <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-secondary">
                                        <span>{sys.label}</span>
                                        <span>{sys.value}%</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                                        <div className={cn("h-full rounded-full", sys.color)} style={{ width: `${sys.value}%` }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>

                    <Card className="bg-primary text-background">
                        <Heading className="mb-2">Audit Logs</Heading>
                        <Subtext className="text-white/60 mb-6">Last 24 hours activity across the stack.</Subtext>
                        <div className="space-y-4">
                            {[
                                { action: "API Key Rotated", time: "2h ago", user: "Admin" },
                                { action: "Project Delta Created", time: "5h ago", user: "Sarah C." },
                                { action: "Auth Policy Update", time: "1d ago", user: "Sys" },
                            ].map((log, i) => (
                                <div key={i} className="flex justify-between items-center text-xs border-b border-white/10 pb-3 last:border-0 last:pb-0">
                                    <div>
                                        <div className="font-bold">{log.action}</div>
                                        <div className="opacity-60">{log.user}</div>
                                    </div>
                                    <div className="opacity-60">{log.time}</div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </section>
        </div>
    );
}
