'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, User, Clock, ArrowLeft, ArrowRight, Share2, MessageCircle } from 'lucide-react';
import { blogPosts } from '@/data/blogData';
import FloatingMedicalElements from '@/components/FloatingMedicalElements';

export default function BlogPostPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const post = blogPosts.find(p => p.slug === slug);
  
  const currentIndex = blogPosts.findIndex(p => p.slug === slug);
  const nextPost = blogPosts[currentIndex + 1];
  const prevPost = blogPosts[currentIndex - 1];

  if (!post) {
    return (
      <div className="relative min-h-screen">
        <FloatingMedicalElements />
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Article Not Found</h1>
          <p className="text-slate-600 mb-6">The article you're looking for doesn't exist.</p>
          <Link href="/blog" className="text-cyan-600 hover:text-cyan-700 font-medium">
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  // Parse content into paragraphs and headers
  const contentParts = post.content.split('\n\n');

  return (
    <div className="relative min-h-screen">
      <FloatingMedicalElements />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Back Link */}
        <Link href="/blog" className="inline-flex items-center gap-2 text-slate-600 hover:text-cyan-600 mb-8 transition-smooth">
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>

        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Header */}
          <header className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-cyan-100 text-cyan-700 text-sm rounded-full font-medium">
                {post.category}
              </span>
              {post.featured && (
                <span className="px-3 py-1 bg-amber-100 text-amber-700 text-sm rounded-full font-medium">
                  Featured
                </span>
              )}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              {post.title}
            </h1>
            <p className="text-lg text-slate-600 mb-6">{post.excerpt}</p>
            
            <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-cyan-600" />
                </div>
                <span className="font-medium text-slate-700">{post.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {post.publishedAt}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {post.readTime} min read
              </div>
            </div>
          </header>

          {/* Cover Image Placeholder */}
          <div className="w-full h-64 md:h-80 bg-gradient-to-br from-cyan-100 to-indigo-100 rounded-2xl flex items-center justify-center mb-8">
            <span className="text-8xl">📖</span>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            {contentParts.map((part, index) => {
              if (part.startsWith('## ')) {
                return <h2 key={index} className="text-2xl font-bold text-slate-900 mt-8 mb-4">{part.replace('## ', '')}</h2>;
              }
              if (part.startsWith('### ')) {
                return <h3 key={index} className="text-xl font-semibold text-slate-900 mt-6 mb-3">{part.replace('### ', '')}</h3>;
              }
              if (part.startsWith('- ')) {
                const items = part.split('\n').filter(i => i.startsWith('- '));
                return (
                  <ul key={index} className="list-disc list-inside space-y-2 text-slate-600 mb-4">
                    {items.map((item, i) => (
                      <li key={i}>{item.replace('- ', '')}</li>
                    ))}
                  </ul>
                );
              }
              if (part.startsWith('|')) {
                return null; // Skip table rendering for simplicity
              }
              return <p key={index} className="text-slate-600 mb-4 leading-relaxed">{part}</p>;
            })}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-8 pt-8 border-t border-slate-200">
            {post.tags.map(tag => (
              <span key={tag} className="px-3 py-1 bg-slate-100 text-slate-600 text-sm rounded-full">
                #{tag}
              </span>
            ))}
          </div>

          {/* Share */}
          <div className="flex items-center gap-4 mt-6">
            <span className="text-slate-500">Share:</span>
            <button className="p-2 bg-slate-100 rounded-lg hover:bg-cyan-100 hover:text-cyan-600 transition-smooth">
              <Share2 className="w-5 h-5" />
            </button>
            <button className="p-2 bg-slate-100 rounded-lg hover:bg-cyan-100 hover:text-cyan-600 transition-smooth">
              <MessageCircle className="w-5 h-5" />
            </button>
          </div>
        </motion.article>

        {/* Navigation */}
        <div className="grid md:grid-cols-2 gap-4 mt-12 pt-8 border-t border-slate-200">
          {prevPost ? (
            <Link href={`/blog/${prevPost.slug}`} className="group">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:border-cyan-300 transition-smooth">
                <span className="text-sm text-slate-500 flex items-center gap-1 mb-2">
                  <ArrowLeft className="w-4 h-4" /> Previous
                </span>
                <h3 className="font-semibold text-slate-900 group-hover:text-cyan-600 transition-smooth">
                  {prevPost.title}
                </h3>
              </div>
            </Link>
          ) : <div />}
          {nextPost ? (
            <Link href={`/blog/${nextPost.slug}`} className="group">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:border-cyan-300 transition-smooth text-right">
                <span className="text-sm text-slate-500 flex items-center justify-end gap-1 mb-2">
                  Next <ArrowRight className="w-4 h-4" />
                </span>
                <h3 className="font-semibold text-slate-900 group-hover:text-cyan-600 transition-smooth">
                  {nextPost.title}
                </h3>
              </div>
            </Link>
          ) : <div />}
        </div>

        {/* Related Posts */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">More Articles</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {blogPosts.filter(p => p.id !== post.id).slice(0, 3).map((relatedPost) => (
              <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`}>
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 hover:border-cyan-300 transition-smooth">
                  <h3 className="font-medium text-slate-900 line-clamp-2">{relatedPost.title}</h3>
                  <p className="text-sm text-slate-500 mt-2">{relatedPost.readTime} min read</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}