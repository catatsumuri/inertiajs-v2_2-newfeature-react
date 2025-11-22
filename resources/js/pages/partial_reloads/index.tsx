import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { UserInfo } from '@/components/user-info';
import AppLayout from '@/layouts/app-layout';
import { index } from '@/routes/partial-reload';
import { type BreadcrumbItem, Company, User } from '@/types';
import { Head, useForm } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Partial Reload',
        href: index().url,
    },
];

type Filters = {
    company_id?: string | number | null;
};

export default function Index({
    users,
    companies,
    filters,
    currentTime,
}: {
    users: User[];
    companies: Company[];
    filters: Filters;
    currentTime: string;
}) {
    const initialCompanyId = filters?.company_id
        ? String(filters.company_id)
        : '';
    const { data, setData, get, processing } = useForm<{ company_id: string }>({
        company_id: initialCompanyId,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        get(index().url, {
            only: ['users'],
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Partial Reload" />
            <div className="p-6">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold">Users</h1>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Current Time: {currentTime}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
                    <Select
                        value={data.company_id || undefined}
                        onValueChange={(value) =>
                            setData('company_id', value === 'all' ? '' : value)
                        }
                    >
                        <SelectTrigger className="w-64">
                            <SelectValue placeholder="Filter by company" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All companies</SelectItem>
                            {companies.map((company) => (
                                <SelectItem
                                    key={company.id}
                                    value={company.id.toString()}
                                >
                                    {company.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Button type="submit" disabled={processing}>
                        Filter
                    </Button>
                </form>

                <div className="space-y-2">
                    {users.map((user) => (
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
            </div>
        </AppLayout>
    );
}
