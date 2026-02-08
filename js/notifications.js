window.Prhay = window.Prhay || {};

/**
 * Send a notification via ntfy (https://ntfy.sh).
 * Works with both ntfy.sh hosted and self-hosted instances.
 *
 * @param {string} topicUrl - Full ntfy topic URL (e.g., "https://ntfy.sh/my-prhay")
 * @param {string} title    - Notification title
 * @param {string} message  - Notification body text
 * @param {object} options  - Optional: { tags, priority, delay }
 */
window.Prhay.sendNtfyNotification = async (topicUrl, title, message, options = {}) => {
    if (!topicUrl) return;
    try {
        const headers = { 'Title': title };
        if (options.tags) headers['Tags'] = options.tags;
        if (options.priority) headers['Priority'] = String(options.priority);
        if (options.delay) headers['Delay'] = options.delay;

        const response = await fetch(topicUrl, {
            method: 'POST',
            body: message,
            headers
        });

        if (!response.ok) {
            console.warn('ntfy notification failed:', response.status, response.statusText);
        }
    } catch (err) {
        console.warn('ntfy notification failed:', err);
    }
};
