type EventCallback = (this: any, event: Event) => void;

function getConditionalCallback(selector: string, callback: EventCallback): EventCallback {
    return function (e: Event) {
        if (e.target && (e.target as Element).matches(selector)) {
            (e as any).delegatedTarget = e.target;
            callback.call(this, e);
            return;
        }

        const path = (e as any).path || (e.composedPath && e.composedPath());
        if (!path) return;

        for (let i = 0; i < path.length; ++i) {
            const el = path[i] as Element;
            if (el.matches && el.matches(selector)) {
                (e as any).delegatedTarget = el;
                callback.call(this, e);
            }
            if (el === e.currentTarget) {
                return;
            }
        }
    };
}

export default function addDynamicEventListener(
    rootElement: Element,
    eventType: string,
    selector: string,
    callback: EventCallback,
    options: boolean | AddEventListenerOptions = false
): () => void {
    const cb = getConditionalCallback(selector, callback);
    rootElement.addEventListener(eventType, cb, options);
    return () => rootElement.removeEventListener(eventType, cb, options);
}
