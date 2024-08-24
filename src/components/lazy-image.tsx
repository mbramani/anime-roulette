import { useState, useEffect, useRef, ImgHTMLAttributes } from "react";

const PLACEHOLDER_SRC = "/anime-loading.gif";

interface LazyImageProps extends ImgHTMLAttributes<HTMLImageElement> {}

export default function LazyImage({ src, alt, ...props }: LazyImageProps) {
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(function () {
    const observer = new IntersectionObserver(
      function ([entry]) {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect(); // Stop observing once the image is in view
        }
      },
      { threshold: 0.1 } // Adjust threshold as needed
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return function () {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, []);

  return (
    <img
      ref={imgRef}
      src={isInView ? src : PLACEHOLDER_SRC} // Use built-in placeholder until in view
      alt={alt}
      {...props}
    />
  );
}
