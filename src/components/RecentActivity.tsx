'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FadeIn } from "@/components/ui/motion";

const activities = [
    {
        user: "Sarah Chen",
        action: "created a new project",
        target: "Marketing Campaign Q4",
        time: "2 mins ago",
        avatar: "/avatars/02.png",
        initials: "SC"
    },
    {
        user: "Mike Ross",
        action: "completed task",
        target: "Update User Documentation",
        time: "1 hour ago",
        avatar: "/avatars/03.png",
        initials: "MR"
    },
    {
        user: "Anna Smith",
        action: "commented on",
        target: "System Architecture Review",
        time: "3 hours ago",
        avatar: "/avatars/04.png",
        initials: "AS"
    },
    {
        user: "David Kim",
        action: "deployed",
        target: "v2.4.0 to Production",
        time: "5 hours ago",
        avatar: "/avatars/05.png",
        initials: "DK"
    },
    {
        user: "Emily Davis",
        action: "invited",
        target: "James Wilson to team",
        time: "Yesterday",
        avatar: "/avatars/06.png",
        initials: "ED"
    }
];

export function RecentActivity() {
    return (
        <Card className="col-span-1 lg:col-span-3 h-full">
            <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-[300px] pr-4">
                    <div className="space-y-6">
                        {activities.map((activity, index) => (
                            <FadeIn key={index} delay={index * 0.1} className="flex gap-4">
                                <Avatar className="h-9 w-9 mt-0.5">
                                    <AvatarImage src={activity.avatar} alt={activity.user} />
                                    <AvatarFallback>{activity.initials}</AvatarFallback>
                                </Avatar>
                                <div className="space-y-1">
                                    <p className="text-sm font-medium leading-none">
                                        <span className="font-semibold">{activity.user}</span> {activity.action}{" "}
                                        <span className="font-semibold text-primary">{activity.target}</span>
                                    </p>
                                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    );
}
