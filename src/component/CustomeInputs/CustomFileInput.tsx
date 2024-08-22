import React, { useState } from "react";
import { FieldProps } from "formik";

interface CustomFileInputProps extends FieldProps {
    label?: string;
    description?: string;
    accept?: string;
}

const CustomFileInput: React.FC<CustomFileInputProps> = ({
    field,
    form: { setFieldValue, touched, errors },
    label = "Click to upload or drag and drop",
    description = "SVG, PNG, JPG or GIF (MAX. 800x400px)",
    accept = "image/*",
    ...props
}) => {
    const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setFieldValue(field.name, file);

            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center w-full mb-5">
            <label
                htmlFor={field.name}
                className="flex flex-col py-[185px] items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                        className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">{label}</span>
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        {description}
                    </p>
                </div>
                <input
                    id={field.name}
                    type="file"
                    className="hidden"
                    onChange={handleChange}
                    accept={accept}
                    {...props}
                />
                {preview && (
                    <div className="mt-4">
                        <img
                            src={preview as string}
                            alt="Preview"
                            className="w-full h-[150px] object-cover rounded-lg"
                        />
                    </div>
                )}
                {touched[field.name] && errors[field.name] && (
                    <div className="mt-2 text-red-500 text-xs">
                        {errors[field.name] as string}
                    </div>
                )}
            </label>
        </div>
    );
};

export default CustomFileInput;
