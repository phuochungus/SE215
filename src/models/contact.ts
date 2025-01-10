export default class Contact {
    name: string;
    avatar: string | null;
    lastMessage: string;
    unreadCount: number;

    constructor({ name, avatar = null, lastMessage = "", unreadCount = 0 }: { name: string, avatar: string | null, lastMessage: string, unreadCount: number }) {
        this.name = name; // Contact name
        this.avatar = avatar; // Avatar URL or null
        this.lastMessage = lastMessage; // Last message exchanged
        this.unreadCount = unreadCount; // Unread message count
    }

    getFormattedName() {
        return this.name.charAt(0).toUpperCase() + this.name.slice(1);
    }

    hasUnreadMessages() {
        return this.unreadCount > 0;
    }

    static createContacts(dataArray: Array<object>) {
        return dataArray.map((data) => new Contact(data as { name: string, avatar: string | null, lastMessage: string, unreadCount: number }));
    }
}
