import { cn } from "@/lib/utils/cn";

interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  value?: string | number;
  onChange?: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  required?: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
  textarea?: boolean;
  className?: string;
}

export default function FormField({
  label,
  name,
  type = "text",
  value,
  onChange,
  required,
  placeholder,
  options,
  textarea,
  className,
}: FormFieldProps) {
  const inputClasses =
    "w-full px-3 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent text-sm";

  return (
    <div className={cn("space-y-1", className)}>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-text-primary"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      {options ? (
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className={inputClasses}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : textarea ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          rows={4}
          className={inputClasses}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          className={inputClasses}
        />
      )}
    </div>
  );
}
