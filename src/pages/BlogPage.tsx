import React, { useState } from 'react';
import { BLOG_POSTS } from '../data/blogPosts';
import { BlogPost } from '../types';
import { Clock, User, Calendar, X, ArrowLeft, Send, Sparkles } from 'lucide-react';

export const BlogPage: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [commentName, setCommentName] = useState<string>('');
  const [commentText, setCommentText] = useState<string>('');
  const [comments, setComments] = useState<{ author: string; text: string; date: string }[]>([
    { author: 'سارا رضایی', text: 'بسیار مقاله عالی و کاربردی بود. ترکیب زرشکی و کرم فوق‌العاده میشه!', date: '۱۰ مرداد' }
  ]);
  const [commentSuccess, setCommentSuccess] = useState<boolean>(false);

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentName || !commentText) return;
    setComments([{ author: commentName, text: commentText, date: 'هم‌اکنون' }, ...comments]);
    setCommentName('');
    setCommentText('');
    setCommentSuccess(true);
    setTimeout(() => setCommentSuccess(false), 4000);
  };

  return (
    <div className="space-y-12 pb-16">
      
      {/* Header Banner */}
      <div className="bg-[#F3EEE7] rounded-3xl p-8 border border-[#EAE3DA] text-center space-y-2">
        <span className="text-xs font-bold text-[#701A23] bg-[#701A23]/10 px-3.5 py-1.5 rounded-full">
          MAGAZINE & FASHION GUIDES
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1F1A1C]">مجله مد، استایل و سبک زندگی نیلوفر</h1>
        <p className="text-xs text-[#574E52]">
          مقالات آموزشی درباره ست کردن رنگ‌ها، نگهداری از پارچه‌های نفیس و اخبار رونمایی کالکشن‌های جدید
        </p>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {BLOG_POSTS.map((post) => (
          <article
            key={post.id}
            onClick={() => setSelectedPost(post)}
            className="bg-white rounded-3xl overflow-hidden border border-[#EAE3DA] shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col group"
          >
            <div className="relative aspect-[16/10] bg-[#F3EEE7] overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-3 right-3 bg-[#701A23] text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow">
                {post.category}
              </span>
            </div>

            <div className="p-6 flex flex-col justify-between flex-1 space-y-4 text-right">
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-[11px] text-[#574E52]">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#701A23]" />
                    {post.date}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#701A23]" />
                    {post.readTime}
                  </span>
                </div>

                <h3 className="font-extrabold text-base text-[#1F1A1C] group-hover:text-[#701A23] transition-colors leading-snug">
                  {post.title}
                </h3>

                <p className="text-xs text-[#574E52] line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-3 border-t border-[#F3EEE7] flex items-center justify-between text-xs font-bold text-[#701A23]">
                <span className="flex items-center gap-1">
                  <User className="w-3.5 h-3.5" />
                  نویسنده: {post.author}
                </span>
                <span className="group-hover:translate-x-[-4px] transition-transform flex items-center gap-1">
                  ادامه مطلب <ArrowLeft className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* ARTICLE READER MODAL */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
          <div className="bg-[#FCFAF7] rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-[#EAE3DA] relative max-h-[90vh] flex flex-col">
            
            <button
              onClick={() => setSelectedPost(null)}
              className="absolute top-4 left-4 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-[#1F1A1C] shadow-md transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="overflow-y-auto p-6 sm:p-10 space-y-6 text-right">
              
              <div className="space-y-3">
                <span className="bg-[#701A23]/10 text-[#701A23] text-xs font-bold px-3 py-1 rounded-full inline-block">
                  {selectedPost.category}
                </span>
                <h1 className="text-xl sm:text-2xl font-extrabold text-[#1F1A1C] leading-snug">
                  {selectedPost.title}
                </h1>
                <div className="flex items-center gap-4 text-xs text-[#574E52] border-b border-[#EAE3DA] pb-4">
                  <span>نویسنده: <strong>{selectedPost.author}</strong></span>
                  <span>•</span>
                  <span>تاریخ: {selectedPost.date}</span>
                  <span>•</span>
                  <span>{selectedPost.readTime}</span>
                </div>
              </div>

              <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-[#F3EEE7] border border-[#EAE3DA]">
                <img src={selectedPost.image} alt={selectedPost.title} className="w-full h-full object-cover" />
              </div>

              <div className="text-xs sm:text-sm text-[#1F1A1C] leading-relaxed whitespace-pre-line space-y-4">
                {selectedPost.content}
              </div>

              {/* Tags */}
              <div className="pt-4 border-t border-[#EAE3DA] flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold text-[#701A23]">برچسب‌ها:</span>
                {selectedPost.tags.map((tag, i) => (
                  <span key={i} className="bg-white border border-[#EAE3DA] text-[#574E52] text-[11px] px-2.5 py-1 rounded-lg">
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Comments Section */}
              <div className="pt-6 border-t border-[#EAE3DA] space-y-4">
                <h3 className="font-extrabold text-sm text-[#1F1A1C]">نظرات خوانندگان ({comments.length})</h3>

                <div className="space-y-3">
                  {comments.map((c, i) => (
                    <div key={i} className="p-3.5 bg-white rounded-2xl border border-[#EAE3DA] text-xs space-y-1">
                      <div className="flex justify-between font-bold text-[#701A23]">
                        <span>{c.author}</span>
                        <span className="text-[10px] text-[#574E52] font-normal">{c.date}</span>
                      </div>
                      <p className="text-[#574E52]">{c.text}</p>
                    </div>
                  ))}
                </div>

                {/* Comment Form */}
                <form onSubmit={handleAddComment} className="p-4 bg-[#F3EEE7] rounded-2xl space-y-3 border border-[#EAE3DA]">
                  <h4 className="font-bold text-xs text-[#701A23]">دیدگاه شما درباره این مقاله</h4>

                  {commentSuccess && (
                    <div className="bg-emerald-600 text-white p-2.5 rounded-xl text-xs font-semibold">
                      دیدگاه شما ثبت گردید!
                    </div>
                  )}

                  <input
                    type="text"
                    required
                    value={commentName}
                    onChange={(e) => setCommentName(e.target.value)}
                    placeholder="نام شما"
                    className="w-full bg-white border border-[#EAE3DA] rounded-xl p-2.5 text-xs text-[#1F1A1C] focus:outline-none focus:border-[#701A23]"
                  />

                  <textarea
                    required
                    rows={2}
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="نظر خود را بنویسید..."
                    className="w-full bg-white border border-[#EAE3DA] rounded-xl p-2.5 text-xs text-[#1F1A1C] focus:outline-none focus:border-[#701A23]"
                  />

                  <button
                    type="submit"
                    className="bg-[#701A23] hover:bg-[#58141B] text-white font-bold px-4 py-2 rounded-xl text-xs transition-all shadow"
                  >
                    ارسال دیدگاه
                  </button>
                </form>

              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};
