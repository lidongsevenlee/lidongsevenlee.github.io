import * as React from "react";

export interface LabelInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
}

const LabelInput = React.forwardRef<HTMLInputElement, LabelInputProps>(
  ({ className, type, label, id, style, ...props }, ref) => {
    return (
      <div className="label-input-wrap" style={{ position: "relative" }}>
        <input
          type={type}
          placeholder=" "
          ref={ref}
          id={id}
          className={className}
          style={{
            display: "block",
            width: "100%",
            boxSizing: "border-box",
            appearance: "none",
            borderRadius: 8,
            border: "1px solid var(--border, #d4d4d4)",
            background: "transparent",
            padding: "20px 10px 8px",
            fontSize: 13,
            fontFamily: "inherit",
            color: "var(--text, #111)",
            outline: "none",
            transition: "border-color 200ms",
            ...style,
          }}
          onFocus={e => (e.currentTarget.style.borderColor = "var(--ink, #3a6b78)")}
          onBlur={e => (e.currentTarget.style.borderColor = "var(--border, #d4d4d4)")}
          {...props}
        />
        <label
          htmlFor={id}
          className="label-input-label"
        >
          {label}
        </label>
      </div>
    );
  }
);

LabelInput.displayName = "LabelInput";
export { LabelInput };
