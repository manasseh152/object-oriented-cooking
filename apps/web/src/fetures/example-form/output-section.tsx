import { CircleHelp, Clipboard, Plus, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';

type ResultDisplayProps = {
  output: string;
  onClear: () => void;
  onCopy: () => void;
};

function ResultDisplay({ output, onClear, onCopy }: ResultDisplayProps) {
  return (
    <div className="relative w-full rounded-md border bg-muted/50 overflow-hidden shadow-sm">
      <div className="flex items-center justify-between px-3 py-2 border-b bg-muted">
        <span className="text-sm font-medium">Result</span>
        <div className="flex gap-1">
          <Button
            type="button"
            size="icon"
            variant="ghost"
            onClick={onClear}
            title="Clear"
          >
            <span className="sr-only">Clear</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
          </Button>
          <Button
            type="button"
            size="icon"
            variant="ghost"
            onClick={onCopy}
            title="Copy to clipboard"
          >
            <span className="sr-only">Copy</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
              <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
            </svg>
          </Button>
        </div>
      </div>
      <pre className="p-4 overflow-auto text-sm">{output}</pre>
    </div>
  );
}

function OutputPlaceholder() {
  return (
    <div className="border border-dashed rounded-md p-6 flex flex-col items-center justify-center text-center text-muted-foreground">
      <Plus size={24} className="mb-2" />
      <p>Submit the form to see the result here</p>
    </div>
  );
}

type OutputSectionProps = {
  output: string | null;
  onClear: () => void;
  onCopy: () => void;
};

export function OutputSection({ output, onClear, onCopy }: OutputSectionProps) {
  return (
    <div className="w-full lg:w-1/2 flex flex-col gap-5">
      <div>
        <h1 className="text-2xl font-bold mb-1">Output</h1>
        <p className="text-sm text-muted-foreground">View the formatted JSON result from your form submission</p>
      </div>

      <div className="rounded-md bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 p-3">
        <h3 className="text-sm font-medium text-blue-800 dark:text-blue-400 mb-2">About this example</h3>
        <ul className="space-y-2 text-sm text-blue-700 dark:text-blue-300">
          <li className="flex items-start">
            <CircleHelp className="mt-0.5 mr-2 h-4 w-4 flex-shrink-0" />
            <span>The output shows your form data as formatted JSON</span>
          </li>
          <li className="flex items-start">
            <Clipboard className="mt-0.5 mr-2 h-4 w-4 flex-shrink-0" />
            <span>Click the copy button to copy the output to your clipboard</span>
          </li>
          <li className="flex items-start">
            <Trash2 className="mt-0.5 mr-2 h-4 w-4 flex-shrink-0" />
            <span>Click the trash button to clear the result</span>
          </li>
        </ul>
      </div>

      {output
        ? <ResultDisplay output={output} onClear={onClear} onCopy={onCopy} />
        : <OutputPlaceholder />}
    </div>
  );
}
