import AppLayout from '@/layouts/app-layout';
import { index as formIndex, store as formStore } from '@/routes/form';
import { type BreadcrumbItem } from '@/types';
import { Head, Form } from '@inertiajs/react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Form',
        href: formIndex(),
    },
];

type SubmittedData = {
    title: string;
    body: string;
    tags: string[];
    attachments?: string[];
};

export default function Index({ submittedData }: { submittedData?: SubmittedData }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Form" />
            <div className="p-6">
                <h1 className="mb-6 text-3xl font-bold">Form</h1>

                {submittedData && (
                    <Card className="mb-6">
                        <CardHeader>
                            <CardTitle>Submitted Data</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div>
                                <strong>Title:</strong> {submittedData.title}
                            </div>
                            <div>
                                <strong>Body:</strong> {submittedData.body}
                            </div>
                            <div>
                                <strong>Tags:</strong> {submittedData.tags.join(', ')}
                            </div>
                            {submittedData.attachments && submittedData.attachments.length > 0 && (
                                <div>
                                    <strong>Attachments:</strong> {submittedData.attachments.join(', ')}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                )}

                <Form
                    action={formStore()}
                    disableWhileProcessing
                    resetOnSuccess
                    transform={data => ({
                        ...data,
                        tags: data.tags
                            ? data.tags.split(',').map(t => t.trim()).filter(Boolean)
                            : [],
                    })}
                >
                    {({
                        errors,
                        hasErrors,
                        processing,
                        progress,
                        wasSuccessful,
                        recentlySuccessful,
                    }) => (
                        <div className="space-y-4 max-w-2xl">
                            <div className="space-y-2">
                                <Label htmlFor="title">Title</Label>
                                <Input
                                    id="title"
                                    type="text"
                                    name="title"
                                    placeholder="Weekly progress report"
                                />
                                {errors.title && (
                                    <p className="text-sm text-destructive">{errors.title}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="body">Body</Label>
                                <Textarea
                                    id="body"
                                    name="body"
                                    rows={5}
                                    placeholder="Write your report content here..."
                                />
                                {errors.body && (
                                    <p className="text-sm text-destructive">{errors.body}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="tags">Tags (comma separated)</Label>
                                <Input
                                    id="tags"
                                    type="text"
                                    name="tags"
                                    placeholder="frontend, inertia, weekly"
                                />
                                {errors.tags && (
                                    <p className="text-sm text-destructive">{errors.tags}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="attachments">Attachments</Label>
                                <Input
                                    id="attachments"
                                    type="file"
                                    name="attachments[]"
                                    multiple
                                />
                                {errors['attachments.0'] && (
                                    <p className="text-sm text-destructive">
                                        {errors['attachments.0']}
                                    </p>
                                )}
                            </div>

                            {progress && (
                                <div className="space-y-1">
                                    <div className="flex items-center justify-between text-sm">
                                        <span>Uploading…</span>
                                        <span>{progress.percentage}%</span>
                                    </div>
                                    <progress
                                        max="100"
                                        value={progress.percentage}
                                        className="w-full"
                                    />
                                </div>
                            )}

                            {wasSuccessful && recentlySuccessful && !hasErrors && (
                                <Alert>
                                    <AlertDescription>
                                        Report created successfully.
                                    </AlertDescription>
                                </Alert>
                            )}

                            <div className="flex items-center gap-3">
                                <Button
                                    type="submit"
                                    disabled={processing}
                                >
                                    {processing ? 'Submitting…' : 'Create Report'}
                                </Button>

                                {hasErrors && (
                                    <span className="text-sm text-destructive">
                                        There are some errors. Please fix them and try again.
                                    </span>
                                )}
                            </div>
                        </div>
                    )}
                </Form>
            </div>
        </AppLayout>
    );
}
