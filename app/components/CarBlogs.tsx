import { useState } from 'react';
import { motion } from 'framer-motion';

interface CarBlogsProps {
  onBack: () => void;
}

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  category: 'new-cars' | 'used-cars' | 'car-tips';
  date: string;
  readTime: string;
}

export const CarBlogs = ({ onBack }: CarBlogsProps) => {
  const [activeTab, setActiveTab] = useState<'all' | 'new-cars' | 'used-cars' | 'car-tips'>('all');

  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "2024 Toyota Camry: Complete Review",
      excerpt: "Discover the latest features and improvements in the new Toyota Camry model.",
      image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&h=250&fit=crop",
      category: 'new-cars',
      date: '2024-01-15',
      readTime: '5 min read'
    },
    {
      id: 2,
      title: "Best Used Cars Under ₹10 Lakhs",
      excerpt: "Top picks for reliable used cars that offer great value for money.",
      image: "https://images.unsplash.com/photo-1494976688153-d4d2529d4ca7?w=400&h=250&fit=crop",
      category: 'used-cars',
      date: '2024-01-12',
      readTime: '7 min read'
    },
    {
      id: 3,
      title: "Car Maintenance Tips for Monsoon",
      excerpt: "Essential tips to keep your car in perfect condition during rainy season.",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=250&fit=crop",
      category: 'car-tips',
      date: '2024-01-10',
      readTime: '4 min read'
    },
    {
      id: 4,
      title: "Honda City vs Maruti Ciaz Comparison",
      excerpt: "Detailed comparison between two popular sedan models in India.",
      image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=250&fit=crop",
      category: 'new-cars',
      date: '2024-01-08',
      readTime: '6 min read'
    },
    {
      id: 5,
      title: "How to Check Used Car History",
      excerpt: "Complete guide to verify used car documents and history before buying.",
      image: "https://images.unsplash.com/photo-1486326658981-ed68abe5868e?w=400&h=250&fit=crop",
      category: 'used-cars',
      date: '2024-01-05',
      readTime: '8 min read'
    },
    {
      id: 6,
      title: "Electric Cars: Future of Transportation",
      excerpt: "Everything you need to know about electric vehicles and their benefits.",
      image: "https://images.unsplash.com/photo-1593941707882-a5bac6861d75?w=400&h=250&fit=crop",
      category: 'car-tips',
      date: '2024-01-03',
      readTime: '10 min read'
    }
  ];

  const filteredPosts = activeTab === 'all' ? blogPosts : blogPosts.filter(post => post.category === activeTab);

  const tabs = [
    { id: 'all', label: 'All Posts', icon: '📰' },
    { id: 'new-cars', label: 'New Cars', icon: '🚗' },
    { id: 'used-cars', label: 'Used Cars', icon: '🚙' },
    { id: 'car-tips', label: 'Car Tips', icon: '🔧' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50"
    >
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-6">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 mb-4"
        >
          <span>←</span>
          <span>Back to Dashboard</span>
        </button>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Car Blogs</h1>
        <p className="text-gray-600">Latest news, reviews, and tips about cars</p>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 px-6">
        <div className="flex space-x-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <span className="text-lg">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              {/* Image */}
              <div className="relative h-48 bg-gray-200">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `https://via.placeholder.com/400x250/6B7280/FFFFFF?text=${encodeURIComponent(post.title.slice(0, 20))}`;
                  }}
                />
                <div className="absolute top-3 left-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    post.category === 'new-cars' ? 'bg-green-100 text-green-800' :
                    post.category === 'used-cars' ? 'bg-blue-100 text-blue-800' :
                    'bg-purple-100 text-purple-800'
                  }`}>
                    {post.category === 'new-cars' ? 'New Cars' :
                     post.category === 'used-cars' ? 'Used Cars' : 'Car Tips'}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                
                {/* Meta */}
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{new Date(post.date).toLocaleDateString()}</span>
                  <span>{post.readTime}</span>
                </div>

                {/* Read More Button */}
                <button className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm font-medium">
                  Read More
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📰</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No posts found</h3>
            <p className="text-gray-600">Try selecting a different category</p>
          </div>
        )}
      </div>

      {/* Featured Section */}
      <div className="bg-white border-t border-gray-200 p-6 mt-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Articles</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white">
            <h3 className="text-xl font-semibold mb-2">Car Buying Guide 2024</h3>
            <p className="mb-4 opacity-90">Complete guide to buying your first car with expert tips and advice.</p>
            <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
              Read Guide
            </button>
          </div>
          <div className="bg-gradient-to-r from-green-500 to-teal-600 rounded-lg p-6 text-white">
            <h3 className="text-xl font-semibold mb-2">Car Insurance Tips</h3>
            <p className="mb-4 opacity-90">Save money on car insurance with these proven strategies and tips.</p>
            <button className="bg-white text-green-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};