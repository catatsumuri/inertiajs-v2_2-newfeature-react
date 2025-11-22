import { Skeleton } from '@/components/ui/skeleton';
import { UserInfo } from '@/components/user-info';
import AppLayout from '@/layouts/app-layout';
import { deferredProps } from '@/routes';
import { type BreadcrumbItem, User } from '@/types';
import { Deferred, Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Deferred Props',
        href: deferredProps().url,
    },
];

export default function DeferredProps({
    stats,
    users,
}: {
    stats?: { totalUsers: number; totalCompanies: number };
    users?: User[];
}) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Deferred Props" />
            <div className="p-6">
                <h1 className="mb-6 text-3xl font-bold">Deferred Props</h1>
                <div className="grid grid-cols-2 gap-6">
                    <Deferred
                        data="stats"
                        fallback={
                            <div className="rounded-lg border bg-card p-6">
                                Loading stats...
                            </div>
                        }
                    >
                        <div className="space-y-4">
                            <div className="rounded-lg border bg-card p-6">
                                <h2 className="text-lg font-semibold">
                                    Total Users
                                </h2>
                                <p className="mt-2 text-3xl font-bold">
                                    {stats?.totalUsers}
                                </p>
                            </div>
                            <div className="rounded-lg border bg-card p-6">
                                <h2 className="text-lg font-semibold">
                                    Total Companies
                                </h2>
                                <p className="mt-2 text-3xl font-bold">
                                    {stats?.totalCompanies}
                                </p>
                            </div>
                        </div>
                    </Deferred>
                    <Deferred
                        data="users"
                        fallback={
                            <div className="space-y-2">
                                {[...Array(10)].map((_, i) => (
                                    <div
                                        key={i}
                                        className="flex items-center justify-between rounded-lg border bg-card p-4 shadow-sm"
                                    >
                                        <div className="flex items-center gap-4">
                                            <Skeleton className="h-10 w-10 rounded-full" />
                                            <div className="space-y-2">
                                                <Skeleton className="h-4 w-32" />
                                                <Skeleton className="h-3 w-48" />
                                            </div>
                                        </div>
                                        <Skeleton className="h-4 w-24" />
                                    </div>
                                ))}
                            </div>
                        }
                    >
                        <div className="space-y-2">
                            {users?.map((user) => (
                                <div
                                    key={user.id}
                                    className="flex items-center justify-between rounded-lg border bg-card p-4 shadow-sm"
                                >
                                    <div className="flex items-center gap-4">
                                        <UserInfo user={user} showEmail />
                                    </div>
                                    <span className="text-sm font-medium">
                                        {user.company?.name || 'No company'}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </Deferred>
                </div>
            </div>
        </AppLayout>
    );
}
