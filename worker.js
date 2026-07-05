export default {
    async fetch(request, env) {
        const url = new URL(request.url);

        if (request.method === "POST" && url.pathname === "/submit-registration") {
            const formData = await request.formData();
            const turnstileToken = formData.get("cf-turnstile-response");
            const ip = request.headers.get("CF-Connecting-IP") || "";
            const turnstileSecret = env.TURNSTILE_SECRET_KEY;

            if (!turnstileToken) {
                return new Response("Captcha missing", { status: 400 });
            }

            if (!turnstileSecret) {
                return new Response("Server captcha secret is not configured", { status: 500 });
            }

            const verifyPayload = new URLSearchParams();
            verifyPayload.append("secret", turnstileSecret);
            verifyPayload.append("response", turnstileToken.toString());
            if (ip) {
                verifyPayload.append("remoteip", ip);
            }

            const verificationResponse = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
                method: "POST",
                body: verifyPayload
            });

            if (!verificationResponse.ok) {
                return new Response("Captcha verification failed", { status: 502 });
            }

            const verificationResult = await verificationResponse.json();
            if (!verificationResult.success) {
                return new Response("Captcha check failed", { status: 400 });
            }

            const username = (formData.get("username") || "").toString().trim();
            const email = (formData.get("email") || "").toString().trim();
            const password = (formData.get("password") || "").toString();
            const termsAccepted = formData.get("terms") === "on";

            if (!username || !email || !password || !termsAccepted) {
                return new Response("Missing required fields", { status: 400 });
            }

            return new Response("Account created", {
                status: 200,
                headers: {
                    "content-type": "text/plain; charset=UTF-8"
                }
            });
        }

        return new Response("Not found", { status: 404 });
    }
};
