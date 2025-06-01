import React from 'react';

const Footer: React.FC = () => (
  <footer className="text-sm text-gray-600 text-center py-4 bg-gray-100">
    © {new Date().getFullYear()} Reizouko
  </footer>
);

export default Footer;
