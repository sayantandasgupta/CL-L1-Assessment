const Sequencer = require('@jest/test-sequencer').default;

class CustomSequencer extends Sequencer {
    sort(tests) {
        const order = [
            'users.test.js',
            'projects.test.js',
            'tasks.test.js',
        ];

        return tests.sort((a, b) => {
            const indexA = order.indexOf(a.path.split('/').pop());
            const indexB = order.indexOf(b.path.split('/').pop());
            return indexA - indexB;
        });
    }
}

module.exports = CustomSequencer;
