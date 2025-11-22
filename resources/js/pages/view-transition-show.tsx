import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { index as viewTransitionIndex } from '@/routes/view-transition';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

type Item = {
    id: number;
    title: string;
    description: string;
};

export default function ViewTransitionShow({ item }: { item: Item }) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'View Transition',
            href: viewTransitionIndex(),
        },
        {
            title: item.title,
            href: `/view-transition/${item.id}`,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={item.title} />
            <div className="p-6">
                <Link href={viewTransitionIndex()} viewTransition>
                    <Button variant="outline" className="mb-6">
                        ← Back to List
                    </Button>
                </Link>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-3xl">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-lg">{item.description}</p>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
