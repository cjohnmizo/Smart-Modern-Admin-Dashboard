'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, Users, Settings, LogOut, Menu } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

const Sidebar = () => {
    const pathname = usePathname();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    const navItems = [
        { name: 'Dashboard', href: '/', icon: LayoutDashboard },
        { name: 'Users', href: '/users', icon: Users },
        { name: 'Settings', href: '/settings', icon: Settings },
    ];

    const sidebarVariants = {
        expanded: { width: '16rem' },
        collapsed: { width: '4rem' },
    };

    const NavContent = () => (
        <>
            <div className="flex h-14 items-center border-b px-4 justify-between">
                <AnimatePresence>
                    {!isCollapsed && (
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="font-bold text-lg whitespace-nowrap"
                        >
                            Smart Admin
                        </motion.span>
                    )}
                </AnimatePresence>
                <Button
                    variant="ghost"
                    size="icon"
                    className="hidden md:flex"
                    onClick={() => setIsCollapsed(!isCollapsed)}
                >
                    <Menu className="h-5 w-5" />
                </Button>
            </div>

            <nav className="flex-1 space-y-2 p-2">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                        <Link key={item.href} href={item.href} passHref onClick={() => setIsMobileOpen(false)}>
                            <Button
                                variant={isActive ? "secondary" : "ghost"}
                                className={cn(
                                    "w-full justify-start",
                                    isCollapsed ? "justify-center px-2" : "px-4"
                                )}
                            >
                                <Icon className={cn("h-5 w-5", isCollapsed ? "mr-0" : "mr-2")} />
                                {!isCollapsed && <span>{item.name}</span>}
                            </Button>
                        </Link>
                    );
                })}
            </nav>

            <div className="border-t p-2">
                <Button
                    variant="ghost"
                    className={cn(
                        "w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20",
                        isCollapsed ? "justify-center px-2" : "px-4"
                    )}
                >
                    <LogOut className={cn("h-5 w-5", isCollapsed ? "mr-0" : "mr-2")} />
                    {!isCollapsed && <span>Logout</span>}
                </Button>
            </div>
        </>
    );

    return (
        <>
            {/* Mobile Trigger & Sheet */}
            <div className="md:hidden p-4 fixed top-0 left-0 z-50">
                <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="icon">
                            <Menu className="h-5 w-5" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="p-0 w-64">
                        {/* Force expanded state for mobile content */}
                        {(() => {
                            const wasCollapsed = isCollapsed;
                            // Temporary override for rendering content
                            // We are not changing state, just rendering differently
                            // Actually, let's just render a mobile specific version or adapt NavContent
                            return (
                                <div className="flex flex-col h-full">
                                    <div className="flex h-14 items-center border-b px-4">
                                        <span className="font-bold text-lg">Smart Admin</span>
                                    </div>
                                    <nav className="flex-1 space-y-2 p-2">
                                        {navItems.map((item) => {
                                            const Icon = item.icon;
                                            const isActive = pathname === item.href;
                                            return (
                                                <Link key={item.href} href={item.href} onClick={() => setIsMobileOpen(false)}>
                                                    <Button
                                                        variant={isActive ? "secondary" : "ghost"}
                                                        className="w-full justify-start px-4"
                                                    >
                                                        <Icon className="mr-2 h-5 w-5" />
                                                        <span>{item.name}</span>
                                                    </Button>
                                                </Link>
                                            );
                                        })}
                                    </nav>
                                    <div className="border-t p-2">
                                        <Button variant="ghost" className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 px-4">
                                            <LogOut className="mr-2 h-5 w-5" />
                                            <span>Logout</span>
                                        </Button>
                                    </div>
                                </div>
                            )
                        })()}
                    </SheetContent>
                </Sheet>
            </div>

            {/* Desktop Sidebar */}
            <motion.aside
                initial={false}
                animate={isCollapsed ? 'collapsed' : 'expanded'}
                variants={sidebarVariants}
                className={cn(
                    "fixed left-0 top-0 z-50 h-full border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-300 ease-in-out hidden md:flex flex-col",
                )}
            >
                <NavContent />
            </motion.aside>
        </>
    );
};

export default Sidebar;
