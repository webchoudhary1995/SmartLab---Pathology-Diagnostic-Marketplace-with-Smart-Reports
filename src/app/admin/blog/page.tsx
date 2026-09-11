'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Edit, Trash2, Eye, ToggleLeft, ToggleRight, X, Image, Calendar, User, Tag } from 'lucide-react';
import { blogPosts as initialPosts, blogCategories } from '@/data/blogData';
import { BlogPost } from '@/types/blog';

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: 'Health Guide',
    tags: '',
    author: '',
    readTime: 5,
    featured: false,
  });

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleActive = (id: string) => {
    setPosts(prev => prev.map(post =>
      post.id === id ? { ...post, active: !post.active } : post
    ));
  };

  const toggleFeatured = (id: string) => {
    setPosts(prev => prev.map(post =>
      post.id === id ? { ...post, featured: !post.featured } : post
    ));
  };

  const deletePost = (id: string) => {
    if (confirm('Are you sure you want to delete this post?')) {
      setPosts(prev => prev.filter(post => post.id !== id));
    }
  };

  const openEditForm = (post: BlogPost) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      tags: post.tags.join(', '),
      author: post.author,
      readTime: post.readTime,
      featured: post.featured,
    });
    setShowAddForm(true);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      category: 'Health Guide',
      tags: '',
      author: '',
      readTime: 5,
      featured: false,
    });
    setEditingPost(null);
  };

  const savePost = () => {
    const tagsArray = formData.tags.split(',').map(t => t.trim()).filter(Boolean);
    const slug = formData.slug || formData.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    
    if (editingPost) {
      setPosts(prev => prev.map(post =>
        post.id === editingPost.id
          ? { ...post, title: formData.title, slug, excerpt: formData.excerpt, content: formData.content, category: formData.category, tags: tagsArray, author: formData.author, readTime: formData.readTime, featured: formData.featured }
          : post
      ));
    } else {
      const newPost: BlogPost = {
        id: `${posts.length + 1}`,
        title: formData.title,
        slug,
        excerpt: formData.excerpt,
        content: formData.content,
        coverImage: '/blog/default.jpg',
        author: formData.author || 'Admin',
        authorImage: '/team/default.jpg',
        category: formData.category,
        tags: tagsArray,
        publishedAt: new Date().toISOString().split('T')[0],
        readTime: formData.readTime,
        featured: formData.featured,
        active: true,
      };
      setPosts(prev => [newPost, ...prev]);
    }
    
    setShowAddForm(false);
    resetForm();
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Blog Management</h1>
              <p className="text-slate-500">Create and manage health articles</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => { resetForm(); setShowAddForm(true); }}
              className="px-4 py-2 bg-cyan-500 text-white rounded-xl hover:bg-cyan-600 transition-smooth flex items-center gap-2 text-sm font-medium"
            >
              <Plus className="w-4 h-4" />
              New Post
            </motion.button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Search */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-transparent focus:border-cyan-500 focus:bg-white transition-smooth"
            />
          </div>
        </div>

        {/* Posts Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr className="text-left text-sm text-slate-500">
                  <th className="px-6 py-4 font-medium">Post</th>
                  <th className="px-6 py-4 font-medium">Category</th>
                  <th className="px-6 py-4 font-medium">Author</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium">Featured</th>
                  <th className="px-6 py-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPosts.map((post, index) => (
                  <motion.tr
                    key={post.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-t border-slate-100"
                  >
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-slate-900">{post.title}</p>
                        <p className="text-sm text-slate-500">{post.slug}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-cyan-100 text-cyan-700 text-xs rounded-full">
                        {post.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{post.author}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => toggleActive(post.id)}
                        className={`px-3 py-1 text-xs rounded-full font-medium ${
                          post.active
                            ? 'bg-green-100 text-green-700'
                            : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        {post.active ? 'Active' : 'Draft'}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <button onClick={() => toggleFeatured(post.id)}>
                        {post.featured ? (
                          <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs rounded-full">Featured</span>
                        ) : (
                          <ToggleLeft className="w-8 h-8 text-slate-300" />
                        )}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <a href={`/blog/${post.slug}`} target="_blank" className="p-2 text-slate-400 hover:text-cyan-600 hover:bg-cyan-50 rounded-lg transition-smooth">
                          <Eye className="w-4 h-4" />
                        </a>
                        <button onClick={() => openEditForm(post)} className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-smooth">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button onClick={() => deletePost(post.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-smooth">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add/Edit Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl shadow-xl max-w-2xl w-full p-6 my-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-slate-900">
                {editingPost ? 'Edit Post' : 'Create New Post'}
              </h2>
              <button onClick={() => { setShowAddForm(false); resetForm(); }} className="p-2 rounded-xl hover:bg-slate-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-transparent focus:border-cyan-500 focus:bg-white"
                  placeholder="Enter post title"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Slug</label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-transparent focus:border-cyan-500 focus:bg-white"
                    placeholder="post-slug"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-transparent focus:border-cyan-500 focus:bg-white"
                  >
                    {blogCategories.filter(c => c !== 'All').map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Excerpt</label>
                <textarea
                  rows={2}
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-transparent focus:border-cyan-500 focus:bg-white"
                  placeholder="Short description..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Content</label>
                <textarea
                  rows={8}
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-transparent focus:border-cyan-500 focus:bg-white"
                  placeholder="Write your article content here..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Author</label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-transparent focus:border-cyan-500 focus:bg-white"
                    placeholder="Author name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Read Time (min)</label>
                  <input
                    type="number"
                    value={formData.readTime}
                    onChange={(e) => setFormData({ ...formData, readTime: parseInt(e.target.value) })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-transparent focus:border-cyan-500 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Tags (comma separated)</label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-transparent focus:border-cyan-500 focus:bg-white"
                  placeholder="health, nutrition, wellness"
                />
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-4 h-4 rounded border-slate-300"
                />
                <label htmlFor="featured" className="text-sm font-medium text-slate-700">Mark as Featured</label>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => { setShowAddForm(false); resetForm(); }}
                className="flex-1 px-4 py-3 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-smooth font-medium"
              >
                Cancel
              </button>
              <button
                onClick={savePost}
                disabled={!formData.title || !formData.content}
                className="flex-1 px-4 py-3 bg-cyan-500 text-white rounded-xl hover:bg-cyan-600 transition-smooth font-medium disabled:opacity-50"
              >
                {editingPost ? 'Update Post' : 'Publish Post'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}