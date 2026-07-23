'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const RenderTarget = {
  current: () => 'preview',
  canvas: 'canvas',
  export: 'export',
  thumbnail: 'thumbnail',
  preview: 'preview',
};

const PERSPECTIVE = 1000; // px
const DEPTH_SPACING = 12; // px

export interface CardItem {
  id: number;
  name: string;
  href: string;
  bg: string;
  text: string;
  border: string;
  svg: React.ReactNode;
}

const DEFAULT_CARDS: CardItem[] = [
  {
    id: 1,
    name: 'Aesthetic Design',
    href: '#',
    bg: 'rgba(122, 18, 32, 0.05)',
    text: 'var(--wine)',
    border: 'rgba(122, 18, 32, 0.15)',
    svg: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
        <circle cx="8.5" cy="8.5" r="1.5"></circle>
        <polyline points="21 15 16 10 5 21"></polyline>
      </svg>
    ),
  },
  {
    id: 2,
    name: 'Interactive Code',
    href: '#',
    bg: 'rgba(30, 25, 18, 0.03)',
    text: 'var(--ink)',
    border: 'rgba(30, 25, 18, 0.1)',
    svg: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <polyline points="16 18 22 12 16 6"></polyline>
        <polyline points="8 6 2 12 8 18"></polyline>
      </svg>
    ),
  },
  {
    id: 3,
    name: 'Scalable Systems',
    href: '#',
    bg: 'rgba(166, 129, 63, 0.05)',
    text: 'var(--brass)',
    border: 'rgba(166, 129, 63, 0.15)',
    svg: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
        <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
        <line x1="6" y1="6" x2="6.01" y2="6"></line>
        <line x1="6" y1="18" x2="6.01" y2="18"></line>
      </svg>
    ),
  },
];

interface CardStackProps {
  cardsList?: CardItem[];
  cardWidth?: number;
  cardHeight?: number;
  cardRadius?: number;
  swipeThreshold?: number;
  tiltAngle?: number;
  tiltAngleStart?: number;
  xOffset?: number;
  transition?: any;
  style?: React.CSSProperties;
}

