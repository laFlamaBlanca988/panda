import React, { useState } from "react";
import { useFormStore } from "@/store/formStore";
import { FormFieldRenderer } from "@/components/shared/FormFieldRenderer";
import Button from "../ui/Button";
import { styled } from "styled-system/jsx";
import { Heading } from "@/components/ui/Heading";
import { FiCheck, FiAlertCircle } from "react-icons/fi";

const PreviewContainer = styled("div", {
  base: {
    width: "100%",
    margin: "0 auto",
    padding: "24px",
    borderRadius: "lg",
    background: "white",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  },
});

const FormTitle = styled("div", {
  base: {
    marginBottom: "24px",
    textAlign: "center",
  },
});

const FieldContainer = styled("div", {
  base: {
    // marginBottom: "20px",
  },
});
const StyledDiv = styled("div", {
  base: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
});
const SubmitContainer = styled("div", {
  base: {
    marginTop: "32px",
    display: "flex",
    justifyContent: "center",
  },
});

const SuccessMessage = styled("div", {
  base: {
    display: "flex",
    alignItems: "center",
    gap: "2",
    padding: "16px",
    borderRadius: "md",
    backgroundColor: "success.50",
    color: "success.700",
    marginTop: "16px",
    fontWeight: "medium",
  },
});

const ErrorMessage = styled("div", {
  base: {
    display: "flex",
    alignItems: "center",
    gap: "2",
    padding: "16px",
    borderRadius: "md",
    backgroundColor: "error.50",
    color: "error.700",
    marginTop: "16px",
    fontWeight: "medium",
  },
});

export const LivePreviewView = () => {
  const fields = useFormStore((state) => state.fields);

  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hasErrors, setHasErrors] = useState(false);

  const validateField = (
    id: string,
    value: string | boolean,
    required: boolean
  ) => {
    setErrors((prev) => {
      const newErrors = { ...prev };
      if (required && !value) {
        newErrors[id] = true;
        setHasErrors(true);
      } else {
        delete newErrors[id];
        setHasErrors(false);
      }
      return newErrors;
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(false);
    setHasErrors(false);

    const newErrors: Record<string, boolean> = {};

    fields.forEach((field) => {
      if (field.required && !field.value) {
        newErrors[field.id] = true;
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsSubmitted(true);
    } else {
      setHasErrors(true);
    }
  };

  return (
    <PreviewContainer>
      {fields.length === 0 ? (
        <div>
          <ErrorMessage>
            <FiAlertCircle size={20} />
            No form fields have been added yet. Add some fields in the builder
            tab.
          </ErrorMessage>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <FormTitle>
            <Heading level="h2" size="xl">
              Form Preview
            </Heading>
            <Heading level="h1" size="sm">
              Test your form below
            </Heading>
          </FormTitle>

          <StyledDiv>
            {fields.map((field) => (
              <FieldContainer key={field.id}>
                <FormFieldRenderer
                  field={field}
                  errors={errors}
                  validateField={validateField}
                />
              </FieldContainer>
            ))}
            <SubmitContainer>
              <Button>Submit Form</Button>
            </SubmitContainer>
          </StyledDiv>
          {isSubmitted && (
            <div>
              <SuccessMessage>
                <FiCheck size={20} />
                Form submitted successfully!
              </SuccessMessage>
            </div>
          )}

          {hasErrors && (
            <ErrorMessage>
              <FiAlertCircle size={20} />
              Please fix the errors highlighted above.
            </ErrorMessage>
          )}
        </form>
      )}
    </PreviewContainer>
  );
};
