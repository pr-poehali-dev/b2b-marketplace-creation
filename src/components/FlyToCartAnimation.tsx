import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface FlyToCartAnimationProps {
  isActive: boolean;
  startElement: HTMLElement | null;
  productImage?: string;
  onComplete: () => void;
}

const FlyToCartAnimation = ({ isActive, startElement, productImage, onComplete }: FlyToCartAnimationProps) => {
  const [animationState, setAnimationState] = useState<'idle' | 'flying' | 'completed'>('idle');
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const [endPosition, setEndPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (isActive && startElement) {
      // Получаем позицию стартового элемента
      const startRect = startElement.getBoundingClientRect();
      
      // Если это карточка товара, берем позицию изображения для более точной анимации
      const productImageElement = startElement.querySelector('img');
      let actualStartRect = startRect;
      
      if (productImageElement) {
        actualStartRect = productImageElement.getBoundingClientRect();
      }
      
      // Ищем иконку избранного в header
      const favoritesIcon = document.querySelector('[data-favorites-icon]') as HTMLElement;
      if (!favoritesIcon) {
        onComplete();
        return;
      }
      
      const endRect = favoritesIcon.getBoundingClientRect();
      
      setStartPosition({
        x: actualStartRect.left + actualStartRect.width / 2,
        y: actualStartRect.top + actualStartRect.height / 2
      });
      
      setEndPosition({
        x: endRect.left + endRect.width / 2,
        y: endRect.top + endRect.height / 2
      });
      
      setAnimationState('flying');
      
      // Завершаем анимацию через время полета
      const timer = setTimeout(() => {
        setAnimationState('completed');
        onComplete();
      }, 800);
      
      return () => clearTimeout(timer);
    }
  }, [isActive, startElement, onComplete]);

  useEffect(() => {
    if (animationState === 'completed') {
      const resetTimer = setTimeout(() => {
        setAnimationState('idle');
      }, 100);
      
      return () => clearTimeout(resetTimer);
    }
  }, [animationState]);

  if (animationState === 'idle' || !isActive) {
    return null;
  }

  return createPortal(
    <div
      className={`fixed pointer-events-none z-[9999] transition-all duration-800 ease-in-out ${
        animationState === 'flying' 
          ? 'opacity-100 scale-100' 
          : 'opacity-0 scale-0'
      }`}
      style={{
        left: animationState === 'flying' ? endPosition.x - 32 : startPosition.x - 32,
        top: animationState === 'flying' ? endPosition.y - 32 : startPosition.y - 32,
        transform: animationState === 'flying' 
          ? 'translate(-50%, -50%) scale(0.8)' 
          : 'translate(-50%, -50%) scale(1)',
      }}
    >
      {productImage ? (
        <div className="w-16 h-16 rounded-lg overflow-hidden shadow-xl border-2 border-primary bg-white">
          <img 
            src={productImage} 
            alt="Flying product" 
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <div className="w-16 h-16 bg-red-500 rounded-lg flex items-center justify-center shadow-xl">
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="white" 
            stroke="white" 
            strokeWidth="2"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </div>
      )}
      
      {/* Эффект частиц */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 bg-red-400 rounded-full animate-ping`}
            style={{
              left: `${Math.random() * 40}px`,
              top: `${Math.random() * 40}px`,
              animationDelay: `${i * 100}ms`,
              animationDuration: '600ms'
            }}
          />
        ))}
      </div>
    </div>,
    document.body
  );
};

export default FlyToCartAnimation;