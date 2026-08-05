import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface JsonBlockProps {
  content: string;
  className?: string;
  maxHeight?: string;
}

export const JsonBlock: React.FC<JsonBlockProps> = ({ content, className = '', maxHeight = 'max-h-60' }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  let formatted = content;
  try {
    const parsed = JSON.parse(content);
    formatted = JSON.stringify(parsed, null, 2);
  } catch {
    // Keep raw if not JSON (e.g. SQL statement or raw string)
  }

  return (
    <div className={`relative group json-block ${maxHeight} overflow-y-auto overflow-x-auto ${className}`}>
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 p-1.5 rounded bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-colors opacity-0 group-hover:opacity-100 z-10 cursor-pointer"
        title="Copy to clipboard"
      >
        {copied ? <Check className="w-3.5 h-3.5 text-[#22C55E]" /> : <Copy className="w-3.5 h-3.5" />}
      </button>
      <pre className="p-3 font-code-block text-code-block text-[#A1A1A1] whitespace-pre-wrap break-all">
        <code>{formatted}</code>
      </pre>
    </div>
  );
};
