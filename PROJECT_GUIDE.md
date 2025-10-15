Project Contribution Guide

This document outlines how to extend and maintain form fields, languages, and themes within the project.
The system is designed to be reusable, scalable, and accessible, following consistent UX principles.

🧩 1. Adding a New Form Field

Form fields for Step 1 and Step 2 are defined in the JSON arrays inside:

/lib/content/

Each field object includes metadata used by the form builder.

✳️ Example Field Object
{
label: 'fields.name',
name: 'personalInfo.name',
placeholder: 'placeholders.name',
type: 'text',
required: true,
component: 'Input',
}

label → Mapped to translation key in /locales/en and /locales/ar

name → Path to the value inside the form store

placeholder → Also comes from the translation file

type → Input type (text, select, etc.)

required → Enables validation

component → The UI component used (Input, Select, Textarea, etc.)

⚙️ Dynamic Fields
{
label: 'fields.state',
name: 'personalInfo.state',
type: 'select',
required: true,
dependsOn: 'country',
dynamicOptions: 'states',
}

dependsOn → The field remains disabled until the referenced key (e.g. country) is filled.

dynamicOptions → Indicates it uses a dynamic state variable (handled in the corresponding Step component).

Validation & Errors

Validation is handled by the FormField component using Yup.
Each field manages:

Data binding

Validation rules

Error display

A fixed height is reserved for error messages to avoid layout shifts when errors appear.

📝 Adding a Text Area (Step 3)

For Step 3, fields are defined in:

/lib/content/step3Form.ts

To add a new textarea:

{
label: 'fields.description',
name: 'feedback.description',
type: 'textarea',
required: false,
component: 'Textarea',
}

🧠 Note: Step 3 includes AI prompt handling; ensure new fields align with the prompt builder logic.

🧱 Adding a New Input Type

If you’re introducing a new input type (e.g., DatePicker, FileUpload):

Implement its UI component under your Design System (MUI/Tailwind).

Update the FormField component to handle the new type.

Test validation, accessibility, and error states.

🌍 2. Adding a New Language

To add a new translation/language:

Add a new folder under /locales/, for example:

/locales/fr/

Include the following JSON files:

step1.json

step2.json

step3.json

common.json

Add the language as a new item in the Language Switcher menu.

The app automatically detects and loads the browser language by default.

🎨 3. Theming

The project theme configuration is located in:

/themeconfig.js

You’ll find separate configuration files for:

Breakpoints

Typography

Palette

All theme updates should maintain consistency across MUI and Tailwind layers to ensure design system alignment.

♻️ Core Principles

Reusable: All components and form fields follow a modular structure.

Scalable: Architecture supports new forms, locales, and input types easily.

Accessible: Follow ARIA standards, keyboard navigation, and color contrast rules.

UX-Focused: Predictable validation, smooth error handling, and responsive layout.
