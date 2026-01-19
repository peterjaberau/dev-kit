import { useRef } from "react";
import { Body } from "../../Primitives/Body";
import { PreviewBox } from "../PreviewBox";

export function PreviewVideoUri({
  src,
  contentType,
}: {
  src: string;
  contentType: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);


  return (
    <div>
      <PreviewBox>
        <Body>
          <video key={src} controls ref={videoRef}>
            <source src={src} type={contentType} />
            Sorry, your browser doesn't support embedded videos.
          </video>
        </Body>
      </PreviewBox>
    </div>
  );
}
