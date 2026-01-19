import { Body } from "../../Primitives/Body";
import { Title } from "../../Primitives/Title";
import { PreviewBox } from "../PreviewBox";

export type PreviewHtmlProps = {
  info: any;
};

export function PreviewHtml({ info }: PreviewHtmlProps) {
  return (
    <PreviewBox link={info.url}>
      <div>
        {info.title && (
          <Title>
            {info.icon && (
              <img src={info.icon.url} className="w-4 h-4 inline mr-1" alt="" />
            )}
            <span className="inline">{info.title}</span>
          </Title>
        )}
        {info.description && <Body>{info.description}</Body>}
      </div>
      {info.image && (
        <div>
          <img className="block" src={info.image?.url} alt={info.image?.alt} />
        </div>
      )}
    </PreviewBox>
  );
}
