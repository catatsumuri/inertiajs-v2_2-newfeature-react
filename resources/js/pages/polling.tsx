import { UserInfo } from '@/components/user-info';
import AppLayout from '@/layouts/app-layout';
import { polling } from '@/routes';
import { type BreadcrumbItem, User } from '@/types';
import { Head, usePoll } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Polling',
        href: polling().url,
    },
];

export default function Polling({ users, currentTime }: { users: User[]; currentTime: string }) {
    usePoll(3000, { only: ['users'] });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Polling" />
            <div className="p-6">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold">Polling</h1>
                    <p className="mt-2 text-sm text-muted-foreground">Current Time: {currentTime}</p>
                </div>
                <div className="space-y-2">
                    {users.map((user) => (
                        <div key={user.id} className="flex items-center justify-between rounded-lg border bg-card p-4 shadow-sm">
                            <div className="flex items-center gap-4">
                                <UserInfo user={user} showEmail />
                            </div>
                            <span className="text-sm font-medium">{user.company?.name || 'No company'}</span>
                        </div>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
