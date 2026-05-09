import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Clock, Eye, ThumbsUp, MessageSquare, Share2, Bookmark } from 'lucide-react';
import parse from 'html-react-parser';

const Post = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, fetch from backend: /api/posts/:id
    // For now, simulating a fetch
    setTimeout(() => {
      setPost({
        id,
        title: "How to build a modern web application in 2026",
        subtitle: "A comprehensive guide to using Vite, React, and Tailwind CSS",
        content: "<p>This is the rich text content. It supports <strong>bold</strong>, <em>italics</em>, and much more.</p><h2>Setting up Vite</h2><p>Vite is a next-generation frontend tooling.</p>",
        thumbnail: "https://via.placeholder.com/1200x600",
        author: {
          name: "John Doe",
          avatar: "https://ui-avatars.com/api/?name=John+Doe"
        },
        publishDate: "2026-05-09T10:00:00Z",
        readTime: 5,
        views: 1240,
        likes: 342,
        tags: ["React", "Vite", "Tailwind"]
      });
      setLoading(false);
    }, 1000);
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="animate-pulse">
          <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/2 mb-8"></div>
          <div className="h-64 bg-slate-200 dark:bg-slate-800 rounded w-full mb-8"></div>
          <div className="space-y-4">
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-full"></div>
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-full"></div>
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) return <div className="text-center py-20 text-2xl">Post not found</div>;

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="mb-10 text-center">
        <div className="flex justify-center mb-4 space-x-2">
          {post.tags.map(tag => (
            <span key={tag} className="text-xs font-semibold text-primary-600 bg-primary-50 dark:bg-primary-900/30 px-3 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">{post.title}</h1>
        <p className="text-xl text-slate-500 dark:text-slate-400 mb-8">{post.subtitle}</p>
        
        <div className="flex items-center justify-center space-x-4">
          <img src={post.author.avatar} alt={post.author.name} className="w-12 h-12 rounded-full" />
          <div className="text-left">
            <p className="font-semibold">{post.author.name}</p>
            <div className="flex items-center text-sm text-slate-500 space-x-3">
              <span>{new Date(post.publishDate).toLocaleDateString()}</span>
              <span>·</span>
              <span className="flex items-center"><Clock className="w-4 h-4 mr-1" /> {post.readTime} min read</span>
            </div>
          </div>
        </div>
      </header>

      <img src={post.thumbnail} alt={post.title} className="w-full h-auto rounded-2xl shadow-lg mb-12" />

      <div className="prose prose-lg dark:prose-invert max-w-none mb-12 prose-a:text-primary-600 hover:prose-a:text-primary-500">
        {parse(post.content)}
      </div>

      <footer className="border-t border-slate-200 dark:border-slate-800 py-8 flex flex-col sm:flex-row justify-between items-center">
        <div className="flex space-x-6 mb-4 sm:mb-0">
          <button className="flex items-center text-slate-500 hover:text-primary-600 transition-colors">
            <ThumbsUp className="w-5 h-5 mr-2" /> {post.likes}
          </button>
          <button className="flex items-center text-slate-500 hover:text-primary-600 transition-colors">
            <MessageSquare className="w-5 h-5 mr-2" /> Comment
          </button>
          <div className="flex items-center text-slate-500">
            <Eye className="w-5 h-5 mr-2" /> {post.views}
          </div>
        </div>
        <div className="flex space-x-4">
          <button className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors">
            <Share2 className="w-5 h-5 text-slate-600 dark:text-slate-300" />
          </button>
          <button className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors">
            <Bookmark className="w-5 h-5 text-slate-600 dark:text-slate-300" />
          </button>
        </div>
      </footer>
    </article>
  );
};

export default Post;
