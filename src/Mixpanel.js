import mixpanel from 'mixpanel-browser';

mixpanel.init('2b71f63358b95e971bb411fcef9b4f19');

const actions = {
    identify: (id) => mixpanel.identify(id),
    track: (name, props) => mixpanel.track(name, props),
    register: (props) => mixpanel.register(props),
    register_once: (props) => mixpanel.register_once(props),
    people: {
        set: (props) => mixpanel.people.set(props),
        increment: (props) => mixpanel.people.increment(props),
    },
};

const customActions = {
    identifyLogin: (userId) => {
        actions.identify(userId);
        actions.track('Login');
        actions.people.set({ $name: userId });
    },
    trackMessage: () => {
        actions.track('Send message');
    }
};

export default { ...actions, ...customActions };
