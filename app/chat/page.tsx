'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import {
  Brain,
  Send,
  User,
  ChevronRight,
  FileText,
  RefreshCw,
  MessageSquare,
  ImageIcon,
  Video,
  Download,
  Copy,
  CheckCheck,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import { cn } from '@/lib/utils';

type MediaItem =
  | { type: 'image'; url: string; source?: string }
  | { type: 'video'; url: string; source?: string }
  | { type: 'video_script'; content: string; source?: string };

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  media?: MediaItem;
  isStreaming?: boolean;
  error?: boolean;
};

const SUGGESTIONS = [
  'Which schemes am I eligible for?',
  'What documents do I need for PM-KISAN?',
  'How do I apply for Ayushman Bharat?',
  'What is the last date for PM Scholarship?',
  'Compare PM MUDRA and Stand-Up India',
  'Schemes for women entrepreneurs in Telangana',
  'Generate an image of PM-KISAN scheme benefits',
  'Generate a video about Ayushman Bharat',
];

const IMAGE_TRIGGER = /\b(generate|create|make|draw|show|design|produce)\b.{0,30}\b(image|picture|photo|infographic|visual|diagram|illustration|poster|banner)\b/i;
const VIDEO_TRIGGER = /\b(generate|create|make|produce|show)\b.{0,30}\b(video|animation|clip|reel|short)\b/i;

function detectMediaRequest(text: string): 'image' | 'video' | null {
  if (VIDEO_TRIGGER.test(text)) return 'video';
  if (IMAGE_TRIGGER.test(text)) return 'image';
  return null;
}

function extractMediaPrompt(text: string): string {
  return text
    .replace(/\b(generate|create|make|draw|show|design|produce|a|an|the|me|for|of|about)\b/gi, ' ')
    .replace(/\b(image|picture|photo|infographic|visual|diagram|video|animation|clip|illustration|poster|banner|reel|short)\b/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim() || text;
}

// ─── Markdown renderer ────────────────────────────────────────────────────────
function renderMarkdown(text: string): React.ReactNode[] {
  const lines = text.split('\n');
  const nodes: React.ReactNode[] = [];
  let listItems: React.ReactNode[] = [];
  let orderedItems: React.ReactNode[] = [];
  let key = 0;

  const flushList = () => {
    if (listItems.length) {
      nodes.push(<ul key={key++} className="my-1.5 space-y-0.5 pl-4">{listItems}</ul>);
      listItems = [];
    }
    if (orderedItems.length) {
      nodes.push(<ol key={key++} className="my-1.5 space-y-0.5 pl-4 list-decimal">{orderedItems}</ol>);
      orderedItems = [];
    }
  };

  const inlineFormat = (str: string): React.ReactNode => {
    const parts = str.split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g);
    return parts.map((p, i) => {
      if (p.startsWith('**') && p.endsWith('**')) return <strong key={i}>{p.slice(2, -2)}</strong>;
      if (p.startsWith('*') && p.endsWith('*')) return <em key={i}>{p.slice(1, -1)}</em>;
      if (p.startsWith('`') && p.endsWith('`')) return <code key={i} className="px-1 py-0.5 rounded bg-black/10 dark:bg-white/10 text-[11px] font-mono">{p.slice(1, -1)}</code>;
      return p;
    });
  };

  for (const line of lines) {
    const trimmed = line.trim();

    if (trimmed.startsWith('### ')) {
      flushList();
      nodes.push(<h4 key={key++} className="font-semibold text-sm mt-2.5 mb-0.5 text-foreground">{trimmed.slice(4)}</h4>);
    } else if (trimmed.startsWith('## ')) {
      flushList();
      nodes.push(<h3 key={key++} className="font-bold text-sm mt-3 mb-1 text-foreground">{trimmed.slice(3)}</h3>);
    } else if (trimmed.startsWith('# ')) {
      flushList();
      nodes.push(<h2 key={key++} className="font-bold text-base mt-3 mb-1">{trimmed.slice(2)}</h2>);
    } else if (/^[-•✅🔵💡📋⚠️✔️❌🌟🎯📌]\s/.test(trimmed)) {
      if (orderedItems.length) { flushList(); }
      listItems.push(<li key={key++} className="text-[13px] leading-relaxed flex gap-1.5">{inlineFormat(trimmed.replace(/^[-•]\s/, ''))}</li>);
    } else if (/^\d+\.\s/.test(trimmed)) {
      if (listItems.length) { flushList(); }
      orderedItems.push(<li key={key++} className="text-[13px] leading-relaxed">{inlineFormat(trimmed.replace(/^\d+\.\s/, ''))}</li>);
    } else if (trimmed === '') {
      flushList();
      nodes.push(<div key={key++} className="h-1" />);
    } else {
      flushList();
      nodes.push(<p key={key++} className="text-[13px] leading-relaxed">{inlineFormat(trimmed)}</p>);
    }
  }

  flushList();
  return nodes;
}

