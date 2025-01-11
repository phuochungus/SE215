export interface User {
    id: string; // Unique identifier for the user
    name: string; // Full name of the user
    avatarUrl: string; // URL for the user's profile picture
    phoneNumber: string; // User's phone number
    email?: string; // Optional email address for contact purposes
    status?: string; // Online/offline/busy/etc.
    lastSeen?: Date; // Timestamp of the last activity
    role?: "admin" | "member" | "guest"; // Role in the chat/group context
    bio?: string; // Short description or bio for the user

}
