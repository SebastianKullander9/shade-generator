"use client";
import React from "react";
import { Formik, } from "formik";
import { useColorContext } from "../context/ColorContext";
import { colorRegexGlobal } from "../utils/regex";

interface FormValues {
    color: string;
}

interface ColorInputProps {
    scrollToElement: () => void;
}

export default function ColorInput({ scrollToElement }: ColorInputProps) {
    const { addColors } = useColorContext();

    return (
        <div className="w-sm px-8 sm:px-0">
            <label htmlFor="colorInput" className="text-base text-text mb-4">Enter one or more base colors in HEX, RGB, or HSL format. Separate multiple values with spaces, commas, or newlines.</label>
            <Formik<FormValues>
                initialValues={{ color: "" }}
                validate={(values): Partial<FormValues> => {
                    const errors: Partial<FormValues> = {};

                    if (!values.color.trim()) {
                        errors.color = "Required";
                    } else {
                        const matches = values.color.match(colorRegexGlobal) || [];
                        if (matches.length === 0) {
                            errors.color = "Please enter at least one valid color. (hex, rgb, rgba, hsl, hsla)";
                        }
                    }

                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    const matches = values.color.match(colorRegexGlobal) || [];
                    const uniqueColors = Array.from(new Set(matches));

                    addColors(uniqueColors);
                    setSubmitting(false);
                    scrollToElement();
                }}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                }) => (
                    <form className="flex flex-col w-full" onSubmit={handleSubmit}>
                        <textarea
                            className="bg-gray-50 border-gray-100 border-1 p-4 rounded-md text-base text-text"
                            id="colorInput"
                            name="color"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.color}
                            autoComplete="off"
                            rows={6}
                            aria-label="Enter one or more color values"
                        />
                        {errors.color && touched.color && (
                            <div className="text-sm text-red-500 mt-2">{errors.color}</div>
                        )}
                        <button 
                            className="bg-black text-lg p-2 mt-2 rounded-md text-white cursor-pointer hover:shadow-md hover:text-black hover:bg-gold-400"
                            type="submit" 
                            disabled={isSubmitting}
                        >
                            Generate Shades
                        </button>
                    </form>
                )}
            </Formik>
        </div>
    );
}