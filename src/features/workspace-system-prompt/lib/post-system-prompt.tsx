// Temporary fixture until API is implemented
// @ts-expect-error - mocked until implemented in backend
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function postSystemPrompt(prompt: string) {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      alert("Prompt saved");
      resolve();
    }, 1000); // 1 second timeout
  });
}
