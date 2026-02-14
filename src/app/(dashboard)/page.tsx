'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, DollarSign, Activity, CreditCard, ArrowUpRight, ArrowDownRight, TrendingUp } from 'lucide-react';
import dynamic from 'next/dynamic';
import TodoList from '@/components/TodoList';
import { RecentActivity } from '@/components/RecentActivity';
import { LatestUsers } from '@/components/LatestUsers';
import { FadeIn, SlideUp } from '@/components/ui/motion';
import { Button } from '@/components/ui/button';

import { Skeleton } from '@/components/ui/skeleton';

const OverviewChart = dynamic(() => import('@/components/OverviewChart'), {
    ssr: false,
    loading: () => <Skeleton className="h-[300px] w-full rounded-md" />
});

export default function DashboardPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <SlideUp>
                    <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                    <p className="text-muted-foreground">Welcome back, John! Here's what's happening today.</p>
                </SlideUp>
                <div className="flex items-center gap-2">
                    <Button variant="outline">Download Report</Button>
                    <Button>New Project</Button>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <FadeIn delay={0.1}>
                    <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">$45,231.89</div>
                            <p className="text-xs text-muted-foreground flex items-center gap-1">
                                <span className="text-green-500 flex items-center"><ArrowUpRight className="h-3 w-3" /> +20.1%</span> from last month
                            </p>
                        </CardContent>
                    </Card>
                </FadeIn>
                <FadeIn delay={0.2}>
                    <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Subscriptions</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">+2350</div>
                            <p className="text-xs text-muted-foreground flex items-center gap-1">
                                <span className="text-green-500 flex items-center"><ArrowUpRight className="h-3 w-3" /> +180.1%</span> from last month
                            </p>
                        </CardContent>
                    </Card>
                </FadeIn>
                <FadeIn delay={0.3}>
                    <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Sales</CardTitle>
                            <CreditCard className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">+12,234</div>
                            <p className="text-xs text-muted-foreground flex items-center gap-1">
                                <span className="text-red-500 flex items-center"><ArrowDownRight className="h-3 w-3" /> -19%</span> from last month
                            </p>
                        </CardContent>
                    </Card>
                </FadeIn>
                <FadeIn delay={0.4}>
                    <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Active Now</CardTitle>
                            <Activity className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">+573</div>
                            <p className="text-xs text-muted-foreground flex items-center gap-1">
                                <span className="text-green-500 flex items-center"><TrendingUp className="h-3 w-3" /> +201</span> since last hour
                            </p>
                        </CardContent>
                    </Card>
                </FadeIn>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <div className="col-span-4">
                    <FadeIn delay={0.5} className="h-full">
                        <Card className="h-full hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <CardTitle>Overview</CardTitle>
                            </CardHeader>
                            <CardContent className="pl-2">
                                <OverviewChart />
                            </CardContent>
                        </Card>
                    </FadeIn>
                </div>
                <div className="col-span-3">
                    <FadeIn delay={0.6} className="h-full">
                        <RecentActivity />
                    </FadeIn>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <div className="col-span-4">
                    <FadeIn delay={0.7} className="h-full">
                        <TodoList />
                    </FadeIn>
                </div>
                <div className="col-span-3">
                    <FadeIn delay={0.8} className="h-full">
                        <LatestUsers />
                    </FadeIn>
                </div>
            </div>
        </div>
    );
}
