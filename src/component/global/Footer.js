import React from 'react';

const Footer = () => {
  return (
    <footer className="section bg-background text-textPrimary py-3 flex flex-col sm:flex-row justify-between items-center border-t border-borderPrimary/10">
      <div>
        Designed & Build by{' '}
        <a
          href="https://mralim.com"
          target="_blank"
          className="text-brand"
          rel="noreferrer"
        >
          Abdul Alim
        </a>
        .
      </div>
      <div>
        <a
          href="https://github.com/lydiahallie/javascript-questions.git"
          target="_blank"
          className="text-brand"
          rel="noreferrer"
        >
          Quiz Repo ❤️
        </a>
      </div>
    </footer>
  );
};

export default Footer;
