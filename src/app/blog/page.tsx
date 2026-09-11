'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, Calendar, User, Clock, ArrowRight, Tag } from 'lucide-react';
import { blogPosts, blogCategories } from '@/data/blogData';
import FloatingMedicalElements from '@/components/FloatingMedicalElements';

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    return matchesSearch && matchesCategory && post.active;
  });

  const featuredPost = blogPosts.find(p => p.featured && p.active);

  return (
    <div className="relative min-h-screen">
      <FloatingMedicalElements />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Health Blog</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Expert insights, health tips, and the latest news in diagnostic healthcare
          </p>
        </motion.div>

        {/* Featured Post */}
        {featuredPost && activeCategory === 'All' && !searchQuery && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-cyan-500 to-indigo-600 rounded-3xl p-8 md:p-12 text-white mb-12"
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm mb-4">Featured</span>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">{featuredPost.title}</h2>
                <p className="text-cyan-100 mb-6">{featuredPost.excerpt}</p>
                <div className="flex items-center gap-4 text-sm text-cyan-100 mb-6">
                  <span className="flex items-center gap-1"><User className="w-4 h-4" /> {featuredPost.author}</span>
                  <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {featuredPost.publishedAt}</span>
                  <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {featuredPost.readTime} min read</span>
                </div>
                <Link href={`/blog/${featuredPost.slug}`}>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-3 bg-white text-cyan-600 font-semibold rounded-xl hover:bg-cyan-50 transition-smooth"
                  >
                    Read Article
                  </motion.button>
                </Link>
              </div>
              <div className="hidden md:block">
                <div className="w-full h-48 bg-white/10 rounded-2xl flex items-center justify-center">
                  <span className="text-6xl">📖</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Search & Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-transparent focus:border-cyan-500 focus:bg-white transition-smooth"
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-slate-100">
            {blogCategories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full font-medium text-sm transition-smooth ${
                  activeCategory === category
                    ? 'bg-cyan-500 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden card-hover group"
            >
              <Link href={`/blog/${post.slug}`}>
                <div className="h-40 bg-gradient-to-br from-cyan-100 to-indigo-100 flex items-center justify-center">
                  <span className="text-5xl">📝</span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 bg-cyan-100 text-cyan-700 text-xs rounded-full font-medium">
                      {post.category}
                    </span>
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-2 group-hover:text-cyan-600 transition-smooth line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-slate-500 mb-4 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <User className="w-4 h-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-slate-500">
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime} min</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-600">No articles found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}