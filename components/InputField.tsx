import React, { InputHTMLAttributes } from "react";
import { useField } from "formik";
import { FormControl, FormLabel, Input, Textarea } from "@chakra-ui/react";
import { InputProps } from "@chakra-ui/react";
import { TextareaProps } from "@chakra-ui/react";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  desingInput?: string;
  textarea?: boolean;
};

export const InputField: React.FC<InputFieldProps> = ({
  label,
  textarea,
  desingInput,
  size: _,
  ...props
}) => {
  let InputOrTextarea: React.ElementType<InputProps | TextareaProps> =
    Input as React.ElementType<InputProps | TextareaProps>;

  if (textarea) {
    InputOrTextarea = Textarea as React.ElementType<InputProps | TextareaProps>;
  }

  const [field, meta] = useField(props);

  return (
    <FormControl
      isInvalid={!!meta.error}
      className={
        meta.touched && meta.error
          ? "d-flex fd-column gs4 gsy has-error mb2"
          : "d-flex fd-column gs4 gsy mb2"
      }
    >
      <FormLabel htmlFor={field.name} className="flex--item s-label">
        {label}
      </FormLabel>

      <div
        className={`${
          desingInput
            ? desingInput + " d-flex ps-relative"
            : "d-flex ps-relative"
        }`}
      >
        <InputOrTextarea
          {...field}
          {...props}
          id={field.name}
          className={textarea ? "s-input s-editor-resizable hmn1" : "s-input"}
          as={textarea ? "textarea" : "input"}
          type={props.type || "text"}
        />

        <svg
          aria-hidden="true"
          className={
            meta.touched && meta.error
              ? "s-input-icon svg-icon iconAlertCircle"
              : "d-none"
          }
          width="18"
          height="18"
          viewBox="0 0 18 18"
        >
          <path
            fillRule="evenodd"
            d="M2 10a8 8 0 1 0 16 0 8 8 0 0 0-16 0zm12 1V9H6v2h8z"
            clipRule="evenodd"
          ></path>
        </svg>
      </div>

      {meta.touched && meta.error ? (
        <div
          className="s-input-message js-stacks-validation-message mb12"
          dangerouslySetInnerHTML={{ __html: meta.error }}
        ></div>
      ) : null}
    </FormControl>
  );
};
