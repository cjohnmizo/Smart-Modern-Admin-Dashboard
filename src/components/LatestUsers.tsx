'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FadeIn, HoverCard } from "@/components/ui/motion";

const newUsers = [
    {
        name: "Olivia Martin",
        email: "olivia.martin@email.com",
        role: "Product Manager",
        avatar: "/avatars/01.png",
        initials: "OM"
    },
    {
        name: "Jackson Lee",
        email: "jackson.lee@email.com",
        role: "Developer",
        avatar: "/avatars/02.png",
        initials: "JL"
    },
    {
        name: "Isabella Nguyen",
        email: "isabella.nguyen@email.com",
        role: "Designer",
        avatar: "/avatars/03.png",
        initials: "IN"
    },
    {
        name: "William Kim",
        email: "will@email.com",
        role: "Developer",
        avatar: "/avatars/04.png",
        initials: "WK"
    },
    {
        name: "Sofia Davis",
        email: "sofia.davis@email.com",
        role: "QA Engineer",
        avatar: "/avatars/05.png",
        initials: "SD"
    }
];

export function LatestUsers() {
    return (
        <Card className="col-span-1 lg:col-span-3 h-full">
            <CardHeader>
                <CardTitle>Latest Users</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {newUsers.map((user, index) => (
                        <FadeIn key={index} delay={index * 0.1}>
                            <HoverCard className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                                <div className="flex items-center gap-4">
                                    <Avatar className="h-9 w-9">
                                        <AvatarImage src={user.avatar} alt={user.name} />
                                        <AvatarFallback>{user.initials}</AvatarFallback>
                                    </Avatar>
                                    <div className="space-y-1">
                                        <p className="text-sm font-medium leading-none">{user.name}</p>
                                        <p className="text-xs text-muted-foreground">{user.email}</p>
                                    </div>
                                </div>
                                <div className="text-xs text-muted-foreground">{user.role}</div>
                            </HoverCard>
                        </FadeIn>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
