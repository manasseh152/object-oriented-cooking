import { createFileRoute } from '@tanstack/react-router';

import { FormSection } from '@/fetures/example-form/form-section';
import { OutputSection } from '@/fetures/example-form/output-section';
import { useExampleForm } from '@/fetures/example-form/use-example-form';

export const Route = createFileRoute('/forms/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { form, output, onClear, onCopy } = useExampleForm();

  return (
    <div className="max-w-4xl mx-auto p-6 flex flex-col lg:flex-row gap-8">
      <FormSection form={form} />
      <OutputSection onClear={onClear} onCopy={onCopy} output={output} />
    </div>
  );
}
