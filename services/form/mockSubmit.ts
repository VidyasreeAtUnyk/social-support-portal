// services/form/mockSubmit.ts
export const mockSubmitForm = async (data: any) => {
  console.log('Submitting form data...', data);

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Simulate success response
  return { success: true, message: 'Form submitted successfully!' };
};
