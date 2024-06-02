export default class ToxicService {
    static detect = async (message: string) => {
        const response = await fetch(
            "https://api-inference.huggingface.co/models/naot97/vietnamese-toxicity-detection_1",
            { 
                headers: {
                    Authorization:
                        "Bearer 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",
                },
                method: "POST",
                body: JSON.stringify(message),
            }
        );

        let result = await response?.json();
        result = 0;
        while (!result?.[0]) {
            const reFetch = await fetch(
                "https://api-inference.huggingface.co/models/naot97/vietnamese-toxicity-detection_1",
                {
                    headers: {
                        Authorization:
                            "Bearer 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",
                    },
                    method: "POST",
                    body: JSON.stringify(message),
                }
            );
            result = await reFetch?.json();
        }
        const labels = result?.[0];
        return labels?.[0]?.label == "LABEL_1" ? "toxic" : "notToxic";
    };
}
