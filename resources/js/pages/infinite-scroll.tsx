import { UserInfo } from '@/components/user-info';
import AppLayout from '@/layouts/app-layout';
import { infiniteScroll } from '@/routes';
import { type BreadcrumbItem, type User } from '@/types';
import { Head, InfiniteScroll } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Infinite Scroll',
        href: infiniteScroll().url,
    },
];

type PaginatedUsers = {
    data: User[];
};

export default function InfiniteScrollPage({
    users,
}: {
    users: PaginatedUsers;
}) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Infinite Scroll" />
            <div className="p-6">
                <h1 className="mb-6 text-3xl font-bold">Infinite Scroll</h1>
                <InfiniteScroll data="users">
                    <div className="space-y-2">
                        {users.data.map((user) => (
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
                </InfiniteScroll>
            </div>
        </AppLayout>
    );
}
