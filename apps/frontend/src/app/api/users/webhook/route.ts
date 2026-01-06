import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest } from "next/server";
import {
  createUser,
  deleteUserByClerkId,
  updateUser,
  getUserByClerkId,
} from "@/lib/api/users.api";
import { ApiError } from "@/lib/api/config";

/**
 * Transform Clerk webhook data to our API format
 */
function transformClerkUserData(clerkData: any) {
  return {
    clerkId: clerkData.id,
    email: clerkData.email_addresses?.[0]?.email_address || "",
    username: clerkData.username || null,
    avatarUrl: clerkData.image_url || null,
    firstName: clerkData.first_name || null,
    lastName: clerkData.last_name || null,
  };
}

/**
 * Handle errors from API calls without failing the webhook
 */
function handleApiError(error: unknown, operation: string): void {
  if (error instanceof ApiError) {
    console.error(
      `[ERROR] Failed to ${operation} user in backend: ${error.status} - ${error.message}`
    );
  } else {
    console.error(`[ERROR] Error ${operation} user in backend:`, error);
  }
}

/**
 * Handle user.created webhook event
 */
async function handleUserCreated(clerkData: any): Promise<void> {
  const userData = transformClerkUserData(clerkData);
  const createdUser = await createUser(userData);
  console.log("[INFO] User created successfully in backend:", createdUser);
}

/**
 * Handle user.deleted webhook event
 */
async function handleUserDeleted(clerkData: any): Promise<void> {
  if (!clerkData.id) {
    throw new Error("Clerk ID is missing from webhook payload");
  }
  await deleteUserByClerkId(clerkData.id);
  console.log("[INFO] User deleted successfully in backend");
}

/**
 * Handle user.updated webhook event
 */
async function handleUserUpdated(clerkData: any): Promise<void> {
  if (!clerkData.id) {
    throw new Error("Clerk ID is missing from webhook payload");
  }

  // Get user by clerkId to obtain the user ID
  const existingUser = await getUserByClerkId(clerkData.id);

  // Update user with the obtained user ID
  const updatedUser = await updateUser(existingUser.id, {
    avatarUrl: clerkData.image_url || null,
    firstName: clerkData.first_name || null,
    lastName: clerkData.last_name || null,
  });

  console.log("[INFO] User updated successfully in backend:", updatedUser);
}

/**
 * Route handler for Clerk webhooks
 */
export async function POST(req: NextRequest) {
  try {
    const { data: clerkData, type: eventType } = await verifyWebhook(req);
    console.log(`[INFO] Received webhook with event type: ${eventType}`);

    try {
      switch (eventType) {
        case "user.created":
          await handleUserCreated(clerkData);
          break;
        case "user.deleted":
          await handleUserDeleted(clerkData);
          break;
        case "user.updated":
          await handleUserUpdated(clerkData);
          break;
        default:
          console.log(`[INFO] Unhandled webhook event type: ${eventType}`);
      }
    } catch (error) {
      handleApiError(error, "process");
      // Don't fail the webhook, just log the error
    }

    return new Response("Webhook received", { status: 200 });
  } catch (err) {
    console.error(`[ERROR] Error verifying webhook:`, err);
    return new Response("Error verifying webhook", { status: 400 });
  }
}
