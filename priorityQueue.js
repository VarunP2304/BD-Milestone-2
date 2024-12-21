class Node {
    constructor(attendee) {
        this.attendee = attendee;
        this.left = null;
        this.right = null;
    }
}

class PriorityQueue {
    constructor() {
        this.root = null;
    }

    insert(attendee) {
        const newNode = new Node(attendee);

        const getPriority = (a) => (a.isVIP ? 3 : a.isSpeaker ? 2 : 1);

        if (!this.root) {
            this.root = newNode;
        } else {
            let current = this.root;

            while (true) {
                if (getPriority(attendee) > getPriority(current.attendee)) {
                    if (!current.left) {
                        current.left = newNode;
                        return;
                    }
                    current = current.left;
                } else {
                    if (!current.right) {
                        current.right = newNode;
                        return;
                    }
                    current = current.right;
                }
            }
        }
    }

    getAttendeesInOrder() {
        const result = [];

        function traverse(node) {
            if (!node) return;
            traverse(node.left);
            result.push(node.attendee);
            traverse(node.right);
        }

        traverse(this.root);
        return result;
    }
}

module.exports = PriorityQueue;