export default function CardStack({
  cardsList = DEFAULT_CARDS,
  cardWidth = 300,
  cardHeight = 400,
  cardRadius = 16,
  swipeThreshold = 60,
  tiltAngle = -10,
  tiltAngleStart = 0,
  xOffset = 30,
  transition = { type: 'spring', stiffness: 300, damping: 30 },
  style,
}: CardStackProps) {
  const [cards, setCards] = useState<CardItem[]>(() => cardsList || DEFAULT_CARDS);

  React.useEffect(() => {
    if (cardsList) {
      setCards(cardsList);
    }
  }, [cardsList]);

  const [isPressed, setIsPressed] = useState(false);
  const [shouldReturnToCenter, setShouldReturnToCenter] = useState(false);

  const handlePointerDown = () => setIsPressed(true);
  const handlePointerUp = () => setIsPressed(false);

  const handleDragEnd = (info: any) => {
    setIsPressed(false);
    const { offset } = info;
    const distance = Math.sqrt(offset.x * offset.x + offset.y * offset.y);
    if (distance > swipeThreshold) {
      setCards((prevCards) => {
        const [topCard, ...restCards] = prevCards;
        return [...restCards, topCard];
      });
    } else {
      setShouldReturnToCenter(true);
      setTimeout(() => setShouldReturnToCenter(false), 1000);
    }
  };

  const getCardStyle = (index: number) => {
    const totalCards = cards.length;
    const stackOffset = index * 8;
    const scaleValue = 1 - index * 0.05;
    const rotationValue =
      totalCards > 1
        ? tiltAngleStart + (index / (totalCards - 1)) * (tiltAngle - tiltAngleStart)
        : tiltAngleStart;
    const xOffsetValue = totalCards > 1 ? (index / (totalCards - 1)) * xOffset : 0;
    const depthOffset = index * DEPTH_SPACING;
    const isTopCard = index === 0;
    const shouldReturn = isTopCard && shouldReturnToCenter;

    return {
      zIndex: cards.length - index,
      scale: scaleValue,
      x: shouldReturn ? 0 : xOffsetValue,
      y: shouldReturn ? 0 : -stackOffset,
      rotate: shouldReturn ? 0 : rotationValue,
      z: -depthOffset,
      opacity: index > 3 ? 0 : 1, // Only show top 4 cards for performance & neatness
    };
  };

  const isCanvas = RenderTarget.current() === RenderTarget.canvas;

  return (
    <div
      style={{
        ...style,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        perspective: `${PERSPECTIVE}px`,
      }}
    >
      <div
        style={{
          position: 'relative',
          width: cardWidth,
          height: cardHeight,
        }}
      >
        {(cards || []).map((card, index) => {
          const isTopCard = index === 0;
          const cardStyle = getCardStyle(index);

          return (
            <motion.div
              key={card.id}
              drag={isTopCard && !isCanvas ? true : false}
              dragConstraints={{
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
              }}
              dragElastic={0.7}
              dragMomentum={false}
              dragTransition={{
                bounceStiffness: 300,
                bounceDamping: 20,
              }}
              onMouseDown={isTopCard && !isCanvas ? handlePointerDown : undefined}
              onMouseUp={isTopCard && !isCanvas ? handlePointerUp : undefined}
              onDragEnd={
                isTopCard && !isCanvas ? (_: any, info: any) => handleDragEnd(info) : undefined
              }
              onTap={() => {
                if (isTopCard && !isCanvas) {
                  window.open(card.href, card.href.startsWith('mailto') ? '_self' : '_blank');
                }
              }}
              animate={cardStyle}
              transition={{
                x: isCanvas ? { duration: 0 } : transition,
                y: isCanvas ? { duration: 0 } : transition,
                rotate: isCanvas ? { duration: 0 } : transition,
                scale: isCanvas ? { duration: 0 } : transition,
                zIndex: { duration: 0.3, ease: 'easeOut' },
                z: { duration: 0.3, ease: 'easeOut' },
              }}
              initial={isCanvas ? cardStyle : false}
              whileDrag={{
                scale: 1.05,
                rotate: tiltAngleStart,
                zIndex: 1000,
              }}
              whileHover={
                isTopCard
                  ? {
                      scale: 1.04,
                      y: -12,
                      boxShadow: `0 20px 40px ${card.bg === '#000000' || card.bg === '#2F2F2F' ? 'rgba(0,0,0,0.3)' : card.bg + '40'}`,
                    }
                  : undefined
              }
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                backgroundColor: card.bg,
                borderRadius: cardRadius,
                display: 'flex',
                flexDirection: 'column',
                padding: '2.5rem',
                justifyContent: 'space-between',
                color: card.text,
                border: `1px solid ${card.border}`,
                cursor: isTopCard && !isCanvas ? (isPressed ? 'grabbing' : 'pointer') : 'default',
                userSelect: 'none',
                overflow: 'hidden',
                boxShadow: isTopCard
                  ? '0 8px 30px rgba(30, 25, 18, 0.08)'
                  : '0 2px 10px rgba(30, 25, 18, 0.03)',
              }}
            >
              {/* Watermark brand logo in background */}
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%) scale(5.5)',
                  opacity: 0.08,
                  pointerEvents: 'none',
                  color: card.text,
                  fill: card.text,
                  zIndex: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {card.svg}
              </div>

              {/* Card Content - Z-indexed above watermark */}
              <div
                style={{ position: 'relative', zIndex: 1, width: '100%' }}
                className="flex justify-between items-center"
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '0.78rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    opacity: 0.8,
                  }}
                >
                  Connect
                </span>
                <div style={{ transform: 'scale(1.2)' }}>{card.svg}</div>
              </div>

              <div style={{ position: 'relative', zIndex: 1 }} className="flex flex-col gap-2">
                <h3
                  style={{
                    fontFamily: 'var(--font-display, serif)',
                    fontSize: '2.2rem',
                    fontWeight: 700,
                    margin: 0,
                    lineHeight: 1.1,
                    letterSpacing: '-0.02em',
                  }}
                >
                  {card.name}
                </h3>
                <p
                  style={{
                    fontSize: '0.9rem',
                    margin: 0,
                    opacity: 0.8,
                    fontWeight: 500,
                  }}
                >
                  {card.href.startsWith('mailto') ? 'Send an Email' : `Visit ${card.name}`}
                </p>
              </div>

              <div
                style={{ position: 'relative', zIndex: 1 }}
                className="flex justify-between items-center"
              >
                <span
                  style={{
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}
                >
                  {isTopCard ? 'Click to open ↗' : 'In Queue'}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '0.78rem',
                    opacity: 0.6,
                  }}
                >
                  Slide to cycle
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
