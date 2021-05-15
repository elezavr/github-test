class Emitter {
    constructor() {
        this.listeners = {}
    }

    emit(event, ...args) {
        if (!Array.isArray(this.listeners[event])) {
            return false;
        }
        this.listeners[event].forEach(listener => {
            listener(...args);
        })
        return true;
    }

    subscribe(event, fn) {
        this.listeners[event] = this.listeners[event] || [];
        this.listeners[event].push(fn);
        return () => {
            this.listeners[event] = 
                this.listeners[event].filter(listener => listener !== fn);
        }
    }
}

const emitter = new Emitter();

const unsub = emitter.subscribe('hello', data => console.log('Sub:', data));

emitter.emit('hello', 42);
emitter.emit('hello', 42);

setTimeout(() => {
    emitter.emit('hello', 'After 2 seconds')
}, 2000);

setTimeout(() => {
    unsub();
}, 2500);