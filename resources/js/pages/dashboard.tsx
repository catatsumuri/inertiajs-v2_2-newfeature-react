import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { dashboard, deferredProps, infiniteScroll, polling } from '@/routes';
import { index as formIndex } from '@/routes/form';
import { index as partialReloadIndex } from '@/routes/partial-reload';
import { index as viewTransitionIndex } from '@/routes/view-transition';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import {
    ArrowDownUp,
    FileText,
    Radio,
    RefreshCw,
    Sparkles,
    Timer,
} from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

const features = [
    {
        title: 'Partial Reload',
        href: partialReloadIndex(),
        icon: RefreshCw,
    },
    {
        title: 'Polling',
        href: polling(),
        icon: Radio,
    },
    {
        title: 'Deferred Props',
        href: deferredProps(),
        icon: Timer,
    },
    {
        title: 'Infinite Scroll',
        href: infiniteScroll(),
        icon: ArrowDownUp,
    },
    {
        title: 'Form',
        href: formIndex(),
        icon: FileText,
    },
    {
        title: 'View Transition',
        href: viewTransitionIndex(),
        icon: Sparkles,
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="p-6">
                <h1 className="mb-6 text-3xl font-bold">Dashboard</h1>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature) => {
                        const Icon = feature.icon;
                        return (
                            <Link key={feature.title} href={feature.href}>
                                <Card className="cursor-pointer transition-shadow hover:shadow-lg">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <Icon className="h-5 w-5" />
                                            {feature.title}
                                        </CardTitle>
                                    </CardHeader>
                                </Card>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </AppLayout>
    );
}
