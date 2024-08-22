import React from "react";
import { FieldProps } from "formik";

interface CustomInputProps extends FieldProps {
    placeholder?: string;
    type?: string;
    name: string;
    label?: string;
}

const CustomInput: React.FC<CustomInputProps> = ({
    field,
    form: { touched, errors },
    placeholder = "",
    type = "text",
    label,
    ...props
}) => (
    <div className="mb-8">
        {label && (
            <label
                htmlFor={field.name}
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
                {label}
            </label>
        )}
        <input
            {...field}
            {...props}
            type={type}
            placeholder={placeholder}
            id={field.name}
            className={`bg-gray-50 border border-gray-300  text-gray-900 rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus-visible:outline-none ${
                touched[field.name] && errors[field.name]
                    ? "border-red-500"
                    : touched[field.name] && !errors[field.name]
                    ? "border-green-500"
                    : "border-gray-300"
            }`}
        />
        {touched[field.name] && errors[field.name] && (
            <div
                className="p-2 mb-4 text-sm mt-2 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
            >
                {errors[field.name] as string}
            </div>
        )}
    </div>
);

export default CustomInput;
