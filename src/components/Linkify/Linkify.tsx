import React from 'react';
import DOMPurify from 'dompurify';

type Props = {
  children: string;
};

const Linkify = ({ children }: Props) => {
  // More robust URL regex (handles common cases better)
  const urlPattern =
    /(\b(https?:\/\/|www\.)[-A-Za-z0-9+&@#/%?=~_|!:,.;]*[-A-Za-z0-9+&@#/%=~_|])/gi;

  const parseText = (text: string) => {
    const parts = [];
    let lastIndex = 0;
    let match;

    // Reset regex state for multiple calls
    urlPattern.lastIndex = 0;

    // Find all URLs in the text
    while ((match = urlPattern.exec(text)) !== null) {
      const url = match[0];
      const startIndex = match.index;

      // Add text before the URL (if any)
      if (startIndex > lastIndex) {
        parts.push(text.slice(lastIndex, startIndex));
      }

      // Normalize URL (add protocol if missing)
      const href = url.startsWith('http') ? url : `https://${url}`;
      parts.push(
        <a
          key={startIndex}
          href={DOMPurify.sanitize(href)}
          target="_blank"
          className="underline "
          rel="noopener noreferrer"
        >
          {url}
        </a>
      );

      lastIndex = startIndex + url.length;
    }

    // Add remaining text after the last URL
    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex));
    }

    return parts.length > 0 ? parts : [text];
  };

  return <span>{parseText(children)}</span>;
};

export default Linkify;