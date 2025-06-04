import React from 'react';

export default function About() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] bg-[#302c2c] py-16">
      <img src="https://media.giphy.com/media/3o6Zt6ML6BklcajjsA/giphy.gif" alt="Animated Chair" className="w-40 h-40 mb-6 rounded-xl shadow-lg" />
      <h1 className="text-4xl font-bold text-[#dc7e27] mb-6">About Maganinha</h1>
      <div className="max-w-2xl text-center text-white text-lg leading-relaxed bg-[#232122] p-8 rounded-xl shadow-lg">
        <p>
          Welcome to <span className="text-[#dc7e27] font-semibold">Maganinha</span>!<br /><br />
          Our ecommerce specializes in furniture, with a special focus on chairs of all styles: modern, classic, ergonomic, and much more.<br /><br />
          Here you will find quality, comfort, and design to transform any environment. We strive to offer the best online shopping experience, with carefully selected products and dedicated customer service.<br /><br />
          Feel free to explore our catalog and find the perfect chair for you!
        </p>
      </div>
    </div>
  );
} 