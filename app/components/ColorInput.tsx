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
            <div>
            <h1>Input a color</h1>
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
                    <form onSubmit={handleSubmit}>
                        <input
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
                        <button type="submit" disabled={isSubmitting}>
                            Add color
                        </button>
                    </form>
                )}
            </Formik>
        </div>
    );
}