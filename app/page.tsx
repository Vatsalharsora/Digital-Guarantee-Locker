'use client';

import { useState } from 'react';
import { motion } from "framer-motion";
import Link from 'next/link';
import './styles/globals.css';
import { Dashboard } from './components/Dashborad';
import { UploadDocument } from './components/UploadDocument';
import { GuaranteesList } from './components/GuaranteesList';
import { Reminders } from './components/Reminders';

// Hero Section Component
const HeroSection = ({ onSignupClick, onLoginClick }: { onSignupClick: () => void; onLoginClick: () => void }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
        <div className="absolute inset-0 animate-pulse">
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: `radial-gradient(circle at 20px 20px, white 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"
            animate={{
              y: [-20, 20, -20],
              x: [-10, 10, -10],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute top-40 right-20 w-32 h-32 bg-blue-400/20 rounded-full blur-2xl"
            animate={{
              y: [20, -20, 20],
              x: [10, -10, 10],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-20 left-1/4 w-16 h-16 bg-purple-400/30 rounded-full blur-xl"
            animate={{
              y: [-15, 15, -15],
              rotate: [0, 360],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>
      </div>

      {/* Floating dots decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            style={{
              left: `${20 + i * 15}%`,
              top: `${10}px`,
            }}
            animate={{
              y: [0, -10, 0],
              opacity: [0.3, 0.7, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2 + i * 0.3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2
            }}
          />
        ))}
      </div>
      
      {/* Simple Live Navigation */}
      <motion.nav
        className="absolute top-0 left-0 right-0 z-20 p-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="container mx-auto">
          <motion.div
            className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl px-6 py-4 shadow-xl"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="flex items-center justify-between">
              
              {/* Logo Section */}
              <motion.div 
                className="flex items-center space-x-3"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div 
                  className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg"
                  animate={{ 
                    rotate: [0, 5, -5, 0],
                    boxShadow: [
                      "0 4px 14px 0 rgba(59, 130, 246, 0.39)",
                      "0 4px 20px 0 rgba(147, 51, 234, 0.39)",
                      "0 4px 14px 0 rgba(59, 130, 246, 0.39)"
                    ]
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  whileHover={{ 
                    scale: 1.1,
                    rotate: 15,
                    boxShadow: "0 8px 25px 0 rgba(59, 130, 246, 0.6)"
                  }}
                >
                  <motion.span 
                    className="text-2xl"
                    animate={{ 
                      scale: [1, 1.1, 1],
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    🔐
                  </motion.span>
                </motion.div>
                
                <div className="hidden sm:block">
                  <motion.h2 
                    className="text-white font-bold text-xl"
                    animate={{
                      textShadow: [
                        "0 0 10px rgba(255,255,255,0.5)",
                        "0 0 20px rgba(59,130,246,0.5)",
                        "0 0 10px rgba(255,255,255,0.5)"
                      ]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    Digital Guarantee
                  </motion.h2>
                  <motion.p 
                    className="text-white/70 text-sm -mt-1"
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    Locker
                  </motion.p>
                </div>
              </motion.div>

              {/* Navigation Menu */}
              <div className="hidden lg:flex items-center space-x-6 relative z-30">
                <Link
                  href="/cars"
                  className="text-white/80 hover:text-white font-medium transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-white/10 relative z-40"
                >
                  Cars
                </Link>
                <a href="#features" className="text-white/80 hover:text-white font-medium transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-white/10">Features</a>
                <a href="#how-it-works" className="text-white/80 hover:text-white font-medium transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-white/10">How it Works</a>
                <a href="#security" className="text-white/80 hover:text-white font-medium transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-white/10">Security</a>
                <a href="#contact" className="text-white/80 hover:text-white font-medium transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-white/10">Contact</a>
              </div>

              {/* Mobile Menu Button */}
              <motion.button
                className="lg:hidden p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <motion.svg 
                  className="w-6 h-6" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </motion.svg>
              </motion.button>

              {/* Action Buttons */}
              <div className="hidden lg:flex items-center space-x-4">
                <motion.button
                  onClick={onLoginClick}
                  className="px-5 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg border border-white/20 font-medium transition-all duration-200 relative overflow-hidden"
                  whileHover={{ 
                    scale: 1.05,
                    y: -1,
                    boxShadow: "0 4px 14px rgba(255,255,255,0.1)" 
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300"
                  />
                  <span className="relative z-10">Login</span>
                  
                  {/* Live border animation */}
                  <motion.div
                    className="absolute inset-0 border border-white/40 rounded-lg opacity-0"
                    animate={{ opacity: [0, 0.5, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                </motion.button>
                
                <motion.button
                  onClick={onSignupClick}
                  className="px-6 py-2 bg-white text-gray-900 hover:bg-gray-50 rounded-lg font-semibold shadow-lg transition-all duration-200 relative overflow-hidden"
                  whileHover={{ 
                    scale: 1.05,
                    y: -2,
                    boxShadow: "0 8px 25px rgba(255,255,255,0.3)"
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 opacity-0 hover:opacity-100 transition-opacity duration-300"
                  />
                  
                  <motion.span 
                    className="relative z-10 flex items-center space-x-2"
                  >
                    <span>Get Started</span>
                    <motion.span
                      animate={{ x: [0, 3, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </motion.span>
                  
                  {/* Live glow effect */}
                  <motion.div
                    className="absolute inset-0 bg-white/20 rounded-lg opacity-0"
                    animate={{ opacity: [0, 0.3, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                  />
                </motion.button>
              </div>
            </div>
          </motion.div>
          
          {/* Main Hero Content */}
          <div className="relative z-10 container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col items-center justify-center min-h-[80vh]"
            >
              {/* Hero Badge */}
              <motion.div
                className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6 mt-8"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <span className="text-green-400">●</span>
                <span className="text-white/90 text-sm">Trusted by 10,000+ users worldwide</span>
              </motion.div>

              {/* Main Heading - Fixed responsive sizing and alignment */}
              <motion.h1 
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 text-white leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <span className="block mb-2">Your Digital</span>
                <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                  Guarantee
                </span>
                <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white/90">Vault</span>
              </motion.h1>

              {/* Subtitle - Improved spacing and sizing */}
              <motion.p 
                className="text-lg sm:text-xl md:text-2xl lg:text-2xl mb-10 text-white/80 max-w-4xl mx-auto leading-relaxed px-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.0 }}
              >
                Securely store, intelligently organize, and never lose track of your warranty documents again. 
                Experience peace of mind with military-grade security.
              </motion.p>

              {/* Feature Pills - Better responsive layout */}
              <motion.div 
                className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-10 px-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                {['🔒 Bank-Level Security', '⚡ Instant Access', '📱 Mobile Ready', '🔔 Smart Reminders'].map((feature, index) => (
                  <motion.div
                    key={index}
                    className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 sm:px-4 py-2 text-white/90 text-sm whitespace-nowrap"
                    whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.15)' }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    {feature}
                  </motion.div>
                ))}
              </motion.div>

              {/* CTA Buttons - Improved responsive layout */}
              <motion.div 
                className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10 px-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.4 }}
              >
                <motion.button
                  onClick={onSignupClick}
                  className="w-full sm:w-auto group relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl shadow-2xl text-base sm:text-lg overflow-hidden min-w-[200px]"
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 20px 40px rgba(59, 130, 246, 0.4)"
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10">Start Free Today</span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    layoutId="button-bg"
                  />
                </motion.button>

                <motion.button
                  onClick={() => {
                    document.getElementById('demo-video')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full sm:w-auto group flex items-center justify-center space-x-2 px-6 sm:px-8 py-3 sm:py-4 text-white border-2 border-white/30 hover:border-white/50 rounded-2xl backdrop-blur-sm transition-all duration-200 text-base sm:text-lg min-w-[200px]"
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                  <span>Watch Demo</span>
                </motion.button>
              </motion.div>

              {/* Trust Indicators - Better responsive spacing */}
              <motion.div 
                className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-white/60 text-sm px-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.6 }}
              >
                <div className="flex items-center space-x-2">
                  <span className="text-green-400">✓</span>
                  <span>No Credit Card Required</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-green-400">✓</span>
                  <span>14-Day Free Trial</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-green-400">✓</span>
                  <span>Cancel Anytime</span>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div 
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.0 }}
          >
            <motion.div
              className="w-8 h-12 border-2 border-white/30 rounded-full flex justify-center"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <motion.div
                className="w-1 h-3 bg-white/60 rounded-full mt-2"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.nav>

      {/* Enhanced Features Section Component */}
      {/*... (rest of the unchanged components would remain here) ...*/}
    </section>
  );
};

// Enhanced Features Section Component
const FeaturesSection = () => {
  const features = [
    {
      title: 'Bank-Level Security',
      description: 'Military-grade encryption protects your documents with zero-knowledge architecture.',
      icon: '🔒',
      gradient: 'from-blue-500 to-cyan-500',
      stats: '256-bit SSL'
    },
    {
      title: 'Instant Access',
      description: 'Lightning-fast search and retrieval from any device, anywhere in the world.',
      icon: '⚡',
      gradient: 'from-purple-500 to-pink-500',
      stats: '<0.5s load'
    },
    {
      title: 'Smart Reminders',
      description: 'AI-powered notifications ensure you never miss important expiry dates.',
      icon: '🔔',
      gradient: 'from-orange-500 to-red-500',
      stats: '99.9% accuracy'
    },
    {
      title: 'Cloud Backup',
      description: 'Automatic multi-region backups ensure your data is always safe and accessible.',
      icon: '☁️',
      gradient: 'from-green-500 to-teal-500',
      stats: '3 data centers'
    },
    {
      title: 'Mobile Ready',
      description: 'Native mobile apps with offline access and camera scanning capabilities.',
      icon: '📱',
      gradient: 'from-indigo-500 to-blue-500',
      stats: 'iOS & Android'
    },
    {
      title: 'Team Sharing',
      description: 'Secure document sharing with family members and team collaboration tools.',
      icon: '👥',
      gradient: 'from-pink-500 to-rose-500',
      stats: 'Up to 10 users'
    }
  ];

  return (
    <section id="features" className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-blue-400/10 rounded-full blur-3xl"
          animate={{
            y: [-20, 20, -20],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-40 h-40 bg-purple-400/10 rounded-full blur-3xl"
          animate={{
            y: [20, -20, 20],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 rounded-full px-4 py-2 mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
            <span className="font-medium">Premium Features</span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
            Why Choose Digital Guarantee Locker?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Experience enterprise-grade security with consumer-friendly simplicity. 
            Join thousands who trust us with their most important documents.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group"
            >
              <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-8 text-center hover:shadow-2xl transition-all duration-500 relative overflow-hidden">
                {/* Animated Background Gradient */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                  layoutId={`feature-bg-${index}`}
                />
                
                {/* Icon Container */}
                <motion.div 
                  className={`w-20 h-20 mx-auto mb-6 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center shadow-lg relative z-10`}
                  whileHover={{ 
                    rotate: [0, -10, 10, 0],
                    scale: 1.1
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.span 
                    className="text-4xl"
                    animate={{ 
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ 
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    {feature.icon}
                  </motion.span>
                </motion.div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-gray-800 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {feature.description}
                  </p>
                  
                  {/* Stats Badge */}
                  <motion.div
                    className={`inline-flex items-center space-x-2 bg-gradient-to-r ${feature.gradient} text-white rounded-full px-4 py-2 text-sm font-medium shadow-lg`}
                    whileHover={{ scale: 1.05 }}
                  >
                    <span className="w-2 h-2 bg-white rounded-full opacity-80"></span>
                    <span>{feature.stats}</span>
                  </motion.div>
                </div>

                {/* Hover Effect Border */}
                <motion.div
                  className="absolute inset-0 border-2 border-transparent group-hover:border-blue-200 rounded-2xl transition-all duration-300"
                  layoutId={`feature-border-${index}`}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Enhanced How It Works Section Component
const HowItWorksSection = () => {
  const steps = [
    {
      step: '01',
      title: 'Quick Upload',
      description: 'Drag & drop your documents or scan with your phone camera. Our AI instantly extracts key details.',
      icon: '📤',
      color: 'from-blue-500 to-cyan-500',
      time: '< 30 seconds'
    },
    {
      step: '02',
      title: 'Smart Organization',
      description: 'Documents are automatically categorized, encrypted, and stored with intelligent tagging.',
      icon: '🔐',
      color: 'from-purple-500 to-pink-500',
      time: 'Instant'
    },
    {
      step: '03',
      title: 'Active Monitoring',
      description: 'Get timely reminders, track expiry dates, and receive maintenance alerts automatically.',
      icon: '🎯',
      color: 'from-orange-500 to-red-500',
      time: '24/7 monitoring'
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-gradient-to-br from-white via-blue-50 to-purple-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 left-0 w-72 h-72 bg-gradient-to-r from-blue-400/5 to-purple-400/5 rounded-full blur-3xl"
          animate={{
            x: [-100, 100, -100],
            rotate: [0, 360, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-0 w-72 h-72 bg-gradient-to-r from-purple-400/5 to-pink-400/5 rounded-full blur-3xl"
          animate={{
            x: [100, -100, 100],
            rotate: [360, 0, 360],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center space-x-2 bg-purple-100 text-purple-700 rounded-full px-4 py-2 mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <motion.span 
              className="w-2 h-2 bg-purple-500 rounded-full"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="font-medium">Simple Process</span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-purple-800 to-blue-800 bg-clip-text text-transparent">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Get started in minutes with our streamlined three-step process. 
            No technical expertise required - just upload, organize, and relax.
          </p>
        </motion.div>

        {/* Interactive Timeline */}
        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 transform -translate-y-1/2">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 rounded-full opacity-20"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 2, delay: 0.5 }}
              viewport={{ once: true }}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="relative"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.3 }}
                viewport={{ once: true }}
              >
                {/* Step Card */}
                <motion.div
                  className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 relative overflow-hidden group"
                  whileHover={{ y: -10, scale: 1.02 }}
                >
                  {/* Background Gradient */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                    layoutId={`step-bg-${index}`}
                  />

                  {/* Step Number */}
                  <motion.div
                    className={`absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br ${step.color} rounded-full flex items-center justify-center shadow-lg`}
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <span className="text-white font-bold text-lg">{step.step}</span>
                  </motion.div>

                  {/* Icon */}
                  <motion.div
                    className="w-24 h-24 mx-auto mb-6 bg-gray-50 rounded-3xl flex items-center justify-center relative z-10 group-hover:bg-gray-100 transition-colors duration-300"
                    whileHover={{ 
                      rotate: [0, -10, 10, 0],
                      scale: 1.1
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.span 
                      className="text-5xl"
                      animate={{ 
                        y: [0, -5, 0]
                      }}
                      transition={{ 
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.5
                      }}
                    >
                      {step.icon}
                    </motion.span>
                  </motion.div>

                  {/* Content */}
                  <div className="text-center relative z-10">
                    <h3 className="text-2xl font-bold mb-4 text-gray-900">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-6">
                      {step.description}
                    </p>
                    
                    {/* Time Badge */}
                    <motion.div
                      className={`inline-flex items-center space-x-2 bg-gradient-to-r ${step.color} text-white rounded-full px-4 py-2 font-medium shadow-lg`}
                      whileHover={{ scale: 1.05 }}
                    >
                      <motion.span 
                        className="w-2 h-2 bg-white rounded-full"
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <span className="text-sm">{step.time}</span>
                    </motion.div>
                  </div>

                  {/* Connecting Arrow (Desktop only) */}
                  {index < steps.length - 1 && (
                    <motion.div
                      className="hidden lg:block absolute top-1/2 -right-6 transform -translate-y-1/2 z-20"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: (index + 1) * 0.3 }}
                      viewport={{ once: true }}
                    >
                      <motion.div
                        className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center border-2 border-gray-100"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                      >
                        <span className="text-gray-400 text-xl">→</span>
                      </motion.div>
                    </motion.div>
                  )}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          viewport={{ once: true }}
        >
          <motion.button
            className="group px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-semibold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 text-lg relative overflow-hidden"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              layoutId="cta-bg"
            />
            <span className="relative z-10 flex items-center space-x-2">
              <span>Start Your Free Trial</span>
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </span>
          </motion.button>
          <p className="text-gray-500 text-sm mt-4">No credit card required • 14-day free trial</p>
        </motion.div>
      </div>
    </section>
  );
};

// Call to Action Section Component
const CallToActionSection = ({ onSignupClick }: { onSignupClick: () => void }) => {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-blue-500 py-16">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Start Securing Your Guarantees Today
          </h2>
          <p className="text-lg mb-8 text-blue-100">
            Join thousands of users who trust Digital Guarantee Locker.
          </p>
          <button
            onClick={onSignupClick}
            className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 shadow-lg transition-colors"
          >
            Get Started
          </button>
        </motion.div>
      </div>
    </section>
  );
};

// Compact Footer Component
const Footer = ({ onContactClick }: { onContactClick?: () => void }) => {
  return (
    <footer className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-0 left-1/4 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -50, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center md:text-left"
          >
            <div className="flex items-center justify-center md:justify-start space-x-3 mb-4">
              <motion.div 
                className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg"
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-xl">🔐</span>
              </motion.div>
              <div>
                <h3 className="font-bold text-lg">Digital Guarantee Locker</h3>
                <p className="text-gray-400 text-sm">Secure • Smart • Simple</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              Your trusted platform for managing warranty documents with military-grade security.
            </p>
            
            {/* Trust Indicators */}
            <div className="flex items-center justify-center md:justify-start space-x-4">
              <motion.div 
                className="flex items-center space-x-1 bg-white/5 rounded-lg px-2 py-1"
                whileHover={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
              >
                <span className="text-green-400 text-sm">🔒</span>
                <span className="text-xs text-gray-300">Secured</span>
              </motion.div>
              <motion.div 
                className="flex items-center space-x-1 bg-white/5 rounded-lg px-2 py-1"
                whileHover={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
              >
                <span className="text-blue-400 text-sm">🏆</span>
                <span className="text-xs text-gray-300">Certified</span>
              </motion.div>
              <div className="flex items-center space-x-1">
                <motion.span 
                  className="w-2 h-2 bg-green-400 rounded-full"
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-xs text-gray-400">Online</span>
              </div>
            </div>
          </motion.div>

          {/* Quick Links & Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center md:text-left"
          >
            <h4 className="font-semibold mb-4">Quick Access</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {[
                { name: 'Features', icon: '✨' },
                { name: 'Security', icon: '🛡️' },
                { name: 'Support', icon: '💬' },
                { name: 'Pricing', icon: '💎' }
              ].map((item, index) => (
                <motion.a
                  key={index}
                  href="#"
                  className="flex items-center space-x-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg px-2 py-1 transition-all duration-200"
                  whileHover={{ scale: 1.05, x: 5 }}
                >
                  <span className="text-xs">{item.icon}</span>
                  <span>{item.name}</span>
                </motion.a>
              ))}
            </div>
            
            {/* Contact Info */}
            <div className="mt-6 space-y-2">
              <div className="flex items-center justify-center md:justify-start space-x-2 text-sm text-gray-300">
                <span className="text-blue-400">📧</span>
                <span>support@digitalguaranteelocker.com</span>
              </div>
              <div className="flex items-center justify-center md:justify-start space-x-2 text-sm text-gray-300">
                <span className="text-green-400">📞</span>
                <span>+91-123-456-7890</span>
              </div>
            </div>
          </motion.div>

          {/* Newsletter & Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center md:text-left"
          >
            <h4 className="font-semibold mb-4">Stay Connected</h4>
            
            {/* Compact Newsletter */}
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row gap-2">
                <motion.input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-white/60 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                  whileFocus={{ scale: 1.02 }}
                />
                <motion.button
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Subscribe
                </motion.button>
              </div>
            </div>

            {/* Social Media */}
            <div className="space-y-3">
              <p className="text-sm text-gray-400">Follow Us</p>
              <div className="flex items-center justify-center md:justify-start space-x-3">
                {[
                  { icon: '🐦', color: 'from-blue-400 to-blue-600', name: 'Twitter' },
                  { icon: '💼', color: 'from-blue-600 to-blue-800', name: 'LinkedIn' },
                  { icon: '⚡', color: 'from-gray-600 to-gray-800', name: 'GitHub' },
                  { icon: '💬', color: 'from-purple-500 to-purple-700', name: 'Discord' }
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    className={`w-8 h-8 bg-gradient-to-r ${social.color} rounded-lg flex items-center justify-center shadow-lg text-sm`}
                    whileHover={{ scale: 1.2, rotate: 5, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    title={social.name}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>

            {onContactClick && (
              <motion.button
                onClick={onContactClick}
                className="mt-4 w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Contact Support
              </motion.button>
            )}
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div 
          className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between text-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center space-x-4 mb-4 sm:mb-0">
            <p className="text-gray-400">
              &copy; 2025 Digital Guarantee Locker. All rights reserved.
            </p>
            <div className="hidden sm:flex items-center space-x-4 text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-gray-400">Made with</span>
            <motion.span 
              className="text-red-400"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ❤️
            </motion.span>
            <span className="text-gray-400">in India</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

// Signup Modal Component
const SignupModal = ({ isOpen, onClose, onSuccess }: { isOpen: boolean; onClose: () => void; onSuccess: () => void }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Signup attempted with:', formData);
    // In a real app, you would validate and send to backend
    setTimeout(() => {
      onSuccess();
    }, 500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-center mb-6">Create Your Account</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex gap-3 pt-4">
              <button 
                type="button" 
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Login Modal Component
const LoginModal = ({ isOpen, onClose, onSuccess }: { isOpen: boolean; onClose: () => void; onSuccess: () => void }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempted with:', formData);
    // In a real app, you would validate credentials with backend
    setTimeout(() => {
      onSuccess();
    }, 500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-center mb-6">Welcome Back</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="login-email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="login-email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label htmlFor="login-password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="login-password"
                name="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="text-right">
              <button type="button" className="text-blue-600 hover:text-blue-800 text-sm">
                Forgot password?
              </button>
            </div>
            
            <div className="flex gap-3 pt-4">
              <button 
                type="button" 
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Main Application Component
export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentView, setCurrentView] = useState('landing'); // 'landing', 'dashboard', 'upload', 'guarantees', 'reminders', 'contact'
  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentView('dashboard');
    setShowLogin(false);
  };

  const handleSignup = () => {
    setIsLoggedIn(true);
    setCurrentView('dashboard');
    setShowSignup(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentView('landing');
  };

  const navigateTo = (view: string) => {
    setCurrentView(view);
  };

  // If user is logged in, show dashboard or other authenticated views
  if (isLoggedIn) {
    switch (currentView) {
      case 'upload':
        return <UploadDocument onBack={() => setCurrentView('dashboard')} />;
      case 'guarantees':
        return <GuaranteesList onBack={() => setCurrentView('dashboard')} />;
      case 'reminders':
        return <Reminders onBack={() => setCurrentView('dashboard')} />;
      default:
        return <Dashboard onLogout={handleLogout} onNavigate={navigateTo} />;
    }
  }

  
  // Landing page for non-authenticated users
  return (
    <div className="min-h-screen flex flex-col">
      <HeroSection 
        onSignupClick={() => setShowSignup(true)} 
        onLoginClick={() => setShowLogin(true)} 
      />
      <FeaturesSection />
      <HowItWorksSection />
      <CallToActionSection onSignupClick={() => setShowSignup(true)} />
      <Footer onContactClick={() => setCurrentView('contact')} />
      
      <SignupModal 
        isOpen={showSignup} 
        onClose={() => setShowSignup(false)}
        onSuccess={handleSignup}
      />
      <LoginModal 
        isOpen={showLogin} 
        onClose={() => setShowLogin(false)}
        onSuccess={handleLogin}
      />
    </div>
  );
}