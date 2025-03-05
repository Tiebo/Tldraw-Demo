import { useEffect, useState } from "react";
import "./imgList.css";
export default function ImgList() {
  const [images, setImages] = useState<string[]>([]);

  const thumbnail: string =
    "?x-oss-process=image/resize,m_fill,w_200,quality,q_10";
  const original: string = "";

  const fetchImages = () => {
    const folder = "tldraw";
    fetch(`http://127.0.0.1:8000/list-images/?folder=${folder}`)
      .then((response: Response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setImages(data.images);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };
  useEffect(() => {
    fetchImages();
  }, []);

  const handleMouseEnter: React.DragEventHandler<HTMLImageElement> = (e) => {
    // 修改图片的 src
    e.currentTarget.src = e.currentTarget.src.replace(thumbnail, original);
  };

  const handleMouseLeave: React.MouseEventHandler<HTMLImageElement> = (e) => {
    // 修改图片的 src
    e.currentTarget.src = e.currentTarget.src + thumbnail;
  };
  return (
    <>
      <div className="img-card">
        {images.map((item) => (
          <div className="img-card-item" key={item}>
            <img
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              src={item + thumbnail}
              alt=""
              title="Drag the picture to the artboard"
              draggable="true"
            />
            <div className="line"></div>
          </div>
        ))}
      </div>
    </>
  );
}
