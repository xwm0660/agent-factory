export const env = {
    apiKey: process.env.DEEPSEEK_API_KEY ?? "",
    model: process.env.DEFAULT_MODEL ?? "deepseek-chat",
    debug: process.env.DEBUG === "true"
}