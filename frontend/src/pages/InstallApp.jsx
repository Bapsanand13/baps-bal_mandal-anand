import React from 'react';
import { motion } from 'framer-motion';
import { Download, Chrome, Apple, Info, Smartphone } from 'lucide-react';

const InstallApp = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 py-8 flex items-center justify-center">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Smartphone className="text-white w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Install BAPS Bal Mandal App</h1>
          <p className="text-gray-600">Get the full app experience on your device by installing our Progressive Web App (PWA).</p>
        </motion.div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold text-orange-600 mb-4 flex items-center space-x-2">
            <Chrome className="w-5 h-5" />
            <span>Android (Chrome)</span>
          </h2>
          <ol className="list-decimal list-inside text-gray-700 space-y-2">
            <li>Open this website in <b>Google Chrome</b> on your Android device.</li>
            <li>Tap the <b>three dots</b> menu in the top-right corner.</li>
            <li>Select <b>"Add to Home screen"</b>.</li>
            <li>Confirm by tapping <b>Add</b>.</li>
          </ol>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold text-orange-600 mb-4 flex items-center space-x-2">
            <Apple className="w-5 h-5" />
            <span>iOS (Safari)</span>
          </h2>
          <ol className="list-decimal list-inside text-gray-700 space-y-2">
            <li>Open this website in <b>Safari</b> on your iPhone or iPad.</li>
            <li>Tap the <b>Share</b> icon (square with arrow up).</li>
            <li>Scroll down and tap <b>"Add to Home Screen"</b>.</li>
            <li>Confirm by tapping <b>Add</b>.</li>
          </ol>
        </div>

        <div className="text-center mt-8">
          <button
            className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg font-semibold shadow-lg hover:from-orange-600 hover:to-red-700 transition-colors duration-200"
            onClick={() => {
              if (window.deferredPrompt) {
                window.deferredPrompt.prompt();
              } else {
                alert('If you do not see the install prompt, please use your browser menu to add to home screen.');
              }
            }}
          >
            <Download size={20} />
            <span>Install App</span>
          </button>
          <div className="mt-4 text-gray-500 text-sm flex items-center justify-center space-x-2">
            <Info size={16} />
            <span>Requires Chrome (Android) or Safari (iOS) for best experience.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstallApp; 