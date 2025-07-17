"use client";
import React from "react";
import { Formik, } from "formik";
import { useColorContext } from "../context/ColorContext";

const colorRegex = /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$|^rgb\(\s*(?:\d{1,3}%?\s*,\s*){2}\d{1,3}%?\s*\)$|^rgba\(\s*(?:\d{1,3}%?\s*,\s*){3}(?:0|1|0?\.\d+)\s*\)$|^hsl\(\s*\d{1,3}\s*,\s*\d{1,3}%\s*,\s*\d{1,3}%\s*\)$|^hsla\(\s*\d{1,3}\s*,\s*\d{1,3}%\s*,\s*\d{1,3}%\s*,\s*(?:0|1|0?\.\d+)\s*\)$/i;

interface FormValues {
    color: string;
}

export default function ColorInput() {
    const { addColor } = useColorContext();

    return (
        <div className="w-sm">
            <p className="text-base text-text mb-4">Enter a color value using HEX, RGB, or HSL format. This input allows you to define the base color for generating shades.</p>
            <Formik<FormValues>
                initialValues={{ color: "" }}
                validate={(values): Partial<FormValues> => {
                    const errors: Partial<FormValues> = {};

                    if (!values.color) {
                        errors.color = "Required";
                    } else if (
                        !colorRegex.test(values.color)
                    ) {
                        errors.color = "The color must be of valid format. (hex, rgb/rgba, hsl/hsla)"
                    }

                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    console.log("Adding color:", values.color);
                    
                    addColor(values.color);
                    

                    setSubmitting(false);
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
                        <input
                            className="bg-gray-50 border-gray-100 border-1 p-4 rounded-md text-base text-text"
                            type="text"
                            name="color"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.color}
                            autoComplete="off"
                        />
                        {errors.color && touched.color && (
                            <div style={{ color: 'red' }}>{errors.color}</div>
                        )}
                        <button 
                            className="bg-black text-lg p-2 mt-2 rounded-md text-white cursor-pointer hover:shadow-md hover:bg-gold-400"
                            type="submit" 
                            disabled={isSubmitting}
                        >
                            Add Your Hue
                        </button>
                    </form>
                )}
            </Formik>
        </div>
    );
}