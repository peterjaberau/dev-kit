import { useRef } from "react";
import { Body } from "../../Primitives/Body";
import { PreviewBox } from "../PreviewBox";

export function PreviewAudioUri({
  src,
  contentType,
}: {
  src: string;
  contentType: string;
}) {
  const mediaRef = useRef<HTMLMediaElement>(null);


  return (
    <div>
      <PreviewBox>
        <Body>
          <audio controls src={src} ref={mediaRef}>
            Sorry, your browser doesn't support embedded audio.
          </audio>
        </Body>
      </PreviewBox>
    </div>
  );
}
