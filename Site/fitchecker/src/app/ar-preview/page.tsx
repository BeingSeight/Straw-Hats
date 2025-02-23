'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Script from 'next/script';
import Squares from '@/background/Squares/Squares'; // Adjust path if necessary

export default function ARPreviewPage() {
  return (
    <div className="min-h-screen relative bg-[#030303] text-white flex flex-col items-center justify-center p-4 space-y-16">
      {/* Squares background rendered behind all content */}
      <Squares className="absolute inset-0 z-0" />

      <h1 className="text-4xl md:text-5xl font-bold mb-8">AR Preview</h1>

      {/* Snapchat AR Embed */}
      <section className="w-full flex justify-center">
        <div
          className="max-w-lg"
          dangerouslySetInnerHTML={{
            __html: `
            <blockquote class="snapchat-embed" 
              data-snapchat-embed-width="416" 
              data-snapchat-embed-height="692" 
              data-snapchat-embed-url="https://www.snapchat.com/lens/ab38b33451db4e2292e1da24a2308574/embed" 
              data-snapchat-embed-style="border-radius: 40px;" 
              data-snapchat-embed-title="Virtual Sweatshirt Lens" 
              style="background:#C4C4C4; border:0; border-radius:40px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:416px; min-width:326px; padding:0; width:calc(100% - 2px); display: flex; flex-direction: column; position: relative; height:650px;">
              <div style="display: flex; flex-direction: row; align-items: center;">
                <a title="Virtual Sweatshirt Lens" href="https://www.snapchat.com/lens/ab38b33451db4e2292e1da24a2308574" style="background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 40px; width: 40px; margin:16px; cursor: pointer"></a>
                <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center;"></div>
              </div>
              <div style="flex: 1;"></div>
              <div style="display: flex; flex-direction: row; align-items: center; border-end-end-radius: 40px; border-end-start-radius: 40px;">
                <a title="Virtual Sweatshirt Lens" href="https://www.snapchat.com/lens/ab38b33451db4e2292e1da24a2308574" style="background-color: yellow; width:100%; padding: 10px 20px; border: none; border-radius: inherit; cursor: pointer; text-align: center; display: flex; flex-direction: row; justify-content: center; text-decoration: none; color: black;">
                  View more on Snapchat
                </a>
              </div>
            </blockquote>
            `,
          }}
        />
      </section>
      <Script src="https://www.snapchat.com/embed.js" strategy="afterInteractive" />

      {/* Desktop AR Preview Section */}
      <section className="w-full max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-4xl md:text-5xl font-bold mb-6 text-center"
        >
          Check the Clothes in 3D!
        </motion.h2>
        <div className="flex flex-col md:flex-row gap-8 w-full">
          {/* Before Video Container */}
          <motion.div
            className="relative flex-1 aspect-square rounded-lg overflow-hidden shadow-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <video
              src="/before.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="object-cover w-full h-full"
            />
            <div className="absolute top-2 right-2 bg-black bg-opacity-50 px-2 py-1 rounded text-sm font-bold">
              Before
            </div>
          </motion.div>
          {/* After Video Container */}
          <motion.div
            className="relative flex-1 aspect-square rounded-lg overflow-hidden shadow-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <video
              src="/after.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="object-cover w-full h-full"
            />
            <div className="absolute top-2 right-2 bg-black bg-opacity-50 px-2 py-1 rounded text-sm font-bold">
              After
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mobile Preview Section */}
      <section className="w-full max-w-4xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-4xl md:text-5xl font-bold mb-6 text-center"
        >
          See how it looks in mobile!
        </motion.h2>
        <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
          {/* Before Mobile Preview Container */}
          <motion.div
            className="relative flex-1 md:max-w-[250px] aspect-[9/16] rounded-lg overflow-hidden shadow-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <video
              src="/bmobile.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="object-cover w-full h-full"
            />
            <div className="absolute top-2 right-2 bg-black bg-opacity-50 px-2 py-1 rounded text-sm font-bold">
              Before
            </div>
          </motion.div>
          {/* After Mobile Preview Container */}
          <motion.div
            className="relative flex-1 md:max-w-[250px] aspect-[9/16] rounded-lg overflow-hidden shadow-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <video
              src="/amobile.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="object-cover w-full h-full"
            />
            <div className="absolute top-2 right-2 bg-black bg-opacity-50 px-2 py-1 rounded text-sm font-bold">
              After
            </div>
          </motion.div>
        </div>
      </section>

      <Link href="/" className="mt-8 text-blue-500 hover:underline">
        Back to Home
      </Link>
    </div>
  );
}
