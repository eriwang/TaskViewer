// TODO: needs reference to current user
class Task {
    constructor(id, name, description, timestamp, color, priority) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.timestamp = timestamp;
        this.color = color;
        this.priority = priority;
    }

    // The id is intentionally not added here, since it's not stored as a firestore field.
    toObject() {
        return {
            name: this.name,
            description: this.description,
            timestamp: this.timestamp,
            color: this.color,
            priority: this.priority
        };
    }
}

export default Task;
