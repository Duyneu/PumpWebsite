import React from 'react';

export function renderInlineTokens(line: string, isUser: boolean) {
  // Regex to match:
  // 1. Markdown link: [label](url)
  // 2. URLs (including https://zalo.me/...)
  // 3. Bold text: **text**
  // 4. Hotline phone: 0898 296 336 or (+84) 898 296 336
  const tokenRegex =
    /(\[[^\]]+\]\([^\)]+\)|https?:\/\/[^\s\),]+|\*\*[^*]+\*\*|\(?\+84\)?\s?898\s?296\s?336|0898\s?296\s?336)/g;

  const parts = line.split(tokenRegex);

  return parts.map((part, pIdx) => {
    if (!part) return null;

    // 1. Markdown link [label](url)
    const mdLink = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (mdLink) {
      const label = mdLink[1];
      const url = mdLink[2];
      const isZalo = url.includes('zalo.me') || label.toLowerCase().includes('zalo');
      if (isZalo) {
        return (
          <a
            key={pIdx}
            href="https://zalo.me/0898296336"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-[#0068FF] text-white px-2.5 py-0.5 rounded-full text-xs font-semibold hover:bg-blue-700 transition-all shadow-2xs mx-1 align-middle"
          >
            <span className="bg-white text-[#0068FF] text-[9px] font-bold px-1 rounded">Zalo</span>
            <span>Chat Zalo</span>
          </a>
        );
      }
      return (
        <a
          key={pIdx}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline font-medium"
        >
          {label}
        </a>
      );
    }

    // 2. Raw URL (especially Zalo)
    if (part.startsWith('http://') || part.startsWith('https://')) {
      if (part.includes('zalo.me')) {
        return (
          <a
            key={pIdx}
            href="https://zalo.me/0898296336"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-[#0068FF] text-white px-2.5 py-0.5 rounded-full text-xs font-semibold hover:bg-blue-700 transition-all shadow-2xs mx-1 align-middle"
          >
            <span className="bg-white text-[#0068FF] text-[9px] font-bold px-1 rounded">Zalo</span>
            <span>0898 296 336</span>
          </a>
        );
      }
      return (
        <a
          key={pIdx}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline font-medium break-all"
        >
          {part}
        </a>
      );
    }

    // 3. Bold text **text**
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong
          key={pIdx}
          className={isUser ? 'font-semibold text-white' : 'font-semibold text-slate-900'}
        >
          {part.slice(2, -2)}
        </strong>
      );
    }

    // 4. Phone number
    if (/898\s?296\s?336/.test(part)) {
      return (
        <a
          key={pIdx}
          href="tel:+84898296336"
          className={
            isUser
              ? 'text-white underline font-semibold'
              : 'text-blue-600 hover:underline font-bold inline-flex items-center gap-1'
          }
          title="Gọi Hotline tư vấn: 0898 296 336"
        >
          <span>📞 {part}</span>
        </a>
      );
    }

    // Clean stray markdown italics like *(Hotline...)*
    const cleanText = part.replace(/\*([^*]+)\*/g, '$1');
    return <span key={pIdx}>{cleanText}</span>;
  });
}

export function FormattedMessage({ text, isUser }: { text: string; isUser: boolean }) {
  const lines = text.split('\n');
  return (
    <div className="space-y-1.5 text-[13.5px] leading-relaxed">
      {lines.map((line, idx) => {
        if (!line.trim()) return <div key={idx} className="h-1" />;

        if (
          line.trim().startsWith('•') ||
          line.trim().startsWith('- ') ||
          line.trim().startsWith('* ')
        ) {
          const content = line.trim().replace(/^[•\-\*]\s*/, '');
          return (
            <div key={idx} className="flex items-start gap-2 pl-0.5">
              <span className={isUser ? 'text-blue-200 mt-1' : 'text-blue-600 mt-1 font-bold'}>•</span>
              <span className="flex-1">{renderInlineTokens(content, isUser)}</span>
            </div>
          );
        }

        return <p key={idx}>{renderInlineTokens(line, isUser)}</p>;
      })}
    </div>
  );
}
