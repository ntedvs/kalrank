export const shape = (fd: FormData) =>
  Object.fromEntries(fd) as { [key: string]: string }

export const validate = (text: string, type: "email" | "username") => {
  const regex =
    type === "email"
      ? /^(?!\.)(?!.*\.\.)([a-z0-9_'+\-\.]*)[a-z0-9_+-]@([a-z0-9][a-z0-9\-]*\.)+[a-z]{2,}$/
      : /^[a-zA-Z0-9._]{3,15}$/

  return regex.test(text)
}
