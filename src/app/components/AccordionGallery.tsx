'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useState, type CSSProperties } from 'react';

export interface AccordionGalleryItem {
  image: string;
  label: string;
  link: string;
  items: string[];
}

interface AccordionGalleryProps {
  items: AccordionGalleryItem[];
  defaultIndex?: number;
  expandRatio?: number;
  trigger?: 'hover' | 'click';
}

export default function AccordionGallery({
  items,
  defaultIndex = 0,
  expandRatio = 0.52,
  trigger = 'hover',
}: AccordionGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(
    Math.min(Math.max(defaultIndex, 0), Math.max(items.length - 1, 0))
  );

  if (!items.length) return null;

  const activate = (index: number) => setActiveIndex(index);

  return (
    <div
      className="accordion-gallery"
      role="list"
      aria-label="Selected visual work"
      style={
        {
          '--gallery-expand-ratio': `${Math.min(Math.max(expandRatio, 0.35), 0.7) * 100}%`,
        } as CSSProperties
      }
    >
      {items.map((item, index) => {
        const isActive = index === activeIndex;

        return (
          <motion.a
            key={`${item.label}-${index}`}
            href={item.link}
            className={`accordion-gallery__item ${isActive ? 'is-active' : ''}`}
            role="listitem"
            aria-label={`Open ${item.label}`}
            onMouseEnter={trigger === 'hover' ? () => activate(index) : undefined}
            onFocus={() => activate(index)}
            onClick={(event) => {
              if (item.link === '#') event.preventDefault();
              if (!isActive) {
                event.preventDefault();
                activate(index);
              }
            }}
            animate={{ flexGrow: isActive ? 1 / expandRatio : 1 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              src={item.image}
              alt=""
              fill
              sizes="(max-width: 767px) 100vw, 52vw"
              className="accordion-gallery__image"
              priority={index === defaultIndex}
            />
            <span className="accordion-gallery__scrim" />
            <span className="accordion-gallery__content">
              <span className="accordion-gallery__heading">
                <span className="accordion-gallery__index">0{index + 1}</span>
                <span className="accordion-gallery__label">{item.label}</span>
                <ArrowUpRight size={20} aria-hidden="true" className="accordion-gallery__arrow" />
              </span>
              <span className="accordion-gallery__tags" aria-label={`${item.label} technologies`}>
                {item.items.map((technology) => (
                  <span key={technology} className="accordion-gallery__tag">
                    {technology}
                  </span>
                ))}
              </span>
            </span>
          </motion.a>
        );
      })}
    </div>
  );
}
