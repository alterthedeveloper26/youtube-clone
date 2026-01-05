import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest } from "next/server";
import { createUser } from "@/lib/api/users.api";
import { ApiError } from "@/lib/api/config";

/**
 * Transform Clerk webhook data to our API format
 */
function transformClerkUserData(clerkData: any) {
  const clerkId = clerkData.id;
  if (!clerkId) {
    throw new Error("User ID is missing from webhook payload");
  }

  const emailAddress = clerkData.email_addresses?.[0]?.email_address || "";

  // Generate username from available data (must be at least 3 chars)
  let username = clerkData.username || clerkData.first_name || "";
  if (!username || username.length < 3) {
    // Fallback to email prefix or generate from ID
    const emailPrefix = emailAddress.split("@")[0];
    username =
      emailPrefix && emailPrefix.length >= 3
        ? emailPrefix
        : `user_${clerkId.slice(0, 8)}`;
  }

  const avatarUrl = clerkData.image_url || null;

  return {
    clerkId,
    username,
    email: emailAddress,
    avatarUrl,
  };
}

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req);
    const eventType = evt.type;

    if (eventType === "user.created") {
      try {
        // Transform Clerk data to our API format
        const userData = transformClerkUserData(evt.data);

        // Call backend API using our organized service
        const createdUser = await createUser(userData);
        console.log("User created successfully in backend:", createdUser);
      } catch (error) {
        if (error instanceof ApiError) {
          console.error(
            `Failed to create user in backend: ${error.status} - ${error.message}`
          );
        } else {
          console.error("Error creating user in backend:", error);
        }
        // Don't fail the webhook, just log the error
      }
    }

    console.log(`Received webhook with event type: ${eventType}`);
    console.log("Webhook payload:", evt.data);

    return new Response("Webhook received", { status: 200 });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error verifying webhook", { status: 400 });
  }
}
