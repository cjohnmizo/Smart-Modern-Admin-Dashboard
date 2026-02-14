'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, Users, Settings, LogOut, Menu } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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

    return (
        <>
            {/* Mobile Toggle */}
            <div className="md:hidden p-4 fixed top-0 left-0 z-50">
                <Button variant="outline" size="icon" onClick={() => setIsMobileOpen(!isMobileOpen)}>
                    <Menu className="h-5 w-5" />
                </Button>
            </div>

            {/* Overlay for mobile */}
            {isMobileOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => setIsMobileOpen(false)}
                />
            )}

            <motion.aside
                initial={false}
                animate={isCollapsed ? 'collapsed' : 'expanded'}
                variants={sidebarVariants}
                className={cn(
                    "fixed left-0 top-0 z-50 h-full border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-300 ease-in-out hidden md:flex flex-col",
                    // Mobile styles
                    isMobileOpen ? "flex translate-x-0 w-64" : "hidden md:flex",
                    // Mobile override: always fixed width on mobile if open
                )}
                style={{ width: isMobileOpen ? '16rem' : undefined }} // Force width on mobile
            >
                <div className="flex h-14 items-center border-b px-4 justify-between">
                    <AnimatePresence>
                        {(!isCollapsed || isMobileOpen) && (
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
                            <Link key={item.href} href={item.href} passHref>
                                <Button
                                    variant={isActive ? "secondary" : "ghost"}
                                    className={cn(
                                        "w-full justify-start",
                                        isCollapsed ? "justify-center px-2" : "px-4"
                                    )}
                                >
                                    <Icon className={cn("h-5 w-5", isCollapsed ? "mr-0" : "mr-2")} />
                                    {(!isCollapsed) && <span>{item.name}</span>}
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
                        {(!isCollapsed) && <span>Logout</span>}
                    </Button>
                </div>
            </motion.aside>

            {/* Mobile Drawer (Simplification: using the same aside but handling visibility via classes) */}
            <motion.aside
                initial={{ x: '-100%' }}
                animate={{ x: isMobileOpen ? 0 : '-100%' }}
                transition={{ type: 'spring', damping: 20, stiffness: 100 }}
                className="fixed inset-y-0 left-0 z-50 w-64 border-r bg-background/95 backdrop-blur md:hidden flex flex-col"
            >
                <div className="flex h-14 items-center border-b px-4 justify-between">
                    <span className="font-bold text-lg">Smart Admin</span>
                    <Button variant="ghost" size="icon" onClick={() => setIsMobileOpen(false)}>
                        <Menu className="h-5 w-5" />
                    </Button>
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
            </motion.aside>
        </>
    );
};

export default Sidebar;
