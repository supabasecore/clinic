import React, { useState, useEffect } from "react";

interface Attachment {
  id: number;
  name: string;
}

interface EnableForcedServiceProps {
  className?: string;
  onChange: (attachmentId: number) => void;
  defaultValue: boolean;
  attachments: Attachment[];
}

const EnableForcedService: React.FC<EnableForcedServiceProps> = ({
  className,
  onChange,
  attachments,
}) => {
  const [selectedId, setSelectedId] = useState<number | null>(
    attachments.length > 0 ? attachments[0].id : null
  );

  useEffect(() => {
    if (selectedId) {
      onChange(selectedId);
    }
  }, [selectedId, onChange]);

  const handleToggleChange = (attachmentId: number) => {
    if (attachmentId === selectedId) {
      setSelectedId(null);
    } else {
      setSelectedId(attachmentId);
    }
  };

  return (
    <>
      {attachments.map((attachment) => (
        <div
          key={attachment.id}
          className={className ? className : "grid--item"}
        >
          <label
            className="d-flex c-pointer sm:jc-start"
            htmlFor={`highcontrast-toggle-${attachment.name}`}
          >
            <div className="flex--item">
              <input
                type="radio"
                id={`highcontrast-toggle-${attachment.name}`}
                className="s-radio"
                name={attachment.name}
                checked={selectedId === attachment.id}
                onChange={() => handleToggleChange(attachment.id)}
              />
            </div>
            <div className="d-flex ai-center fd-column  ml4">
              {attachment.name}
            </div>
          </label>
        </div>
      ))}
    </>
  );
};

export default EnableForcedService;
