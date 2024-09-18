// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function sendVerificationRequest({ identifier: email, url }: any) {
  // Call the cloud Email provider API for sending emails
  const response = await fetch("http://localhost:3000/api/send-email", {
    // The body format will vary depending on provider, please see their documentation
    body: JSON.stringify({
      email,
      url,
    }),
    method: "POST",
  });

  if (!response.ok) {
    const { errors } = await response.json();
    throw new Error(JSON.stringify(errors));
  }
}
