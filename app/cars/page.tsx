'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface Car {
  id: number;
  name: string;
  brand: string;
  price: string;
  image: string;
  s3Video: string;
  normalVideo: string;
  localVideo: string;
}

const cars: Car[] = [
  {
    id: 1,
    name: 'Model S',
    brand: 'Tesla',
    price: '$89,990',
    image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400&h=300&fit=crop',
    s3Video: 'https://hanamusic.s3.dualstack.eu-north-1.amazonaws.com/videotest/4.mp4',
    normalVideo: 'https://hel1.your-objectstorage.com/caryanams/app5347583724521/videotest/4.mp4',
    localVideo: '/videos/sample.mp4'
  },
  {
    id: 2,
    name: 'Mustang GT',
    brand: 'Ford',
    price: '$55,300',
    image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&h=300&fit=crop',
    s3Video: 'https://hanamusic.s3.dualstack.eu-north-1.amazonaws.com/videotest/4.mp4',
    normalVideo: 'https://hel1.your-objectstorage.com/caryanams/app5347583724521/videotest/4.mp4',
    localVideo: '/videos/sample.mp4'
  },
  {
    id: 3,
    name: 'Camaro SS',
    brand: 'Chevrolet',
    price: '$42,995',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop',
    s3Video: 'https://hanamusic.s3.dualstack.eu-north-1.amazonaws.com/videotest/4.mp4',
    normalVideo: 'https://hel1.your-objectstorage.com/caryanams/app5347583724521/videotest/4.mp4',
    localVideo: '/videos/sample.mp4'
  },
  {
    id: 4,
    name: 'A4 Quattro',
    brand: 'Audi',
    price: '$39,900',
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop',
    s3Video: 'https://hanamusic.s3.dualstack.eu-north-1.amazonaws.com/videotest/4.mp4',
    normalVideo: 'https://hel1.your-objectstorage.com/caryanams/app5347583724521/videotest/4.mp4',
    localVideo: '/videos/sample.mp4'
  },
  {
    id: 5,
    name: 'C-Class',
    brand: 'Mercedes',
    price: '$43,550',
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=300&fit=crop',
    s3Video: 'https://hanamusic.s3.dualstack.eu-north-1.amazonaws.com/videotest/4.mp4',
    normalVideo: 'https://hel1.your-objectstorage.com/caryanams/app5347583724521/videotest/4.mp4',
    localVideo: '/videos/sample.mp4'
  },
  {
    id: 6,
    name: '3 Series',
    brand: 'BMW',
    price: '$41,250',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop',
    s3Video: 'https://hanamusic.s3.dualstack.eu-north-1.amazonaws.com/videotest/4.mp4',
    normalVideo: 'https://hel1.your-objectstorage.com/caryanams/app5347583724521/videotest/4.mp4',
    localVideo: '/videos/sample.mp4'
  }
];

export default function CarsPage() {
  const [videoModal, setVideoModal] = useState<{isOpen: boolean, url: string, title: string, type: string}>({
    isOpen: false,
    url: '',
    title: '',
    type: ''
  });

  const openVideoModal = (url: string, title: string, type: string) => {
    setVideoModal({ isOpen: true, url, title, type });
  };

  const closeVideoModal = () => {
    setVideoModal({ isOpen: false, url: '', title: '', type: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-white hover:text-blue-400 transition-colors">
              ← Back to Home
            </Link>
            <h1 className="text-2xl font-bold text-white">Car Listings</h1>
            <div></div>
          </div>
        </div>
      </div>

      {/* Car Grid */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map((car, index) => (
            <motion.div
              key={car.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 overflow-hidden hover:bg-white/15 transition-all duration-300"
            >
              {/* Car Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={car.image}
                  alt={car.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>

              {/* Car Info */}
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-white">{car.brand} {car.name}</h3>
                  <p className="text-2xl font-bold text-green-400">{car.price}</p>
                </div>

                {/* Video Buttons */}
                <div className="space-y-2">
                  <button
                    onClick={() => openVideoModal(car.s3Video, `${car.brand} ${car.name} - S3 Video`, 's3')}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors duration-200"
                  >
                    S3 Video
                  </button>
                  
                  <button
                    onClick={() => openVideoModal(car.normalVideo, `${car.brand} ${car.name} - Normal Video`, 'normal')}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition-colors duration-200"
                  >
                    Normal Video
                  </button>
                  
                  <button
                    onClick={() => openVideoModal(car.localVideo, `${car.brand} ${car.name} - Local Video`, 'local')}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors duration-200"
                  >
                    Local Video
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      {videoModal.isOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-xl border border-white/20 w-full max-w-4xl max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/20">
              <h2 className="text-white font-bold text-lg">{videoModal.title}</h2>
              <button
                onClick={closeVideoModal}
                className="text-white/70 hover:text-white text-2xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
              >
                ×
              </button>
            </div>
            
            {/* Video Player */}
            <div className="p-4">
              <video
                controls
                autoPlay
                className="w-full h-auto max-h-[60vh] rounded-lg"
                poster="https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&h=450&fit=crop"
              >
                <source src={videoModal.url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}