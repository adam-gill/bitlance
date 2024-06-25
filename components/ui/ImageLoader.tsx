import React, { useEffect, useState } from "react";
import { Blurhash } from "react-blurhash";

interface ImageLoaderProps {
  src: string;
}

const ImageLoader: React.FC<ImageLoaderProps> = ({ src }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setImageLoaded(true);
    };
    img.src = src;
  }, [src]);

  return (
    <>
      <div style={{ display: imageLoaded ? "none" : "inline" }}>
        <Blurhash
          hash="L38#DX0G-~?$DaWGM}xo01blj[%M"
          width={400}
          height={200}
          resolutionX={32}
          resolutionY={32}
          punch={1}
        />
      </div>

      <img
        className="w-[400px] h-[200px]"
        onLoad={() => setImageLoaded(true)}
        src={src}
        alt=""
        style={{ display: !imageLoaded ? "none" : "inline" }}
      />
    </>
  );
};

export default ImageLoader;
