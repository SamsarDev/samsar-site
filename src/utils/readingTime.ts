export function calculateReadingTime(content: string, wordsPerMinute = 200): string {
  const cleanContent = content.replace(/<[^>]*>/g, '').replace(/```[\s\S]*?```/g, '');
  const wordCount = cleanContent.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(wordCount / wordsPerMinute));
  return `${minutes} min de lectura`;
}
