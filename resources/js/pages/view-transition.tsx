import AppLayout from '@/layouts/app-layout';
import { index as viewTransitionIndex } from '@/routes/view-transition';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'View Transition',
        href: viewTransitionIndex(),
    },
];

type Item = {
    id: number;
    title: string;
    description: string;
};

export default function ViewTransition({ items }: { items: Item[] }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="View Transition" />
            <div className="p-6">
                <h1 className="mb-6 text-3xl font-bold">View Transition</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {items.map((item) => (
                        <Link key={item.id} href={`/view-transition/${item.id}`} viewTransition>
                            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                                <CardHeader>
                                    <CardTitle>{item.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground">{item.description}</p>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