// ─── Image with skeleton loader ──────────────────────────────────────────────
// Pollinations generates images on-demand — first load can take 15-30s.
// Show an animated skeleton while the browser fetches the image.
function ImageWithSkeleton({ src }: { src: string }) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  return (
    <div className="relative group/img">
      {!loaded && !errored && (
        <div className="w-full h-56 bg-gradient-to-r from-secondary/80 via-accent/40 to-secondary/80 animate-pulse flex flex-col items-center justify-center gap-2 rounded-xl">
          <ImageIcon className="w-8 h-8 text-muted-foreground/30 animate-bounce" />
          <p className="text-xs text-muted-foreground/50">Generating image — this may take ~20s...</p>
        </div>
      )}
      {errored ? (
        <div className="w-full h-32 bg-secondary/40 flex items-center justify-center rounded-xl">
          <p className="text-xs text-muted-foreground/70">Image failed to load. Try again.</p>
        </div>
      ) : (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={src}
          alt="Generated scheme image"
          className={cn(
            'w-full h-auto max-h-72 object-cover transition-opacity duration-500',
            loaded ? 'opacity-100' : 'opacity-0 absolute top-0 left-0'
          )}
          onLoad={() => setLoaded(true)}
          onError={() => setErrored(true)}
        />
      )}
      {loaded && (
        <a
          href={src}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-2 right-2 opacity-0 group-hover/img:opacity-100 transition-opacity bg-black/60 text-white rounded-lg px-2 py-1 text-xs flex items-center gap-1"
        >
          <Download className="w-3 h-3" />
          Save
        </a>
      )}
    </div>
  );
}

// ─── Typing indicator ─────────────────────────────────────────────────────────
function TypingDots() {
  return (
    <div className="flex items-center gap-1 py-1">
      {[0, 1, 2].map((i) => (
        <div key={i} className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
      ))}
    </div>
  );
}

