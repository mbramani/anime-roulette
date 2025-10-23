import { ImgHTMLAttributes, useEffect, useRef } from 'react';

type LazyImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  onLoad?: () => void;
  onError?: () => void;
};

const PLACEHOLDER = "/anime-loading.gif";

export default function LazyImage({
  src = '',
  alt = '',
  onLoad,
  onError,
  className = '',
  ...rest
}: LazyImageProps) {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (!imgRef.current) return;

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && imgRef.current) {
          // Switch to real source
          imgRef.current.src = src;
          observerRef.current?.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '50px' } // start 50 px before entering viewport
    );

    observerRef.current.observe(imgRef.current);

    return () => observerRef.current?.disconnect();
  }, [src]);

  return (
    <img
      ref={imgRef}
      src={PLACEHOLDER}
      alt={alt}
      loading="lazy"
      decoding="async"
      onLoad={onLoad}
      onError={(e) => {
        if (imgRef.current) imgRef.current.src = PLACEHOLDER;
        onError?.();
      }}
      className={`${className} lazy`}
      {...rest}
    />
  );
}