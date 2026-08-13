import React from 'react';

const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/256777676436?text=Hello%20TEWOYEI%2C%20I%20found%20you%20on%20your%20website%20and%20I%20have%20a%20question."
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with TEWOYEI on WhatsApp"
      className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-[9999] group flex items-center justify-center w-14 h-14 sm:w-[60px] sm:h-[60px] bg-[#25D366] text-white rounded-full shadow-lg hover:scale-110 transition-transform duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-[#25D366]/50 before:absolute before:inset-0 before:rounded-full before:bg-[#25D366] before:animate-ping before:opacity-30"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-8 h-8 z-10"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.898-4.45 9.898-9.892 0-2.64-1.028-5.122-2.894-6.988-1.866-1.867-4.348-2.896-6.988-2.896-5.448 0-9.898 4.45-9.898 9.892 0 2.01.597 3.916 1.733 5.61l-1.129 4.125 4.286-1.143zm-1.01-1.396l-.689-.41c-1.472-.876-2.355-2.482-2.355-4.205 0-4.347 3.535-7.882 7.882-7.882 4.348 0 7.882 3.535 7.882 7.882 0 4.347-3.534 7.882-7.882 7.882-1.637 0-3.178-.456-4.48-1.258l-.634-.39-3.056.814.832-2.343zm11.789-5.184c-.23-.115-1.364-.674-1.575-.751-.211-.077-.365-.115-.518.115-.153.23-.594.751-.73 9.043-.134.154-.268.192-.498.077-.23-.115-.973-.358-1.854-1.147-.686-.615-1.147-1.378-1.28-1.609-.133-.231-.014-.356.101-.471.103-.103.23-.269.345-.403.115-.134.153-.23.23-.384.076-.153.038-.288-.019-.403-.058-.115-.518-1.249-.71-1.71-.186-.445-.375-.385-.518-.392-.134-.007-.287-.007-.441-.007-.153 0-.403.058-.614.288-.211.23-.805.787-.805 1.918 0 1.131.824 2.224.939 2.377.115.153 1.623 2.477 3.931 3.473.55.236.979.377 1.314.483.552.175 1.054.15 1.45.091.442-.066 1.364-.557 1.555-1.096.191-.539.191-1.001.134-1.096-.058-.096-.211-.154-.442-.269z" />
      </svg>
      {/* Tooltip */}
      <span className="absolute left-full ml-3 px-3 py-1.5 bg-gray-900 text-white text-sm font-medium rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap hidden sm:block">
        Chat with us on WhatsApp
      </span>
      {/* Mobile Label */}
      <span className="absolute left-full ml-2 text-xs font-medium text-gray-700 whitespace-nowrap sm:hidden">
        WhatsApp Us
      </span>
    </a>
  );
};

export default WhatsAppButton;
