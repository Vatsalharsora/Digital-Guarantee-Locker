'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function VideoPlayerContent() {
  const searchParams = useSearchParams();
  const [videoData, setVideoData] = useState({
    type: '',
    url: '',
    title: ''
  });

  useEffect(() => {
    const type = searchParams.get('type') || '';
    const url = searchParams.get('url') || '';
    const title = searchParams.get('title') || '';
    
    setVideoData({ type, url, title });
  }, [searchParams]);

  const getVideoTypeLabel = (type: string) => {
    switch (type) {
      case 's3': return 'S3 Video';
      case 'normal': return 'Normal Video';
      case 'local': return 'Local Video';
      default: return 'Video';
    }
  };

  const getVideoTypeColor = (type: string) => {
    switch (type) {
      case 's3': return 'text-blue-400';
      case 'normal': return 'text-purple-400';
      case 'local': return 'text-green-400';
      default: return 'text-white';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/cars" className="text-white hover:text-blue-400 transition-colors">
              ← Back to Cars
            </Link>
            <div className="text-center">
              <h1 className="text-xl font-bold text-white">{videoData.title}</h1>
              <p className={`text-sm ${getVideoTypeColor(videoData.type)}`}>
                {getVideoTypeLabel(videoData.type)}
              </p>
            </div>
            <Link href="/" className="text-white hover:text-blue-400 transition-colors">
              Home
            </Link>
          </div>
        </div>
      </div>

      {/* Video Player */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-black/30 backdrop-blur-lg rounded-xl border border-white/20 overflow-hidden">
            {videoData.url ? (
              <video
                controls
                autoPlay
                className="w-full h-auto max-h-[70vh]"
                poster="https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&h=450&fit=crop"
              >
                <source src={videoData.url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <div className="aspect-video flex items-center justify-center bg-gray-800">
                <div className="text-center text-white">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                  <p>Loading video...</p>
                </div>
              </div>
            )}
          </div>

          {/* Video Info */}
          <div className="mt-6 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-6">
            <h2 className="text-2xl font-bold text-white mb-2">{videoData.title}</h2>
            <div className="flex items-center space-x-4 text-sm text-white/70">
              <span className={getVideoTypeColor(videoData.type)}>
                {getVideoTypeLabel(videoData.type)}
              </span>
              <span>•</span>
              <span>HD Quality</span>
              <span>•</span>
              <span>Auto Play Enabled</span>
            </div>
            
            {/* Video Controls Info */}
            <div className="mt-4 p-4 bg-black/20 rounded-lg">
              <h3 className="text-white font-semibold mb-2">Video Controls:</h3>
              <ul className="text-white/70 text-sm space-y-1">
                <li>• Use spacebar to play/pause</li>
                <li>• Use arrow keys to seek forward/backward</li>
                <li>• Use F key for fullscreen</li>
                <li>• Use M key to mute/unmute</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function VideoPlayerPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    }>
      <VideoPlayerContent />
    </Suspense>
  );
}