// ─── Message bubble ───────────────────────────────────────────────────────────
function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === 'user';
  const [copied, setCopied] = useState(false);

  const copyText = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={cn('flex gap-3 group', isUser && 'flex-row-reverse')}>
      <div className={cn(
        'w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5',
        isUser ? 'bg-blue-600 text-white' : 'bg-gradient-to-br from-blue-500 to-blue-700 text-white'
      )}>
        {isUser ? <User className="w-4 h-4" /> : <Brain className="w-4 h-4" />}
      </div>

      <div className={cn('max-w-[82%] space-y-2', isUser && 'items-end flex flex-col')}>
        <div className={cn(
          'rounded-2xl px-4 py-3',
          isUser
            ? 'bg-blue-600 text-white rounded-tr-sm'
            : message.error
              ? 'bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-tl-sm'
              : 'bg-secondary/70 text-foreground rounded-tl-sm',
        )}>
          {message.error ? (
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <p className="text-sm text-red-700 dark:text-red-300">{message.content}</p>
            </div>
          ) : isUser ? (
            <p className="text-sm leading-relaxed">{message.content}</p>
          ) : (
            <div className="space-y-0.5">
              {renderMarkdown(message.content)}
              {message.isStreaming && <span className="inline-block w-1.5 h-3.5 bg-blue-500 animate-pulse rounded-sm ml-0.5" />}
            </div>
          )}
        </div>

        {/* Media attachment */}
        {message.media && (
          <div className={cn(
            'rounded-2xl overflow-hidden border border-border/60',
            message.media.type === 'video_script' ? 'max-w-md' : 'max-w-sm'
          )}>
            {message.media.type === 'image' ? (
              <ImageWithSkeleton src={message.media.url} />
            ) : message.media.type === 'video' ? (
              <video
                src={message.media.url}
                controls
                className="w-full max-h-64"
              />
            ) : message.media.type === 'video_script' ? (
              <div className="bg-gradient-to-br from-violet-50 to-blue-50 dark:from-violet-950/40 dark:to-blue-950/40 p-4">
                <div className="flex items-center gap-2 mb-3 pb-2 border-b border-violet-200 dark:border-violet-800">
                  <div className="w-7 h-7 rounded-lg bg-violet-600 flex items-center justify-center">
                    <Video className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-violet-800 dark:text-violet-200">Video Script Ready</p>
                    <p className="text-[10px] text-violet-600 dark:text-violet-400">30-second production script</p>
                  </div>
                </div>
                <div className="space-y-0.5 text-xs text-foreground">
                  {renderMarkdown(message.media.content)}
                </div>
              </div>
            ) : null}
          </div>
        )}

        {/* Timestamp + copy */}
        <div className={cn('flex items-center gap-2', isUser && 'flex-row-reverse')}>
          <span className="text-[10px] text-muted-foreground/60">
            {message.timestamp.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
          </span>
          {!isUser && !message.isStreaming && message.content && !message.error && (
            <button
              type="button"
              onClick={copyText}
              className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground/60 hover:text-muted-foreground"
            >
              {copied ? <CheckCheck className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
const INITIAL_MESSAGE: Message = {
  id: '0',
  role: 'assistant',
  content: `Namaste! I'm your Government Scheme Assistant.

I can help you:
- Find schemes you're eligible for (tell me your age, state, income, occupation)
- Explain eligibility criteria for any scheme
- List required documents step-by-step
- Guide you through the application process
- Compare benefits across schemes
- Generate images and videos about schemes

**New:** Type "generate an image of [scheme name]" or "generate a video about [scheme]" to create visual content!

What would you like to know? You can also ask in Hindi, Telugu, Tamil, or any Indian language.`,
  timestamp: new Date(),
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  // Ref keeps the latest messages accessible inside callbacks without stale closures
  const messagesRef = useRef(messages);
  useEffect(() => { messagesRef.current = messages; }, [messages]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const appendToLastMessage = useCallback((delta: string) => {
    setMessages((prev) => {
      const last = prev[prev.length - 1];
      if (last?.role !== 'assistant') return prev;
      return [...prev.slice(0, -1), { ...last, content: last.content + delta }];
    });
  }, []);

  const finalizeLastMessage = useCallback(() => {
    setMessages((prev) => {
      const last = prev[prev.length - 1];
      if (!last) return prev;
      return [...prev.slice(0, -1), { ...last, isStreaming: false }];
    });
  }, []);

  const sendMessage = useCallback(async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;

    setInput('');
    setIsLoading(true);

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: trimmed,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);

    const mediaType = detectMediaRequest(trimmed);

    if (mediaType) {
      // ── Media generation path ──────────────────────────────────────────────
      const mediaPrompt = extractMediaPrompt(trimmed);

      const placeholderId = (Date.now() + 1).toString();
      setMessages((prev) => [
        ...prev,
        {
          id: placeholderId,
          role: 'assistant',
          content: mediaType === 'image'
            ? `Generating image for: **"${mediaPrompt}"** — this takes a few seconds...`
            : `Generating video for: **"${mediaPrompt}"** — this may take up to 60 seconds...`,
          timestamp: new Date(),
          isStreaming: true,
        },
      ]);

      try {
        const res = await fetch('/api/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt: mediaPrompt, type: mediaType }),
        });

        const data = await res.json();

        if (!res.ok || data.error) {
          setMessages((prev) =>
            prev.map((m) =>
              m.id === placeholderId
                ? { ...m, content: data.error || 'Generation failed. Please try again.', isStreaming: false, error: true }
                : m
            )
          );
        } else {
          const isScript = data.type === 'video_script';
          setMessages((prev) =>
            prev.map((m) =>
              m.id === placeholderId
                ? {
                    ...m,
                    content: data.type === 'image'
                      ? `Here's your generated image for: "${mediaPrompt}"`
                      : isScript
                        ? `Here's a production-ready video script for: "${mediaPrompt}"`
                        : `Here's your generated video for: "${mediaPrompt}"`,
                    isStreaming: false,
                    media: isScript
                      ? { type: 'video_script' as const, content: data.content, source: data.source }
                      : { type: data.type as 'image' | 'video', url: data.url, source: data.source },
                  }
                : m
            )
          );
        }
      } catch {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === placeholderId
              ? { ...m, content: 'Network error. Please check your connection and try again.', isStreaming: false, error: true }
              : m
          )
        );
      } finally {
        setIsLoading(false);
      }
      return;
    }

    // ── Text chat streaming path ───────────────────────────────────────────────
    // Use ref to get the latest messages (avoids stale closure).
    // Exclude error messages and currently-streaming placeholders.
    // Cap at last 20 exchanges to stay within token limits.
    const history = messagesRef.current
      .filter((m) => !m.error && !m.isStreaming && m.content)
      .slice(-20)
      .map((m) => ({ role: m.role, content: m.content }));

    const streamId = (Date.now() + 1).toString();
    setMessages((prev) => [
      ...prev,
      { id: streamId, role: 'assistant', content: '', timestamp: new Date(), isStreaming: true },
    ]);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...history, { role: 'user', content: trimmed }],
        }),
      });

      if (!res.ok || !res.body) {
        const errData = await res.json().catch(() => ({}));
        setMessages((prev) =>
          prev.map((m) =>
            m.id === streamId
              ? { ...m, content: errData.error || 'Failed to get a response. Please try again.', isStreaming: false, error: true }
              : m
          )
        );
        setIsLoading(false);
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() ?? '';

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          const payload = line.slice(6).trim();
          if (payload === '[DONE]') continue;
          try {
            const parsed = JSON.parse(payload);
            const delta: string = parsed.choices?.[0]?.delta?.content ?? '';
            if (delta) appendToLastMessage(delta);
          } catch {
            // malformed chunk — skip
          }
        }
      }
    } catch {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === streamId
            ? { ...m, content: 'Connection error. Please check your internet and try again.', isStreaming: false, error: true }
            : m
        )
      );
    } finally {
      finalizeLastMessage();
      setIsLoading(false);
    }
  }, [isLoading, appendToLastMessage, finalizeLastMessage]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const clearChat = () => {
    setMessages([{ ...INITIAL_MESSAGE, id: Date.now().toString(), timestamp: new Date() }]);
    setInput('');
  };

  const showSuggestions = messages.length <= 1;

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col bg-background">
      {/* Header */}
      <div className="border-b border-border/60 bg-background/80 backdrop-blur-xl px-4 py-3 shrink-0">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-500/30">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-background" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <p className="font-semibold text-sm">SchemeSeva Assistant</p>
                <Badge className="text-[10px] px-2 py-0 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-50">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1 inline-block animate-pulse" />
                  Online
                </Badge>
                <Badge className="text-[10px] px-2 py-0 bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 hover:bg-blue-50 hidden sm:flex items-center gap-1">
                  <ImageIcon className="w-2.5 h-2.5" />
                  Image
                </Badge>
                <Badge className="text-[10px] px-2 py-0 bg-violet-50 dark:bg-violet-950/60 text-violet-700 dark:text-violet-300 border border-violet-200 dark:border-violet-800 hover:bg-violet-50 hidden sm:flex items-center gap-1">
                  <Video className="w-2.5 h-2.5" />
                  Video
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">1,200+ schemes · Text, Image & Video</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={clearChat}
              className="rounded-xl gap-2 text-xs text-muted-foreground"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="hidden sm:block">Clear</span>
            </Button>
            <Link href="/schemes">
              <Button variant="outline" size="sm" className="rounded-xl gap-2 text-xs hidden sm:flex">
                <FileText className="w-3.5 h-3.5" />
                Browse Schemes
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))}

          {/* Suggestions */}
          {showSuggestions && (
            <div className="space-y-3">
              <p className="text-xs text-muted-foreground flex items-center gap-1.5 pl-11">
                <MessageSquare className="w-3.5 h-3.5" />
                Quick questions — tap to ask
              </p>
              <div className="pl-11 flex flex-wrap gap-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => sendMessage(s)}
                    className={cn(
                      'text-xs px-3 py-1.5 rounded-xl border transition-all flex items-center gap-1.5 text-left',
                      s.toLowerCase().includes('image')
                        ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 hover:bg-blue-100'
                        : s.toLowerCase().includes('video')
                          ? 'bg-violet-50 dark:bg-violet-950/40 border-violet-200 dark:border-violet-800 text-violet-700 dark:text-violet-300 hover:bg-violet-100'
                          : 'bg-secondary/60 border-border/60 text-foreground hover:border-blue-200 dark:hover:border-blue-800 hover:bg-accent'
                    )}
                  >
                    {s.toLowerCase().includes('image') && <ImageIcon className="w-3 h-3 shrink-0" />}
                    {s.toLowerCase().includes('video') && <Video className="w-3 h-3 shrink-0" />}
                    {s}
                    <ChevronRight className="w-3 h-3 text-muted-foreground shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      </div>

      {/* Input area */}
      <div className="border-t border-border/50 bg-background/80 backdrop-blur-xl shrink-0">
        <div className="max-w-4xl mx-auto px-4 py-4 space-y-2">
          {/* Quick media buttons */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => { setInput('Generate an image of '); inputRef.current?.focus(); }}
              className="flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 hover:bg-blue-100 transition-colors"
            >
              <ImageIcon className="w-3 h-3" />
              Generate Image
            </button>
            <button
              type="button"
              onClick={() => { setInput('Generate a video about '); inputRef.current?.focus(); }}
              className="flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-lg bg-violet-50 dark:bg-violet-950/40 text-violet-700 dark:text-violet-300 border border-violet-200 dark:border-violet-800 hover:bg-violet-100 transition-colors"
            >
              <Video className="w-3 h-3" />
              Generate Video
            </button>
          </div>

          <div className="flex gap-2 items-end">
            <div className="flex-1 relative">
              <Textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about any government scheme, or request an image/video..."
                className="resize-none rounded-xl bg-secondary/40 border-border/60 focus:border-blue-300 dark:focus:border-blue-700 min-h-[44px] max-h-32 py-3 pr-4 text-sm"
                rows={1}
                disabled={isLoading}
              />
            </div>
            <Button
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || isLoading}
              className="h-11 w-11 rounded-xl bg-blue-600 hover:bg-blue-700 text-white shrink-0 p-0"
              aria-label="Send message"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </Button>
          </div>

          <p className="text-[10px] text-muted-foreground text-center">
            Press Enter to send · Shift+Enter for new line · Responses are for guidance only — verify on official portals.
          </p>
        </div>
      </div>
    </div>
  );
}
